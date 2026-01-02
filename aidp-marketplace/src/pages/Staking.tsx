import {
    Wallet,
    ArrowDownLeft,
    ArrowUpRight,
    ShieldCheck,
    Lock,
    Zap,
    TrendingUp,
    Calendar,
    Infinity
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';

export default function Staking() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold">Staking Rewards</h2>
                    <p className="text-secondary">Secure the network and earn AIDP rewards.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary">History</Button>
                    <Button icon={<Wallet size={18} />}>Connect Wallet</Button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Left: Staking Controls */}
                <div className="col-span-8 flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="glass-card-static" style={{ padding: 'var(--space-6)' }}>
                            <div className="text-xs text-muted uppercase tracking-wider mb-2">My Staked Balance</div>
                            <div className="text-3xl font-bold">45,200 <span className="text-sm text-tertiary">AIDP</span></div>
                            <div className="mt-6 flex gap-3">
                                <Button size="sm" style={{ flex: 1 }} icon={<ArrowDownLeft size={16} />}>Stake</Button>
                                <Button variant="secondary" size="sm" style={{ flex: 1 }} icon={<ArrowUpRight size={16} />}>Unstake</Button>
                            </div>
                        </div>
                        <div className="glass-card-static" style={{ padding: 'var(--space-6)' }}>
                            <div className="text-xs text-muted uppercase tracking-wider mb-2">Unclaimed Rewards</div>
                            <div className="text-3xl font-bold text-accent-green">1,248 <span className="text-sm text-tertiary">AIDP</span></div>
                            <div className="mt-6">
                                <Button size="sm" variant="primary" style={{ width: '100%' }} icon={<Zap size={16} />}>Claim Rewards</Button>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card-static" style={{ padding: 'var(--space-6)' }}>
                        <h3 className="text-lg font-bold mb-6">Staking Tiers</h3>
                        <div className="flex flex-col gap-4">
                            {[
                                { tier: 'Bronze', stake: '1,000+', yield: '4.2%', bonus: 'None', active: false },
                                { tier: 'Silver', stake: '10,000+', yield: '6.8%', bonus: '10% Fee Reduction', active: true },
                                { tier: 'Gold', stake: '100,000+', yield: '12.4%', bonus: 'Priority Routing', active: false },
                            ].map((t) => (
                                <div key={t.tier} className={`flex items-center justify-between p-4 rounded-lg ${t.active ? 'bg-primary/10 border border-primary/20' : 'bg-surface-lighter'}`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.active ? 'bg-primary text-white' : 'bg-surface-dark text-tertiary'}`}>
                                            <ShieldCheck size={20} />
                                        </div>
                                        <div>
                                            <div className="font-bold">{t.tier} Tier</div>
                                            <div className="text-xs text-muted">Min Stake: {t.stake} AIDP</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-bold text-accent-green">{t.yield} APY</div>
                                        <div className="text-xs text-primary">{t.bonus}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Network Stats */}
                <div className="col-span-4 flex flex-col gap-6">
                    <div className="glass-card-static" style={{ padding: 'var(--space-6)' }}>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-muted mb-6">Network TVL</h3>
                        <div className="flex flex-col items-center gap-2 mb-8">
                            <div className="text-4xl font-extrabold text-gradient">248.5M</div>
                            <div className="text-sm text-tertiary">Total Staked AIDP</div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-tertiary">Current APR</span>
                                <span className="font-bold text-accent-green">8.42%</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-tertiary">Circulating Supply</span>
                                <span className="font-bold">642.1M</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-tertiary">Staking Ratio</span>
                                <span className="font-bold text-primary">38.7%</span>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card-static" style={{ padding: 'var(--space-6)', background: 'linear-gradient(135deg, rgba(123, 97, 255, 0.1) 0%, transparent 100%)' }}>
                        <div className="flex items-center gap-2 text-accent mb-3">
                            <Lock size={16} />
                            <span className="text-xs font-bold uppercase tracking-wider">Protocol Security</span>
                        </div>
                        <p className="text-sm text-secondary leading-relaxed mb-4">
                            Staking provides economic security for the AIDP verifier network. Stakers are liable for slashing if nodes act maliciously.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-tertiary">
                            <TrendingUp size={14} className="text-accent-green" />
                            <span>Slashing probability: &lt; 0.01%</span>
                        </div>
                    </div>

                    <div className="glass-card-static" style={{ padding: 'var(--space-6)', position: 'relative', overflow: 'hidden' }}>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] pointer-events-none"></div>
                        <div className="flex justify-between items-start mb-6">
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-tertiary">Halving Countdown</h3>
                            <div className="text-[10px] font-mono text-primary group-hover:underline cursor-pointer">Section 11.4</div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex justify-between items-end">
                                <div>
                                    <div className="text-2xl font-black tracking-tight">E_(n+1) = E_n / 2</div>
                                    <div className="text-[10px] text-muted font-bold uppercase mt-1">24-Month Emission Cycle</div>
                                </div>
                                <Calendar size={32} className="text-primary opacity-20" />
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-[11px] font-bold">
                                    <span className="text-secondary">Epoch Progress (49/100)</span>
                                    <span className="text-primary">422 Days Left</span>
                                </div>
                                <div className="h-1.5 w-full bg-elevated rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '49%' }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="h-full bg-primary"
                                    />
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 mt-2">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-tertiary">Current Reward (Epoch 49)</span>
                                    <span className="font-bold text-secondary">2,482 AIDP / Day</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
