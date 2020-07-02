import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

import pytest

from app import create_app
from unittest.mock import MagicMock, PropertyMock
from db import db
import json

from models import User


@pytest.fixture
def session():
    return dict()
    
@pytest.fixture
def webauthn():

    credential_options_instance = MagicMock()
    type(credential_options_instance).registration_dict = PropertyMock(return_value={"creation": "data"})
    WebAuthnMakeCredentialOptions = MagicMock(return_value=credential_options_instance)
    mock = MagicMock(
        WebAuthnMakeCredentialOptions=WebAuthnMakeCredentialOptions
    )

    return mock


@pytest.fixture
def fake_app(session, webauthn):
    test_app = create_app(db, session, webauthn)
    with test_app.app_context():
        db.create_all()
    
    yield test_app

    with test_app.app_context():
        db.drop_all()

@pytest.fixture
def app_client(fake_app):
    yield fake_app.test_client()
        

def test_retrieves_initial_html(app_client):
    result = app_client.get("/")
    assert result.status_code == 200

def test_begin_activate_fails_with_invalid_username(app_client):
    result = app_client.post("/webauthn_begin_activate", data={
        "register_username": None,
        "register_display_name": "Suby"
    })

    parsed = json.loads(result.data)

    assert result.status_code == 401
    assert parsed["fail"] == "Invalid username."



def test_begin_activate_fails_with_invalid_displayname(app_client):
    result = app_client.post("/webauthn_begin_activate", data={
        "register_username": "subyraman",
        "register_display_name": "######"
    })
    parsed = json.loads(result.data)

    assert result.status_code == 401
    assert parsed["fail"] == "Invalid display name."

def test_begin_activate_fails_if_user_exists(app_client, fake_app):
    u = User(username="suby", ukey="ukey", credential_id="foo", display_name="Suby", rp_id="localhost", icon_url="")
    
    with fake_app.app_context():
        db.session.add(u)
        db.session.commit()

    result = app_client.post("/webauthn_begin_activate", data={
        "register_username": "suby",
        "register_display_name": "Suby"
    })

    parsed = json.loads(result.data)

    assert result.status_code == 401
    assert parsed["fail"] == "User already exists."
    
def test_begin_activate_challenge_and_username_set_in_session(app_client, session):
    result = app_client.post("/webauthn_begin_activate", data={
        "register_username": "suby",
        "register_display_name": "Suby"
    })

    assert session["challenge"]
    assert session["register_ukey"]

def test_begin_activate_returns_public_key_creation_options(app_client):
    result = app_client.post("/webauthn_begin_activate", data={
        "register_username": "suby",
        "register_display_name": "Suby"
    })

    parsed = json.loads(result.data)

    assert parsed["creation"] == "data"

def test_verify_credential_returns_error_for_invalid_data(app_client, webauthn, session):
    session["challenge"] = "foo"
    session["register_username"] = "suby"
    session["register_display_name"] = "Suby"
    session["register_ukey"] = "132234"

    registration_response_instance = MagicMock(verify=MagicMock(side_effect=Exception("Failed to parse")))
    webauthn.WebAuthnRegistrationResponse.return_value = registration_response_instance

    result = app_client.post("/verify_credential_info", data={
        "registration": "data"
    })

    parsed = json.loads(result.data)

    assert parsed["fail"] == "Registration failed. Error: Failed to parse"

def test_verify_credential_fails_for_existing_user(fake_app, app_client, webauthn, session):
    session["challenge"] = "foo"
    session["register_username"] = "suby"
    session["register_display_name"] = "Suby"
    session["register_ukey"] = "132234"

    fake_credential = MagicMock(public_key="123", sign_count=0, credential_id="123")

    registration_response_instance = MagicMock(verify=MagicMock(return_value=fake_credential))
    webauthn.WebAuthnRegistrationResponse.return_value = registration_response_instance

    u = User(username="suby", ukey="ukey", credential_id="foo", display_name="Suby", rp_id="localhost", icon_url="")
    
    with fake_app.app_context():
        db.session.add(u)
        db.session.commit()

    result = app_client.post("/verify_credential_info", data={
        "registration": "data"
    })

    parsed = json.loads(result.data)

    assert parsed["fail"] == "User already exists."


