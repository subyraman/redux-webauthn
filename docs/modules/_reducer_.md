[redux-webauthn](../README.md) > ["Reducer"](../modules/_reducer_.md)

# External module: "Reducer"

## Index

### Functions

* [webauthnReducer](_reducer_.md#webauthnreducer)

---

## Functions

<a id="webauthnreducer"></a>

###  webauthnReducer

▸ **webauthnReducer**(state?: *[WebauthnState](../interfaces/_types_.webauthnstate.md)*, action: *`ActionType`<[&quot;Actions&quot;](_actions_.md)>*): [WebauthnState](../interfaces/_types_.webauthnstate.md)

*Defined in [Reducer.ts:11](https://github.com/subyraman/redux-webauthn/blob/6b43fe1/src/Reducer.ts#L11)*

Reducer that can be used to handle actions dispatched from the `webauthnMiddleware` object. Suggested unless you would like to create your own reducer to handle the actions yourself.

**Parameters:**

| Name | Type | Default value |
| ------ | ------ | ------ |
| `Default value` state | [WebauthnState](../interfaces/_types_.webauthnstate.md) |  {} as WebauthnState |
| action | `ActionType`<[&quot;Actions&quot;](_actions_.md)> | - |

**Returns:** [WebauthnState](../interfaces/_types_.webauthnstate.md)

___

