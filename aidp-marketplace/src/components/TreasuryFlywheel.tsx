import { motion } from 'framer-motion';
import { RefreshCcw, TrendingDown, ArrowRight, Zap, Flame } from 'lucide-react';

export const TreasuryFlywheel = () => {
    return (
        <div className="glass-card-static p-8 flex flex-col gap-8 relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none"></div>

            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-xl font-bold mb-1">DAT Treasury Flywheel</h3>
                    <p className="text-xs text-secondary italic">Section 13: Decentralized Autonomous Treasury</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-accent-green bg-accent-green/10 px-2 py-1 rounded border border-accent-green/20">
                    <TrendingDown size={10} /> DEFLATIONARY
                </div>
            </div>

            <div className="relative aspect-square max-w-[300px] mx-auto flex items-center justify-center">
                {/* Visual Flywheel */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-[1px] border-dashed border-primary/20 rounded-full"
                />

                <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                        <RefreshCcw size={40} className="text-primary animate-spin-slow" />
                    </div>
                </div>

                {/* Nodes on the ring */}
                <FlywheelNode label="Revenue" value="+$42.5K" icon={Zap} angle={-90} color="var(--color-primary)" />
                <FlywheelNode label="Buybacks" value="40%" icon={RefreshCcw} angle={30} color="var(--color-accent)" />
                <FlywheelNode label="Burn" value="20%" icon={Flame} angle={150} color="var(--color-error)" />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-auto">
                <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <div className="text-[10px] uppercase font-bold text-tertiary mb-1">Condition</div>
                    <div className="text-xs font-bold text-secondary">Burn &gt; Emissions</div>
                </div>
                <div className="p-4 bg-accent-green/5 rounded-xl border border-accent-green/10">
                    <div className="text-[10px] uppercase font-bold text-tertiary mb-1">Net Flow</div>
                    <div className="text-xs font-bold text-accent-green">-1.4M AIDP / yr</div>
                </div>
            </div>
        </div>
    );
};

const FlywheelNode = ({ label, value, icon: Icon, angle, color }: any) => {
    const radius = 130;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;

    return (
        <motion.div
            className="absolute flex flex-col items-center gap-2"
            style={{ x, y }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg border"
                style={{
                    background: `color-mix(in srgb, ${color} 10%, var(--color-bg-elevated))`,
                    borderColor: `color-mix(in srgb, ${color} 30%, transparent)`
                }}
            >
                <Icon size={18} style={{ color }} />
            </div>
            <div className="text-center">
                <div className="text-[11px] font-bold">{label}</div>
                <div className="text-[9px] text-tertiary">{value}</div>
            </div>
        </motion.div>
    );
};
