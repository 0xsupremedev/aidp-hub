import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Cpu, Database, Network, ChevronDown } from 'lucide-react';

interface ProofExplorerProps {
    job: any;
    onClose: () => void;
}

export const ProofExplorer = ({ job, onClose }: ProofExplorerProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="fixed inset-y-0 right-0 w-[450px] bg-secondary border-l border-border shadow-2xl z-50 flex flex-col"
        >
            <div className="p-6 border-bottom flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="text-accent-green" size={24} />
                    <div>
                        <h3 className="text-lg font-bold">Proof Verification</h3>
                        <p className="text-xs text-tertiary">Job ID: {job.id}</p>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-glass rounded-full">
                    <X size={20} />
                </button>
            </div>

            <div className="flex-1 overflow-auto p-6 flex flex-col gap-8">
                {/* Visual Chain */}
                <div className="flex flex-col items-center gap-4 relative">
                    <ProofStep icon={Database} label="Input Data" hash="8a2f...1e3c" color="var(--color-primary)" />
                    <div className="w-px h-8 bg-border relative">
                        <div className="absolute inset-0 bg-primary opacity-50 blur-sm"></div>
                    </div>
                    <ProofStep icon={Cpu} label="GPU Execution" hash="4d9e...c7b2" color="var(--color-secondary)" secondaryLabel={job.provider} />
                    <div className="w-px h-8 bg-border" />
                    <ProofStep icon={ShieldCheck} label="PoR Generation" hash="f2a1...9d8a" color="var(--color-accent-green)" />
                    <div className="w-px h-8 bg-border" />
                    <ProofStep icon={Network} label="Network Consensus" hash="6e4c...0b5f" color="var(--color-primary-light)" />
                </div>

                <div className="glass-card-static p-4 flex flex-col gap-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted">Merkle Root Sequence</h4>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center text-xs p-2 bg-glass rounded">
                            <span className="text-tertiary">Leaf 0: {job.model} Hash</span>
                            <code className="text-primary">a7d1...88c2</code>
                        </div>
                        <div className="flex justify-between items-center text-xs p-2 bg-glass rounded">
                            <span className="text-tertiary">Leaf 1: Node Performance</span>
                            <code className="text-primary">3f4e...991a</code>
                        </div>
                        <div className="flex justify-center py-2">
                            <ChevronDown size={14} className="text-muted" />
                        </div>
                        <div className="flex justify-between items-center text-sm font-bold p-3 bg-primary/10 border border-primary/20 rounded">
                            <span className="text-secondary">Root (Settlement)</span>
                            <code className="text-primary font-mono lowercase">0x88...66FA</code>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6 border-top bg-bg-secondary mt-auto">
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-tertiary">Verification Status</span>
                        <span className="text-accent-green font-bold">Authenticated</span>
                    </div>
                    <button className="btn btn-primary w-full py-3">
                        Download Audit Log (JSON)
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

const ProofStep = ({ icon: Icon, label, hash, color, secondaryLabel }: any) => (
    <div className="flex flex-col items-center gap-2 group w-full">
        <div
            className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg"
            style={{
                background: `color-mix(in srgb, ${color} 15%, transparent)`,
                border: `1px solid color-mix(in srgb, ${color} 30%, transparent)`
            }}
        >
            <Icon size={20} style={{ color }} />
        </div>
        <div className="text-center">
            <div className="text-sm font-bold">{label}</div>
            {secondaryLabel && <div className="text-[10px] text-muted">{secondaryLabel}</div>}
            <code className="text-[10px] text-tertiary bg-glass px-1 rounded mt-1 block">{hash}</code>
        </div>
    </div>
);
