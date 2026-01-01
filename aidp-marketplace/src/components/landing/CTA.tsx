import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { Sparkles, Terminal } from 'lucide-react';

export function CTA() {
    return (
        <section style={{ padding: 'var(--space-24) 0', overflow: 'hidden' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass-card-static"
                    style={{
                        padding: 'var(--space-16)',
                        textAlign: 'center',
                        position: 'relative',
                        background: 'var(--gradient-primary-soft)',
                        border: '1px solid rgba(59, 130, 246, 0.2)'
                    }}
                >
                    {/* Background Glow */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
                        pointerEvents: 'none'
                    }}></div>

                    <Sparkles className="animate-float" size={48} style={{
                        color: 'var(--color-primary)',
                        margin: '0 auto var(--space-6)'
                    }} />

                    <h2 className="text-4xl font-bold" style={{ marginBottom: 'var(--space-4)' }}>
                        Ready to Build on <span className="text-gradient">AIDP?</span>
                    </h2>
                    <p className="text-lg text-secondary" style={{ maxWidth: '600px', margin: '0 auto var(--space-8)' }}>
                        Join the decentralized compute revolution. Start integrating high-performance GPUs into your application today.
                    </p>

                    <div className="flex justify-center gap-4">
                        <Link to="/dashboard">
                            <Button size="lg">Open Dashboard</Button>
                        </Link>
                        <Link to="/playground">
                            <Button variant="secondary" size="lg" icon={<Terminal size={20} />}>
                                Try Playground
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
