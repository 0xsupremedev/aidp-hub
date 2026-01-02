import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart3,
    Activity,
    Globe,
    Cpu,
    Server,
    TrendingUp,
    AlertTriangle,
    ArrowUpRight
} from 'lucide-react';
import { useAIDP } from '@aidp-sdk/hooks/useAIDP';
import { ComputeProvider } from '@aidp-sdk/types/aidp';
import { TreasuryFlywheel } from '../components/TreasuryFlywheel';

export default function Metrics() {
    const { getProviders } = useAIDP();
    const [providers, setProviders] = useState<ComputeProvider[]>([]);

    useEffect(() => {
        getProviders().then(setProviders);
    }, [getProviders]);

    return (
        <div className="flex flex-col gap-8">
            {/* Network Stats Overview */}
            <div className="grid grid-cols-4 gap-6">
                <div className="metric-card">
                    <div className="flex justify-between items-start" style={{ marginBottom: 'var(--space-2)' }}>
                        <span className="text-secondary text-sm">Network Capacity</span>
                        <Activity size={18} className="text-primary" />
                    </div>
                    <div className="text-2xl font-bold">1.2 PFLOPS</div>
                    <div className="metric-change metric-change-positive mt-1">
                        <ArrowUpRight size={14} /> 8.4% this wk
                    </div>
                </div>
                <div className="metric-card">
                    <div className="flex justify-between items-start" style={{ marginBottom: 'var(--space-2)' }}>
                        <span className="text-secondary text-sm">Active Providers</span>
                        <Server size={18} className="text-secondary" />
                    </div>
                    <div className="text-2xl font-bold">1,247</div>
                    <div className="text-xs text-tertiary mt-2">Global distribution</div>
                </div>
                <div className="metric-card">
                    <div className="flex justify-between items-start" style={{ marginBottom: 'var(--space-2)' }}>
                        <span className="text-secondary text-sm">Avg. Inference Cost</span>
                        <TrendingUp size={18} className="text-accent-green" />
                    </div>
                    <div className="text-2xl font-bold">$0.042</div>
                    <div className="text-xs text-tertiary mt-2">Per 1k tokens</div>
                </div>
                <div className="metric-card">
                    <div className="flex justify-between items-start" style={{ marginBottom: 'var(--space-2)' }}>
                        <span className="text-secondary text-sm">Avg. Uptime</span>
                        <Globe size={18} className="text-accent" />
                    </div>
                    <div className="text-2xl font-bold">99.98%</div>
                    <div className="text-xs text-tertiary mt-2">Last 30 days</div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Provider List */}
                <div className="col-span-8 glass-card-static" style={{ padding: 'var(--space-6)' }}>
                    <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-6)' }}>
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <Cpu size={20} className="text-primary" />
                            Compute Providers
                        </h3>
                        <div className="flex gap-2">
                            <span className="badge badge-neutral">H100</span>
                            <span className="badge badge-neutral">A100</span>
                            <span className="badge badge-neutral">RTX 4090</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        {providers.map((provider) => (
                            <div key={provider.id} className="provider-row" style={{ border: '1px solid var(--color-border)' }}>
                                <div style={{ width: 40, height: 40, background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Activity size={20} className="text-tertiary" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div className="font-bold text-sm">{provider.name}</div>
                                    <div className="text-xs text-tertiary">{provider.gpu} • {provider.location}</div>
                                </div>
                                <div style={{ textAlign: 'right', minWidth: '100px' }}>
                                    <div className="text-sm font-bold text-primary">{provider.latency}ms</div>
                                    <div className="text-xs text-muted">Latency</div>
                                </div>
                                <div style={{ textAlign: 'right', minWidth: '100px' }}>
                                    <div className="text-sm font-bold text-accent-green">{(provider.reliability * 100).toFixed(1)}%</div>
                                    <div className="text-xs text-muted">Reliability</div>
                                </div>
                                <div style={{ padding: '0 var(--space-4)' }}>
                                    <span className="status-dot status-dot-online status-pulse"></span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Global Latency Heatmap Placeholder & Treasury Flywheel */}
                <div className="col-span-4 flex flex-col gap-6">
                    <TreasuryFlywheel />

                    <div className="glass-card-static" style={{ padding: 'var(--space-6)' }}>
                        <h3 className="text-md font-bold" style={{ marginBottom: 'var(--space-4)' }}>Provider Uptime (90d)</h3>
                        <div className="uptime-grid">
                            {Array.from({ length: 96 }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`uptime-cell ${i === 42 ? 'uptime-cell-low' : i % 15 === 0 ? 'uptime-cell-medium' : 'uptime-cell-high'}`}
                                    title={`${i === 42 ? 'Downtime detected' : 'Healthy'}`}
                                />
                            ))}
                        </div>
                        <div className="flex justify-between items-center mt-4 text-xs text-muted">
                            <span>90 days ago</span>
                            <span>Today</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Network Alerts & Protocol Stats */}
            <div className="grid grid-cols-12 gap-8">
                <div className="col-span-8">
                    <div className="section-header">
                        <h2 className="text-xl font-bold">Network Alerts</h2>
                    </div>
                    <div className="card p-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                                <AlertTriangle className="text-red-500 shrink-0" size={20} />
                                <div>
                                    <div className="font-medium text-red-500">Provider Slashing Event</div>
                                    <div className="text-sm text-secondary">Node 0x7f...3a slashed 15% stake due to failed Proof-of-Resource (Section 15.2).</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
                                <Activity className="text-primary shrink-0" size={20} />
                                <div>
                                    <div className="font-medium text-primary">Decentralized Orchestration Upgrade</div>
                                    <div className="text-sm text-secondary">Phase 2 routing enabled. Orchestrators now computing optimal p* utility.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-4">
                    <div className="section-header">
                        <h2 className="text-xl font-bold">DAT Treasury (Section 13)</h2>
                    </div>
                    <div className="card p-6">
                        <div className="space-y-4">
                            <div className="p-4 rounded-lg bg-elevated/50">
                                <div className="text-sm text-secondary mb-1">Buyback (40% Revenue)</div>
                                <div className="text-lg font-bold text-primary">42.5K AIDP</div>
                            </div>
                            <div className="p-4 rounded-lg bg-elevated/50">
                                <div className="text-sm text-secondary mb-1">Burn (20% Fees)</div>
                                <div className="text-lg font-bold text-error">12.1K AIDP</div>
                            </div>
                            <div className="p-4 rounded-lg bg-elevated/50">
                                <div className="text-[10px] text-tertiary font-bold uppercase mb-2">Resource Weights</div>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                    <div className="text-[10px] p-1 bg-bg-primary rounded text-center opacity-80">Compute: 2.2x</div>
                                    <div className="text-[10px] p-1 bg-bg-primary rounded text-center opacity-80">Bandwidth: 1.5x</div>
                                    <div className="text-[10px] p-1 bg-bg-primary rounded text-center opacity-80">Storage: 1.0x</div>
                                    <div className="text-[10px] p-1 bg-bg-primary rounded text-center opacity-80">Sensor: 0.8x</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
