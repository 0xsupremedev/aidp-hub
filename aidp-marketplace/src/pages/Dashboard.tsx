import { motion } from 'framer-motion'
import {
    Activity,
    Zap,
    Clock,
    Shield,
    CheckCircle2,
    ChevronRight,
    BarChart3,
    Box,
    CreditCard,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Lock,
    Cpu
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

// --- Trust-Centric Dashboard with Live Job Timeline ---
export default function Dashboard() {
    return (
        <div className="flex flex-col gap-8">
            {/* Header Area - Authoritative */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome back, supremedev</h1>
                    <p className="text-secondary flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-success"></span>
                        All systems operational. Network reachability at 99.98%.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" size="sm" icon={<BarChart3 size={16} />}>Detailed Logs</Button>
                    <Link to="/playground">
                        <Button variant="outline" size="sm" icon={<Activity size={16} />}>Open Playground</Button>
                    </Link>
                </div>
            </div>

            {/* 1. KPI Grid - Horizontal Refactor */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                    { label: 'Total Jobs', value: 1284, prefix: '', trend: '+12.5%', positive: true, icon: Zap },
                    { label: 'Compute Time', value: 42.5, suffix: 'h', trend: '+5.2%', positive: true, icon: Clock },
                    { label: 'Cost Savings', value: 842.10, prefix: '$', trend: '+18.4%', positive: true, icon: CreditCard },
                    { label: 'Active GPUs', value: 24, prefix: '', trend: '-2', positive: false, icon: Box }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="card p-5 group hover:border-primary/30 transition-all cursor-default relative overflow-hidden"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <stat.icon size={20} />
                            </div>
                            <motion.div
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                className={`flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${stat.positive ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}
                            >
                                {stat.positive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                                {stat.trend}
                            </motion.div>
                        </div>
                        <div className="text-3xl font-bold tracking-tight mb-1">
                            {stat.prefix}
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                            >
                                {stat.value.toLocaleString()}
                            </motion.span>
                            {stat.suffix}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-tertiary">{stat.label}</div>

                        {/* Hover Decoration */}
                        <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
                    </motion.div>
                ))}
            </div>

            {/* 2. Center Gravity: Live Job Timeline */}
            <div className="card bg-elevated/30 border-dashed border-border/50">
                <div className="card-header py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                        <span className="text-xs font-bold uppercase tracking-widest">Active Pipeline Status</span>
                    </div>
                    <span className="text-[10px] font-mono text-tertiary">Real-time routing enabled</span>
                </div>
                <div className="card-body py-8 px-12">
                    <div className="flex items-center justify-between relative">
                        {/* Progress Line */}
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-border -translate-y-1/2 z-0"></div>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '65%' }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            className="absolute top-1/2 left-0 h-[1px] bg-primary -translate-y-1/2 z-0"
                        ></motion.div>

                        {[
                            { label: 'Job Submitted', icon: Activity, status: 'complete' },
                            { label: 'Routed', icon: Search, status: 'complete' },
                            { label: 'Executing', icon: Cpu, status: 'active' },
                            { label: 'Proofs', icon: Shield, status: 'pending' },
                            { label: 'Settled', icon: Lock, status: 'pending' },
                        ].map((step, i) => (
                            <div key={i} className="flex flex-col items-center gap-3 relative z-10 w-24">
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${step.status === 'complete' ? 'bg-success/10 border-success text-success' :
                                        step.status === 'active' ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]' :
                                            'bg-elevated border-border text-tertiary'
                                        }`}
                                >
                                    <step.icon size={18} className={step.status === 'active' ? 'animate-pulse' : ''} />
                                </motion.div>
                                <span className={`text-[10px] font-bold text-center uppercase tracking-tight ${step.status === 'complete' ? 'text-secondary' :
                                    step.status === 'active' ? 'text-primary' :
                                        'text-tertiary'
                                    }`}>{step.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 3. Left Column: Trust-Centric Activity (Badge Refactor) */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="card">
                        <div className="card-header flex items-center justify-between py-4">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-tertiary">Verification Stream</h3>
                            <div className="flex items-center gap-1.5 text-[10px] font-medium text-secondary">
                                Sorted by: Latest Verification
                            </div>
                        </div>
                        <div className="card-body p-0">
                            {[
                                { model: 'mistral-7b-v0.2', id: 'job_492', cost: '0.042 AIDP', time: '2.4s' },
                                { model: 'stable-diffusion-xl', id: 'job_491', cost: '0.128 AIDP', time: '8.1s' },
                                { model: 'llama-3-8b', id: 'job_490', cost: '0.015 AIDP', time: '0.8s' },
                            ].map((job, i) => (
                                <div key={i} className="px-6 py-6 border-b border-border last:border-0 hover:bg-glass/30 transition-all group leading-[1.6]">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="font-bold text-base group-hover:text-primary transition-colors">{job.model}</div>
                                            <div className="text-[11px] font-mono text-tertiary">#{job.id}</div>
                                        </div>
                                        <div className="text-xs font-mono text-tertiary text-right">
                                            {job.cost} <br />
                                            <span className="text-[10px] opacity-60">{job.time} execution</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {[
                                            { label: 'PoR', icon: Shield, color: 'success' },
                                            { label: 'PoD', icon: CheckCircle2, color: 'success' },
                                            { label: 'Uptime 100%', icon: Activity, color: 'info' }
                                        ].map((badge, j) => (
                                            <div key={j} className={`badge badge-${badge.color} px-2.5 py-1 rounded-md text-[10px] font-bold flex items-center gap-1.5 cursor-help hover:scale-105 transition-transform`}>
                                                <badge.icon size={12} />
                                                <span>{badge.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 4. Proof Registry Card */}
                    <Link to="/api-keys" className="card p-6 flex items-center justify-between group hover:border-primary/50 transition-all bg-primary/5 border-primary/20">
                        <div className="flex gap-4 items-center">
                            <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary bg-primary/10">
                                <Lock size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-base mb-1">Proof Registry</h4>
                                <div className="flex items-center gap-4 text-xs text-secondary">
                                    <span className="flex items-center gap-1"><Zap size={12} /> 12,842 total proofs</span>
                                    <span className="flex items-center gap-1"><Clock size={12} /> 82ms avg verif</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 font-bold text-sm text-primary group-hover:translate-x-1 transition-transform">
                            View Registry <ChevronRight size={18} />
                        </div>
                    </Link>
                </div>

                {/* 5. Right Column: Network Health (Visual Refactor) */}
                <div className="flex flex-col gap-6">
                    <div className="card">
                        <div className="card-header py-4 bg-glass border-b border-border">
                            <div className="flex items-center justify-between w-full">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-secondary">Network Vitals</h3>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-success bg-success/10 px-2 py-0.5 rounded-full border border-success/20">
                                    OPTIMAL
                                </div>
                            </div>
                        </div>
                        <div className="card-body flex flex-col items-center py-10 gap-8">
                            {/* Larger Donut Gauge - Fixed Clipping */}
                            <div className="relative w-44 h-44 flex items-center justify-center">
                                <svg
                                    width="176"
                                    height="176"
                                    viewBox="0 0 176 176"
                                    className="-rotate-90"
                                    style={{ overflow: 'visible' }}
                                >
                                    <circle
                                        cx="88"
                                        cy="88"
                                        r="72"
                                        fill="none"
                                        stroke="var(--color-border)"
                                        strokeWidth="12"
                                        strokeOpacity="0.3"
                                    />
                                    <motion.circle
                                        cx="88"
                                        cy="88"
                                        r="72"
                                        fill="none"
                                        stroke="var(--color-primary)"
                                        strokeWidth="12"
                                        strokeDasharray="452" // 2 * PI * 72
                                        initial={{ strokeDashoffset: 452 }}
                                        animate={{ strokeDashoffset: 452 * (1 - 0.68) }}
                                        transition={{ duration: 2, ease: "easeOut" }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-4xl font-bold tracking-tighter">68%</span>
                                    <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest">Global Load</span>
                                </div>
                            </div>

                            <div className="w-full space-y-5 px-2">
                                {[
                                    { label: 'US-East Cluster', load: 78 },
                                    { label: 'EU-West Cluster', load: 62 },
                                    { label: 'Asia-Pacific', load: 51 },
                                ].map((region, i) => (
                                    <div key={i} className="flex flex-col gap-2">
                                        <div className="flex justify-between text-[11px] font-bold uppercase">
                                            <span className="text-secondary">{region.label}</span>
                                            <span className="text-tertiary">{region.load}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-elevated rounded-full overflow-hidden border border-white/5">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${region.load}%` }}
                                                transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                                className="h-full bg-primary"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="card-footer py-3 bg-glass border-t border-border flex items-center justify-center gap-4 text-[10px] font-mono text-tertiary">
                            <span>Failure Rate: 0.03%</span>
                            <span className="w-1 h-1 bg-tertiary rounded-full"></span>
                            <span>No trust required.</span>
                        </div>
                    </div>

                    {/* Verifiable Prompt */}
                    <div className="card bg-success/5 border-success/20 p-5">
                        <div className="flex items-start gap-3">
                            <Shield size={20} className="text-success shrink-0" />
                            <div>
                                <h4 className="text-sm font-bold mb-1">Decentralized Trust</h4>
                                <p className="text-[11px] text-secondary leading-relaxed">
                                    Inference is cryptographically signed by executor nodes and verified by the network protocol.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
