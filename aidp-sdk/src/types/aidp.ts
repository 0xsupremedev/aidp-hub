export type ModelType = 'llm' | 'image' | 'code' | 'speech';

export interface AIModel {
    id: string;
    name: string;
    provider: string;
    type: ModelType;
    description: string;
    pricePerToken?: number;
    pricePerImage?: number;
    pricePerMinute?: number;
    vramRequired: string;
}

export interface InferenceRequest {
    modelId: string;
    prompt: string;
    parameters: Record<string, any>;
}

export interface InferenceResponse {
    jobId: string;
    output: string;
    latency: number;
    cost: number;
    provider: string;
    proof: {
        por: string; // Proof of Resource hash
        pod: string; // Proof of Delivery signature
        timestamp: number;
    };
}

export interface ComputeProvider {
    id: string;
    name: string;
    gpu: string;
    latency: number;
    cost: number;
    reliability: number;
    uptime: number;
    location: string;
}
