import { webauthnMiddleware, WebauthnActions, webauthnB64ToArrayBuffer, WebauthnActionTypes } from "../Index";
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore([webauthnMiddleware]);

interface TestNavigator {
    credentials: {
        create: jest.Mock,
        get: jest.Mock
    }
}

interface TestGlobal extends NodeJS.Global {
    navigator: TestNavigator
}

declare const global: TestGlobal;

let credentialCreationOptions: PublicKeyCredentialCreationOptions;
let newCredential: PublicKeyCredential;
let credentialRequestOptions: PublicKeyCredentialRequestOptions;
let newAssertion: PublicKeyCredential;

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
    }

    const attestationResponse: AuthenticatorAttestationResponse = {
        attestationObject: webauthnB64ToArrayBuffer('atthdkfjsdfsdf=='),
        clientDataJSON: webauthnB64ToArrayBuffer('jsondkfjsdfsdf==')
    }

    credentialRequestOptions = {
        challenge: new ArrayBuffer(32)
    }

    const assertionResponse: AuthenticatorAssertionResponse = {
        signature: webauthnB64ToArrayBuffer('sighdkfjsdfsdf=='),
        clientDataJSON: webauthnB64ToArrayBuffer('jsondkfjsdfsdf=='),
        authenticatorData: webauthnB64ToArrayBuffer('atthdkfjsdfsdf=='),
        userHandle: null
    }

    


    const extensionResults: AuthenticationExtensionsClientOutputs = {}

    newCredential = {
        id: 'fjshdkfjsdfsdf==',
        rawId: webauthnB64ToArrayBuffer('fjshdkfjsdfsdf=='),
        response: attestationResponse,
        type: 'public-key',
        getClientExtensionResults: () => extensionResults
    }

    newAssertion = {
        id: 'fjshdkfjsdfsdf==',
        rawId: webauthnB64ToArrayBuffer('fjshdkfjsdfsdf=='),
        type: 'public-key',
        response: assertionResponse,
        getClientExtensionResults: () => extensionResults
    }

    global.navigator.credentials = {
        create: jest.fn(),
        get: jest.fn()
    }
}); 

test('successfully creating a credential', async () => {
    const store = mockStore();
    global.navigator.credentials.create.mockResolvedValue(newCredential);

    const action = WebauthnActions.webauthnCreateCredentialRequest(
        credentialCreationOptions)

    await store.dispatch(action);
    const dispatchedActions = store.getActions();
    expect(dispatchedActions).toHaveLength(2);
    
    const [firstAction, secondAction] = dispatchedActions;
    const {type: firstActionType, payload: firstPayload} = firstAction;

    const [createCallArgs] = global.navigator.credentials.create.mock.calls[0];
    expect(createCallArgs).toEqual({publicKey: credentialCreationOptions})
    
    expect(firstActionType).toBe(WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_REQUEST);
    expect(firstPayload).toBe(credentialCreationOptions);

    const {type: secondActionType, payload: secondPayload} = secondAction;

    expect(secondActionType).toBe(WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_SUCCESS)
    expect(secondPayload.id).toBe(newCredential.id),
    expect(secondPayload.response.attestationObject).toBe('atthdkfjsdfsdQ')
    expect(secondPayload.response.clientDataJSON).toBe('jsondkfjsdfsdQ')
    expect(secondPayload.type).toBe('public-key')
});

test('credential creation error', async () => {
    const store = mockStore();
    global.navigator.credentials.create.mockRejectedValue(new Error('Epic fail detected'));

    const action = WebauthnActions.webauthnCreateCredentialRequest(
        credentialCreationOptions)

    await store.dispatch(action);
    const {type, payload} = store.getActions()[1];

    expect(type).toBe(WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_FAILURE)
    expect(payload.toString()).toBe('Error: Epic fail detected')
})

test('getting assertion success', async () => {
    const store = mockStore();
    global.navigator.credentials.get.mockResolvedValue(newAssertion);

    const action = WebauthnActions.webauthnGetAssertionRequest(
        credentialRequestOptions)

    await store.dispatch(action)
    const dispatchedActions = store.getActions();

    expect(dispatchedActions).toHaveLength(2);
    
    const [firstAction, secondAction] = dispatchedActions;
    const {type: firstActionType, payload: firstPayload} = firstAction;

    const [createCallArgs] = global.navigator.credentials.get.mock.calls[0];
    expect(createCallArgs).toEqual({publicKey: credentialRequestOptions})
    
    expect(firstActionType).toBe(WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_REQUEST);
    expect(firstPayload).toBe(credentialRequestOptions);

    const {type: secondActionType, payload: secondPayload} = secondAction;
    expect(secondActionType).toBe(WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_SUCCESS)

    expect(secondPayload.id).toBe(newCredential.id),
    expect(secondPayload.response.authenticatorData).toBe('atthdkfjsdfsdQ')
    expect(secondPayload.response.clientDataJSON).toBe('jsondkfjsdfsdQ')
    expect(secondPayload.response.signature).toBe('sighdkfjsdfsdQ')
});

test('credential creation error', async () => {
    const store = mockStore();
    global.navigator.credentials.get.mockRejectedValue(new Error('Epic fail detected'));

    const action = WebauthnActions.webauthnGetAssertionRequest(credentialRequestOptions)

    await store.dispatch(action);
    const {type, payload} = store.getActions()[1];

    expect(type).toBe(WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_FAILURE)
    expect(payload.toString()).toBe('Error: Epic fail detected')
});



