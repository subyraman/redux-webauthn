/// <reference types="webappsec-credential-management" />
import { Middleware } from "redux";
import { WebauthnActionTypes } from "./Constants";
import * as WebauthnActions from "./Actions";
import { arrayBufferToWebauthnB64, webauthnB64ToArrayBuffer } from "./Utils";
import { SerializedPublicKeyCredential, SerializedAssertion, WebauthnState } from "./Types";
import { webauthnReducer } from "./Reducer";
export { WebauthnActions, WebauthnActionTypes };
export { webauthnB64ToArrayBuffer, arrayBufferToWebauthnB64 };
export { webauthnReducer };
export { SerializedPublicKeyCredential, SerializedAssertion, WebauthnState };
/**
 * @ignore
 */
export declare const _webauthnGetAssertion: (publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions) => Promise<PublicKeyCredential>;
/**
 * Middleware used to handle WebAuthn registration/authentication actions, waits for the user to respond to an registration/authentication prompt, and then dispatches the payload containing the new credential (for registration) or assertion (for authentications).
 * @param store
 */
export declare const webauthnMiddleware: Middleware;
