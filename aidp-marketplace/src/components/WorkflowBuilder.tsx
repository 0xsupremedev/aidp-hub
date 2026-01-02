import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Database,
    Cpu,
    ShieldCheck,
    Zap,
    ArrowRight,
    Play,
    Settings,
    Plus,
    X,
    CheckCircle2,
    Loader2
} from 'lucide-react';
import { Button } from './ui/Button';

interface WorkflowStep {
    id: string;
    type: 'inference' | 'verification' | 'protocol';
    name: string;
    model?: string;
    status: 'idle' | 'running' | 'completed' | 'error';
    icon: React.ReactNode;
}

const INITIAL_STEPS: WorkflowStep[] = [
    {
        id: '1',
        type: 'inference',
        name: 'LLM Inference',
        model: 'Llama 3 70B',
        status: 'idle',
        icon: <Cpu size={18} />
    },
    {
        id: '2',
        type: 'verification',
        name: 'PoR Verification',
        status: 'idle',
        icon: <ShieldCheck size={18} />
    },
    {
        id: '3',
        type: 'protocol',
        name: 'DAT Burn (20%)',
        status: 'idle',
        icon: <Zap size={18} />
    }
];

export const WorkflowBuilder: React.FC = () => {
    const [steps, setSteps] = useState<WorkflowStep[]>(INITIAL_STEPS);
    const [isRunning, setIsRunning] = useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(-1);

    const runWorkflow = async () => {
        setIsRunning(true);
        setCurrentStepIndex(0);

        const newSteps = [...steps].map(s => ({ ...s, status: 'idle' as const }));
        setSteps(newSteps);

        for (let i = 0; i < steps.length; i++) {
            setCurrentStepIndex(i);
            setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'running' } : s));

            // Simulate processing time
            await new Promise(resolve => setTimeout(resolve, 2000));

            setSteps(prev => prev.map((s, idx) => idx === i ? { ...s, status: 'completed' } : s));
        }

        setIsRunning(false);
        setCurrentStepIndex(-1);
    };

    const addStep = () => {
        const newStep: WorkflowStep = {
            id: Math.random().toString(36).substr(2, 9),
            type: 'inference',
            name: 'New Inference Job',
            model: 'GPT-4o Equivalent',
            status: 'idle',
            icon: <Cpu size={18} />
        };
        setSteps([...steps, newStep]);
    };

    const removeStep = (id: string) => {
        setSteps(steps.filter(s => s.id !== id));
    };

    return (
        <div className="card p-8 bg-elevated/30 border-primary/10 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Database size={240} className="text-primary" />
            </div>

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                        <Zap className="text-primary" size={24} />
                        AI Workflow Orchestrator
                        <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full uppercase tracking-tighter">Beta</span>
                    </h3>
                    <p className="text-sm text-secondary mt-1">Multi-stage pipeline automation (Section 8.1 - 13)</p>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={addStep}
                        disabled={isRunning}
                        icon={<Plus size={16} />}
                    >
                        Add Step
                    </Button>
                    <Button
                        size="sm"
                        onClick={runWorkflow}
                        disabled={isRunning}
                        icon={isRunning ? <Loader2 size={16} className="animate-spin" /> : <Play size={16} />}
                    >
                        {isRunning ? 'Executing...' : 'Run Pipeline'}
                    </Button>
                </div>
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    <AnimatePresence mode="popLayout">
                        {steps.map((step, index) => (
                            <React.Fragment key={step.id}>
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.8, x: -20 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.8, x: 20 }}
                                    className={`relative group shrink-0 w-64 p-5 rounded-2xl border-2 transition-all duration-500 ${step.status === 'running'
                                            ? 'border-primary bg-primary/5 shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]'
                                            : step.status === 'completed'
                                                ? 'border-success/50 bg-success/5'
                                                : 'border-border bg-elevated/50 grayscale opacity-60'
                                        }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className={`p-3 rounded-xl ${step.status === 'running' ? 'bg-primary text-white' : 'bg-bg-primary text-secondary'
                                            }`}>
                                            {step.icon}
                                        </div>

                                        {!isRunning && (
                                            <button
                                                onClick={() => removeStep(step.id)}
                                                className="text-tertiary hover:text-error transition-colors p-1"
                                            >
                                                <X size={14} />
                                            </button>
                                        )}

                                        {step.status === 'completed' && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="text-success"
                                            >
                                                <CheckCircle2 size={18} />
                                            </motion.div>
                                        )}
                                    </div>

                                    <div className="mt-4">
                                        <h4 className="font-bold text-sm">{step.name}</h4>
                                        <p className="text-[11px] text-tertiary mt-1 font-mono uppercase">
                                            {step.model || step.type}
                                        </p>
                                    </div>

                                    <div className="mt-4 flex flex-col gap-2">
                                        <div className="h-1 bg-bg-primary rounded-full overflow-hidden">
                                            {step.status === 'running' && (
                                                <motion.div
                                                    className="h-full bg-primary"
                                                    initial={{ width: "0%" }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ duration: 2, ease: "linear" }}
                                                />
                                            )}
                                            {step.status === 'completed' && <div className="h-full w-full bg-success" />}
                                        </div>
                                        <div className="text-[10px] text-tertiary flex justify-between">
                                            <span>{step.status.toUpperCase()}</span>
                                            {step.status === 'running' && <span>2.4s left</span>}
                                        </div>
                                    </div>

                                    <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-bg-primary border border-border flex items-center justify-center text-[10px] font-bold">
                                        {index + 1}
                                    </div>
                                </motion.div>

                                {index < steps.length - 1 && (
                                    <div className="flex shrink-0 items-center justify-center w-12 text-tertiary">
                                        <motion.div
                                            animate={{
                                                x: step.status === 'completed' ? [0, 5, 0] : 0,
                                                opacity: step.status === 'completed' ? 1 : 0.4,
                                                color: step.status === 'completed' ? 'var(--primary)' : 'currentColor'
                                            }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                        >
                                            <ArrowRight size={20} />
                                        </motion.div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/50 flex items-center justify-between">
                <div className="flex gap-8">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-tertiary font-bold uppercase tracking-widest">Total Savings</span>
                        <span className="text-md font-bold text-success">-84.2%</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-tertiary font-bold uppercase tracking-widest">Est. Latency</span>
                        <span className="text-md font-bold">142ms</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-elevated/50 border border-border">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-tight">Mainnet-Alpha Ready</span>
                </div>
            </div>
        </div>
    );
};
