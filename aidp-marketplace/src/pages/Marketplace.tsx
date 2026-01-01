import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ShoppingCart,
    Cpu,
    Zap,
    Search,
    Filter,
    ArrowUpRight,
    Box,
    Twitter,
    Github,
    Plus
} from 'lucide-react';
import { Button } from '../components/ui/Button';

const gpuOffers = [
    { id: 'off_1', name: 'A100 80GB Cluster', provider: 'CoreWeave', price: '$0.85/hr', vram: '80GB', interconnect: 'NVLink', availability: '98%' },
    { id: 'off_2', name: 'RTX 4090 24GB', provider: 'Lambda Labs', price: '$0.42/hr', vram: '24GB', interconnect: 'PCIe 4.0', availability: '100%' },
    { id: 'off_3', name: 'H100 80GB (SXM)', provider: 'RunPod', price: '$2.40/hr', vram: '80GB', interconnect: 'NVLink', availability: '95%' },
    { id: 'off_4', name: 'RTX 3090 24GB', provider: 'DePIN Worker', price: '$0.25/hr', vram: '24GB', interconnect: 'PCIe 4.0', availability: '92%' },
];

const ecosystemProjects = [
    { name: 'Solaris AI Agent', category: 'AI Inference', usage: '640 hrs on AIDP', author: 'NexusLabs' },
    { name: 'ZK-Proof Generator', category: 'Cryptography', usage: '1.2M Proofs on AIDP', author: 'PrivacyChain' },
    { name: 'Ray-Tracing Engine', category: 'Rendering', usage: '48k Frames on AIDP', author: 'NeoVfx' },
];

export default function Marketplace() {
    const [view, setView] = useState<'gpus' | 'projects'>('gpus');

    return (
        <div className="flex flex-col gap-8">
            {/* Header with Toggle */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Ecosystem Marketplace</h2>
                    <p className="text-secondary">Discover compute resources and community-built AI applications.</p>
                </div>
                <div className="flex bg-elevated p-1 rounded-xl border border-border shadow-inner">
                    <button
                        onClick={() => setView('gpus')}
                        className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${view === 'gpus' ? 'bg-primary text-white shadow-lg' : 'text-tertiary hover:text-primary'}`}
                    >
                        GPU Nodes
                    </button>
                    <button
                        onClick={() => setView('projects')}
                        className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${view === 'projects' ? 'bg-primary text-white shadow-lg' : 'text-tertiary hover:text-primary'}`}
                    >
                        Ecosystem Projects
                    </button>
                </div>
            </div>

            {/* Sub-header Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="input-group relative w-full sm:w-[400px]">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-tertiary" />
                    <input className="input pl-11 bg-elevated/50" placeholder={view === 'gpus' ? "Filter by GPU model, provider..." : "Search community projects..."} />
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <Button variant="secondary" className="flex-1 sm:flex-initial" icon={<Filter size={16} />}>Advanced Filters</Button>
                    {view === 'projects' && (
                        <Link to="/submit-project">
                            <Button variant="primary" icon={<Plus size={16} />}>List Project</Button>
                        </Link>
                    )}
                </div>
            </div>

            {/* Content Area */}
            <div className="grid grid-cols-1 gap-4">
                {view === 'gpus' ? (
                    gpuOffers.map((offer) => (
                        <motion.div
                            key={offer.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.005, backgroundColor: 'var(--color-bg-tertiary)' }}
                            className="glass-card-static flex flex-col md:flex-row items-center justify-between gap-6 hover:border-primary/30 transition-all"
                            style={{ padding: 'var(--space-5)' }}
                        >
                            <div className="flex items-center gap-6 w-full">
                                <div style={{
                                    width: 64,
                                    height: 64,
                                    borderRadius: 'var(--radius-xl)',
                                    background: 'rgba(59, 130, 246, 0.1)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '1px solid rgba(59, 130, 246, 0.2)'
                                }}>
                                    <Cpu size={32} className="text-primary" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-bold text-xl">{offer.name}</h3>
                                        <span className="badge badge-primary">{offer.provider}</span>
                                    </div>
                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex items-center gap-1 text-xs text-tertiary">
                                            <Zap size={14} className="text-secondary" /> {offer.vram} VRAM
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-tertiary font-mono">
                                            <ArrowUpRight size={14} className="text-accent" /> {offer.interconnect}
                                        </div>
                                        <div className="text-[10px] font-bold text-success uppercase tracking-widest flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span>
                                            {offer.availability} Availability
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-border pt-4 md:pt-0">
                                <div className="text-left md:text-right">
                                    <div className="text-[10px] text-muted uppercase tracking-[0.2em] font-bold">Hourly Rate</div>
                                    <div className="text-2xl font-bold text-primary">{offer.price}</div>
                                </div>
                                <Button size="lg" icon={<ShoppingCart size={18} />}>Rent Now</Button>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ecosystemProjects.map((project, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="card p-6 border-dashed border-primary/20 bg-primary/5 flex flex-col gap-6 group hover:border-primary/50 transition-all cursor-default"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-lg shadow-primary/10">
                                        <Box size={28} />
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="p-2.5 bg-glass rounded-xl text-tertiary hover:text-primary transition-colors cursor-pointer"><Twitter size={16} /></div>
                                        <div className="p-2.5 bg-glass rounded-xl text-tertiary hover:text-primary transition-colors cursor-pointer"><Github size={16} /></div>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-bold text-xl mb-1">{project.name}</h4>
                                    <div className="inline-block px-2 py-0.5 rounded bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-3">
                                        {project.category}
                                    </div>
                                    <p className="text-xs text-muted">A top-performing project built on AIDP infrastructure. Optimized for scale and cryptographic verification.</p>
                                </div>
                                <div className="flex items-center justify-between pt-5 border-t border-border/50">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] text-muted font-bold uppercase tracking-widest">Compute Trace</span>
                                        <span className="text-sm font-bold text-secondary">{project.usage}</span>
                                    </div>
                                    <Button variant="secondary" size="sm" icon={<ArrowUpRight size={14} />}>Open</Button>
                                </div>
                            </motion.div>
                        ))}
                        <Link to="/submit-project" className="card p-8 border-2 border-dashed border-border/50 bg-elevated/20 flex flex-col items-center justify-center text-center gap-4 hover:border-primary/50 hover:bg-primary/5 transition-all group group-hover:shadow-2xl">
                            <div className="w-14 h-14 rounded-full bg-elevated border border-border flex items-center justify-center text-tertiary group-hover:text-primary group-hover:scale-110 transition-all">
                                <Plus size={28} />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-1">Submit Your Project</h4>
                                <p className="text-xs text-tertiary leading-relaxed">Qualify for the **350 USDC** rewards by listing your AIDP-powered app.</p>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
