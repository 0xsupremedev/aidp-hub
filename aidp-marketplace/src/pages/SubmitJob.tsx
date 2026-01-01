import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Send,
    Cpu,
    DollarSign,
    Clock,
    Zap,
    ChevronRight,
    CheckCircle,
    MapPin
} from 'lucide-react';
import { Button } from '../components/ui/Button';

const models = [
    { id: 'mistral-7b', name: 'Mistral 7B v0.2', type: 'LLM', cost: '$0.0001/token', vram: '16GB' },
    { id: 'llama-3-70b', name: 'Llama 3 70B', type: 'LLM', cost: '$0.0008/token', vram: '80GB' },
    { id: 'sdxl', name: 'Stable Diffusion XL', type: 'Image', cost: '$0.05/image', vram: '24GB' },
    { id: 'whisper-v3', name: 'Whisper v3', type: 'Speech', cost: '$0.012/min', vram: '8GB' },
];

const regions = [
    { id: 'us-east', name: 'US East', latency: '~45ms', nodes: 312 },
    { id: 'us-west', name: 'US West', latency: '~62ms', nodes: 189 },
    { id: 'eu-west', name: 'EU West', latency: '~78ms', nodes: 156 },
    { id: 'asia-pac', name: 'Asia Pacific', latency: '~120ms', nodes: 94 },
];

