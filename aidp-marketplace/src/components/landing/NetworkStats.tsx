import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import { Zap, Server, ShieldCheck, DollarSign } from 'lucide-react';

interface CounterProps {
    from: number;
    to: number;
    duration?: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
}

function Counter({ from, to, duration = 2, decimals = 0, prefix = '', suffix = '' }: CounterProps) {
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => {
        const value = decimals > 0 ? latest.toFixed(decimals) : Math.floor(latest).toLocaleString();
        return `${prefix}${value}${suffix}`;
    });

    useEffect(() => {
        const controls = animate(count, to, { duration, ease: 'easeOut' });
        return controls.stop;
    }, [count, to, duration]);

    return <motion.span>{rounded}</motion.span>;
}

const stats = [
    {
        icon: Zap,
        label: 'Jobs Verified',
        value: 2432891,
        suffix: '+',
        color: 'var(--color-primary)'
    },
    {
        icon: Server,
        label: 'GPUs Online',
        value: 847,
        suffix: '',
        color: 'var(--color-secondary)'
    },
    {
        icon: ShieldCheck,
        label: 'Network Uptime',
        value: 99.7,
        suffix: '%',
        decimals: 1,
        color: 'var(--color-accent-green)'
    },
    {
        icon: DollarSign,
        label: 'Saved vs Cloud',
        value: 1.2,
        prefix: '$',
        suffix: 'M+',
        decimals: 1,
        color: 'var(--color-accent)'
    }
];

export function NetworkStats() {
    return (
        <section style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderTop: '1px solid var(--color-border)',
            borderBottom: '1px solid var(--color-border)',
            padding: 'var(--space-8) 0'
        }}>
            <div className="container">
                <div className="flex justify-between items-center">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-4"
                            style={{ flex: 1, justifyContent: 'center' }}
                        >
                            <div style={{
                                width: 48,
                                height: 48,
                                borderRadius: 'var(--radius-lg)',
                                background: `color-mix(in srgb, ${stat.color} 15%, transparent)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <stat.icon size={24} style={{ color: stat.color }} />
                            </div>
                            <div>
                                <div className="text-2xl font-bold" style={{ color: stat.color }}>
                                    <Counter
                                        from={0}
                                        to={stat.value}
                                        duration={2.5}
                                        decimals={stat.decimals || 0}
                                        prefix={stat.prefix || ''}
                                        suffix={stat.suffix || ''}
                                    />
                                </div>
                                <div className="text-sm text-tertiary">{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
