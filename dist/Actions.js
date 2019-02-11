"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typesafe_actions_1 = require("typesafe-actions");
const Constants_1 = require("./Constants");
exports.webauthnCreateCredentialRequest = (publicKeyCredentialCreationOptions) => (typesafe_actions_1.action(Constants_1.WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_REQUEST, publicKeyCredentialCreationOptions));
exports.webauthnCreateCredentialSuccess = (serializedCredential) => (typesafe_actions_1.action(Constants_1.WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_SUCCESS, serializedCredential));
exports.webauthnCreateCredentialFailure = (error) => (typesafe_actions_1.action(Constants_1.WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_FAILURE, error));
exports.webauthnGetAssertionRequest = (publicKeyCredentialRequestOptions) => (typesafe_actions_1.action(Constants_1.WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_REQUEST, publicKeyCredentialRequestOptions));
exports.webauthnGetAssertionFailure = (error) => (typesafe_actions_1.action(Constants_1.WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_FAILURE, error));
exports.webauthnGetAssertionSuccess = (assertion) => (typesafe_actions_1.action(Constants_1.WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_SUCCESS, assertion));
//# sourceMappingURL=Actions.js.map