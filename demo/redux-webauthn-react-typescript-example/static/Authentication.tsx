import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from 'reactstrap/lib/Alert';
import Fade from 'reactstrap/lib/Fade';
import * as AppActions from './Actions';
import { AppState } from './Reducers';


function Authentication() {
    const dispatch = useDispatch();
    const ui = useSelector((state: AppState) => state.ui)
    const webauthn = useSelector((state: AppState) => state.webauthn)

    const onAuthenticate = React.useCallback(() => {
        if (ui.username) {
            dispatch(AppActions.getAssertionCreationOptions(ui.username));
        }
    }, [ui]);

    return (
        <Fade in={!!ui.credentialValidated} className={`text-left`}>
            <div className={"border-top pt-3"}>
                <h2 data-testid="h2">Authenticate as user {ui.username}:</h2>
                <div>
                    <button data-testid="button" className="btn btn-primary" onClick={onAuthenticate}>Sign in</button>
                </div>
            </div>

            {webauthn.getAssertionError && 
                <div className="mt-3">
                    <Alert color="danger">
                        Error when creating assertion: {webauthn.getAssertionError}
                    </Alert>
                </div>
            }

            {ui.assertionValidated && 
                <div data-testid="success-alert" className="mt-3">
                    <Alert>
                        Logged in!
                    </Alert> 
                </div>
            }
        </Fade>
    );
}


export default Authentication;