import { Link } from 'react-router-dom';
import { Zap, Twitter, Github, Globe } from 'lucide-react';

export function LandingFooter() {
    return (
        <footer style={{
            background: 'var(--color-bg-secondary)',
            borderTop: '1px solid var(--color-border)',
            paddingTop: 'var(--space-16)',
            paddingBottom: 'var(--space-8)'
        }}>
            <div className="container">
                <div className="grid grid-cols-4 gap-12" style={{ marginBottom: 'var(--space-12)' }}>
                    <div className="grid-cols-span-2">
                        <Link to="/" className="flex items-center gap-3" style={{ marginBottom: 'var(--space-4)' }}>
                            <div style={{
                                width: 32,
                                height: 32,
                                borderRadius: 'var(--radius-md)',
                                background: 'var(--gradient-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Zap size={18} color="white" />
                            </div>
                            <span className="text-lg font-bold">MicroAPI Hub</span>
                        </Link>
                        <p className="text-sm text-tertiary" style={{ maxWidth: '300px' }}>
                            The unified gateway for decentralized AI compute. Powering the next generation of AI applications on the AIDP network.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm text-primary" style={{ marginBottom: 'var(--space-4)' }}>Product</h4>
                        <ul className="flex flex-col gap-2">
                            <li><Link to="/playground" className="text-sm text-tertiary hover:text-primary transition-all">Playground</Link></li>
                            <li><Link to="/dashboard" className="text-sm text-tertiary hover:text-primary transition-all">Dashboard</Link></li>
                            <li><Link to="/metrics" className="text-sm text-tertiary hover:text-primary transition-all">Network Metrics</Link></li>
                            <li><a href="#" className="text-sm text-tertiary hover:text-primary transition-all">API Docs</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm text-primary" style={{ marginBottom: 'var(--space-4)' }}>Resources</h4>
                        <ul className="flex flex-col gap-2">
                            <li><a href="https://aidp.store" target="_blank" className="text-sm text-tertiary hover:text-primary transition-all">AIDP.store</a></li>
                            <li><a href="#" className="text-sm text-tertiary hover:text-primary transition-all">Litepaper</a></li>
                            <li><a href="#" className="text-sm text-tertiary hover:text-primary transition-all">Brand Kit</a></li>
                            <li><a href="#" className="text-sm text-tertiary hover:text-primary transition-all">Help Center</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm text-primary" style={{ marginBottom: 'var(--space-4)' }}>Community</h4>
                        <div className="flex gap-4">
                            <a href="#" className="text-tertiary hover:text-primary transition-all"><Twitter size={20} /></a>
                            <a href="#" className="text-tertiary hover:text-primary transition-all"><Github size={20} /></a>
                            <a href="#" className="text-tertiary hover:text-primary transition-all"><Globe size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center" style={{
                    borderTop: '1px solid var(--color-border)',
                    paddingTop: 'var(--space-8)'
                }}>
                    <p className="text-xs text-muted">
                        © 2026 MicroAPI Hub. Built for the AIDP Hackathon.
                    </p>
                    <div className="flex flex-col gap-6">
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Token Data (SOL)</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                            </div>
                            <code className="text-[10px] block font-mono text-secondary mb-3 select-all">PLNk8NUTBeptajEX9GzZrxsYPJ1psnw62dPnWkGcyai</code>
                            <div className="flex justify-between items-center text-[10px] font-bold text-tertiary">
                                <span>SYMBOL: AIDP</span>
                                <span>DECIMALS: 18</span>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <a href="#" className="text-xs text-muted hover:text-tertiary transition-all">Privacy Policy</a>
                            <a href="#" className="text-xs text-muted hover:text-tertiary transition-all">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
