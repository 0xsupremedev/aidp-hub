import { motion } from 'framer-motion';
import {
    Clock,
    CheckCircle,
    ShieldCheck,
    Cpu,
    ExternalLink,
    Search,
    AlertCircle,
    Eye
} from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ProofExplorer } from '../components/ProofExplorer';

const jobs = [
    { id: 'job_492', model: 'Mistral-7B-v0.2', provider: 'CoreWeave #12', type: 'Inference', status: 'completed', time: '2.4s', cost: '0.042 AIDP', timestamp: '2 mins ago' },
    { id: 'job_491', model: 'Stable Diffusion XL', provider: 'Lambda Labs #04', type: 'Image Gen', status: 'completed', time: '8.1s', cost: '0.128 AIDP', timestamp: '15 mins ago' },
    { id: 'job_490', model: 'CodeLlama-34b', provider: 'Hetzner GPU #2', type: 'Inference', status: 'processing', time: '-', cost: '-', timestamp: 'Just now' },
    { id: 'job_489', model: 'Whisper-v3', provider: 'DePIN Worker #88', type: 'Speech-to-Text', status: 'completed', time: '1.2s', cost: '0.015 AIDP', timestamp: '1 hour ago' },
    { id: 'job_488', model: 'Llama-3-70b', provider: 'RunPod #55', type: 'Inference', status: 'failed', time: '0.4s', cost: '0', timestamp: '3 hours ago' },
];

export default function Jobs() {
    const [selectedJob, setSelectedJob] = useState<any>(null);

    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold">Inference Jobs</h2>
                    <p className="text-secondary">Track and verify decentralized compute history.</p>
                </div>
                <div className="input-group" style={{ position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--color-text-tertiary)' }} />
                    <input className="input" placeholder="Search by Job ID..." style={{ paddingLeft: 40, width: 280 }} />
                </div>
            </div>

            <div className="glass-card-static overflow-hidden">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)' }}>
                            <th className="th-cell">Job ID</th>
                            <th className="th-cell">Model</th>
                            <th className="th-cell">Provider</th>
                            <th className="th-cell">Status</th>
                            <th className="th-cell">Duration</th>
                            <th className="th-cell">Cost</th>
                            <th className="th-cell">Verification</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobs.map((job) => (
                            <tr key={job.id} style={{ borderBottom: '1px solid var(--color-border)' }} className="hover:bg-glass">
                                <td className="td-cell font-mono text-xs">{job.id}</td>
                                <td className="td-cell font-medium">{job.model}</td>
                                <td className="td-cell text-tertiary text-sm">{job.provider}</td>
                                <td className="td-cell">
                                    <div className="flex items-center gap-2">
                                        <span className={`status-dot ${job.status === 'completed' ? 'status-dot-online' : job.status === 'failed' ? 'status-dot-danger' : 'status-dot-warning'}`}></span>
                                        <span className="text-sm capitalize">{job.status}</span>
                                    </div>
                                </td>
                                <td className="td-cell text-sm">{job.time}</td>
                                <td className="td-cell font-bold text-primary">{job.cost}</td>
                                <td className="td-cell">
                                    {job.status === 'completed' ? (
                                        <div className="flex items-center gap-1 text-xs text-accent-green">
                                            <ShieldCheck size={14} />
                                            <span>PoR Verified</span>
                                        </div>
                                    ) : job.status === 'failed' ? (
                                        <div className="flex items-center gap-1 text-xs text-danger">
                                            <AlertCircle size={14} />
                                            <span>Slashed</span>
                                        </div>
                                    ) : (
                                        <span className="text-xs text-muted">Pending...</span>
                                    )}
                                </td>
                                <td className="td-cell">
                                    {job.status === 'completed' && (
                                        <button
                                            onClick={() => setSelectedJob(job)}
                                            className="btn btn-ghost btn-sm gap-1 text-xs"
                                        >
                                            <Eye size={14} /> Inspect
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <AnimatePresence>
                {selectedJob && (
                    <ProofExplorer
                        job={selectedJob}
                        onClose={() => setSelectedJob(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
