import { LandingHeader } from '../components/layout/LandingHeader';
import { LandingFooter } from '../components/layout/LandingFooter';
import { Hero } from '../components/landing/Hero';
import { NetworkStats } from '../components/landing/NetworkStats';
import { Features } from '../components/landing/Features';
import { HowItWorks } from '../components/landing/HowItWorks';
import { CTA } from '../components/landing/CTA';

export default function Home() {
    return (
        <div style={{ background: 'var(--color-bg-primary)', overflowX: 'hidden' }}>
            <LandingHeader />
            <main>
                <Hero />
                <NetworkStats />
                <Features />
                <HowItWorks />
                <CTA />
            </main>
            <LandingFooter />
        </div>
    );
}
