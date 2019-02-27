"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Utility function for transforming an ArrayBuffer into a url-safe base64 string without
 * padding, used across the WebAuthn API.
 * @param arrayBuffer
 */
exports.arrayBufferToWebauthnB64 = (arrayBuffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
};
/**
 * Utility function for transforming a url-safe base64 string without padding
 * into an ArrayBuffer.
 */
exports.webauthnB64ToArrayBuffer = (b64String) => {
    let fromUrlSafe = b64String
        .replace(/\_/g, "/").replace(/\-/g, "+");
    while (fromUrlSafe.length % 4 !== 0) {
        fromUrlSafe += "=";
    }
    const decoded = atob(fromUrlSafe);
    // @ts-ignore
    const arrayBuffer = Uint8Array.from(decoded, c => c.charCodeAt(0)).buffer;
    return arrayBuffer;
};
//# sourceMappingURL=Utils.js.map