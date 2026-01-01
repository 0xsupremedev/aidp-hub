import { useState } from 'react'
import {
    Key,
    Copy,
    RotateCw,
    MoreHorizontal,
    Plus,
    CheckCircle2,
    ShieldAlert,
    Clock,
    Zap,
    ChevronRight,
    ExternalLink
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { CreateKeyModal } from '../components/ui/CreateKeyModal';
import { AnimatePresence } from 'framer-motion';

const mockKeys = [
    { id: 1, name: 'Production Main', status: 'active', health: 'healthy', requests: '2.4M', updated: '2h ago', preview: 'sk_live_...4k82' },
    { id: 2, name: 'Staging Environment', status: 'active', health: 'healthy', requests: '124k', updated: '5d ago', preview: 'sk_test_...j92n' },
    { id: 3, name: 'Legacy Integration', status: 'inactive', health: 'critical', requests: '0', updated: '1mo ago', preview: 'sk_live_...p02m' },
];

export default function APIKeys() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <div className="flex flex-col gap-8">
            {/* Header with Primary CTA */}
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-2">API Keys</h2>
                    <p className="text-secondary flex items-center gap-2">
                        Manage secure access to the AIDP Decentralized Compute Network.
                        <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-success">Auth Systems Active</span>
                    </p>
                </div>
                <Button
                    variant="primary"
                    icon={<Plus size={16} />}
                    onClick={() => setIsCreateModalOpen(true)}
                >
                    Create API Key
                </Button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                    { label: 'Active Keys', value: '3', icon: Key },
                    { label: 'Total Requests', value: '2.5M', icon: Zap },
                    { label: 'Avg Latency', value: '142ms', icon: Clock },
                ].map((stat, i) => (
                    <div key={i} className="card p-4 flex items-center gap-4 bg-elevated/30 border-dashed">
                        <div className="w-10 h-10 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
                            <stat.icon size={18} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">{stat.value}</div>
                            <div className="text-[10px] uppercase font-bold text-tertiary tracking-widest">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="table-container bg-secondary/50 border border-border overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-elevated/50">
                            <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-tertiary">Key Name</th>
                            <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-tertiary">Status</th>
                            <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-tertiary">Usage Health</th>
                            <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-tertiary">Requests (24h)</th>
                            <th className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest text-tertiary">Last Active</th>
                            <th className="px-6 py-4 text-right text-[10px] font-bold uppercase tracking-widest text-tertiary">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockKeys.map((key) => (
                            <tr key={key.id} className="border-t border-border hover:bg-glass/30 transition-colors group">
                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-bold text-sm text-primary uppercase tracking-tight">{key.name}</span>
                                        <span className="text-[11px] font-mono text-tertiary opacity-70">{key.preview}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${key.status === 'active' ? 'bg-success animate-pulse' : 'bg-error'}`}></span>
                                        <span className="text-xs font-bold capitalize text-secondary tracking-tight">{key.status}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-2">
                                        {key.health === 'healthy' ? (
                                            <div className="flex items-center gap-1.5 bg-success/10 text-success px-2 py-0.5 rounded text-[10px] font-bold">
                                                <CheckCircle2 size={12} />
                                                <span>STABLE</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 bg-error/10 text-error px-2 py-0.5 rounded text-[10px] font-bold">
                                                <ShieldAlert size={12} />
                                                <span>ISSUES</span>
                                            </div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-5 text-xs font-mono font-bold text-secondary">{key.requests}</td>
                                <td className="px-6 py-5 text-xs text-tertiary italic">{key.updated}</td>
                                <td className="px-6 py-5">
                                    <div className="flex justify-end gap-1">
                                        <button title="Copy ID" className="p-2 hover:bg-glass rounded-lg text-tertiary hover:text-primary transition-all">
                                            <Copy size={14} />
                                        </button>
                                        <button title="Rotate Key" className="p-2 hover:bg-glass rounded-lg text-tertiary hover:text-warning transition-all">
                                            <RotateCw size={14} />
                                        </button>
                                        <button title="Settings" className="p-2 hover:bg-glass rounded-lg text-tertiary hover:text-primary transition-all">
                                            <MoreHorizontal size={14} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Bottom Insight Card */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card p-6 border-dashed border-primary/20 bg-primary/5 flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                        <Key size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-base mb-1">Security Standards</h4>
                        <p className="text-xs text-secondary leading-relaxed mb-4">
                            All keys are hashed using SHA-256 before storage. We recommend rotating production keys every 90 days to maintain high security compliance.
                        </p>
                        <div className="flex gap-3">
                            <Button variant="secondary" size="sm" className="text-[10px] h-8">Rotate Policy</Button>
                            <Button variant="secondary" size="sm" className="text-[10px] h-8" icon={<ExternalLink size={12} />}>Audit Logs</Button>
                        </div>
                    </div>
                </div>

                <div className="card p-6 bg-elevated/30 flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-all">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-tertiary group-hover:text-primary transition-colors">
                            <Clock size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm">Automated Key Rotation</h4>
                            <p className="text-[11px] text-tertiary">Setup logic-based rotation schedules for enterprise security.</p>
                        </div>
                    </div>
                    <ChevronRight size={20} className="text-tertiary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <CreateKeyModal onClose={() => setIsCreateModalOpen(false)} />
                )}
            </AnimatePresence>
        </div>
    );
}
