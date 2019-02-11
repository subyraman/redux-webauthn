import * as WebauthnActions from './Actions';
import { ActionType } from 'typesafe-actions/dist/types';
import { WebauthnState } from './Types';
export declare function webauthnReducer(state: WebauthnState | undefined, action: ActionType<typeof WebauthnActions>): WebauthnState | {
    createCredentialError: string;
    newAssertion?: import("./Types").SerializedAssertion | undefined;
    getAssertionError?: string | undefined;
} | {
    newCredential?: import("./Types").SerializedPublicKeyCredential | undefined;
    createCredentialError?: string | undefined;
    getAssertionError?: string | undefined;
    getCredentialError: string;
};
