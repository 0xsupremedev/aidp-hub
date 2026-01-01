export class ComputeNode {
    constructor(private id: string) { }

    async processJob(jobId: string, payload: any) {
        console.log(`[Node ${this.id}] Processing job ${jobId}...`);
        // Simulate computation
        return {
            jobId,
            status: 'completed',
            result: `Processed by AIDP Node ${this.id}`,
            por: `por_${Math.random().toString(36).substring(7)}`,
            pod: `pod_${Math.random().toString(36).substring(7)}`
        };
    }
}
