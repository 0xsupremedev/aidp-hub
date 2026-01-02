import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Rocket,
    Github,
    Twitter,
    Play,
    Cpu,
    Link as LinkIcon,
    User,
    CheckCircle2,
    ArrowRight,
    Search,
    Loader2,
    ShieldCheck,
    AlertCircle
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useNavigate } from 'react-router-dom'

export default function SubmitProject() {
    const navigate = useNavigate()
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
        setTimeout(() => navigate('/campaign'), 3000)
    }

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center text-success"
                >
                    <CheckCircle2 size={40} />
                </motion.div>
                <div className="space-y-2">
                    <h2 className="text-3xl font-bold">Project Submitted!</h2>
                    <p className="text-secondary">Your submission is being reviewed for the AIDP ecosystem prizes.</p>
                </div>
                <p className="text-xs text-tertiary animate-pulse italic">Redirecting to campaign hub...</p>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto flex flex-col gap-10">
            <div className="space-y-4">
                <div className="flex items-center gap-3 text-primary font-bold uppercase tracking-[0.2em] text-[10px]">
                    <Rocket size={14} /> Ecosystem Rewards
                </div>
                <h1 className="text-4xl font-bold">Submit Your Project</h1>
                <p className="text-secondary">Whether you built it or brought it, link it here to qualify for the 350 USDC prizes.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <form onSubmit={handleSubmit} className="card p-8 space-y-8 bg-elevated/40">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Project Basics */}
                            <div className="space-y-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-bold text-tertiary uppercase tracking-widest">Project Name</label>
                                    <input required className="input bg-bg-primary" placeholder="e.g. Solaris AI Agent" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-bold text-tertiary uppercase tracking-widest">GitHub Repository</label>
                                    <div className="relative">
                                        <Github size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" />
                                        <input required className="input bg-bg-primary pl-10" placeholder="https://github.com/..." />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-bold text-tertiary uppercase tracking-widest">X / Twitter Link</label>
                                    <div className="relative">
                                        <Twitter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" />
                                        <input required className="input bg-bg-primary pl-10" placeholder="https://x.com/..." />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-[10px] font-bold text-tertiary uppercase tracking-widest">Demo Video URL</label>
                                    <div className="relative">
                                        <Play size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" />
                                        <input required className="input bg-bg-primary pl-10" placeholder="Loom/Youtube link" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-tertiary uppercase tracking-widest">GPU Usage Explanation</label>
                            <textarea
                                required
                                className="input bg-bg-primary min-h-[120px] py-4"
                                placeholder="How does your project use AIDP's decentralized compute?"
                            ></textarea>
                        </div>

                        <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl flex items-center gap-6 group hover:bg-primary/10 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                <User size={24} />
                            </div>
                            <div className="flex-1 space-y-1">
                                <label className="text-[10px] font-bold text-primary uppercase tracking-widest">Referrer Details (Optional)</label>
                                <input className="input bg-transparent border-0 border-b border-primary/20 rounded-none p-0 focus:ring-0 placeholder:text-primary/30" placeholder="Name or Wallet address of who brought you..." />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-border/50">
                            <p className="text-xs text-tertiary leading-relaxed max-w-[400px]">
                                By submitting, you agree to make your repository public and acknowledge that rewards are subject to the judging criteria.
                            </p>
                            <Button type="submit" size="lg" icon={<ArrowRight size={18} />}>Submit Listing</Button>
                        </div>
                    </form>
                </div>

                {/* Verification Sidebar */}
                <div className="flex flex-col gap-6">
                    <div className="card p-6 border-primary/20 bg-primary/5">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2 mb-4">
                            <ShieldCheck size={14} /> Compute Requirement
                        </h4>
                        <p className="text-[11px] text-secondary leading-relaxed mb-6">
                            To qualify for rewards, your project must have used AIDP compute at least once. Please verify a valid **Job ID**.
                        </p>

                        <div className="space-y-4">
                            <div className="relative">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" />
                                <input className="input pl-10 text-xs py-2.5 h-auto bg-bg-primary" placeholder="Enter Job ID (e.g. job_492)" />
                            </div>
                            <Button variant="outline" size="sm" className="w-full text-[10px]" icon={<Loader2 size={12} className="opacity-40" />}>
                                Validate Job
                            </Button>
                        </div>

                        <div className="mt-6 p-3 rounded-lg bg-success/10 border border-success/20 animate-in fade-in slide-in-from-top-2 duration-500 hidden">
                            <div className="flex items-center gap-2 text-success font-bold text-[10px]">
                                <CheckCircle2 size={12} /> VERIFIED COMPUTE
                            </div>
                            <p className="text-[9px] text-success/80 mt-1">PoR verified. Qualifies for Tier 1 pools.</p>
                        </div>

                        <div className="mt-6 p-4 rounded-lg bg-elevated/50 border border-border italic text-[10px] text-tertiary text-center">
                            "Enter a Job ID to verify..."
                        </div>
                    </div>

                    <div className="card p-6 border-dashed border-border/50">
                        <h4 className="text-[10px] font-bold text-tertiary uppercase tracking-widest mb-3">Judging Tip</h4>
                        <p className="text-[11px] text-muted leading-relaxed">
                            In-depth usage of AIDP GPUs (e.g., long-running training or massive rendering batch) is weighted higher in scoring.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
