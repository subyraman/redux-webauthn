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
const __1 = require("..");
const redux_mock_store_1 = require("redux-mock-store");
const mockStore = redux_mock_store_1.default([__1.webauthnMiddleware]);
let credentialCreationOptions;
let newCredential;
let credentialRequestOptions;
let newAssertion;
beforeEach(() => {
    credentialCreationOptions = {
        challenge: new ArrayBuffer(32),
        rp: {
            id: "redux-webauthn.com",
            name: "Redux Webauthn",
        },
        user: {
            id: new ArrayBuffer(32),
            name: "subyraman",
            displayName: "Suby Raman"
        },
        pubKeyCredParams: []
    };
    newCredential = {
        id: 'fjshdkfjsdfsdf==',
        rawId: __1.webauthnB64ToArrayBuffer('fjshdkfjsdfsdf=='),
        response: {
            attestationObject: __1.webauthnB64ToArrayBuffer('atthdkfjsdfsdf=='),
            clientDataJSON: __1.webauthnB64ToArrayBuffer('jsondkfjsdfsdf==')
        },
        type: 'public-key'
    };
    credentialRequestOptions = {
        challenge: new ArrayBuffer(32)
    };
    newAssertion = {
        id: 'fjshdkfjsdfsdf==',
        rawId: __1.webauthnB64ToArrayBuffer('fjshdkfjsdfsdf=='),
        type: 'public-key',
        response: {
            signature: __1.webauthnB64ToArrayBuffer('sighdkfjsdfsdf=='),
            clientDataJSON: __1.webauthnB64ToArrayBuffer('jsondkfjsdfsdf=='),
            authenticatorData: __1.webauthnB64ToArrayBuffer('atthdkfjsdfsdf=='),
            userHandle: null
        }
    };
    global.navigator.credentials = {
        create: jest.fn(),
        get: jest.fn()
    };
});
test('successfully creating a credential', () => __awaiter(this, void 0, void 0, function* () {
    const store = mockStore();
    global.navigator.credentials.create.mockResolvedValue(newCredential);
    const action = __1.WebauthnActions.webauthnCreateCredentialRequest(credentialCreationOptions);
    yield store.dispatch(action);
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toHaveLength(2);
    const [firstAction, secondAction] = dispatchedActions;
    const { type: firstActionType, payload: firstPayload } = firstAction;
    const [createCallArgs] = global.navigator.credentials.create.mock.calls[0];
    expect(createCallArgs).toEqual({ publicKey: credentialCreationOptions });
    expect(firstActionType).toBe(__1.WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_REQUEST);
    expect(firstPayload).toBe(credentialCreationOptions);
    const { type: secondActionType, payload: secondPayload } = secondAction;
    expect(secondActionType).toBe(__1.WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_SUCCESS);
    expect(secondPayload.id).toBe(newCredential.id),
        expect(secondPayload.response.attestationObject).toBe('atthdkfjsdfsdQ');
    expect(secondPayload.response.clientDataJSON).toBe('jsondkfjsdfsdQ');
    expect(secondPayload.type).toBe('public-key');
}));
test('credential creation error', () => __awaiter(this, void 0, void 0, function* () {
    const store = mockStore();
    global.navigator.credentials.create.mockRejectedValue(new Error('Epic fail detected'));
    const action = __1.WebauthnActions.webauthnCreateCredentialRequest(credentialCreationOptions);
    yield store.dispatch(action);
    const { type, payload } = store.getActions()[1];
    expect(type).toBe(__1.WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_FAILURE);
    expect(payload.toString()).toBe('Error: Epic fail detected');
}));
test('getting assertion success', () => __awaiter(this, void 0, void 0, function* () {
    const store = mockStore();
    global.navigator.credentials.get.mockResolvedValue(newAssertion);
    const action = __1.WebauthnActions.webauthnGetAssertionRequest(credentialRequestOptions);
    yield store.dispatch(action);
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toHaveLength(2);
    const [firstAction, secondAction] = dispatchedActions;
    const { type: firstActionType, payload: firstPayload } = firstAction;
    const [createCallArgs] = global.navigator.credentials.get.mock.calls[0];
    expect(createCallArgs).toEqual({ publicKey: credentialRequestOptions });
    expect(firstActionType).toBe(__1.WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_REQUEST);
    expect(firstPayload).toBe(credentialRequestOptions);
    const { type: secondActionType, payload: secondPayload } = secondAction;
    expect(secondActionType).toBe(__1.WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_SUCCESS);
    expect(secondPayload.id).toBe(newCredential.id),
        expect(secondPayload.response.authenticatorData).toBe('atthdkfjsdfsdQ');
    expect(secondPayload.response.clientDataJSON).toBe('jsondkfjsdfsdQ');
    expect(secondPayload.response.signature).toBe('sighdkfjsdfsdQ');
}));
test('credential creation error', () => __awaiter(this, void 0, void 0, function* () {
    const store = mockStore();
    global.navigator.credentials.get.mockRejectedValue(new Error('Epic fail detected'));
    const action = __1.WebauthnActions.webauthnGetAssertionRequest(credentialRequestOptions);
    yield store.dispatch(action);
    const { type, payload } = store.getActions()[1];
    expect(type).toBe(__1.WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_FAILURE);
    expect(payload.toString()).toBe('Error: Epic fail detected');
}));
//# sourceMappingURL=index.test.js.map