export default function SubmitJob() {
    const [step, setStep] = useState(1);
    const [selectedModel, setSelectedModel] = useState<string | null>(null);
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [maxPrice, setMaxPrice] = useState('0.50');
    const [latencyTarget, setLatencyTarget] = useState('100');

    return (
        <div className="flex flex-col gap-8">
            {/* Progress Steps */}
            <div className="flex items-center gap-4" style={{ marginBottom: 'var(--space-4)' }}>
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-3">
                        <div
                            className={`flex items-center justify-center text-sm font-bold`}
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: '50%',
                                background: step >= s ? 'var(--gradient-primary)' : 'var(--color-bg-tertiary)',
                                color: step >= s ? 'white' : 'var(--color-text-muted)'
                            }}
                        >
                            {step > s ? <CheckCircle size={16} /> : s}
                        </div>
                        <span className={`text-sm ${step >= s ? 'text-primary font-medium' : 'text-muted'}`}>
                            {s === 1 ? 'Select Model' : s === 2 ? 'Constraints' : 'Review & Submit'}
                        </span>
                        {s < 3 && <ChevronRight size={16} className="text-muted" />}
                    </div>
                ))}
            </div>

            {/* Step 1: Model Selection */}
            {step === 1 && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col gap-6"
                >
                    <div>
                        <h2 className="text-xl font-bold" style={{ marginBottom: 'var(--space-2)' }}>Select AI Model</h2>
                        <p className="text-secondary">Choose the model for your compute job</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {models.map((model) => (
                            <motion.div
                                key={model.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setSelectedModel(model.id)}
                                className={`glass-card-static cursor-pointer ${selectedModel === model.id ? 'ring-2 ring-primary' : ''}`}
                                style={{ padding: 'var(--space-5)' }}
                            >
                                <div className="flex justify-between items-start" style={{ marginBottom: 'var(--space-3)' }}>
                                    <span className="font-bold">{model.name}</span>
                                    <span className="badge badge-primary">{model.type}</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-tertiary">
                                    <div className="flex items-center gap-1">
                                        <DollarSign size={14} />
                                        <span>{model.cost}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Cpu size={14} />
                                        <span>{model.vram}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex justify-end">
                        <Button onClick={() => setStep(2)} disabled={!selectedModel} icon={<ChevronRight size={18} />} iconPosition="right">
                            Continue to Constraints
                        </Button>
                    </div>
                </motion.div>
            )}

            {/* Step 2: Constraints */}
            {step === 2 && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col gap-6"
                >
                    <div>
                        <h2 className="text-xl font-bold" style={{ marginBottom: 'var(--space-2)' }}>Set Constraints</h2>
                        <p className="text-secondary">Configure pricing, latency, and region preferences</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Max Price */}
                        <div className="glass-card-static" style={{ padding: 'var(--space-5)' }}>
                            <label className="text-sm font-medium text-secondary flex items-center gap-2" style={{ marginBottom: 'var(--space-3)' }}>
                                <DollarSign size={16} className="text-primary" />
                                Max Price (USD)
                            </label>
                            <input
                                type="number"
                                className="input"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                step="0.01"
                                min="0"
                            />
                        </div>

                        {/* Latency Target */}
                        <div className="glass-card-static" style={{ padding: 'var(--space-5)' }}>
                            <label className="text-sm font-medium text-secondary flex items-center gap-2" style={{ marginBottom: 'var(--space-3)' }}>
                                <Clock size={16} className="text-secondary" />
                                Latency Target (ms)
                            </label>
                            <input
                                type="number"
                                className="input"
                                value={latencyTarget}
                                onChange={(e) => setLatencyTarget(e.target.value)}
                                step="10"
                                min="0"
                            />
                        </div>
                    </div>

                    {/* Region Selection */}
                    <div>
                        <label className="text-sm font-medium text-secondary flex items-center gap-2" style={{ marginBottom: 'var(--space-3)' }}>
                            <MapPin size={16} className="text-accent" />
                            Preferred Region
                        </label>
                        <div className="grid grid-cols-4 gap-3">
                            {regions.map((region) => (
                                <motion.div
                                    key={region.id}
                                    whileHover={{ scale: 1.02 }}
                                    onClick={() => setSelectedRegion(region.id)}
                                    className={`glass-card-static cursor-pointer text-center ${selectedRegion === region.id ? 'ring-2 ring-accent' : ''}`}
                                    style={{ padding: 'var(--space-4)' }}
                                >
                                    <div className="font-medium">{region.name}</div>
                                    <div className="text-xs text-muted">{region.latency}</div>
                                    <div className="text-xs text-accent">{region.nodes} nodes</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
                        <Button onClick={() => setStep(3)} icon={<ChevronRight size={18} />} iconPosition="right">
                            Review Job
                        </Button>
                    </div>
                </motion.div>
            )}

            {/* Step 3: Review & Submit */}
            {step === 3 && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col gap-6"
                >
                    <div>
                        <h2 className="text-xl font-bold" style={{ marginBottom: 'var(--space-2)' }}>Review & Submit</h2>
                        <p className="text-secondary">Confirm your job configuration</p>
                    </div>

                    <div className="glass-card-static" style={{ padding: 'var(--space-6)' }}>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <div className="text-sm text-muted" style={{ marginBottom: 'var(--space-1)' }}>Model</div>
                                <div className="font-medium">{models.find(m => m.id === selectedModel)?.name}</div>
                            </div>
                            <div>
                                <div className="text-sm text-muted" style={{ marginBottom: 'var(--space-1)' }}>Region</div>
                                <div className="font-medium">{regions.find(r => r.id === selectedRegion)?.name || 'Auto'}</div>
                            </div>
                            <div>
                                <div className="text-sm text-muted" style={{ marginBottom: 'var(--space-1)' }}>Max Price</div>
                                <div className="font-medium text-primary">${maxPrice}</div>
                            </div>
                            <div>
                                <div className="text-sm text-muted" style={{ marginBottom: 'var(--space-1)' }}>Latency Target</div>
                                <div className="font-medium">{latencyTarget}ms</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-accent-green" style={{ marginTop: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)' }}>
                            <Zap size={16} />
                            <span>Estimated routing: CoreWeave #12 (A100) • ~62ms latency • $0.0008/token</span>
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
                        <Button icon={<Send size={18} />}>
                            Submit to AIDP Network
                        </Button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
