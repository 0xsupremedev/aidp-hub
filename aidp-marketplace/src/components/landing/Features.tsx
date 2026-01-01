import { motion } from 'framer-motion';
import {
    Cpu,
    ShieldCheck,
    BarChart3,
    Coins,
    Zap,
    Layers
} from 'lucide-react';

const features = [
    {
        icon: Cpu,
        title: 'Multi-Model Inference',
        description: 'Access LLMs, Stable Diffusion, and Code Assistants through a single, unified API endpoint.',
        color: 'var(--color-primary)'
    },
    {
        icon: ShieldCheck,
        title: 'Verifiable Proofs',
        description: 'Every computation is cryptographically verified using AIDP’s Proof-of-Resource (PoR) protocols.',
        color: 'var(--color-accent-green)'
    },
    {
        icon: BarChart3,
        title: 'Cost Optimization',
        description: 'Our routing algorithm picks the best GPU provider based on your latency and price requirements.',
        color: 'var(--color-secondary)'
    },
    {
        icon: Coins,
        title: 'Zero-Egress Fees',
        description: 'Stop paying for cloud data transfer. Pay only for the compute cycles you actually use.',
        color: 'var(--color-accent-orange)'
    },
    {
        icon: Zap,
        title: 'Low Latency',
        description: 'Decentralized orchestration nodes ensure your requests are handled by the nearest available GPU.',
        color: 'var(--color-accent)'
    },
    {
        icon: Layers,
        title: 'DePIN Native',
        description: 'Built on decentralized infrastructure principles for maximum censorship resistance and uptime.',
        color: 'var(--color-primary-light)'
    }
];

export function Features() {
    return (
        <section id="features" style={{ padding: 'var(--space-24) 0', background: 'var(--color-bg-primary)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto var(--space-16)' }}>
                    <h2 className="text-4xl font-bold" style={{ marginBottom: 'var(--space-4)' }}>
                        Supercharge Your <span className="text-gradient">AI Infrastructure</span>
                    </h2>
                    <p className="text-lg text-secondary">
                        MicroAPI Hub provides the tools you need to build scalable,
                        verifiable AI applications on decentralized hardware.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card"
                            style={{ padding: 'var(--space-8)' }}
                        >
                            <div style={{
                                width: 48,
                                height: 48,
                                borderRadius: 'var(--radius-lg)',
                                background: `rgba(${feature.color === 'var(--color-primary)' ? '59, 130, 246' : '139, 92, 246'}, 0.1)`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 'var(--space-6)',
                                color: feature.color
                            }}>
                                <feature.icon size={24} />
                            </div>
                            <h3 className="text-xl font-bold" style={{ marginBottom: 'var(--space-3)' }}>{feature.title}</h3>
                            <p className="text-sm text-tertiary" style={{ lineHeight: 1.6 }}>{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
