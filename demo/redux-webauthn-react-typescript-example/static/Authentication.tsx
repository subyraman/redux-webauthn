import * as React from 'react'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Fade from 'reactstrap/lib/Fade';
import Alert from 'reactstrap/lib/Alert';
import { AppState } from './Reducers';
import * as AppActions from './Actions';

type DispatchProps = ReturnType<typeof mapDispatchToProps>

interface AuthenticationProps extends DispatchProps, AppState {}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
      onAuthenticate: (username: string | undefined) => {
            if (username) {
                dispatch(AppActions.getAssertionCreationOptions(username));
            }
        }
    }
}


const Authentication = (props: AuthenticationProps) => {
    return (
        <Fade in={!!props.ui.credentialValidated} className={`text-left`}>
            <div className={"border-top pt-3"}>
                <h2>Authenticate as user {props.ui.username}:</h2>
                <div>
                    <button className="btn btn-primary" onClick={() => props.onAuthenticate(props.ui.username)}>Sign in</button>
                </div>
            </div>

            {props.webauthn.getAssertionError && 
                <div className="mt-3">
                    <Alert color="danger">
                        Error when creating assertion: {props.webauthn.getAssertionError}
                    </Alert>
                </div>
            }

            {props.ui.assertionValidated && 
                <div className="mt-3">
                    <Alert>
                        Logged in!
                    </Alert> 
                </div>
            }
        </Fade>
    );
}


export default connect(
    (state: AppState) => state,
    mapDispatchToProps,
)(Authentication)