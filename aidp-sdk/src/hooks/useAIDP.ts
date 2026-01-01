import { useState, useCallback } from 'react';
import { aidpClient } from '../lib/aidp-client';
import { InferenceRequest, InferenceResponse, AIModel } from '../types/aidp';

export function useAIDP() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const runInference = useCallback(async (request: InferenceRequest): Promise<InferenceResponse | null> => {
        setLoading(true);
        setError(null);
        try {
            const response = await aidpClient.submitInference(request);
            return response;
        } catch (err: any) {
            setError(err.message || 'Failed to connect to AIDP network');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        runInference,
        getModels: aidpClient.getModels,
        getProviders: aidpClient.getProviders,
    };
}
