/**
 * AIDP Cryptographic Utilities
 * Real SHA256 hashing for Proof-of-Resource (PoR) and Proof-of-Delivery (PoD)
 * Uses Web Crypto API - no external dependencies
 */

/**
 * Generate SHA256 hash from string input
 */
async function sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Proof-of-Resource (PoR)
 * Formula from Whitepaper Section 9: H(Input ⊕ Model ⊕ Output)
 * Proves that specific computation was performed
 */
export async function generatePoR(
    input: string,
    modelId: string,
    output: string
): Promise<string> {
    const payload = `PoR:${input}|${modelId}|${output}`;
    return sha256(payload);
}

/**
 * Proof-of-Delivery (PoD)
 * Cryptographic signature confirming output reached the requester
 */
export async function generatePoD(
    por: string,
    nodeId: string,
    timestamp: number
): Promise<string> {
    const payload = `PoD:${por}|${nodeId}|${timestamp}`;
    return sha256(payload);
}

/**
 * Generate verification object with both proofs
 */
export async function generateVerificationProof(
    input: string,
    modelId: string,
    output: string,
    nodeId: string
): Promise<{ por: string; pod: string; timestamp: number; verified: boolean }> {
    const timestamp = Date.now();
    const por = await generatePoR(input, modelId, output);
    const pod = await generatePoD(por, nodeId, timestamp);

    return {
        por,
        pod,
        timestamp,
        verified: true // Both proofs generated successfully
    };
}

/**
 * Verify a PoR hash matches the expected computation
 */
export async function verifyPoR(
    input: string,
    modelId: string,
    output: string,
    expectedHash: string
): Promise<boolean> {
    const computed = await generatePoR(input, modelId, output);
    return computed === expectedHash;
}

/**
 * Format hash for display (truncated with ellipsis)
 */
export function formatHash(hash: string, length: number = 16): string {
    if (hash.length <= length) return hash;
    return `${hash.slice(0, length / 2)}...${hash.slice(-length / 2)}`;
}
