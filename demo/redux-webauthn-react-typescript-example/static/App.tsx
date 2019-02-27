import * as React from 'react';
import { applyMiddleware, compose, createStore } from 'redux';
import { createDevTools } from 'redux-devtools';
// @ts-ignore
import Inspector from 'redux-devtools-inspector';
import {webauthnMiddleware} from "redux-webauthn";


import { Provider } from 'react-redux';



import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {Container} from 'reactstrap';

import Authentication from './Authentication';
import Registration from './Registration';
import Col from 'reactstrap/lib/Col'
import Row from 'reactstrap/lib/Row';
import { fetchMiddleware } from './Middleware';
import { reducers } from './Reducers';

const DevTools = createDevTools(
  <Inspector />
);



const enhancer = compose(
    applyMiddleware(fetchMiddleware, webauthnMiddleware),
    DevTools.instrument()
)

const store = createStore(reducers, {}, enhancer);



class App extends React.Component {
  public render() {
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
              <Col md="4">
                <div className="mb-4">
                  <Registration />
                </div>
                <Authentication />
              </Col>
              <Col md="8">
                <DevTools />
              </Col>
            </Row>
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
