declare module "redux-devtools" {
    import * as React from "react";
    import { StoreEnhancer } from "redux";

    export interface DevTools {
    new (): JSX.ElementClass;
    instrument(opts?: any): StoreEnhancer;
    }

    export function createDevTools(el: React.ReactElement<any>): DevTools;
    export function persistState(debugSessionKey: string): StoreEnhancer;

    export const factory: { instrument(opts?: any): () => StoreEnhancer };

    export default factory;
}
