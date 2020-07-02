"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webauthnMiddleware = exports._webauthnGetAssertion = exports.webauthnReducer = exports.arrayBufferToWebauthnB64 = exports.webauthnB64ToArrayBuffer = exports.WebauthnActionTypes = exports.WebauthnActions = void 0;
const Constants_1 = require("./Constants");
Object.defineProperty(exports, "WebauthnActionTypes", { enumerable: true, get: function () { return Constants_1.WebauthnActionTypes; } });
const WebauthnActions = require("./Actions");
exports.WebauthnActions = WebauthnActions;
const Utils_1 = require("./Utils");
Object.defineProperty(exports, "arrayBufferToWebauthnB64", { enumerable: true, get: function () { return Utils_1.arrayBufferToWebauthnB64; } });
Object.defineProperty(exports, "webauthnB64ToArrayBuffer", { enumerable: true, get: function () { return Utils_1.webauthnB64ToArrayBuffer; } });
const Reducer_1 = require("./Reducer");
Object.defineProperty(exports, "webauthnReducer", { enumerable: true, get: function () { return Reducer_1.webauthnReducer; } });
/**
 * @ignore
 */
const _webauthnCreateCredential = async (publicKeyCredentialCreationOptions) => {
    if (!navigator.credentials) {
        throw new Error("WebAuthn unsupported by browser");
    }
    const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions
    });
    return credential;
};
/**
 * @ignore
 */
exports._webauthnGetAssertion = async (publicKeyCredentialRequestOptions) => {
    if (!navigator.credentials) {
        throw new Error("WebAuthn unsupported by browser");
    }
    const assertion = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions
    });
    return assertion;
};
/**
 * @ignore
 */
const serializeCredentialToObject = (newCredential) => {
    const ret = {};
    const response = newCredential.response;
    ret.id = newCredential.id;
    ret.type = newCredential.type;
    ret.response = {
        attestationObject: Utils_1.arrayBufferToWebauthnB64(response.attestationObject),
        clientDataJSON: Utils_1.arrayBufferToWebauthnB64(response.clientDataJSON)
    };
    return ret;
};
/**
 * @ignore
 */
const serializeAssertionToObject = (newAssertion) => {
    const ret = {};
    const response = newAssertion.response;
    ret.id = newAssertion.id;
    ret.type = newAssertion.type;
    ret.response = {
        authenticatorData: Utils_1.arrayBufferToWebauthnB64(response.authenticatorData),
        signature: Utils_1.arrayBufferToWebauthnB64(response.signature),
        clientDataJSON: Utils_1.arrayBufferToWebauthnB64(response.clientDataJSON),
        userHandle: response.userHandle ? Utils_1.arrayBufferToWebauthnB64(response.userHandle) : null
    };
    return ret;
};
/**
 * Middleware used to handle WebAuthn registration/authentication actions, waits for the user to respond to an registration/authentication prompt, and then dispatches the payload containing the new credential (for registration) or assertion (for authentications).
 * @param store
 */
exports.webauthnMiddleware = store => next => async (action) => {
    switch (action.type) {
        case Constants_1.WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_REQUEST:
            try {
                next(action);
                const credential = await _webauthnCreateCredential(action.payload);
                const serializedCredential = serializeCredentialToObject(credential);
                const credentialSuccessAction = WebauthnActions.webauthnCreateCredentialSuccess(serializedCredential);
                return store.dispatch(credentialSuccessAction);
            }
            catch (err) {
                return store.dispatch(WebauthnActions.webauthnCreateCredentialFailure(err));
            }
        case Constants_1.WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_REQUEST:
            try {
                next(action);
                const assertion = await exports._webauthnGetAssertion(action.payload);
                const serializedAssertion = serializeAssertionToObject(assertion);
                return store.dispatch(WebauthnActions.webauthnGetAssertionSuccess(serializedAssertion));
            }
            catch (err) {
                return store.dispatch(WebauthnActions.webauthnGetAssertionFailure(err));
            }
    }
    return next(action);
};
//# sourceMappingURL=index.js.map