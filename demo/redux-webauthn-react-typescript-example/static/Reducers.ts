import { WebauthnState, webauthnReducer } from "redux-webauthn";
import { RequestActionTypes } from './Contants';
import { AppActions } from './Types';
import { combineReducers } from 'redux';

export interface UIState {
    username?: string,
    credentialValidated: boolean,
    assertionValidated: boolean
}
  
export interface AppState {
    ui: UIState,
    webauthn: WebauthnState
}
  
const defaultUIState = {
    username: "",
    credentialValidated: false,
    assertionValidated: false
}

const UIReducer = (state = defaultUIState, action: AppActions): UIState => {
    switch (action.type) {
        case (RequestActionTypes.GET_CREDENTIAL_CREATION_OPTIONS_REQUEST):
            return {
                ...state,
                username: action.payload.register_username,
                credentialValidated: false,
                assertionValidated: false
            }
        case (RequestActionTypes.VALIDATE_NEW_CREDENTIAL_SUCCESS):
            return {
                ...state,
                credentialValidated: true,
            }
        case (RequestActionTypes.GET_ASSERTION_CREATION_OPTIONS_REQUEST):
            return {
                ...state,
                assertionValidated: false
            }
        case (RequestActionTypes.VALIDATE_NEW_ASSERTION_SUCCESS):
            return {
                ...state,
                assertionValidated: true
            }
        default:
            return state;
    }
}

export const reducers = combineReducers({
    ui: UIReducer,
    webauthn: webauthnReducer
})