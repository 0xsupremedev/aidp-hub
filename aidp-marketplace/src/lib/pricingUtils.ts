export interface CloudBenchmark {
    name: string;
    hourlyRate: number;
    tokensPerHour?: number;
    imagesPerHour?: number;
}

export const CLOUD_BENCHMARKS: Record<'llm' | 'image', CloudBenchmark> = {
    'llm': {
        name: 'AWS p3.2xlarge (V100)',
        hourlyRate: 3.06,
        tokensPerHour: 120000,
    },
    'image': {
        name: 'GCP a2-highgpu-1g (A100)',
        hourlyRate: 3.67,
        imagesPerHour: 600,
    }
};

export function calculateROI(type: 'llm' | 'image', aidpCost: number, quantity: number) {
    const benchmark = CLOUD_BENCHMARKS[type];
    const capacity = type === 'llm' ? benchmark.tokensPerHour! : benchmark.imagesPerHour!;
    const cloudCostPerUnit = benchmark.hourlyRate / capacity;
    const totalCloudCost = cloudCostPerUnit * quantity;
    const totalAIDPCost = aidpCost;

    const savings = totalCloudCost - totalAIDPCost;
    const savingsPercentage = (savings / totalCloudCost) * 100;

    return {
        cloudProvider: benchmark.name,
        cloudCost: totalCloudCost,
        savings: savings,
        savingsPercentage: savingsPercentage
    };
}
