import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings2, Zap, Clock, ShieldCheck, Target } from 'lucide-react';

export const RoutingSimulator = () => {
    const [weights, setWeights] = useState({ alpha: 40, beta: 30, gamma: 20, delta: 10 });

    return (
        <div className="glass-card-static p-6 flex flex-col gap-6 relative overflow-hidden bg-primary/5 border-primary/20">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <Target size={18} className="text-primary" />
                    <h3 className="text-sm font-bold uppercase tracking-widest">Routing Optimization</h3>
                </div>
                <div className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                    Phase 2 Beta
                </div>
            </div>

            <p className="text-[11px] text-secondary italic leading-relaxed">
                Section 8.1: $p* = arg min(αL_p + βC_p + γ(1-R_p) + δ(1/U_p))$
            </p>

            <div className="space-y-4">
                <WeightSlider label="α (Latency)" value={weights.alpha} onChange={(v: number) => setWeights({ ...weights, alpha: v })} />
                <WeightSlider label="β (Cost)" value={weights.beta} onChange={(v: number) => setWeights({ ...weights, beta: v })} />
                <WeightSlider label="γ (Reliability)" value={weights.gamma} onChange={(v: number) => setWeights({ ...weights, gamma: v })} />
            </div>

            <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3">
                <div className="flex justify-between items-center text-[10px] font-bold text-tertiary">
                    <span>SIMULATED SELECTION</span>
                    <span className="text-primary">COREWEAVE #12</span>
                </div>
                <div className="flex gap-1">
                    {[1, 0.8, 0.9, 0.4, 0.7].map((h, i) => (
                        <div key={i} className="flex-1 h-3 rounded-sm bg-primary/20 relative">
                            {i === 0 && <motion.div layoutId="selection" className="absolute inset-0 bg-primary rounded-sm shadow-[0_0_10px_rgba(59,130,246,0.5)]" />}
                        </div>
                    ))}
                </div>
                <p className="text-[9px] text-muted italic">Orchestrators are currently matching workloads based on these global weights.</p>
            </div>
        </div>
    );
};

const WeightSlider = ({ label, value, onChange }: any) => (
    <div className="space-y-1.5 single-weight">
        <div className="flex justify-between text-[10px] font-bold">
            <span className="text-tertiary uppercase tracking-tight">{label}</span>
            <span className="text-primary">{value}%</span>
        </div>
        <input
            type="range"
            min="0" max="100"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
        />
    </div>
);
