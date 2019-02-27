/**
 * Utility function for transforming an ArrayBuffer into a url-safe base64 string without
 * padding, used across the WebAuthn API.
 * @param arrayBuffer
 */
export declare const arrayBufferToWebauthnB64: (arrayBuffer: ArrayBuffer) => string;
/**
 * Utility function for transforming a url-safe base64 string without padding
 * into an ArrayBuffer.
 */
export declare const webauthnB64ToArrayBuffer: (b64String: String) => ArrayBuffer;
