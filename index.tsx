import "webappsec-credential-management"
import { Dispatch, Middleware, ActionCreator } from "redux";

enum WebauthnActionTypes {
    WEBAUTHN_REGISTER_REQUEST = 'WEBAUTHN_REGISTER_REQUEST',
    WEBAUTHN_REGISTER_SUCCESS = 'WEBAUTHN_REGISTER_SUCCESS',
    WEBAUTHN_REGISTER_FAILURE = 'WEBAUTHN_REGISTER_FAILURE',
    WEBAUTHN_AUTH_REQUEST = 'WEBAUTHN_AUTH_REQUEST',
    WEBAUTHN_AUTH_SUCCESS = 'WEBAUTHN_AUTH_SUCCESS',
    WEBAUTHN_AUTH_FAILURE = 'WEBAUTHN_AUTH_FAILURE'
}


export const webauthnRegisterRequest = (publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions) => ({
    type: WebauthnActionTypes.WEBAUTHN_REGISTER_REQUEST,
    data: publicKeyCredentialCreationOptions
})

const webauthnRegisterSuccess = (newCredential: PublicKeyCredential) => ({
        type: WebauthnActionTypes.WEBAUTHN_REGISTER_SUCCESS,
        data: newCredential
});

const webauthnRegisterFailure = (error: Error) => ({
    type: WebauthnActionTypes.WEBAUTHN_REGISTER_FAILURE,
    data: error
})


const webauthnRegisterCeremony = async (publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions) => {
    if (!navigator.credentials) {
        throw new Error("WebAuthn unsupported by browser");
    }


    const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions}) as PublicKeyCredential;
    return credential;
}

export const webauthnAuthRequest = (publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions) => ({
    type: WebauthnActionTypes.WEBAUTHN_AUTH_REQUEST,
    data: publicKeyCredentialRequestOptions
});

const webauthnAuthFailure = (error: Error) => ({
    type: WebauthnActionTypes.WEBAUTHN_AUTH_FAILURE,
    data: error
});

const webauthnAuthSuccess = (assertion: PublicKeyCredential) => ({
   type: WebauthnActionTypes.WEBAUTHN_AUTH_REQUEST,
   data: assertion 
})

export const webauthnAuthCeremony = async (publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions) => {
    if (!navigator.credentials) {
        throw new Error("WebAuthn unsupported by browser");
    }

    const assertion = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions}) as PublicKeyCredential;
    return assertion;
}



export const webauthnMiddleware: Middleware = store => next => async (action) => {
    switch (action.type) {
        case "WEBAUTHN_REGISTER_REQUEST":
            try {
                const credential = await webauthnRegisterCeremony(action.data);
                webauthnRegisterSuccess(credential);
            } catch (err) {
                webauthnRegisterFailure(err);
            }
            break;
        case WebauthnActionTypes.WEBAUTHN_AUTH_REQUEST:
            try {
                const assertion = await webauthnAuthCeremony(action.data);
                webauthnAuthSuccess(assertion);
            } catch (err) {
                webauthnAuthFailure(err);
            }
            break;
    }

    return next(action);
}

export type WebauthnActions = (
    ReturnType<typeof webauthnRegisterRequest> |
    ReturnType<typeof webauthnRegisterSuccess>  |
    ReturnType<typeof webauthnRegisterFailure> |
    ReturnType<typeof webauthnAuthRequest> |
    ReturnType<typeof webauthnAuthSuccess>  |
    ReturnType<typeof webauthnAuthFailure>
)