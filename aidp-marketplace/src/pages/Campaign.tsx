import { motion } from 'framer-motion'
import {
    Award,
    Gift,
    Rocket,
    Github,
    Twitter,
    Cpu,
    ShieldCheck,
    Zap,
    Users,
    ChevronRight,
    ExternalLink,
    Box
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Link } from 'react-router-dom'

export default function Campaign() {
    return (
        <div className="flex flex-col gap-12 max-w-5xl mx-auto">
            {/* Hero Header */}
            <div className="relative rounded-3xl overflow-hidden bg-primary/5 border border-primary/20 p-8 md:p-12">
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary uppercase tracking-widest">
                            <Gift size={14} /> Ecosystem Campaign
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Build or Bring: <br /><span className="text-primary italic">The AIDP Rewards Era</span></h1>
                        <p className="text-lg text-secondary leading-relaxed">
                            Join our 2-week ecosystem marathon. Power global AI, ZK, and Gaming workloads. Earn a share of **350 USDC** in prizes.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to="/submit-project">
                                <Button size="lg" icon={<Rocket size={18} />}>Submit Project</Button>
                            </Link>
                            <Button variant="secondary" size="lg" icon={<Award size={18} />}>View Prizes</Button>
                        </div>
                    </div>
                    <div className="w-full md:w-64 aspect-square bg-elevated rounded-2xl flex items-center justify-center border border-border/50 relative">
                        <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full"></div>
                        <div className="text-center relative">
                            <div className="text-5xl font-black text-primary mb-1">2</div>
                            <div className="text-xs font-bold uppercase tracking-widest text-tertiary">Weeks Left</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Two Ways to Earn */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card p-8 border-dashed border-primary/30 bg-primary/5 hover:border-primary transition-all">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                        <Cpu size={28} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Option 1: Build</h3>
                    <p className="text-secondary leading-relaxed mb-6">
                        Create anything that runs GPU workloads on AIDP. AI agents, ZK proof generators, game engines, or custom scientific compute pipelines.
                    </p>
                    <ul className="space-y-3 mb-8">
                        {['AI / LLM Applications', 'Zero-Knowledge Proofs', 'Gaming & Rendering'].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm font-medium">
                                <ShieldCheck size={16} className="text-success" /> {item}
                            </li>
                        ))}
                    </ul>
                    <Button variant="outline" className="w-full">Start Building</Button>
                </div>

                <div className="card p-8 border-dashed border-accent/30 bg-accent/5 hover:border-accent transition-all">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                        <Users size={28} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">Option 2: Bring</h3>
                    <p className="text-secondary leading-relaxed mb-6">
                        Refer existing teams needing GPU acceleration. They list on the Marketplace, credit you as the referrer, and you win together.
                    </p>
                    <ul className="space-y-3 mb-8">
                        {['HPC & Scientific Compute', '3D Video Generation', 'DePIN / Node Tools'].map((item, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm font-medium">
                                <Zap size={16} className="text-warning" /> {item}
                            </li>
                        ))}
                    </ul>
                    <Button variant="outline" className="w-full">Refer Project</Button>
                </div>
            </div>

            {/* Prize Structure */}
            <div className="card p-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none"></div>
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">350 USDC Prizes</h2>
                        <p className="text-secondary">Rewarding technical depth and ecosystem value.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="text-center p-6 bg-elevated rounded-2xl border border-border">
                            <div className="text-2xl font-bold text-primary">350 USDC</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-tertiary mt-1">Best Compute Usage</div>
                        </div>
                        <div className="text-center p-6 bg-elevated rounded-2xl border border-border">
                            <div className="text-2xl font-bold text-accent">350 USDC</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-tertiary mt-1">Best Recruited Project</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Judging Criteria */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                    <ChevronRight className="text-primary" /> Judging Criteria
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        'Technical Execution',
                        'Integration Depth',
                        'Product Quality',
                        'User Experience',
                        'Scalability',
                        'Ecosystem Value',
                        'Social Traction',
                        'Originality'
                    ].map((item, i) => (
                        <div key={i} className="p-4 rounded-xl bg-glass border border-border text-xs font-bold text-center uppercase tracking-tight text-tertiary hover:text-primary hover:border-primary/50 transition-all cursor-default">
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* Token Info Footer */}
            <div className="card p-8 bg-secondary/30 border-dashed border-border mt-8">
                <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#14F195] flex items-center justify-center p-1.5 grayscale hover:grayscale-0 transition-all">
                                <svg viewBox="0 0 24 24" fill="black"><path d="M4.646 5.246l5.807 5.807 5.807-5.807 1.54 1.54L12 12.593l-5.807-5.807zM18.154 17.214l-5.807-5.807-5.807 5.807-1.54-1.54L12 9.867l5.807 5.807z" /></svg>
                            </div>
                            <h4 className="font-bold">AIDP Token (SOL)</h4>
                        </div>
                        <code className="text-xs bg-elevated p-2 rounded block border border-border select-all font-mono">
                            PLNk8NUTBeptajEX9GzZrxsYPJ1psnw62dPnWkGcyai
                        </code>
                    </div>
                    <div className="flex gap-8 text-center">
                        <div>
                            <div className="text-xl font-bold">AIDP</div>
                            <div className="text-[10px] text-tertiary uppercase font-bold">Symbol</div>
                        </div>
                        <div>
                            <div className="text-xl font-bold">18</div>
                            <div className="text-[10px] text-tertiary uppercase font-bold">Decimals</div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <a href="#" className="p-3 bg-glass rounded-xl hover:text-primary transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="p-3 bg-glass rounded-xl hover:text-primary transition-colors"><Github size={20} /></a>
                        <Button variant="secondary" icon={<ExternalLink size={14} />}>Dexscreener</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
