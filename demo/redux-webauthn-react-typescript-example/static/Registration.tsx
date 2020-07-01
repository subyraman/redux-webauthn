import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from 'reactstrap/lib/Alert';
import * as AppActions from './Actions';
import { AppState } from './Reducers';

export interface RegistrationState {
    register_username: string,
    register_display_name: string
}

const Registration: React.FC = (props) => {
    const [state, setState] = React.useState<RegistrationState>({
        register_display_name: "",
        register_username: ""
    });

    const ui = useSelector((state: AppState) => state.ui);
    const webauthn = useSelector((state: AppState) => state.webauthn);

    const dispatch = useDispatch();

    const onRegister = React.useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        dispatch(AppActions.getCredentialCreationOptions(state))
  }, [state]);


    return (
        <form className={`text-left`}>
            <h2>Register a credential:</h2>
            <div className="mb-2">
                <div className="form-group">
                    <label htmlFor="username">Email address: </label>
                    <input
                        data-testid="username"
                        className="form-control" id="username" onChange={(e) => setState({...state, register_username: e.target.value})}></input>
                </div>

                <div className="form-group">
                    <label htmlFor="display-name">User's Real Name: </label>
                    <input
                        data-testid="display-name"
                        className="form-control" id="display-name" onChange={(e) => setState({...state, register_display_name: e.target.value})}></input>
                </div>
                
                <button 
                    data-testid="button"
                    className="btn btn-primary" disabled={!state.register_username || !state.register_display_name} onClick={onRegister}>Register</button>
            </div>

            {webauthn.createCredentialError && 
                <div className="mt-3">
                    <Alert color="danger">
                        Error when creating credential: {webauthn.createCredentialError}
                    </Alert>
                </div>
            }

            {ui.credentialValidated && 
                <div className="mt-3">
                    <Alert>
                        <p>Credential created and validated for user <b>{ui.username}</b>!</p>
                    </Alert> 
                </div>
            }
        </form>
    );
}

export default Registration;