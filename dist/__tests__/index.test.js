"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Index_1 = require("../Index");
const redux_mock_store_1 = require("redux-mock-store");
const mockStore = redux_mock_store_1.default([Index_1.webauthnMiddleware]);
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
        rawId: Index_1.webauthnB64ToArrayBuffer('fjshdkfjsdfsdf=='),
        response: {
            attestationObject: Index_1.webauthnB64ToArrayBuffer('atthdkfjsdfsdf=='),
            clientDataJSON: Index_1.webauthnB64ToArrayBuffer('jsondkfjsdfsdf==')
        },
        type: 'public-key'
    };
    credentialRequestOptions = {
        challenge: new ArrayBuffer(32)
    };
    newAssertion = {
        id: 'fjshdkfjsdfsdf==',
        rawId: Index_1.webauthnB64ToArrayBuffer('fjshdkfjsdfsdf=='),
        type: 'public-key',
        response: {
            signature: Index_1.webauthnB64ToArrayBuffer('sighdkfjsdfsdf=='),
            clientDataJSON: Index_1.webauthnB64ToArrayBuffer('jsondkfjsdfsdf=='),
            authenticatorData: Index_1.webauthnB64ToArrayBuffer('atthdkfjsdfsdf=='),
            userHandle: null
        }
    };
    global.navigator.credentials = {
        create: jest.fn(),
        get: jest.fn()
    };
});
test('successfully creating a credential', async () => {
    const store = mockStore();
    global.navigator.credentials.create.mockResolvedValue(newCredential);
    const action = Index_1.WebauthnActions.webauthnCreateCredentialRequest(credentialCreationOptions);
    await store.dispatch(action);
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toHaveLength(2);
    const [firstAction, secondAction] = dispatchedActions;
    const { type: firstActionType, payload: firstPayload } = firstAction;
    const [createCallArgs] = global.navigator.credentials.create.mock.calls[0];
    expect(createCallArgs).toEqual({ publicKey: credentialCreationOptions });
    expect(firstActionType).toBe(Index_1.WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_REQUEST);
    expect(firstPayload).toBe(credentialCreationOptions);
    const { type: secondActionType, payload: secondPayload } = secondAction;
    expect(secondActionType).toBe(Index_1.WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_SUCCESS);
    expect(secondPayload.id).toBe(newCredential.id),
        expect(secondPayload.response.attestationObject).toBe('atthdkfjsdfsdQ');
    expect(secondPayload.response.clientDataJSON).toBe('jsondkfjsdfsdQ');
    expect(secondPayload.type).toBe('public-key');
});
test('credential creation error', async () => {
    const store = mockStore();
    global.navigator.credentials.create.mockRejectedValue(new Error('Epic fail detected'));
    const action = Index_1.WebauthnActions.webauthnCreateCredentialRequest(credentialCreationOptions);
    await store.dispatch(action);
    const { type, payload } = store.getActions()[1];
    expect(type).toBe(Index_1.WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_FAILURE);
    expect(payload.toString()).toBe('Error: Epic fail detected');
});
test('getting assertion success', async () => {
    const store = mockStore();
    global.navigator.credentials.get.mockResolvedValue(newAssertion);
    const action = Index_1.WebauthnActions.webauthnGetAssertionRequest(credentialRequestOptions);
    await store.dispatch(action);
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toHaveLength(2);
    const [firstAction, secondAction] = dispatchedActions;
    const { type: firstActionType, payload: firstPayload } = firstAction;
    const [createCallArgs] = global.navigator.credentials.get.mock.calls[0];
    expect(createCallArgs).toEqual({ publicKey: credentialRequestOptions });
    expect(firstActionType).toBe(Index_1.WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_REQUEST);
    expect(firstPayload).toBe(credentialRequestOptions);
    const { type: secondActionType, payload: secondPayload } = secondAction;
    expect(secondActionType).toBe(Index_1.WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_SUCCESS);
    expect(secondPayload.id).toBe(newCredential.id),
        expect(secondPayload.response.authenticatorData).toBe('atthdkfjsdfsdQ');
    expect(secondPayload.response.clientDataJSON).toBe('jsondkfjsdfsdQ');
    expect(secondPayload.response.signature).toBe('sighdkfjsdfsdQ');
});
test('credential creation error', async () => {
    const store = mockStore();
    global.navigator.credentials.get.mockRejectedValue(new Error('Epic fail detected'));
    const action = Index_1.WebauthnActions.webauthnGetAssertionRequest(credentialRequestOptions);
    await store.dispatch(action);
    const { type, payload } = store.getActions()[1];
    expect(type).toBe(Index_1.WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_FAILURE);
    expect(payload.toString()).toBe('Error: Epic fail detected');
});
//# sourceMappingURL=Index.test.js.map