import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Send,
    Cpu,
    Zap,
    Terminal,
    Layers,
    Sparkles,
    Info,
    Clock,
    History,
    Copy,
    CheckCircle,
    ChevronDown
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAIDP } from '@aidp-sdk/hooks/useAIDP';
import { AIModel, InferenceResponse } from '@aidp-sdk/types/aidp';

export default function Playground() {
    const { loading, runInference, getModels } = useAIDP();
    const [models, setModels] = useState<AIModel[]>([]);
    const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
    const [prompt, setPrompt] = useState('');
    const [responses, setResponses] = useState<InferenceResponse[]>([]);
    const [activeTab, setActiveTab] = useState<'request' | 'history'>('request');

    useEffect(() => {
        getModels().then(data => {
            setModels(data);
            setSelectedModel(data[0]);
        });
    }, [getModels]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt || !selectedModel || loading) return;

        const result = await runInference({
            modelId: selectedModel.id,
            prompt,
            parameters: { temperature: 0.7, max_tokens: 512 }
        });

        if (result) {
            setResponses([result, ...responses]);
            setPrompt('');
        }
    };

    return (
        <div className="grid grid-cols-12 gap-8">
            {/* Sidebar - Model Selector */}
            <div className="col-span-3 flex flex-col gap-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <Layers size={20} className="text-primary" />
                    Select Model
                </h3>
                <div className="flex flex-col gap-3">
                    {models.map((model) => (
                        <motion.div
                            key={model.id}
                            whileHover={{ x: 5 }}
                            onClick={() => setSelectedModel(model)}
                            className={`model-card ${selectedModel?.id === model.id ? 'selected' : ''}`}
                        >
                            <div className="flex justify-between items-start" style={{ marginBottom: 'var(--space-2)' }}>
                                <span className="font-bold text-sm">{model.name}</span>
                                <span className={`badge ${model.type === 'llm' ? 'badge-primary' : model.type === 'image' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '10px' }}>
                                    {model.type.toUpperCase()}
                                </span>
                            </div>
                            <p className="text-xs text-tertiary" style={{ marginBottom: 'var(--space-3)' }}>{model.description}</p>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 text-xs text-muted">
                                    <Cpu size={12} />
                                    <span>{model.vramRequired}</span>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted">
                                    <Zap size={12} />
                                    <span>{model.pricePerToken ? 'Tokens' : 'Image'}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="glass-card-static" style={{ padding: 'var(--space-4)', marginTop: 'auto' }}>
                    <div className="flex items-center gap-2" style={{ marginBottom: 'var(--space-2)' }}>
                        <Info size={16} className="text-primary" />
                        <span className="text-xs font-bold uppercase tracking-wider text-secondary">Pro Tip</span>
                    </div>
                    <p className="text-xs text-tertiary">
                        Larger models require nodes with high VRAM (A100/H100). AIDP automatically routes to qualifying nodes.
                    </p>
                </div>
            </div>

            {/* Main Content - Playground */}
            <div className="col-span-9 flex flex-col gap-6">
                {/* Workspace Header */}
                <div className="flex justify-between items-center">
                    <div className="tabs">
                        <button
                            className={`tab ${activeTab === 'request' ? 'active' : ''}`}
                            onClick={() => setActiveTab('request')}
                        >
                            <div className="flex items-center gap-2">
                                <Terminal size={14} /> Request Builder
                            </div>
                        </button>
                        <button
                            className={`tab ${activeTab === 'history' ? 'active' : ''}`}
                            onClick={() => setActiveTab('history')}
                        >
                            <div className="flex items-center gap-2">
                                <History size={14} /> History ({responses.length})
                            </div>
                        </button>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-muted">API Endpoint:</span>
                        <code className="code-inline">https://api.aidp.store/v1/inference</code>
                    </div>
                </div>

                {activeTab === 'request' ? (
                    <div className="flex flex-col gap-6">
                        {/* IO Area */}
                        <div className="grid grid-cols-2 gap-6">
                            {/* Input */}
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-secondary">System & User Prompt</label>
                                    <span className="text-xs text-muted">24 / 4096 tokens</span>
                                </div>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <textarea
                                        className="input textarea"
                                        placeholder={`Enter your prompt for ${selectedModel?.name || 'the AI model'}...`}
                                        value={prompt}
                                        onChange={(e) => setPrompt(e.target.value)}
                                    />
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2">
                                            <Button variant="secondary" size="sm" type="button">Clear</Button>
                                            <Button variant="secondary" size="sm" type="button">Load Example</Button>
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={loading || !prompt}
                                            icon={loading ? <div className="loader" style={{ width: 16, height: 16 }} /> : <Send size={16} />}
                                        >
                                            {loading ? 'Routing Job...' : 'Invoke Inference'}
                                        </Button>
                                    </div>
                                    {loading && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-3 text-xs text-primary bg-primary/10 p-3 rounded-lg border border-primary/20"
                                        >
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold uppercase tracking-tighter">Status:</span>
                                                    <span>Analyzing Network Capacity & Routing...</span>
                                                </div>
                                                <div className="text-muted opacity-80">
                                                    Establishing secure cryptographic channel with primary orchestrator.
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </form>
                            </div>

                            {/* Latest Response / Preview */}
                            <div className="flex flex-col gap-4">
                                <label className="text-sm font-medium text-secondary">Live Response</label>
                                <div className="glass-card-static flex-1 overflow-auto" style={{ padding: 'var(--space-4)', position: 'relative' }}>
                                    {!responses[0] && !loading ? (
                                        <div className="flex flex-col items-center justify-center h-full text-tertiary opacity-50">
                                            <Sparkles size={48} style={{ marginBottom: 'var(--space-4)' }} />
                                            <p>Output will appear here after invocation.</p>
                                        </div>
                                    ) : loading ? (
                                        <div className="flex flex-col gap-4 h-full">
                                            <div className="skeleton" style={{ height: '20px', width: '80%' }}></div>
                                            <div className="skeleton" style={{ height: '20px', width: '90%' }}></div>
                                            <div className="skeleton" style={{ height: '20px', width: '60%' }}></div>
                                            <div className="mt-auto flex justify-between">
                                                <div className="skeleton" style={{ height: '32px', width: '120px' }}></div>
                                                <div className="skeleton" style={{ height: '32px', width: '80px' }}></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col h-full">
                                            <div className="flex-1 text-sm leading-relaxed" style={{ marginBottom: 'var(--space-4)' }}>
                                                {responses[0].output}
                                            </div>

                                            <div className="mt-auto pt-4 border-t border-border flex flex-col gap-4">
                                                <div className="flex justify-between items-center text-xs">
                                                    <div className="flex gap-4">
                                                        <div className="flex items-center gap-1 text-tertiary">
                                                            <Clock size={12} /> {responses[0].latency}ms
                                                        </div>
                                                        <div className="flex items-center gap-1 text-tertiary">
                                                            <Zap size={12} className="text-secondary" /> {responses[0].provider}
                                                        </div>
                                                    </div>
                                                    <div className="text-primary font-bold">Cost: ${responses[0].cost.toFixed(4)}</div>
                                                </div>

                                                {/* Cryptographic Proof Area - Enhanced */}
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    className="glass-card-static"
                                                    style={{ padding: 'var(--space-4)', background: 'rgba(6, 182, 212, 0.08)', borderColor: 'rgba(6, 182, 212, 0.3)' }}
                                                >
                                                    <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-3)' }}>
                                                        <div className="flex items-center gap-2">
                                                            <motion.div
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                                                            >
                                                                <CheckCircle size={18} className="text-accent-green" />
                                                            </motion.div>
                                                            <span className="text-sm font-bold text-accent-green">AIDP Proof Verified</span>
                                                            <span className="badge badge-success\" style={{ fontSize: '9px', padding: '2px 6px' }}>SHA-256</span>
                                                        </div>
                                                        <span className="text-xs text-muted">{new Date(responses[0].proof.timestamp).toLocaleTimeString()}</span>
                                                    </div>

                                                    <div className="flex flex-col gap-2">
                                                        {/* PoR Row */}
                                                        <div className="flex items-center gap-2" style={{ background: 'rgba(0,0,0,0.2)', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)' }}>
                                                            <span className="text-xs font-bold text-primary" style={{ width: '36px' }}>PoR</span>
                                                            <code className="proof-hash flex-1 text-xs" style={{ fontFamily: 'monospace', letterSpacing: '0.5px' }}>
                                                                {responses[0].proof.por}
                                                            </code>
                                                            <button
                                                                className="text-muted hover:text-primary transition-colors"
                                                                onClick={() => navigator.clipboard.writeText(responses[0].proof.por)}
                                                                title="Copy PoR hash"
                                                            >
                                                                <Copy size={12} />
                                                            </button>
                                                        </div>

                                                        {/* PoD Row */}
                                                        <div className="flex items-center gap-2" style={{ background: 'rgba(0,0,0,0.2)', padding: 'var(--space-2)', borderRadius: 'var(--radius-md)' }}>
                                                            <span className="text-xs font-bold text-secondary" style={{ width: '36px' }}>PoD</span>
                                                            <code className="proof-hash flex-1 text-xs" style={{ fontFamily: 'monospace', letterSpacing: '0.5px' }}>
                                                                {responses[0].proof.pod}
                                                            </code>
                                                            <button
                                                                className="text-muted hover:text-primary transition-colors"
                                                                onClick={() => navigator.clipboard.writeText(responses[0].proof.pod)}
                                                                title="Copy PoD hash"
                                                            >
                                                                <Copy size={12} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Verification Formula */}
                                                    <div className="flex items-center gap-2 text-xs text-muted" style={{ marginTop: 'var(--space-3)', paddingTop: 'var(--space-2)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                                                        <ChevronDown size={12} />
                                                        <span>PoR = SHA256(Input ⊕ Model ⊕ Output) • PoD = SHA256(PoR ⊕ NodeId ⊕ Timestamp)</span>
                                                    </div>
                                                </motion.div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="glass-card-static flex-1 overflow-auto" style={{ minHeight: '400px' }}>
                        {responses.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-tertiary">
                                <History size={48} style={{ marginBottom: 'var(--space-4)' }} />
                                <p>No jobs recorded yet.</p>
                            </div>
                        ) : (
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead style={{ position: 'sticky', top: 0, background: 'var(--color-bg-secondary)', zIndex: 5 }}>
                                    <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>
                                        <th style={{ padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>JOB ID</th>
                                        <th style={{ padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>MODEL</th>
                                        <th style={{ padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>PROVIDER</th>
                                        <th style={{ padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>LATENCY</th>
                                        <th style={{ padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>COST</th>
                                        <th style={{ padding: 'var(--space-4)', fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {responses.map((resp) => (
                                        <tr key={resp.jobId} style={{ borderBottom: '1px solid var(--color-border)' }} className="hover:bg-glass">
                                            <td style={{ padding: 'var(--space-4)', fontSize: '0.875rem' }} className="font-mono text-xs">{resp.jobId}</td>
                                            <td style={{ padding: 'var(--space-4)' }}>{resp.provider}</td>
                                            <td style={{ padding: 'var(--space-4)', fontSize: '0.875rem' }}>CoreWeave #12</td>
                                            <td style={{ padding: 'var(--space-4)', fontSize: '0.875rem' }}>{resp.latency}ms</td>
                                            <td style={{ padding: 'var(--space-4)', fontSize: '0.875rem' }} className="text-primary">${resp.cost.toFixed(3)}</td>
                                            <td style={{ padding: 'var(--space-4)' }}>
                                                <span className="badge badge-success">Verified</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
