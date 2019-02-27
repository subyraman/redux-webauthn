"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Constants_1 = require("./Constants");
/**
 * Reducer that can be used to handle actions dispatched from the `webauthnMiddleware` object. Suggested unless you would like to create your own reducer to handle the actions yourself.
 *
 */
function webauthnReducer(state = {}, action) {
    switch (action.type) {
        case (Constants_1.WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_REQUEST):
            return {};
        case (Constants_1.WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_SUCCESS):
            return Object.assign({ newCredential: action.payload }, state);
        case (Constants_1.WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_FAILURE):
            const newState = {
                createCredentialError: action.payload.toString()
            };
            const mergedState = Object.assign({}, newState, state);
            const { newCredential } = mergedState, stateWithoutCredential = __rest(mergedState, ["newCredential"]);
            return stateWithoutCredential;
        case (Constants_1.WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_FAILURE): {
            const newState = { getAssertionError: action.payload.toString() };
            const mergedState = Object.assign({}, newState, state);
            const { newAssertion } = mergedState, stateWithoutAssertion = __rest(mergedState, ["newAssertion"]);
            return stateWithoutAssertion;
        }
        case (Constants_1.WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_SUCCESS): {
            const newState = Object.assign({ newAssertion: action.payload }, state);
            delete newState.getAssertionError;
            return newState;
        }
        default:
            return state;
    }
}
exports.webauthnReducer = webauthnReducer;
//# sourceMappingURL=Reducer.js.map