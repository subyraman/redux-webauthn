/// <reference types="webappsec-credential-management" />
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
export declare const webauthnCreateCredentialRequest: (publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions) => import("typesafe-actions/dist/types").PayloadAction<WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_REQUEST, PublicKeyCredentialCreationOptions>;
/**
 * @ignore
 */
export declare const webauthnCreateCredentialSuccess: (serializedCredential: SerializedPublicKeyCredential) => import("typesafe-actions/dist/types").PayloadAction<WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_SUCCESS, SerializedPublicKeyCredential>;
/**
 * @ignore
 */
export declare const webauthnCreateCredentialFailure: (error: Error) => import("typesafe-actions/dist/types").PayloadAction<WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_FAILURE, Error>;
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
export declare const webauthnGetAssertionRequest: (publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions) => import("typesafe-actions/dist/types").PayloadAction<WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_REQUEST, PublicKeyCredentialRequestOptions>;
/**
 * @ignore
 */
export declare const webauthnGetAssertionFailure: (error: Error) => import("typesafe-actions/dist/types").PayloadAction<WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_FAILURE, Error>;
/**
 * @ignore
 */
export declare const webauthnGetAssertionSuccess: (assertion: SerializedAssertion) => import("typesafe-actions/dist/types").PayloadAction<WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_SUCCESS, SerializedAssertion>;
