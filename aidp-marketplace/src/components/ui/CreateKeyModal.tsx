import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    X,
    Copy,
    Check,
    CheckCircle2,
    Shield
} from 'lucide-react'
import { Button } from './Button'

interface CreateKeyModalProps {
    onClose: () => void
}

export function CreateKeyModal({ onClose }: CreateKeyModalProps) {
    const [step, setStep] = useState(1)
    const [name, setName] = useState('')
    const [generating, setGenerating] = useState(false)
    const [copied, setCopied] = useState(false)
    const key = "sk_live_" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

    const handleCreate = () => {
        setGenerating(true)
        setTimeout(() => {
            setGenerating(false)
            setStep(2)
        }, 1500)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(key)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--space-4)'
        }}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)' }}
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="card shadow-2xl"
                style={{ width: '100%', maxWidth: 520, position: 'relative', zIndex: 1001 }}
            >
                <div className="card-header border-b border-border py-4 px-6 flex items-center justify-between">
                    <h3 className="font-bold text-lg">Create API Key</h3>
                    <button onClick={onClose} className="text-tertiary hover:text-primary transition-colors"><X size={20} /></button>
                </div>

                <div className="card-body p-6">
                    {step === 1 ? (
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-tertiary uppercase tracking-widest">Key Name</label>
                                <input
                                    className="input focus:border-primary transition-colors"
                                    placeholder="e.g. Production Main"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    autoFocus
                                />
                                <p className="text-[11px] text-muted">Identify this key in your logs and activity stream.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-3">
                                    <label className="text-xs font-semibold text-tertiary uppercase tracking-widest">Permissions</label>
                                    <div className="flex flex-col gap-2.5">
                                        <label className="flex items-center gap-2.5 text-sm cursor-pointer group">
                                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 bg-elevated" />
                                            <span className="group-hover:text-primary transition-colors">Read Access</span>
                                        </label>
                                        <label className="flex items-center gap-2.5 text-sm cursor-pointer group">
                                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 bg-elevated" />
                                            <span className="group-hover:text-primary transition-colors">Write Access</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <label className="text-xs font-semibold text-tertiary uppercase tracking-widest">Environment</label>
                                    <div className="flex flex-col gap-2.5">
                                        <label className="flex items-center gap-2.5 text-sm cursor-pointer group">
                                            <input type="radio" name="env" defaultChecked className="w-4 h-4 text-primary focus:ring-primary/20 bg-elevated" />
                                            <span className="group-hover:text-primary transition-colors">Production</span>
                                        </label>
                                        <label className="flex items-center gap-2.5 text-sm cursor-pointer group">
                                            <input type="radio" name="env" className="w-4 h-4 text-primary focus:ring-primary/20 bg-elevated" />
                                            <span className="group-hover:text-primary transition-colors">Development</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-4 border-t border-border pt-6">
                                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                                <Button
                                    disabled={!name || generating}
                                    onClick={handleCreate}
                                    style={{ minWidth: 140 }}
                                >
                                    {generating ? 'Generating...' : 'Create Key'}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col items-center gap-3 text-center py-4">
                                <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mb-1">
                                    <CheckCircle2 size={28} className="text-success" />
                                </div>
                                <h4 className="font-bold text-xl">API Key Generated</h4>
                                <p className="text-sm text-secondary leading-relaxed px-4">
                                    Copy and store this key securely. It will not be shown again for security reasons.
                                </p>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-xl relative group">
                                    <code className="flex-1 text-sm font-mono truncate text-primary font-bold pr-10">{key}</code>
                                    <button
                                        onClick={copyToClipboard}
                                        className="p-2 hover:bg-primary/10 rounded-lg transition-colors absolute right-2"
                                    >
                                        {copied ? <Check size={18} className="text-success" /> : <Copy size={18} />}
                                    </button>
                                </div>

                                <div className="flex items-start gap-3 p-4 bg-warning/5 border border-warning/20 rounded-xl">
                                    <Shield size={20} className="text-warning mt-0.5 shrink-0" />
                                    <p className="text-xs text-warning leading-normal font-medium">
                                        <b>No trust required:</b> Even without a key, you can verify network proofs. However, this key is required for private compute quotas.
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 p-4 bg-elevated/50 rounded-xl border border-border">
                                <span className="text-[10px] font-bold text-tertiary uppercase tracking-[0.2em] mb-1">Next Steps</span>
                                <div className="flex flex-col gap-2.5">
                                    <div className="flex items-center gap-3 text-xs text-secondary">
                                        <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary border border-primary/20">1</span>
                                        Add to your <code>.env</code> file as <code>AIDP_API_KEY</code>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-secondary">
                                        <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary border border-primary/20">2</span>
                                        Initialize the SDK in your application
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center mt-2">
                                <Button onClick={onClose} style={{ width: '100%', height: 48 }}>Finish Setup</Button>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    )
}
