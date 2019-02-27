[redux-webauthn](../README.md) > ["Actions"](../modules/_actions_.md)

# External module: "Actions"

## Index

### Functions

* [webauthnCreateCredentialFailure](_actions_.md#webauthncreatecredentialfailure)
* [webauthnCreateCredentialRequest](_actions_.md#webauthncreatecredentialrequest)
* [webauthnCreateCredentialSuccess](_actions_.md#webauthncreatecredentialsuccess)
* [webauthnGetAssertionFailure](_actions_.md#webauthngetassertionfailure)
* [webauthnGetAssertionRequest](_actions_.md#webauthngetassertionrequest)
* [webauthnGetAssertionSuccess](_actions_.md#webauthngetassertionsuccess)

---

## Functions

<a id="webauthncreatecredentialfailure"></a>

### `<Const>` webauthnCreateCredentialFailure

▸ **webauthnCreateCredentialFailure**(error: *`Error`*): `object`

*Defined in [Actions.ts:33](https://github.com/subyraman/redux-webauthn/blob/0d7d2ba/src/Actions.ts#L33)*

Action function called after a failure in creating a new credential.

**Parameters:**

| Name | Type |
| ------ | ------ |
| error | `Error` |

**Returns:** `object`

___
<a id="webauthncreatecredentialrequest"></a>

### `<Const>` webauthnCreateCredentialRequest

▸ **webauthnCreateCredentialRequest**(publicKeyCredentialCreationOptions: *`PublicKeyCredentialCreationOptions`*): `object`

*Defined in [Actions.ts:16](https://github.com/subyraman/redux-webauthn/blob/0d7d2ba/src/Actions.ts#L16)*

Action function to be called during registration, to create a credential. Dispatches the `WEBAUTHN_CREATE_CREDENTIAL_REQUEST` action, which will result in the `webauthnMiddleware` to call `navigator.credentials.create`, the native API for creating a credential.

If a credential is successfully created, the `WEBAUTHN_CREDENTIAL_CREATE_SUCCESS` action type will be dispatched onto the store, with the new `PublicKeyCredential` as payload.

If not successful, the `WEBAUTHN_CREDENTIAL_CREATE_FAILURE` action will be dispatched.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| publicKeyCredentialCreationOptions | `PublicKeyCredentialCreationOptions` |   |

**Returns:** `object`

___
<a id="webauthncreatecredentialsuccess"></a>

### `<Const>` webauthnCreateCredentialSuccess

▸ **webauthnCreateCredentialSuccess**(serializedCredential: *[SerializedPublicKeyCredential](../interfaces/_types_.serializedpublickeycredential.md)*): `object`

*Defined in [Actions.ts:26](https://github.com/subyraman/redux-webauthn/blob/0d7d2ba/src/Actions.ts#L26)*

Action function called after a new credential has been successfully created after a user confirms a registratration. Note that the `ArrayBuffer` items in the assertion are automatically converted in to url-safe base64 strings, without padding.

**Parameters:**

| Name | Type |
| ------ | ------ |
| serializedCredential | [SerializedPublicKeyCredential](../interfaces/_types_.serializedpublickeycredential.md) |

**Returns:** `object`

___
<a id="webauthngetassertionfailure"></a>

### `<Const>` webauthnGetAssertionFailure

▸ **webauthnGetAssertionFailure**(error: *`Error`*): `object`

*Defined in [Actions.ts:56](https://github.com/subyraman/redux-webauthn/blob/0d7d2ba/src/Actions.ts#L56)*

Action function called after a failure in creating an assertion.

**Parameters:**

| Name | Type |
| ------ | ------ |
| error | `Error` |

**Returns:** `object`

___
<a id="webauthngetassertionrequest"></a>

### `<Const>` webauthnGetAssertionRequest

▸ **webauthnGetAssertionRequest**(publicKeyCredentialRequestOptions: *`PublicKeyCredentialRequestOptions`*): `object`

*Defined in [Actions.ts:49](https://github.com/subyraman/redux-webauthn/blob/0d7d2ba/src/Actions.ts#L49)*

Action function to be called during authentication, to create an authentication assertion, which is used to prove an identity of a user. Dispatches the `WEBAUTHN_GET_ASSERTION_REQUEST` action, which will result in the `webauthnMiddleware` to call `navigator.credentials.get`, the native API for creating an assertion.

If a credential is successfully created, the `WEBAUTHN_GET_ASSERTION_SUCCESS` action type will be dispatched onto the store, with the new `PublicKeyCredential` as payload.

If not successful, the `WEBAUTHN_GET_ASSERTION_FAILURE` action will be dispatched.

**Parameters:**

| Name | Type |
| ------ | ------ |
| publicKeyCredentialRequestOptions | `PublicKeyCredentialRequestOptions` |

**Returns:** `object`

___
<a id="webauthngetassertionsuccess"></a>

### `<Const>` webauthnGetAssertionSuccess

▸ **webauthnGetAssertionSuccess**(assertion: *[SerializedAssertion](../interfaces/_types_.serializedassertion.md)*): `object`

*Defined in [Actions.ts:65](https://github.com/subyraman/redux-webauthn/blob/0d7d2ba/src/Actions.ts#L65)*

Action function called after an assertion has been successfully created after a user confirms an authentication. Note that the `ArrayBuffer` items in the assertion are automatically converted in to url-safe base64 strings, without padding.

**Parameters:**

| Name | Type |
| ------ | ------ |
| assertion | [SerializedAssertion](../interfaces/_types_.serializedassertion.md) |

**Returns:** `object`

___

