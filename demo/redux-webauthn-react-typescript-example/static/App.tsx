import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Container } from 'reactstrap';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import { applyMiddleware, compose, createStore } from 'redux';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import { webauthnMiddleware } from "redux-webauthn";
import './App.css';
import Authentication from './Authentication';
import { fetchMiddleware } from './Middleware';
import { reducers } from './Reducers';
import Registration from './Registration';




const DevTools = createDevTools(
    <LogMonitor />
);


const enhancer = compose(
    applyMiddleware(fetchMiddleware, webauthnMiddleware),
    DevTools.instrument())

const store = createStore(reducers, {}, enhancer);



function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <Container fluid={true} className="p-3">
                    <Row className="mb-4 border-bottom">
                        <Col xs="12">
                            <h1>Redux-WebAuthn Demo</h1>
                            <p>A demonstration of registering and authentication a user, using the Web Authentication API and <a href="https://github.com/subyraman/redux-webauthn">redux-webauthn.</a></p>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col md={{size: 4, offset: 1}} >
                            <div className="mb-4">
                                <Registration />
                            </div>
                            <Authentication />
                        </Col>
                        <Col md={{size: 5, offset: 1}}>
                            <DevTools />
                        </Col>
                    </Row>
                </Container>
            </div>
        </Provider>
    );
}


export {store, enhancer};
export default App;
