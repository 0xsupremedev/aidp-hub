import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Server,
    Cpu,
    MapPin,
    Activity,
    Star,
    Clock,
    ShieldCheck,
    ChevronRight
} from 'lucide-react';

const nodes = [
    { id: 'node_1', name: 'Lambda Labs #04', gpu: '8x RTX 4090', location: 'Ashburn, US', latency: 45, uptime: 99.5, reputation: 4.9, jobs: 12420, status: 'online' },
    { id: 'node_2', name: 'CoreWeave #12', gpu: '4x A100 80GB', location: 'New York, US', latency: 62, uptime: 99.9, reputation: 5.0, jobs: 34521, status: 'online' },
    { id: 'node_3', name: 'DePIN Worker #88', gpu: '1x RTX 3090', location: 'London, UK', latency: 120, uptime: 98.0, reputation: 4.5, jobs: 3421, status: 'online' },
    { id: 'node_4', name: 'Hetzner GPU #2', gpu: '2x A6000', location: 'Frankfurt, DE', latency: 38, uptime: 99.0, reputation: 4.7, jobs: 8932, status: 'online' },
    { id: 'node_5', name: 'Vast.ai #127', gpu: '4x RTX 4080', location: 'Amsterdam, NL', latency: 55, uptime: 97.5, reputation: 4.4, jobs: 5621, status: 'busy' },
    { id: 'node_6', name: 'RunPod #55', gpu: '2x H100', location: 'San Jose, US', latency: 28, uptime: 99.8, reputation: 4.95, jobs: 45230, status: 'online' },
];

export default function Nodes() {
    const [selectedNode, setSelectedNode] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Node Explorer</h2>
                    <p className="text-secondary">Discover and connect to GPU providers on the AIDP network</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm">
                        <span className="status-dot status-dot-online status-pulse"></span>
                        <span className="text-accent-green font-medium">{nodes.filter(n => n.status === 'online').length} Online</span>
                    </div>
                    <div className="tabs" style={{ marginLeft: 'var(--space-4)' }}>
                        <button className={`tab ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>Grid</button>
                        <button className={`tab ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>List</button>
                    </div>
                </div>
            </div>

            {/* Stats Banner */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    { label: 'Total Nodes', value: '1,247', icon: Server, color: 'var(--color-primary)' },
                    { label: 'Total VRAM', value: '48.2 TB', icon: Cpu, color: 'var(--color-secondary)' },
                    { label: 'Avg Latency', value: '58ms', icon: Activity, color: 'var(--color-accent)' },
                    { label: 'Verified', value: '847', icon: ShieldCheck, color: 'var(--color-accent-green)' },
                ].map((stat) => (
                    <div key={stat.label} className="glass-card-static flex items-center gap-4" style={{ padding: 'var(--space-4)' }}>
                        <div style={{
                            width: 40,
                            height: 40,
                            borderRadius: 'var(--radius-lg)',
                            background: `color-mix(in srgb, ${stat.color} 15%, transparent)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <stat.icon size={20} style={{ color: stat.color }} />
                        </div>
                        <div>
                            <div className="text-xl font-bold">{stat.value}</div>
                            <div className="text-xs text-muted">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Node Grid */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-3 gap-4' : 'flex flex-col gap-3'}>
                {nodes.map((node) => (
                    <motion.div
                        key={node.id}
                        whileHover={{ scale: 1.01, y: -3 }}
                        onClick={() => setSelectedNode(node.id)}
                        className={`glass-card-static cursor-pointer ${selectedNode === node.id ? 'ring-2 ring-primary' : ''}`}
                        style={{ padding: 'var(--space-5)' }}
                    >
                        <div className="flex justify-between items-start" style={{ marginBottom: 'var(--space-3)' }}>
                            <div>
                                <div className="font-bold flex items-center gap-2">
                                    {node.name}
                                    <span className={`status-dot ${node.status === 'online' ? 'status-dot-online' : 'status-dot-warning'}`}></span>
                                </div>
                                <div className="text-sm text-muted flex items-center gap-1">
                                    <MapPin size={12} />
                                    {node.location}
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-warning">
                                <Star size={14} fill="currentColor" />
                                <span>{node.reputation}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2" style={{ marginBottom: 'var(--space-3)' }}>
                            <span className="badge badge-secondary">{node.gpu}</span>
                        </div>

                        <div className="grid grid-cols-3 gap-3 text-xs">
                            <div>
                                <div className="text-muted">Latency</div>
                                <div className="font-medium text-accent">{node.latency}ms</div>
                            </div>
                            <div>
                                <div className="text-muted">Uptime</div>
                                <div className="font-medium text-accent-green">{node.uptime}%</div>
                            </div>
                            <div>
                                <div className="text-muted">Jobs</div>
                                <div className="font-medium">{node.jobs.toLocaleString()}</div>
                            </div>
                        </div>

                        <div className="flex justify-end" style={{ marginTop: 'var(--space-4)' }}>
                            <button className="text-xs text-primary flex items-center gap-1 hover:underline">
                                View Details <ChevronRight size={12} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
