import { Middleware } from "redux";
import { ActionType } from 'typesafe-actions'
import { WebauthnActionTypes } from "./Constants";
import * as WebauthnActions from "./Actions";
import { arrayBufferToWebauthnB64, webauthnB64ToArrayBuffer } from "./Utils";
import { SerializedPublicKeyCredential, SerializedAssertion, WebauthnState } from "./Types";
import {webauthnReducer} from "./Reducer";


export {WebauthnActions, WebauthnActionTypes};
export {webauthnB64ToArrayBuffer, arrayBufferToWebauthnB64};
export {webauthnReducer};
export {SerializedPublicKeyCredential, SerializedAssertion, WebauthnState};


/**
 * @ignore
 */
const _webauthnCreateCredential = async (publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions) => {
    if (!navigator.credentials) {
        throw new Error("WebAuthn unsupported by browser");
    }

    const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions}) as PublicKeyCredential;

    return credential;
}

/**
 * @ignore
 */
export const _webauthnGetAssertion = async (publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions) => {
    if (!navigator.credentials) {
        throw new Error("WebAuthn unsupported by browser");
    }

        
    const assertion = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions}) as PublicKeyCredential;
    return assertion;
}


/**
 * @ignore
 */
const serializeCredentialToObject = (newCredential: PublicKeyCredential) => {
    const ret = {} as SerializedPublicKeyCredential;

    const response = newCredential.response as AuthenticatorAttestationResponse;

    ret.id = newCredential.id;
    ret.type = newCredential.type;
    ret.response = {
        attestationObject: arrayBufferToWebauthnB64(response.attestationObject),
        clientDataJSON: arrayBufferToWebauthnB64(response.clientDataJSON)
    }

    return ret;
}

/**
 * @ignore
 */
const serializeAssertionToObject = (newAssertion: PublicKeyCredential) => {
    const ret = {} as SerializedAssertion;
    
    const response = newAssertion.response as AuthenticatorAssertionResponse;
    ret.id = newAssertion.id;
    ret.type = newAssertion.type;
    ret.response = {
        authenticatorData: arrayBufferToWebauthnB64(response.authenticatorData),
        signature: arrayBufferToWebauthnB64(response.signature),
        clientDataJSON: arrayBufferToWebauthnB64(response.clientDataJSON),
        userHandle: response.userHandle ? arrayBufferToWebauthnB64(response.userHandle) : null
    }
    
    return ret;
}

/**
 * Middleware used to handle WebAuthn registration/authentication actions, waits for the user to respond to an registration/authentication prompt, and then dispatches the payload containing the new credential (for registration) or assertion (for authentications).
 * @param store 
 */
export const webauthnMiddleware: Middleware = store => next => async (action: ActionType<typeof WebauthnActions>) => {
    switch (action.type) {
        case WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_REQUEST:
            try {
                next(action);
                const credential = await _webauthnCreateCredential(action.payload);
                const serializedCredential = serializeCredentialToObject(credential);
                const credentialSuccessAction = WebauthnActions.webauthnCreateCredentialSuccess(
                    serializedCredential)
                return store.dispatch(credentialSuccessAction);
            } catch (err) {
                return store.dispatch(WebauthnActions.webauthnCreateCredentialFailure(err));
            }
        case WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_REQUEST:
            try {
                next(action);
                const assertion = await _webauthnGetAssertion(action.payload);
                const serializedAssertion = serializeAssertionToObject(assertion);
                return store.dispatch(WebauthnActions.webauthnGetAssertionSuccess(serializedAssertion));
            } catch (err) {
                return store.dispatch(WebauthnActions.webauthnGetAssertionFailure(err));
            }
    }

    return next(action);
}