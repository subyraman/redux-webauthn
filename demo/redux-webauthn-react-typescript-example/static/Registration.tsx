import * as React from 'react'
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as AppActions from './Actions';;
import Alert from 'reactstrap/lib/Alert';
import { AppState } from './Reducers';

function mapDispatchToProps(dispatch: Dispatch) {
    return {
      onRegister: (e: React.MouseEvent, registrationData: RegistrationState) => {
          e.preventDefault();
          dispatch(AppActions.getCredentialCreationOptions(registrationData))
      }
    }
}

type DispatchProps = ReturnType<typeof mapDispatchToProps>
interface RegistrationProps extends AppState, DispatchProps {}

export interface RegistrationState {
    register_username: string,
    register_display_name: string
}

class Registration extends React.Component<RegistrationProps, RegistrationState> {
    constructor(props: RegistrationProps) {
        super(props);
        this.state = {register_username: "", register_display_name: ""};
    }
    render() {
        return (
            <form className={`text-left`}>
                <h2>Register a credential:</h2>
                <div className="mb-2">
                    <div className="form-group">
                        <label htmlFor="username">Email address: </label>
                        <input className="form-control" id="username" onChange={(e) => this.setState({register_username: e.target.value})}></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">User's Real Name: </label>
                        <input className="form-control" id="username" onChange={(e) => this.setState({register_display_name: e.target.value})}></input>
                    </div>
                    
                    <button className="btn btn-primary" disabled={!this.state.register_username || !this.state.register_display_name} onClick={(e) => this.props.onRegister(e, this.state)}>Register</button>
                </div>

                {this.props.webauthn.createCredentialError && 
                    <div className="mt-3">
                        <Alert color="danger">
                            Error when creating credential: {this.props.webauthn.createCredentialError}
                        </Alert>
                    </div>
                }

                {this.props.ui.credentialValidated && 
                    <div className="mt-3">
                        <Alert>
                            <p>Credential created and validated for user <b>{this.props.ui.username}</b>!</p>
                        </Alert> 
                    </div>
                }
            </form>
        );
    }
}

export default connect(
    (state: AppState) => state,
    mapDispatchToProps,
)(Registration)