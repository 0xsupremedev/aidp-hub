import {
    Key,
    Lock,
    ShieldCheck,
    RotateCcw,
    Download,
    AlertTriangle,
    Activity,
    Smartphone,
    Laptop,
    Trash2,
    Fingerprint
} from 'lucide-react'
import { Button } from '../../components/ui/Button'

export default function SecuritySettings() {
    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <header>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Security & Identity</h1>
                <p className="text-secondary text-lg">Protect your account, sessions, and cryptographic compute identity.</p>
            </header>

            {/* Section A: Authentication */}
            <section className="card p-8 space-y-8">
                <h2 className="text-xl font-bold border-b border-border pb-6">Authentication</h2>

                <div className="space-y-6">
                    {/* Password */}
                    <div className="flex items-center justify-between p-6 bg-bg-secondary rounded-2xl border border-border">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-elevated flex items-center justify-center text-tertiary">
                                <Lock size={20} />
                            </div>
                            <div>
                                <div className="font-bold">Password</div>
                                <div className="text-xs text-tertiary">Last changed 4 months ago.</div>
                            </div>
                        </div>
                        <Button variant="secondary" size="sm">Change Password</Button>
                    </div>

                    {/* 2FA */}
                    <div className="flex items-center justify-between p-6 bg-success/5 border border-success/20 rounded-2xl">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center text-success">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <div className="font-bold">Two-Factor Authentication</div>
                                <div className="text-xs text-secondary">Secured with Google Authenticator.</div>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="border-success/30 text-success hover:bg-success/5">Manage 2FA</Button>
                    </div>

                    {/* Passkeys */}
                    <div className="flex items-center justify-between p-6 bg-bg-secondary rounded-2xl border border-border group hover:border-primary/50 transition-all cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-elevated flex items-center justify-center text-tertiary group-hover:text-primary transition-colors">
                                <Fingerprint size={20} />
                            </div>
                            <div>
                                <div className="font-bold">Passkeys <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded ml-2">NEW</span></div>
                                <div className="text-xs text-tertiary">Use biometric auth (TouchID/Windows Hello).</div>
                            </div>
                        </div>
                        <Button variant="secondary" size="sm">Add Passkey</Button>
                    </div>
                </div>
            </section>

            {/* Section B: API & Cryptographic Identity */}
            <section className="card p-8 space-y-8 border-primary/20 bg-primary/5">
                <div className="flex items-center justify-between border-b border-border/50 pb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <Key size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Cryptographic Identity</h2>
                            <p className="text-xs text-secondary mt-1">This key signs your decentralized compute requests.</p>
                        </div>
                    </div>
                    <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-1 rounded">HEALTHY</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="p-6 bg-bg-primary rounded-2xl border border-border border-dashed">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-[10px] font-bold text-tertiary uppercase tracking-widest">Active Signing Key</span>
                                <span className="text-[10px] font-mono text-tertiary">Rotated 5h ago</span>
                            </div>
                            <code className="text-xs font-mono text-secondary block truncate mb-4 p-2 bg-elevated rounded">ed25519_pub_8v2h8934hf...92f23</code>
                            <div className="flex gap-2">
                                <Button size="sm" variant="secondary" className="flex-1" icon={<RotateCcw size={14} />}>Rotate Key</Button>
                                <Button size="sm" variant="secondary" className="flex-1" icon={<Download size={14} />}>Download Public</Button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-bold text-tertiary uppercase tracking-widest px-2">
                            <span>Rotation Policy</span>
                            <span className="text-primary">Every 30 Days</span>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center gap-4 bg-bg-primary/50 p-6 rounded-2xl border border-border">
                        <div className="flex items-start gap-4 text-error">
                            <AlertTriangle size={24} className="shrink-0" />
                            <div>
                                <div className="font-bold text-sm">Action Impact Warning</div>
                                <p className="text-xs leading-relaxed mt-1 opacity-80">
                                    Rotating your signing key will invalidate all active cli-sessions and pending ZK-proofs. Ensure your local SDK is updated after rotation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section C: Active Sessions */}
            <section className="card p-8 space-y-8">
                <div className="flex items-center justify-between border-b border-border pb-6">
                    <h2 className="text-xl font-bold">Active Sessions</h2>
                    <Button variant="outline" size="sm" className="text-error border-error/20 hover:bg-error/5">Logout All Sessions</Button>
                </div>

                <div className="space-y-4">
                    {[
                        { device: 'Chrome on MacOS', location: 'India', status: 'Active now', current: true, icon: Laptop },
                        { device: 'CLI Tool v0.4.2', location: 'Germany', status: 'Last active 2h ago', current: false, icon: Activity },
                        { device: 'iPhone 15 Pro', location: 'Singapore', status: 'Last active 3d ago', current: false, icon: Smartphone },
                    ].map((session, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-glass transition-all border border-transparent hover:border-border group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-bg-secondary flex items-center justify-center text-tertiary">
                                    <session.icon size={20} />
                                </div>
                                <div>
                                    <div className="text-sm font-bold flex items-center gap-2">
                                        {session.device}
                                        {session.current && <span className="text-[9px] bg-success/10 text-success px-1.5 py-0.5 rounded">THIS DEVICE</span>}
                                    </div>
                                    <div className="text-[10px] text-tertiary">{session.location} • {session.status}</div>
                                </div>
                            </div>
                            {!session.current && (
                                <button className="p-2 text-tertiary hover:text-error transition-colors opacity-0 group-hover:opacity-100">
                                    <Trash2 size={16} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Section D: Security Logs */}
            <section className="card p-8 space-y-6">
                <h2 className="text-xl font-bold">Detailed Security Log</h2>
                <div className="space-y-3">
                    {[
                        { event: 'Signing Key Rotated', date: 'Jan 01, 2026 18:42:15', status: 'success' },
                        { event: 'Login attempt from untrusted IP', date: 'Dec 28, 2025 04:12:01', status: 'warning' },
                        { event: '2FA Recovery codes generated', date: 'Dec 24, 2025 09:12:33', status: 'success' },
                    ].map((log, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border/50 text-[10px] font-medium bg-bg-secondary/30">
                            <div className="flex items-center gap-3">
                                <div className={`w-1.5 h-1.5 rounded-full ${log.status === 'success' ? 'bg-success' : 'bg-warning'}`}></div>
                                <span className="text-secondary">{log.event}</span>
                            </div>
                            <span className="text-tertiary font-mono">{log.date}</span>
                        </div>
                    ))}
                </div>
                <Button variant="secondary" size="sm" className="w-full">View Audit Timeline</Button>
            </section>
        </div>
    )
}
