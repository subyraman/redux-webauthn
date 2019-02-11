/// <reference types="webappsec-credential-management" />
import { WebauthnActionTypes } from "./Constants";
import { SerializedPublicKeyCredential, SerializedAssertion } from "./Types";
export declare const webauthnCreateCredentialRequest: (publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions) => import("typesafe-actions/dist/types").PayloadAction<WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_REQUEST, PublicKeyCredentialCreationOptions>;
export declare const webauthnCreateCredentialSuccess: (serializedCredential: SerializedPublicKeyCredential) => import("typesafe-actions/dist/types").PayloadAction<WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_SUCCESS, SerializedPublicKeyCredential>;
export declare const webauthnCreateCredentialFailure: (error: Error) => import("typesafe-actions/dist/types").PayloadAction<WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_FAILURE, Error>;
export declare const webauthnGetAssertionRequest: (publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions) => import("typesafe-actions/dist/types").PayloadAction<WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_REQUEST, PublicKeyCredentialRequestOptions>;
export declare const webauthnGetAssertionFailure: (error: Error) => import("typesafe-actions/dist/types").PayloadAction<WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_FAILURE, Error>;
export declare const webauthnGetAssertionSuccess: (assertion: SerializedAssertion) => import("typesafe-actions/dist/types").PayloadAction<WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_SUCCESS, SerializedAssertion>;
