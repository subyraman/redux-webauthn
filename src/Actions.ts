import { action } from "typesafe-actions";
import { WebauthnActionTypes } from "./Constants";
import { SerializedPublicKeyCredential, SerializedAssertion } from "./Types";

export const webauthnCreateCredentialRequest = (publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions) => (
    action(WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_REQUEST, publicKeyCredentialCreationOptions)
)

export const webauthnCreateCredentialSuccess = (serializedCredential: SerializedPublicKeyCredential) => (
    action(WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_SUCCESS, serializedCredential)
);

export const webauthnCreateCredentialFailure = (error: Error) => (
    action(WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_FAILURE, error)
);


export const webauthnGetAssertionRequest = (publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions) => (
    action(WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_REQUEST, publicKeyCredentialRequestOptions)
);

export const webauthnGetAssertionFailure = (error: Error) => (
    action(WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_FAILURE, error)
);

export const webauthnGetAssertionSuccess = (assertion: SerializedAssertion) => (
   action(WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_SUCCESS, assertion)
)
