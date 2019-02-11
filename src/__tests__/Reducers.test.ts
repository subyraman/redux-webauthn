import { createStore, combineReducers } from "redux";
import { webauthnReducer } from "../Reducer";
import { WebauthnActions } from "..";
import { SerializedPublicKeyCredential, WebauthnState, SerializedAssertion } from "../Types";

const reducers = combineReducers({
    'webauthn': webauthnReducer
})

const serializedCredential: SerializedPublicKeyCredential = {
    id: 'id',
    type: 'public-key',
    response: {
        attestationObject: 'att',
        clientDataJSON: 'json'
    }
}

const serializedAssertion: SerializedAssertion = {
    id: 'id',
    type: 'public-key',
    response: {
        userHandle: null,
        signature: 'signature',
        clientDataJSON: 'json',
        authenticatorData: 'authdata'
    }
}

test('create credential success', () => {
    const store = createStore(reducers)
    const action = WebauthnActions.webauthnCreateCredentialSuccess(
        serializedCredential);
    store.dispatch(action);
    const state = store.getState();
    if ('newCredential' in state.webauthn) {
        expect(state.webauthn.newCredential).toEqual(serializedCredential);
    } else {
        expect.assertions(1);
    }
})

test('create credential error', () => {
    const store = createStore(reducers)
    const firstAction = WebauthnActions.webauthnCreateCredentialSuccess(
        serializedCredential);
    store.dispatch(firstAction);
    
    const secondAction = WebauthnActions.webauthnCreateCredentialFailure(
        new Error('Yarr matey'))
    store.dispatch(secondAction);
    const state = store.getState();
    expect(state.webauthn.createCredentialError).toBe('Error: Yarr matey');
    expect('newCredential' in state.webauthn).toBeFalsy();
})

test('get assertion success', () => {
    const store = createStore(reducers)
    const action = WebauthnActions.webauthnGetAssertionSuccess(
        serializedAssertion);
    
    store.dispatch(action);
    const state = store.getState();
    if ('newAssertion' in state.webauthn) {
        expect(state.webauthn.newAssertion).toEqual(serializedAssertion)
    } else {
        expect.assertions(1);
    }
});

test('get assertion failure', () => {
    const store = createStore(reducers)
    const firstAction = WebauthnActions.webauthnGetAssertionSuccess(
        serializedAssertion);
    
    store.dispatch(firstAction);
    const secondAction = WebauthnActions.webauthnGetAssertionFailure(
        new Error('Yarr matey'))
    store.dispatch(secondAction);
    const state = store.getState();
    
    if ('getCredentialError' in state.webauthn) {
        expect(state.webauthn.getCredentialError).toEqual('Error: Yarr matey')
    } else {
        expect.assertions(1);
    }

    expect('newAssertion' in state.webauthn).toBeFalsy()
});