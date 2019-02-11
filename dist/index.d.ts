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
export declare const _webauthnGetAssertion: (publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions) => Promise<PublicKeyCredential>;
export declare const webauthnMiddleware: Middleware;
