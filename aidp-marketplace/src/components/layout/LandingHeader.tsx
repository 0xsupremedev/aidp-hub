import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export function LandingHeader() {
    return (
        <header className="container" style={{
            paddingTop: 'var(--space-6)',
            paddingBottom: 'var(--space-6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            zIndex: 10
        }}>
            <Link to="/" className="flex items-center gap-3">
                <img
                    src="/favicon.svg"
                    alt="AIDP Logo"
                    style={{
                        width: 42,
                        height: 42,
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-glow)'
                    }}
                />
                <div>
                    <span className="text-xl font-bold tracking-tight">MicroAPI Hub</span>
                    <div className="text-xs text-tertiary font-medium">Powered by AIDP</div>
                </div>
            </Link>

            <nav className="hide-mobile flex items-center gap-8">
                <a href="#features" className="text-sm font-medium text-secondary hover:text-primary transition-all">Features</a>
                <a href="#how-it-works" className="text-sm font-medium text-secondary hover:text-primary transition-all">How it Works</a>
                <a href="#pricing" className="text-sm font-medium text-secondary hover:text-primary transition-all">Ecosystem</a>
                <Link to="/metrics" className="text-sm font-medium text-secondary hover:text-primary transition-all">Network Stats</Link>
            </nav>

            <div className="flex items-center gap-4">
                <Link to="/playground" className="hide-mobile">
                    <Button variant="ghost" size="sm">Playground</Button>
                </Link>
                <Link to="/dashboard">
                    <Button variant="primary" size="sm">Launch App</Button>
                </Link>
            </div>
        </header>
    );
}
