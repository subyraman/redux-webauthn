# Redux-Webauthn Demo Project

This repo provides a full example of registering and authenticating a user using WebAuthn (also known as FIDO2), the browser API that allows applications to authenticate their users using public key cryptography by integrating with Touch ID, Yubikeys, Windows Hello and more.

This example demo uses redux-webauthn, React, and Typescript. A live display of data being passed through the application is provided using the Redux devtools.

The server-side component uses py_webauthn, the Python WebAuthn library created by Duo Labs.

## If you don't understand what Web Authentication is, check Webauthn.Guide!

### Manual installation:

Install and build the frontend components:

```
yarn install
yarn watch
```

In another terminal tab, install the Python dependencies and run the server application.

```
cd server
pip install --user -r requirements.txt 
python app.py
```

Now visit http://localhost:5000/ for the demo.

### Installation with Docker:

An easy way to set up the project is with docker:

Installation: `docker build . -t react-webauthn:latest`
Running: `docker run -p 5000:5000 -t react-webauthn:latest`

### Understanding:

This demo provides a full example of the server-client data flow for WebAuthn; I strongly recommend keeping the Network tab open in your developer tools to better understand the data being passed back and forth.



