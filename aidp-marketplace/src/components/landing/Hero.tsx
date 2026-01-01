import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import { ChevronRight, ShieldCheck, Zap, Globe, Cpu } from 'lucide-react';

export function Hero() {
    return (
        <section className="hero-bg" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
            <div className="network-bg"></div>

            {/* Glow Effects */}
            <div className="hero-glow" style={{ top: '-10%', left: '-10%', background: 'var(--color-primary)' }}></div>
            <div className="hero-glow" style={{ bottom: '-10%', right: '-10%', background: 'var(--color-secondary)' }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="badge badge-primary"
                        style={{ marginBottom: 'var(--space-6)', padding: 'var(--space-2) var(--space-4)' }}
                    >
                        <Zap size={14} className="animate-pulse-glow" />
                        <span>Built for the AIDP Ecosystem</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-6xl font-extrabold"
                        style={{ marginBottom: 'var(--space-6)', letterSpacing: '-0.03em' }}
                    >
                        Unified AI Access via <br />
                        <span className="text-gradient">Decentralized GPU Compute</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-secondary"
                        style={{ marginBottom: 'var(--space-10)', lineHeight: 1.6 }}
                    >
                        MicroAPI Hub routes your AI workloads to AIDP's global network of high-performance GPUs.
                        Verifiable, scalable, and up to 10x more cost-effective than centralized clouds.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex justify-center gap-6"
                    >
                        <Link to="/playground">
                            <Button size="lg" icon={<ChevronRight size={20} />} iconPosition="right">
                                Start Building Now
                            </Button>
                        </Link>
                        <a href="#how-it-works">
                            <Button variant="secondary" size="lg">Explore Network</Button>
                        </a>
                    </motion.div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="flex justify-center gap-12"
                        style={{ marginTop: 'var(--space-24)' }}
                    >
                        <div className="flex items-center gap-3 text-tertiary">
                            <ShieldCheck size={20} className="text-primary" />
                            <span className="text-sm font-medium">Verifiable PoR/PoD</span>
                        </div>
                        <div className="flex items-center gap-3 text-tertiary">
                            <Globe size={20} className="text-secondary" />
                            <span className="text-sm font-medium">Global Nodes</span>
                        </div>
                        <div className="flex items-center gap-3 text-tertiary">
                            <Cpu size={20} className="text-accent" />
                            <span className="text-sm font-medium">H100/A100 Ready</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
