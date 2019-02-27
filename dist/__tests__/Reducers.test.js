"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const Reducer_1 = require("../Reducer");
const Index_1 = require("../Index");
const reducers = redux_1.combineReducers({
    'webauthn': Reducer_1.webauthnReducer
});
const serializedCredential = {
    id: 'id',
    type: 'public-key',
    response: {
        attestationObject: 'att',
        clientDataJSON: 'json'
    }
};
const serializedAssertion = {
    id: 'id',
    type: 'public-key',
    response: {
        userHandle: null,
        signature: 'signature',
        clientDataJSON: 'json',
        authenticatorData: 'authdata'
    }
};
test('create credential success', () => {
    const store = redux_1.createStore(reducers);
    const action = Index_1.WebauthnActions.webauthnCreateCredentialSuccess(serializedCredential);
    store.dispatch(action);
    const state = store.getState();
    if ('newCredential' in state.webauthn) {
        expect(state.webauthn.newCredential).toEqual(serializedCredential);
    }
    else {
        expect.assertions(1);
    }
});
test('create credential error', () => {
    const store = redux_1.createStore(reducers);
    const firstAction = Index_1.WebauthnActions.webauthnCreateCredentialSuccess(serializedCredential);
    store.dispatch(firstAction);
    const secondAction = Index_1.WebauthnActions.webauthnCreateCredentialFailure(new Error('Yarr matey'));
    store.dispatch(secondAction);
    const state = store.getState();
    expect(state.webauthn.createCredentialError).toBe('Error: Yarr matey');
    expect('newCredential' in state.webauthn).toBeFalsy();
});
test('get assertion success', () => {
    const store = redux_1.createStore(reducers);
    const action = Index_1.WebauthnActions.webauthnGetAssertionSuccess(serializedAssertion);
    store.dispatch(action);
    const state = store.getState();
    if ('newAssertion' in state.webauthn) {
        expect(state.webauthn.newAssertion).toEqual(serializedAssertion);
    }
    else {
        expect.assertions(1);
    }
});
test('get assertion failure', () => {
    const store = redux_1.createStore(reducers);
    const firstAction = Index_1.WebauthnActions.webauthnGetAssertionSuccess(serializedAssertion);
    store.dispatch(firstAction);
    const secondAction = Index_1.WebauthnActions.webauthnGetAssertionFailure(new Error('Yarr matey'));
    store.dispatch(secondAction);
    const state = store.getState();
    if ('getAssertionError' in state.webauthn) {
        expect(state.webauthn.getAssertionError).toEqual('Error: Yarr matey');
    }
    else {
        expect.assertions(1);
    }
    expect('newAssertion' in state.webauthn).toBeFalsy();
});
//# sourceMappingURL=Reducers.test.js.map