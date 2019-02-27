import { Middleware } from 'redux';
import { WebauthnActions, webauthnB64ToArrayBuffer, WebauthnActionTypes } from 'redux-webauthn';

import * as ExampleAppActions from './Actions';
import { RequestActionTypes } from './Contants';
import { AppActions } from './Types';

const _objectToFormData = (obj: Object) => {
    const formData = new FormData()
    Object.entries(obj).forEach(([key, value]) => formData.set(key, value));

    return formData;
}

function hexEncode(buf: ArrayBuffer) {
    return (
         // @ts-ignore
         Array.from(buf).map((x: any) => {
                return ("0" + x.toString(16)).substr(-2);
            })
            .join("")
    )
}

const postJSON = async (url: string, formData: FormData | undefined) => {
    const response = await fetch(url, {
        body: formData,
        method: 'POST'
    });
    const json = await response.json();
    return json
}
 
export const fetchMiddleware: Middleware = store => next => async (action: AppActions) => {
    switch (action.type) {
        case RequestActionTypes.GET_CREDENTIAL_CREATION_OPTIONS_REQUEST: {
            next(action);

            const formData = _objectToFormData(action.payload);
            try {
                const response = await postJSON('/webauthn_begin_activate', formData) as any;

                if (response.fail) {
                    throw new Error(response.fail);
                }
                
                response.challenge = webauthnB64ToArrayBuffer(response.challenge);
                response.user.id = webauthnB64ToArrayBuffer(response.user.id);
                if (response.allowCredentials) {
                    response.allowCredentials = response.allowCredentials.map((credential: any) => {
                        return {id: webauthnB64ToArrayBuffer(credential.id), ...credential};
                    })
                }
                
                return store.dispatch(WebauthnActions.webauthnCreateCredentialRequest(response));
            } catch (err) {
                return store.dispatch(WebauthnActions.webauthnCreateCredentialFailure(err))
            }
        }
        case WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_SUCCESS: {
            next(action);
            return store.dispatch(ExampleAppActions.validateNewCredential(action.payload));
        }
        case RequestActionTypes.VALIDATE_NEW_CREDENTIAL_REQUEST: {
            next(action);

            // massage the new credential data into the form expected by the backend
            const massagedResponse = {} as any;
            massagedResponse.attObj = action.payload.response.attestationObject;
            massagedResponse.clientData = action.payload.response.clientDataJSON;
            const formData = _objectToFormData(massagedResponse);

            try {
                const response = await postJSON('/verify_credential_info', formData);

                if (response.fail) {
                    throw new Error(response.fail);
                }

                return next(ExampleAppActions.validateNewCredentialSuccess());


            } catch (err) {
                return store.dispatch(WebauthnActions.webauthnCreateCredentialFailure(err));
            }
        }

        case RequestActionTypes.GET_ASSERTION_CREATION_OPTIONS_REQUEST: {
            next(action);
            const payload = {login_username: action.payload.username};
            const formData = _objectToFormData(payload);

            const response = await postJSON('/webauthn_begin_assertion', formData) as any;

            response.challenge = webauthnB64ToArrayBuffer(response.challenge);
            response.allowCredentials = response.allowCredentials.map((credential: any) => {
                credential.id = webauthnB64ToArrayBuffer(credential.id);
                return credential;
            });

            store.dispatch(
                WebauthnActions.webauthnGetAssertionRequest(response));
            break;
        }
        case WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_SUCCESS:
            next(action);
            return store.dispatch(ExampleAppActions.validateNewAssertion(action.payload))
        case RequestActionTypes.VALIDATE_NEW_ASSERTION_REQUEST:
            let massagedResponse = {...action.payload} as any;
            massagedResponse.authData = action.payload.response.authenticatorData;
            massagedResponse.userHandle = action.payload.response.userHandle;
            // the backend expects a hex-encoded signature
            massagedResponse.signature = hexEncode(new Uint8Array(
                webauthnB64ToArrayBuffer(action.payload.response.signature)));
            massagedResponse.clientData = action.payload.response.clientDataJSON;
            
            const formData = _objectToFormData(massagedResponse);
            try {
                const response = await postJSON('/verify_assertion', formData);

                if (response.fail) {
                    throw new Error(response.fail);
                }

                debugger;
                return store.dispatch(ExampleAppActions.validateNewAssertionSuccess())

            } catch(err) {
                return store.dispatch(WebauthnActions.webauthnGetAssertionFailure(err));
            }


            
    }

    return next(action);
}
