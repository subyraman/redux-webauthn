import * as WebauthnActions from './Actions';
import { ActionType } from 'typesafe-actions/dist/types';
import { WebauthnState } from './Types';
/**
 * Reducer that can be used to handle actions dispatched from the `webauthnMiddleware` object. Suggested unless you would like to create your own reducer to handle the actions yourself.
 *
 */
export declare function webauthnReducer(state: WebauthnState | undefined, action: ActionType<typeof WebauthnActions>): WebauthnState;
