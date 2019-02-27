import { action } from "typesafe-actions";
import { RequestActionTypes } from './Contants';
import { RegistrationState } from './Registration';
import { SerializedPublicKeyCredential, SerializedAssertion } from 'redux-webauthn';



export const getCredentialCreationOptions = (registrationData: RegistrationState) => {
    return action(RequestActionTypes.GET_CREDENTIAL_CREATION_OPTIONS_REQUEST, registrationData);
}

export const validateNewCredential = (newCredential: SerializedPublicKeyCredential) => {
    return action(RequestActionTypes.VALIDATE_NEW_CREDENTIAL_REQUEST, newCredential)
}

export const validateNewCredentialSuccess = () => (
    action(RequestActionTypes.VALIDATE_NEW_CREDENTIAL_SUCCESS, {})
)

export const getAssertionCreationOptions = (username: string) => {
    return action(RequestActionTypes.GET_ASSERTION_CREATION_OPTIONS_REQUEST, {username});
}

export const validateNewAssertion = (newAssertion: SerializedAssertion) => (
    action(RequestActionTypes.VALIDATE_NEW_ASSERTION_REQUEST, newAssertion)
)

export const validateNewAssertionSuccess = () => (
    action(RequestActionTypes.VALIDATE_NEW_ASSERTION_SUCCESS, {})
)