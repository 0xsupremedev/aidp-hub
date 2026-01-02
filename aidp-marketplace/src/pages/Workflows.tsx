import React from 'react';
import { motion } from 'framer-motion';
import { WorkflowBuilder } from '../components/WorkflowBuilder';
import {
    Layers,
    ArrowRightLeft,
    Link as LinkIcon,
    Zap,
    Activity,
    History,
    Sparkles
} from 'lucide-react';
import { Button } from '../components/ui/Button';

const Workflows: React.FC = () => {
    return (
        <div className="page-container p-8 max-w-7xl mx-auto">
            <header className="mb-12 flex items-end justify-between">
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 mb-4"
                    >
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <Layers size={18} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-secondary">Advanced Orchestration</span>
                    </motion.div>
                    <h1 className="text-4xl font-black tracking-tight mb-4">
                        AI <span className="text-primary italic">Workflows</span>
                    </h1>
                    <p className="text-secondary max-w-xl leading-relaxed">
                        Design and execute multi-stage AI pipelines across the decentralized AIDP network.
                        Chain inference, verification, and protocol actions seamlessly.
                    </p>
                </div>

                <div className="flex gap-4">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-tertiary font-bold uppercase">Active Pipelines</span>
                        <span className="text-2xl font-black">12.4K</span>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-12 gap-8">
                {/* Main Workflow Builder Area */}
                <div className="col-span-12">
                    <WorkflowBuilder />
                </div>

                {/* Automation Templates */}
                <div className="col-span-8">
                    <div className="section-header flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Sparkles size={20} className="text-primary" />
                            Pre-built Templates
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { title: 'RLHF Training Loop', steps: 4, type: 'Training' },
                            { title: 'RAG Knowledge Injection', steps: 3, type: 'Inference' },
                            { title: 'Content Moderation Pipe', steps: 2, type: 'Safety' },
                            { title: 'Automated PoR Audit', steps: 5, type: 'Verification' }
                        ].map((template, i) => (
                            <div key={i} className="card p-5 group cursor-pointer hover:border-primary/40 transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 rounded-lg bg-bg-primary text-secondary">
                                        <Activity size={16} />
                                    </div>
                                    <span className="text-[9px] font-black uppercase text-tertiary px-2 py-0.5 border border-border rounded-full">
                                        {template.type}
                                    </span>
                                </div>
                                <h4 className="font-bold mb-1">{template.title}</h4>
                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-[10px] text-tertiary">{template.steps} Steps</span>
                                    <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowRightLeft size={14} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Workflow Stats */}
                <div className="col-span-4">
                    <div className="card p-6 h-full flex flex-col">
                        <h3 className="text-[11px] font-black uppercase tracking-widest text-tertiary mb-6">Execution Stats</h3>

                        <div className="space-y-6 flex-1">
                            <div>
                                <div className="flex justify-between text-xs mb-2">
                                    <span className="text-secondary">Network Saturation</span>
                                    <span className="font-bold">78%</span>
                                </div>
                                <div className="h-1.5 w-full bg-bg-primary rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[78%]" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-elevated/50 border border-border">
                                    <span className="block text-[9px] text-tertiary font-bold uppercase mb-1">Avg. Cost</span>
                                    <span className="text-lg font-black">$0.42</span>
                                </div>
                                <div className="p-4 rounded-xl bg-elevated/50 border border-border">
                                    <span className="block text-[9px] text-tertiary font-bold uppercase mb-1">Verify Time</span>
                                    <span className="text-lg font-black text-success">8ms</span>
                                </div>
                            </div>

                            <div className="mt-auto pt-6 border-t border-dashed border-border flex flex-col gap-3">
                                <div className="flex items-center gap-2 text-[10px] text-tertiary">
                                    <History size={12} />
                                    <span>Last updated: 2 mins ago</span>
                                </div>
                                <Button className="w-full" variant="outline" size="sm" icon={<LinkIcon size={14} />}>
                                    View on Explorer
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Workflows;
