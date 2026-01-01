import {
    User,
    Zap,
    ShieldAlert,
    Building2,
    ArrowRight,
    Languages,
    Clock
} from 'lucide-react'
import { Button } from '../../components/ui/Button'

export default function AccountSettings() {
    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <header>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Account Settings</h1>
                <p className="text-secondary text-lg">Manage your identity, organization, and compute preferences.</p>
            </header>

            {/* Section A: Profile & Identity */}
            <section className="card p-8 space-y-8">
                <div className="flex items-center justify-between border-b border-border pb-6">
                    <h2 className="text-xl font-bold">Profile & Identity</h2>
                    <span className="text-[10px] font-bold text-success bg-success/10 px-2 py-1 rounded">VERIFIED IDENTITY</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary relative group cursor-pointer">
                            <User size={40} />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[10px] font-bold rounded-2xl transition-all">CHANGE</div>
                        </div>
                        <div className="space-y-1">
                            <div className="font-bold text-lg">supremedev</div>
                            <div className="text-sm text-tertiary">Member since Jan 2026</div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] font-bold text-tertiary uppercase tracking-widest">Email Address</label>
                            <div className="flex gap-3">
                                <input className="input flex-1 bg-bg-secondary" defaultValue="supremedev@microapi.dev" readOnly />
                                <Button variant="secondary" size="sm">Verify</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-tertiary uppercase tracking-widest">Timezone</label>
                        <div className="relative group">
                            <Clock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" />
                            <select className="input pl-10 bg-bg-secondary appearance-none">
                                <option>UTC +5:30 (India)</option>
                                <option>UTC -8:00 (Pacific)</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-tertiary uppercase tracking-widest">Preferred Language</label>
                        <div className="relative">
                            <Languages size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" />
                            <select className="input pl-10 bg-bg-secondary appearance-none">
                                <option>English (US)</option>
                                <option>Hindi</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section B: Organization Context */}
            <section className="card p-8 space-y-8">
                <div className="flex items-center justify-between border-b border-border pb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                            <Building2 size={24} />
                        </div>
                        <h2 className="text-xl font-bold">Organization</h2>
                    </div>
                    <Button variant="outline" size="sm">Create New</Button>
                </div>

                <div className="flex items-center justify-between p-6 bg-elevated rounded-2xl border border-border group hover:border-primary/50 transition-all">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center bg-bg-primary">
                            <span className="font-bold text-lg">M</span>
                        </div>
                        <div>
                            <div className="font-bold">MicroAPI <span className="text-[10px] text-primary font-bold ml-2 bg-primary/10 px-1.5 py-0.5 rounded">OWNER</span></div>
                            <div className="text-xs text-tertiary">ID: org_id_1284_micro</div>
                        </div>
                    </div>
                    <Button variant="secondary" size="sm" icon={<ArrowRight size={14} />}>Switch Organization</Button>
                </div>
            </section>

            {/* Section C: Default Compute Preferences */}
            <section className="card p-8 space-y-8">
                <div className="flex items-center justify-between border-b border-border pb-6">
                    <h2 className="text-xl font-bold">Default Compute Preferences</h2>
                    <span className="text-[10px] text-tertiary font-bold uppercase tracking-widest">Applied to all new requests</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold text-tertiary uppercase tracking-widest">Preferred Region</label>
                                <span className="text-[10px] font-bold text-primary">AUTO-ROUTING ENABLED</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {['Auto', 'US-East', 'EU-West', 'Asia-Pac'].map(r => (
                                    <button key={r} className={`px-4 py-2 text-xs font-bold rounded-lg border ${r === 'Auto' ? 'border-primary bg-primary/5 text-primary' : 'border-border text-tertiary hover:border-border-hover'}`}>
                                        {r}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <label className="text-[10px] font-bold text-tertiary uppercase tracking-widest">Proof Strictness</label>
                            </div>
                            <div className="space-y-2">
                                {['Standard', 'Strict (No Slashing)', 'ZK-Verified Only'].map(s => (
                                    <button key={s} className={`w-full text-left px-4 py-3 text-xs font-bold rounded-xl border ${s === 'Standard' ? 'border-primary bg-primary/5 text-primary shadow-sm' : 'border-border text-tertiary hover:border-border-hover'}`}>
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between text-[10px] font-bold text-tertiary uppercase tracking-widest">
                                <span>Optimization Strategy</span>
                                <span className="text-primary italic">Balanced</span>
                            </div>
                            <input type="range" className="w-full accent-primary" />
                            <div className="flex justify-between text-[9px] font-bold text-tertiary uppercase">
                                <span>Low Cost</span>
                                <span>Low Latency</span>
                            </div>
                        </div>

                        <div className="p-6 bg-bg-secondary rounded-2xl border border-border border-dashed">
                            <div className="flex items-center gap-3 mb-3 text-warning">
                                <ShieldAlert size={18} />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Constraint Guard</span>
                            </div>
                            <p className="text-[11px] text-tertiary leading-relaxed">
                                Settings configured here reduce cold-boot times by pre-routing resources to your affinity groups.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section D: Developer Preferences */}
            <section className="card p-8 space-y-8">
                <h2 className="text-xl font-bold border-b border-border pb-6">Developer Ergonomics</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-tertiary uppercase tracking-widest">Default SDK Language</label>
                        <select className="input bg-bg-secondary">
                            <option>Python (PyTorch / SDK)</option>
                            <option>JavaScript (WebSDK)</option>
                            <option>Rust (CLI)</option>
                            <option>Go (Server)</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-tertiary uppercase tracking-widest">API Response Format</label>
                        <select className="input bg-bg-secondary">
                            <option>JSON (Standard)</option>
                            <option>Protobuf (High Performance)</option>
                        </select>
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-glass rounded-xl border border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <Zap size={18} />
                        </div>
                        <div>
                            <div className="text-xs font-bold">Streaming Mode</div>
                            <div className="text-[10px] text-tertiary">Real-time token generation streaming enabled by default.</div>
                        </div>
                    </div>
                    <div className="w-12 h-6 bg-primary rounded-full relative p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-1"></div>
                    </div>
                </div>
            </section>

            {/* Action Bar */}
            <div className="flex justify-end gap-3 pt-6">
                <Button variant="secondary">Reset Defaults</Button>
                <Button variant="primary">Save Changes</Button>
            </div>
        </div>
    )
}
