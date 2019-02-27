[redux-webauthn](../README.md) > ["Utils"](../modules/_utils_.md)

# External module: "Utils"

## Index

### Functions

* [arrayBufferToWebauthnB64](_utils_.md#arraybuffertowebauthnb64)
* [webauthnB64ToArrayBuffer](_utils_.md#webauthnb64toarraybuffer)

---

## Functions

<a id="arraybuffertowebauthnb64"></a>

### `<Const>` arrayBufferToWebauthnB64

▸ **arrayBufferToWebauthnB64**(arrayBuffer: *`ArrayBuffer`*): `string`

*Defined in [Utils.ts:6](https://github.com/subyraman/redux-webauthn/blob/6b43fe1/src/Utils.ts#L6)*

Utility function for transforming an ArrayBuffer into a url-safe base64 string without padding, used across the WebAuthn API.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| arrayBuffer | `ArrayBuffer` |   |

**Returns:** `string`

___
<a id="webauthnb64toarraybuffer"></a>

### `<Const>` webauthnB64ToArrayBuffer

▸ **webauthnB64ToArrayBuffer**(b64String: *`String`*): `ArrayBuffer`

*Defined in [Utils.ts:18](https://github.com/subyraman/redux-webauthn/blob/6b43fe1/src/Utils.ts#L18)*

Utility function for transforming a url-safe base64 string without padding into an ArrayBuffer.

**Parameters:**

| Name | Type |
| ------ | ------ |
| b64String | `String` |

**Returns:** `ArrayBuffer`

___

