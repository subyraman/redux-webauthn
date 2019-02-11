"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("./Constants");
exports.WebauthnActionTypes = Constants_1.WebauthnActionTypes;
const WebauthnActions = require("./Actions");
exports.WebauthnActions = WebauthnActions;
const Utils_1 = require("./Utils");
exports.arrayBufferToWebauthnB64 = Utils_1.arrayBufferToWebauthnB64;
exports.webauthnB64ToArrayBuffer = Utils_1.webauthnB64ToArrayBuffer;
const Reducer_1 = require("./Reducer");
exports.webauthnReducer = Reducer_1.webauthnReducer;
const _webauthnCreateCredential = (publicKeyCredentialCreationOptions) => __awaiter(this, void 0, void 0, function* () {
    if (!navigator.credentials) {
        throw new Error("WebAuthn unsupported by browser");
    }
    const credential = yield navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions
    });
    return credential;
});
exports._webauthnGetAssertion = (publicKeyCredentialRequestOptions) => __awaiter(this, void 0, void 0, function* () {
    if (!navigator.credentials) {
        throw new Error("WebAuthn unsupported by browser");
    }
    const assertion = yield navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions
    });
    return assertion;
});
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
exports.webauthnMiddleware = store => next => (action) => __awaiter(this, void 0, void 0, function* () {
    switch (action.type) {
        case Constants_1.WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_REQUEST:
            try {
                next(action);
                const credential = yield _webauthnCreateCredential(action.payload);
                const serializedCredential = serializeCredentialToObject(credential);
                const credentialSuccessAction = WebauthnActions.webauthnCreateCredentialSuccess(serializedCredential);
                return next(credentialSuccessAction);
            }
            catch (err) {
                return next(WebauthnActions.webauthnCreateCredentialFailure(err));
            }
        case Constants_1.WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_REQUEST:
            try {
                next(action);
                const assertion = yield exports._webauthnGetAssertion(action.payload);
                const serializedAssertion = serializeAssertionToObject(assertion);
                return next(WebauthnActions.webauthnGetAssertionSuccess(serializedAssertion));
            }
            catch (err) {
                return next(WebauthnActions.webauthnGetAssertionFailure(err));
            }
    }
    return next(action);
});
//# sourceMappingURL=index.js.map