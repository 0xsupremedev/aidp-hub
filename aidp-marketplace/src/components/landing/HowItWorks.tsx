import { motion } from 'framer-motion';
import {
    ArrowRight,
    BrainCircuit,
    Network,
    FileCheck,
    Wallet
} from 'lucide-react';

const steps = [
    {
        icon: BrainCircuit,
        title: 'Select Your Model',
        description: 'Choose from a variety of state-of-the-art AI models including LLMs and Image Generators.',
        number: '01'
    },
    {
        icon: Network,
        title: 'Submit Request',
        description: 'Send your inference request through our unified API or interactive playground.',
        number: '02'
    },
    {
        icon: FileCheck,
        title: 'Verify Proof',
        description: 'Receive your output along with a cryptographic Proof-of-Resource signed by the provider.',
        number: '03'
    },
    {
        icon: Wallet,
        title: 'Settle on SOL',
        description: 'Payments are settled efficiently on the Solana blockchain through the AIDP treasury.',
        number: '04'
    }
];

export function HowItWorks() {
    return (
        <section id="how-it-works" style={{ padding: 'var(--space-24) 0', background: 'var(--color-bg-secondary)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto var(--space-16)' }}>
                    <h2 className="text-4xl font-bold" style={{ marginBottom: 'var(--space-4)' }}>
                        The Seamless <span className="text-gradient">Inference Flow</span>
                    </h2>
                    <p className="text-lg text-secondary">
                        From request to verifiable result in milliseconds.
                    </p>
                </div>

                <div className="grid grid-cols-4 gap-6 relative">
                    {/* Connector Line (Desktop) */}
                    <div className="hide-mobile" style={{
                        position: 'absolute',
                        top: '40px',
                        left: '100px',
                        right: '100px',
                        height: '2px',
                        background: 'var(--color-border)',
                        zIndex: 0
                    }}></div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.title}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex flex-col items-center text-center relative z-1"
                        >
                            <div style={{
                                width: 80,
                                height: 80,
                                borderRadius: '50%',
                                background: 'var(--color-bg-elevated)',
                                border: '2px solid var(--color-border)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginBottom: 'var(--space-6)',
                                color: 'var(--color-primary)',
                                position: 'relative'
                            }}>
                                <step.icon size={32} />
                                <div style={{
                                    position: 'absolute',
                                    top: '-5px',
                                    right: '-5px',
                                    width: 28,
                                    height: 28,
                                    borderRadius: '50%',
                                    background: 'var(--gradient-primary)',
                                    color: 'white',
                                    fontSize: '0.75rem',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    {step.number}
                                </div>
                            </div>
                            <h3 className="text-lg font-bold" style={{ marginBottom: 'var(--space-2)' }}>{step.title}</h3>
                            <p className="text-sm text-tertiary" style={{ maxWidth: '200px' }}>{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
