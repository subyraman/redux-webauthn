import { WebauthnActionTypes } from "./Constants";
import { SerializedPublicKeyCredential, SerializedAssertion } from "./Types";
/**
 * Action function to be called during registration, to create a credential. Dispatches the `WEBAUTHN_CREATE_CREDENTIAL_REQUEST`
 * action, which will result in the `webauthnMiddleware` to call `navigator.credentials.create`, the native API for creating
 * a credential.
 *
 * If a credential is successfully created, the `WEBAUTHN_CREDENTIAL_CREATE_SUCCESS` action type will be dispatched onto the store,
 * with the new `PublicKeyCredential` as payload.
 *
 * If not successful, the `WEBAUTHN_CREDENTIAL_CREATE_FAILURE` action will be dispatched.
 * @param publicKeyCredentialCreationOptions
 */
export declare const webauthnCreateCredentialRequest: (publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions) => {
    type: WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_REQUEST;
    payload: PublicKeyCredentialCreationOptions;
};
/**
 * Action function called after a new credential has been successfully created after a user
 * confirms a registratration. Note that the `ArrayBuffer` items in the assertion are automatically
 * converted in to url-safe base64 strings, without padding.
 */
export declare const webauthnCreateCredentialSuccess: (serializedCredential: SerializedPublicKeyCredential) => {
    type: WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_SUCCESS;
    payload: SerializedPublicKeyCredential;
};
/**
 * Action function called after a failure in creating a new credential.
 */
export declare const webauthnCreateCredentialFailure: (error: Error) => {
    type: WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_FAILURE;
    payload: Error;
};
/**
 * Action function to be called during authentication, to create an authentication assertion, which is used to prove an identity of a user.
 * Dispatches the `WEBAUTHN_GET_ASSERTION_REQUEST` action, which will result in the `webauthnMiddleware`
 * to call `navigator.credentials.get`, the native API for creating an assertion.
 *
 * If a credential is successfully created, the `WEBAUTHN_GET_ASSERTION_SUCCESS` action type will be dispatched onto the store,
 * with the new `PublicKeyCredential` as payload.
 *
 * If not successful, the `WEBAUTHN_GET_ASSERTION_FAILURE` action will be dispatched.
 * @param publicKeyCredentialCreationOptions
 */
export declare const webauthnGetAssertionRequest: (publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions) => {
    type: WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_REQUEST;
    payload: PublicKeyCredentialRequestOptions;
};
/**
 * Action function called after a failure in creating an assertion.
 */
export declare const webauthnGetAssertionFailure: (error: Error) => {
    type: WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_FAILURE;
    payload: Error;
};
/**
 * Action function called after an assertion has been successfully created after a user
 * confirms an authentication. Note that the `ArrayBuffer` items in the assertion are automatically
 * converted in to url-safe base64 strings, without padding.
 */
export declare const webauthnGetAssertionSuccess: (assertion: SerializedAssertion) => {
    type: WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_SUCCESS;
    payload: SerializedAssertion;
};