def test_verify_credential_adds_new_user_to_db_on_success(fake_app, app_client, webauthn, session):
    session["challenge"] = "foo"
    session["register_username"] = "suby"
    session["register_display_name"] = "Suby"
    session["register_ukey"] = "132234"

    fake_credential = MagicMock(public_key="123", sign_count=0, credential_id="112423")

    registration_response_instance = MagicMock(verify=MagicMock(return_value=fake_credential))
    webauthn.WebAuthnRegistrationResponse.return_value = registration_response_instance

    result = app_client.post("/verify_credential_info", data={
        "registration": "data"
    })

    with fake_app.app_context():
        user = User.query.filter_by(username=session["register_username"]).first()
        
        assert user.ukey == session["register_ukey"]
        assert user.display_name == session["register_display_name"]
        assert user.pub_key == fake_credential.public_key
        assert user.credential_id == fake_credential.credential_id

    assert result.status_code == 200


def test_begin_assertion_fails_if_user_doesnt_exist(app_client, fake_app):

    result = app_client.post("/webauthn_begin_assertion", data={
        "login_username": "suby",
    })

    parsed = json.loads(result.data)

    assert result.status_code == 401
    assert parsed["fail"] == "User does not exist."
    
def test_begin_assertion_challenge_in_session(fake_app, app_client, session):
    u = User(username="suby", ukey="ukey", credential_id="foo", display_name="Suby", rp_id="localhost", icon_url="")

    with fake_app.app_context():
        db.session.add(u)
        db.session.commit()

    result = app_client.post("/webauthn_begin_assertion", data={
        "login_username": "suby",
    })

    assert session["challenge"]

def test_begin_activate_returns_public_key_creation_options(fake_app, app_client, webauthn):
    options_instance = MagicMock()

    mock_assertion_options = {"allowCredentials": []}
    type(options_instance).assertion_dict = PropertyMock(return_value=mock_assertion_options)
    webauthn.WebAuthnAssertionOptions = MagicMock(return_value=options_instance)

    u = User(username="suby", ukey="ukey", credential_id="foo", display_name="Suby", rp_id="localhost", icon_url="")

    with fake_app.app_context():
        db.session.add(u)
        db.session.commit()

    result = app_client.post("/webauthn_begin_assertion", data={
        "login_username": "suby",
    })

    parsed = json.loads(result.data)

    assert parsed == mock_assertion_options

def test_verify_assertion_returns_error_on_verification_failure(fake_app, app_client, webauthn, session):
    session["challenge"] = "foo"
    cred_id = "foo"
    u = User(username="suby", ukey="ukey", credential_id=cred_id.encode("utf-8"), display_name="Suby", rp_id="localhost", icon_url="")

    with fake_app.app_context():
        db.session.add(u)
        db.session.commit()

    auth_response_instance = MagicMock(verify=MagicMock(side_effect=Exception("Failed to parse")))
    webauthn.WebAuthnAssertionResponse.return_value = auth_response_instance

    result = app_client.post("/verify_assertion", data={
        "id": bytes(cred_id, 'utf-8')
    })

    parsed = json.loads(result.data)

    assert parsed["fail"] == "Assertion failed. Error: Failed to parse"

def test_verify_assertion_returns_success_and_updates_sign_count(fake_app, app_client, webauthn, session):
    session["challenge"] = "foo"
    cred_id = "foo"
    u = User(username="suby", ukey="ukey", credential_id=cred_id.encode("utf-8"), display_name="Suby", rp_id="localhost", icon_url="")

    with fake_app.app_context():
        db.session.add(u)
        db.session.commit()

    auth_response_instance = MagicMock(verify=MagicMock(return_value=12))
    webauthn.WebAuthnAssertionResponse.return_value = auth_response_instance

    result = app_client.post("/verify_assertion", data={
        "id": bytes(cred_id, 'utf-8')
    })

    with fake_app.app_context():
        user = User.query.filter_by(username="suby").first()
        assert user.sign_count == 12

    assert result.status_code == 200
