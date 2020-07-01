import { render, fireEvent } from '@testing-library/react';
import * as fetchMock from "fetch-mock";
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { enhancer } from './App';
import Authentication from './Authentication';
import { AppState, reducers } from './Reducers';


const createMockComponent = (state: AppState) => {
    const store = createStore(reducers, state, enhancer);
    const MockComponent = () => (
        <Provider store={store}>
            <Authentication />
        </Provider>
    );

    return {MockComponent, store};
}

beforeEach(() => {
    
});

afterEach(() => {
    fetchMock.restore();
})

it("should render username", () => {

    const {MockComponent} = createMockComponent({
        ui: {
            credentialValidated: true,
            assertionValidated: false,
            username: "suby"
        },
        webauthn: {}
    })
    const {getByTestId} = render(<MockComponent />)
    const h2 = getByTestId("h2");

    expect(h2.textContent).toEqual("Authenticate as user suby:")
});

it("should render success event", () => {

    const {MockComponent} = createMockComponent({
        ui: {
            credentialValidated: true,
            assertionValidated: true,
            username: "suby"
        },
        webauthn: {}
    })
    const {getByTestId} = render(<MockComponent />)
    const successAlert = getByTestId("success-alert");

    expect(successAlert.textContent).toEqual("Logged in!")
});

it("should cause fetch after user click", () => {
    fetchMock.mock(/webauthn/, new Promise(() => {}));
    const {MockComponent} = createMockComponent({
        ui: {
            credentialValidated: true,
            assertionValidated: false,
            username: "suby"
        },
        webauthn: {}
    })
    const {getByTestId} = render(<MockComponent />)
    const button = getByTestId("button");
    
    fireEvent.click(button);
    if (!fetchMock.lastCall()) {
        throw "No call to backend.";
    }
});