import { fireEvent, render } from '@testing-library/react';
import * as fetchMock from "fetch-mock";
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { enhancer } from './App';
import { reducers } from './Reducers';
import Registration from './Registration';


let MockRegister: null | React.FC = null;

beforeEach(() => {
    
    const store = createStore(reducers, {}, enhancer);
    MockRegister = () => {
        return (
            <Provider store={store}>
                <Registration />
            </Provider>
        );
    };
});

afterEach(() => {
    fetchMock.restore();
})

it("should show submit button disabled initially", () => {
    const MockComponent = MockRegister as React.FC;
    const {getByTestId} = render(<MockComponent />)
    const button = getByTestId("button") as HTMLButtonElement;
    expect(button.disabled).toBeTruthy()
});

it("should show enable submit button after inputs filled out", () => {
    const MockComponent = MockRegister as React.FC;
    const {getByTestId} = render(<MockComponent />)

    fireEvent.change(getByTestId("username"), {target: {value: "test-username"}});
    fireEvent.change(getByTestId("display-name"), {target: {value: "test-displayname"}});

    const button = getByTestId("button") as HTMLButtonElement;
    expect(button.disabled).toBeFalsy();
});

it("should fetch registration data after click", async () => {
    fetchMock.mock(/webauthn/, new Promise(() => {}));

    const MockComponent = MockRegister as React.FC;
    const {getByTestId} = render(<MockComponent />)

    fireEvent.change(getByTestId("username"), {target: {value: "test-username"}});
    fireEvent.change(getByTestId("display-name"), {target: {value: "test-displayname"}});

    fireEvent.click(getByTestId("button"));
    
    if (!fetchMock.lastCall()) {
        throw "No call to backend.";
    }
})