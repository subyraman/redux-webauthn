import { ActionType } from "typesafe-actions";
import * as ExampleAppActions from './Actions';
import { WebauthnActions } from 'redux-webauthn';

export type AppActions = ActionType<typeof ExampleAppActions> | ActionType<typeof WebauthnActions>
