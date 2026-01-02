import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

// ============================================
// INLINE DePIN MODULE STUBS
// ============================================

class Orchestrator {
    async computeRoutingModel(nodes: any[], weights = { alpha: 0.4, beta: 0.3, gamma: 0.2, delta: 0.1 }) {
        return nodes.map(node => ({
            id: node.id,
            score: (weights.alpha * node.latency) +
                (weights.beta * node.cost) +
                (weights.gamma * (1 - node.reliability)) +
                (weights.delta * (1 / node.uptime))
        })).sort((a, b) => a.score - b.score)[0];
    }

    async routeJob(jobRequest: any) {
        const discoveredNodes = [
            { id: 'node_alpha', latency: 45, cost: 0.004, reliability: 0.99, uptime: 0.999 },
            { id: 'node_beta', latency: 120, cost: 0.002, reliability: 0.95, uptime: 0.98 }
        ];
        const optimal = await this.computeRoutingModel(discoveredNodes);
        return { selectedNode: optimal.id, score: optimal.score, dispatchTimestamp: Date.now() };
    }
}

class ProofVerifier {
    static verifyPoR(_input: string, _model: string, output: string, timestamp: number, por: string): boolean {
        return por === `por_${output.length}_${timestamp}`;
    }
    static verifyPoU(_nodeId: string, heartbeatSignature: string): boolean {
        return !!heartbeatSignature;
    }
}

class ComputeNode {
    constructor(private id: string) { }
    async processJob(jobId: string, _payload: any) {
        return {
            jobId,
            status: 'completed',
            result: `Processed by AIDP Node ${this.id}`,
            por: `por_${Math.random().toString(36).substring(7)}`,
            pod: `pod_${Math.random().toString(36).substring(7)}`
        };
    }
}

const app = express();
app.use(cors());
app.use(express.json());

// Instantiate DePIN components
const orchestrator = new Orchestrator();
const computeNode = new ComputeNode('node_primary');

// In-memory mock database (Note: In serverless, this will reset frequently)
const jobs = new Map();

// API Routes
app.get('/api/status', (req, res) => {
    res.json({
        status: 'online',
        network: 'AIDP Mainnet (Phase 2)',
        version: '2.0.0',
        nodes: 1247,
        orchestrators: 42
    });
});

const submitJob = async (jobType: string, payload: any) => {
    const jobId = `job_${uuidv4().split('-')[0]}`;

    // Step 1: Use Orchestrator to route job (Whitepaper Section 8)
    const routingResult = await orchestrator.routeJob({ id: jobId, type: jobType, payload });

    const job: any = {
        id: jobId,
        type: jobType,
        model: payload.model || 'default',
        status: 'processing',
        createdAt: new Date(),
        routedTo: routingResult.selectedNode,
        payload: payload,
        result: null
    };

    jobs.set(jobId, job);

    // Step 2: Simulate compute with ComputeNode
    // Note: setTimeout might not work reliably in serverless after response.
    // For the demo, we'll return immediate processing or let polling work if the instance stays alive.
    setTimeout(async () => {
        const computeResult = await computeNode.processJob(jobId, payload);
        const updatedJob = jobs.get(jobId);
        if (updatedJob) {
            updatedJob.status = 'completed';
            updatedJob.result = computeResult.result;
            updatedJob.proof = {
                por: computeResult.por,
                pod: computeResult.pod,
                timestamp: Date.now()
            };

            updatedJob.verified = {
                por: ProofVerifier.verifyPoR(JSON.stringify(payload), updatedJob.model, updatedJob.result, updatedJob.proof.timestamp, updatedJob.proof.por),
                pou: ProofVerifier.verifyPoU(routingResult.selectedNode, 'heartbeat_sig')
            };

            jobs.set(jobId, updatedJob);
        }
    }, 2000);

    return {
        jobId,
        message: 'Job submitted to AIDP decentralized network',
        status: 'processing',
        routedTo: routingResult.selectedNode
    };
};

app.post('/api/submit', async (req, res) => {
    try {
        const { jobType = 'inference', payload = {} } = req.body;
        const result = await submitJob(jobType, payload);
        return res.status(202).json({ ok: true, ...result });
    } catch (err: any) {
        return res.status(500).json({ ok: false, error: err.message });
    }
});

app.post('/api/inference', async (req, res) => {
    try {
        const { modelId, prompt } = req.body;
        const result = await submitJob('inference', { model: modelId, prompt });
        return res.status(202).json(result);
    } catch (err: any) {
        return res.status(500).json({ error: err.message });
    }
});

app.get('/api/status/:id', (req, res) => {
    const job = jobs.get(req.params.id);
    if (!job) {
        return res.status(404).json({ ok: false, error: 'Job not found' });
    }
    res.json({ ok: true, job });
});

export default app;
