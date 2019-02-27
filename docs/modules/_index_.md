[redux-webauthn](../README.md) > ["index"](../modules/_index_.md)

# External module: "index"

## Index

### Functions

* [webauthnMiddleware](_index_.md#webauthnmiddleware)

---

## Functions

<a id="webauthnmiddleware"></a>

### `<Const>` webauthnMiddleware

▸ **webauthnMiddleware**(store: *`MiddlewareAPI`<`Dispatch`<`AnyAction`>, `any`>*): `(Anonymous function)`

*Defined in [index.ts:85](https://github.com/subyraman/redux-webauthn/blob/6b43fe1/src/index.ts#L85)*

Middleware used to handle WebAuthn registration/authentication actions, waits for the user to respond to an registration/authentication prompt, and then dispatches the payload containing the new credential (for registration) or assertion (for authentications).

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| store | `MiddlewareAPI`<`Dispatch`<`AnyAction`>, `any`> |   |

**Returns:** `(Anonymous function)`

___

