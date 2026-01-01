import { motion } from 'framer-motion';
import {
    User,
    Shield,
    Bell,
    Cpu,
    Database,
    Github,
    Globe,
    Lock
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export default function Settings() {
    return (
        <div className="flex flex-col gap-8 max-w-4xl">
            <div>
                <h2 className="text-2xl font-bold">Settings</h2>
                <p className="text-secondary">Manage your AIDP account and node preferences.</p>
            </div>

            <div className="flex flex-col gap-6">
                {/* Profile Section */}
                <div className="glass-card-static" style={{ padding: 'var(--space-6)' }}>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <User size={20} className="text-primary" />
                        Account Profile
                    </h3>
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-full bg-surface-dark border-2 border-primary flex items-center justify-center text-3xl font-bold">
                            AD
                        </div>
                        <div className="flex-1">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-muted uppercase font-bold">Username</label>
                                    <input className="input mt-1" defaultValue="AIDP_Dev_01" />
                                </div>
                                <div>
                                    <label className="text-xs text-muted uppercase font-bold">Email</label>
                                    <input className="input mt-1" defaultValue="dev@aidp.store" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* API Keys */}
                <div className="glass-card-static" style={{ padding: 'var(--space-6)' }}>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Lock size={20} className="text-accent" />
                        API access
                    </h3>
                    <p className="text-sm text-secondary mb-4">Use these keys to authenticate your SDK and CLI requests.</p>
                    <div className="flex items-center gap-3">
                        <input className="input font-mono flex-1" value="aidp_live_51P2u...k92J" readOnly />
                        <Button variant="secondary">Rotate</Button>
                    </div>
                </div>

                {/* Node Preferences */}
                <div className="glass-card-static" style={{ padding: 'var(--space-6)' }}>
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Cpu size={20} className="text-secondary" />
                        Node Preferences
                    </h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="font-medium">Priority Routing</div>
                                <div className="text-xs text-muted">Prefer nodes with &gt;99% uptime for jobs.</div>
                            </div>
                            <div className="toggle-switch active"></div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="font-medium">Auto-Staking</div>
                                <div className="text-xs text-muted">Automatically stake 20% of compute earnings.</div>
                            </div>
                            <div className="toggle-switch"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <Button variant="ghost">Reset Defaults</Button>
                <Button>Save Changes</Button>
            </div>
        </div>
    );
}
