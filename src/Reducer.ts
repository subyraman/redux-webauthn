import * as WebauthnActions from './Actions';
import {WebauthnActionTypes} from './Constants';
import { ActionType } from 'typesafe-actions/dist/types';
import { WebauthnState } from './Types';


export function webauthnReducer(state = {} as WebauthnState, action: ActionType<typeof WebauthnActions>) {
    switch (action.type) {
        case (WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_REQUEST):
            return {};
        case (WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_SUCCESS):
            return {newCredential: action.payload, ...state}
        case (WebauthnActionTypes.WEBAUTHN_CREATE_CREDENTIAL_FAILURE):
            const newState = {
                createCredentialError: action.payload.toString()
            }
            const mergedState = {...newState, ...state};
            const {newCredential, ...stateWithoutCredential} = mergedState;
            return stateWithoutCredential;
        case (WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_FAILURE): {
                const newState = {getCredentialError: action.payload.toString()};
                const mergedState = {...newState, ...state};
                const {newAssertion, ...stateWithoutAssertion} = mergedState;
                return stateWithoutAssertion;
            }
        case (WebauthnActionTypes.WEBAUTHN_GET_ASSERTION_SUCCESS): {
            const newState = {
                    newAssertion: action.payload,
                    ...state
                }
            delete newState.getAssertionError;
            return newState;
        }
        default:
            return state;
    }
}


