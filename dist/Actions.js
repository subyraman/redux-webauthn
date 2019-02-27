"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typesafe_actions_1 = require("typesafe-actions");
const Constants_1 = require("./Constants");
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
exports.webauthnCreateCredentialRequest = (publicKeyCredentialCreationOptions) => (typesafe_actions_1.action(Constants_1.WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_REQUEST, publicKeyCredentialCreationOptions));
/**
 * @ignore
 */
exports.webauthnCreateCredentialSuccess = (serializedCredential) => (typesafe_actions_1.action(Constants_1.WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_SUCCESS, serializedCredential));
/**
 * @ignore
 */
exports.webauthnCreateCredentialFailure = (error) => (typesafe_actions_1.action(Constants_1.WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_FAILURE, error));
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
exports.webauthnGetAssertionRequest = (publicKeyCredentialRequestOptions) => (typesafe_actions_1.action(Constants_1.WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_REQUEST, publicKeyCredentialRequestOptions));
/**
 * @ignore
 */
exports.webauthnGetAssertionFailure = (error) => (typesafe_actions_1.action(Constants_1.WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_FAILURE, error));
/**
 * @ignore
 */
exports.webauthnGetAssertionSuccess = (assertion) => (typesafe_actions_1.action(Constants_1.WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_SUCCESS, assertion));
//# sourceMappingURL=Actions.js.map