export interface SerializedPublicKeyCredential {
    id: string;
    type: string;
    response: {
        attestationObject: string;
        clientDataJSON: string;
    };
}
export interface SerializedAssertion {
    id: string;
    type: PublicKeyCredential['type'];
    response: {
        authenticatorData: string;
        clientDataJSON: string;
        signature: string;
        userHandle: string | null;
    };
}
export interface WebauthnState {
    newCredential?: SerializedPublicKeyCredential;
    createCredentialError?: string;
    newAssertion?: SerializedAssertion;
    getAssertionError?: string;
}
