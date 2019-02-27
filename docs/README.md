
redux-webauthn
==============

**Redux middleware for registering and authenticating users with the Web Authentication API (FIDO2).**

Unsure what Web Authentication is? New to public key cryptography? Start at Webauthn.Guide!
-------------------------------------------------------------------------------------------

This library provides Redux middleware and a reducer to help integrate Web Authentication into web applications, which will allow your users to authenticate with Touch ID, Windows Hello, Yubikeys, and more. Written in TypeScript for ease of use.

_For security reasons, this library **must** be used in conjunction with a server-side application that is responsible for generating parameters for the Web Authentication API, and the server **must** properly validate registration and authentication objects (credentials and assertions) created by an authenticator._

#### See an example of the client-side UX for the library, or run an example demonstrating the full server-client WebAuthn data flow.

### Quickstart:

Add the middleware and reducer into your Redux store. The reducer is optional, but can help ease the initial integration of WebAuthn into your application.

```
import { applyMiddleware, compose, createStore } from "redux"
import {webauthnMiddleware, webauthnReducer} from "redux-webauthn"

const enhancer = compose(
    applyMiddleware(webauthnMiddleware),
)

const reducers = combineReducers({
    'webauthn': webauthnReducer,
    ...otherReducers
})

const store = createStore(reducers, {}, enhancer)
```

### Registering a user:

When registering a user, a new credential keypair will be created, tied to that user and to your website's origin. See Webauthn.Guide for a deeper explanation.

The `PublicKeyCredentialCreationOptions`, the object used to generate a new keypair, must be created on your server for security reasons, and provided to the client. This library does not have opinions on how you should fetch that data from your server, but the `redux-webauthn-server-example` provides an sample middleware that describes a possible client-server API.

Once that object is retrieved, `redux-webauthn` provides action functions that can be used to execute the appropriate Web Authentication API function.

```
 case RequestActionTypes.GET_CREDENTIAL_CREATION_OPTIONS_REQUEST: {
    next(action);

    const formData = _objectToFormData(action.payload);
    try {
        // request a PublicKeyCredentialCreationOptions object from the server
        const response = await postJSON('/webauthn_begin_activate', formData);

        if (response.fail) {
            throw new Error(response.fail);
        }

        // convert the b64 data from the server into ArrayBuffers for the WebAuthn API
        response.challenge = webauthnB64ToArrayBuffer(response.challenge);
        response.user.id = webauthnB64ToArrayBuffer(response.user.id);
        if (response.allowCredentials) {
            response.allowCredentials = response.allowCredentials.map((credential: any) => {
                return {id: webauthnB64ToArrayBuffer(credential.id), ...credential};
            })
        }

        // Dispatching this action will execute the `navigator.credentials.create` function to create a new credential.
        return store.dispatch(WebauthnActions.webauthnCreateCredentialRequest(response));
    } catch (err) {
        return store.dispatch(WebauthnActions.webauthnCreateCredentialFailure(err))
    }
```

## Index

### External modules

* ["Actions"](modules/_actions_.md)
* ["Constants"](modules/_constants_.md)
* ["Index"](modules/_index_.md)
* ["Reducer"](modules/_reducer_.md)
* ["Types"](modules/_types_.md)
* ["Utils"](modules/_utils_.md)

---

