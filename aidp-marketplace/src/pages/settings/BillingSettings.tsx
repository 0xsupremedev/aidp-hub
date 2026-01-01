import { motion } from 'framer-motion'
import {
    CreditCard,
    Zap,
    TrendingUp,
    Download,
    AlertCircle,
    Plus,
    ArrowUpRight,
    Search,
    History,
    FileText
} from 'lucide-react'
import { Button } from '../../components/ui/Button'

export default function BillingSettings() {
    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <header>
                <h1 className="text-3xl font-bold tracking-tight mb-2">Billing & Limits</h1>
                <p className="text-secondary text-lg">Manage project funding, view usage forecasts, and download invoices.</p>
            </header>

            {/* Section A: Current Plan & Usage */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Plan Details */}
                <div className="card p-6 flex flex-col justify-between border-primary/20 bg-primary/5">
                    <div>
                        <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Current Plan</div>
                        <h3 className="text-2xl font-black italic">DEVELOPER PRO</h3>
                    </div>
                    <div className="space-y-4 mt-8">
                        <div className="flex justify-between text-xs">
                            <span className="text-tertiary">Monthly Quota</span>
                            <span className="font-bold">1,000 hrs</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-tertiary">Unit Cost</span>
                            <span className="font-bold">$0.12/hr</span>
                        </div>
                        <Button variant="primary" size="sm" className="w-full mt-2">Upgrade Plan</Button>
                    </div>
                </div>

                {/* Usage Gauge */}
                <div className="card p-6 flex flex-col items-center justify-center gap-4 col-span-1 md:col-span-2 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] pointer-events-none"></div>
                    <div className="flex justify-between w-full items-end mb-2">
                        <div>
                            <div className="text-[10px] font-bold text-tertiary uppercase tracking-widest">Resource Usage</div>
                            <div className="text-3xl font-bold">850.4 <span className="text-sm text-tertiary font-normal text-secondary">/ 1,000 hrs</span></div>
                        </div>
                        <span className="text-[10px] font-black text-warning">85% CONSUMED</span>
                    </div>
                    <div className="w-full h-3 bg-elevated rounded-full overflow-hidden border border-border">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '85%' }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="h-full bg-warning shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                        />
                    </div>
                    <p className="text-[10px] text-tertiary leading-relaxed text-left w-full">
                        Quota resets on **Jan 24, 2026**. At your current pace, you will reach the limit in **6 days**.
                    </p>
                </div>
            </div>

            {/* Section B: Usage Forecasting */}
            <section className="card p-8 space-y-8 bg-elevated/40">
                <div className="flex items-center justify-between border-b border-border/50 pb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Usage Forecast</h2>
                            <p className="text-xs text-secondary mt-1">Predictive analysis based on current API traffic.</p>
                        </div>
                    </div>
                    <Button variant="secondary" size="sm" icon={<Zap size={14} className="text-warning" />}>Optimize Jobs</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Forecasted Spend', value: '$184.12', sub: 'vs $142.12 last month', trend: 'up' },
                        { label: 'Estimated Limit Hit', value: 'Jan 18', sub: '6 days remaining', trend: 'warning' },
                        { label: 'Active Clusters', value: '12', sub: 'High load on US-East', trend: 'neutral' },
                        { label: 'Cost Efficiency', value: '92%', sub: 'No idle resources', trend: 'up' },
                    ].map((metric, i) => (
                        <div key={i} className="p-4 bg-bg-primary rounded-xl border border-border">
                            <div className="text-[9px] font-bold text-tertiary uppercase tracking-widest mb-1">{metric.label}</div>
                            <div className="text-lg font-bold mb-1">{metric.value}</div>
                            <div className="text-[9px] text-secondary">{metric.sub}</div>
                        </div>
                    ))}
                </div>

                <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <AlertCircle size={20} className="text-primary" />
                        <span className="text-xs font-bold">Auto-Scale Quota</span>
                        <p className="text-[10px] text-secondary ml-4">Increase limits automatically when threshold reaches 95%.</p>
                    </div>
                    <div className="w-10 h-5 bg-elevated rounded-full relative p-1 cursor-pointer">
                        <div className="w-3 h-3 bg-tertiary rounded-full absolute left-1"></div>
                    </div>
                </div>
            </section>

            {/* Section C: Payment Methods */}
            <section className="card p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-6">
                    <h2 className="text-xl font-bold">Payment Methods</h2>
                    <Button variant="outline" size="sm" icon={<Plus size={16} />}>Add New</Button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between p-6 bg-glass rounded-2xl border border-primary/30">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-9 bg-bg-secondary rounded-md border border-border flex items-center justify-center">
                                <span className="font-black italic text-sm italic">VISA</span>
                            </div>
                            <div>
                                <div className="font-bold">Visa ending in 4242 <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded ml-2">PRIMARY</span></div>
                                <div className="text-xs text-tertiary">Expires 12/2028</div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="secondary" size="sm">Edit</Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section D: Billing History */}
            <section className="card p-8 space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-6">
                    <h1 className="text-xl font-bold">Billing History</h1>
                    <div className="input-group relative w-64">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" />
                        <input className="input pl-9 bg-elevated/50 text-xs" placeholder="Search invoices..." />
                    </div>
                </div>

                <div className="space-y-2">
                    {[
                        { date: 'Jan 01, 2026', amount: '$142.12', id: 'INV-1284-01', status: 'Paid' },
                        { date: 'Dec 01, 2025', amount: '$98.34', id: 'INV-1284-12', status: 'Paid' },
                        { date: 'Nov 01, 2025', amount: '$112.50', id: 'INV-1284-11', status: 'Paid' },
                    ].map((invoice, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-glass transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-bg-secondary flex items-center justify-center text-tertiary">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <div className="text-sm font-bold">{invoice.date}</div>
                                    <div className="text-[10px] text-tertiary">{invoice.id} • {invoice.status}</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                <span className="font-mono font-bold text-sm">{invoice.amount}</span>
                                <button className="p-2 text-tertiary hover:text-primary transition-colors">
                                    <Download size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
