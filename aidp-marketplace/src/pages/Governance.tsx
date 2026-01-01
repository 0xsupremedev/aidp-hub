import { motion } from 'framer-motion';
import {
    Gavel,
    Users,
    FileText,
    Vote,
    ArrowRight,
    TrendingUp
} from 'lucide-react';
import { Button } from '../components/ui/Button';

const proposals = [
    { id: 'AIP-012', title: 'Expand GPU Incentive Program', status: 'active', votesFor: '1.2M', votesAgainst: '42K', expires: '2 days' },
    { id: 'AIP-011', title: 'Whitelist H100 Node Operators', status: 'passed', votesFor: '4.8M', votesAgainst: '120K', expires: 'Closed' },
    { id: 'AIP-010', title: 'Update Settlement Multiplier', status: 'passed', votesFor: '3.1M', votesAgainst: '800K', expires: 'Closed' },
];

export default function Governance() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold">DAO Governance</h2>
                    <p className="text-secondary">Participate in AIDP protocol decisions and treasury management.</p>
                </div>
                <Button variant="primary" icon={<Plus size={18} />}>Create Proposal</Button>
            </div>

            <div className="grid grid-cols-3 gap-6">
                <div className="glass-card-static" style={{ padding: 'var(--space-5)' }}>
                    <div className="text-xs text-muted uppercase tracking-wider mb-2">Total Power</div>
                    <div className="text-3xl font-bold">24.5M <span className="text-sm text-tertiary">AIDP</span></div>
                    <div className="mt-4 flex items-center gap-2 text-accent-green text-sm">
                        <TrendingUp size={14} /> +12% from last epoch
                    </div>
                </div>
                <div className="glass-card-static" style={{ padding: 'var(--space-5)' }}>
                    <div className="text-xs text-muted uppercase tracking-wider mb-2">Active Proposals</div>
                    <div className="text-3xl font-bold">1</div>
                    <div className="mt-4 flex items-center gap-2 text-tertiary text-sm">
                        <Users size={14} /> 842 Voters participating
                    </div>
                </div>
                <div className="glass-card-static" style={{ padding: 'var(--space-5)' }}>
                    <div className="text-xs text-muted uppercase tracking-wider mb-2">Treasury Value</div>
                    <div className="text-3xl font-bold">$12.4M</div>
                    <div className="mt-4 flex items-center gap-2 text-primary text-sm">
                        <ArrowRight size={14} /> View Allocation
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold">Recent Proposals</h3>
                {proposals.map((prop) => (
                    <motion.div
                        key={prop.id}
                        whileHover={{ y: -2 }}
                        className="glass-card-static flex items-center justify-between"
                        style={{ padding: 'var(--space-5)' }}
                    >
                        <div className="flex items-center gap-5">
                            <div style={{
                                width: 44,
                                height: 44,
                                borderRadius: 'var(--radius-md)',
                                background: prop.status === 'active' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <FileText size={20} className={prop.status === 'active' ? 'text-primary' : 'text-tertiary'} />
                            </div>
                            <div>
                                <div className="text-xs text-muted mb-1">{prop.id}</div>
                                <div className="font-bold">{prop.title}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-12 text-right">
                            <div>
                                <div className="text-xs text-muted uppercase">Votes For</div>
                                <div className="font-bold text-accent-green">{prop.votesFor}</div>
                            </div>
                            <div>
                                <div className="text-xs text-muted uppercase">Status</div>
                                <div className={`badge ${prop.status === 'active' ? 'badge-primary' : 'badge-success'}`}>{prop.status.toUpperCase()}</div>
                            </div>
                            <Button variant="ghost" size="sm" icon={<ArrowRight size={16} />} iconPosition="right">Details</Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

const Plus = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);
