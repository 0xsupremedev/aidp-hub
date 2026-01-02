import { useState, useRef, useEffect } from 'react'
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
    LayoutDashboard,
    Key,
    BarChart3,
    Settings as SettingsIcon,
    Box,
    CreditCard,
    Plus,
    ChevronRight,
    Bell,
    User,
    LogOut,
    Shield,
    Activity,
    Terminal,
    Zap,
    Sun,
    Moon
} from 'lucide-react'
import { Button } from '../ui/Button'
import { useTheme } from '../../context/ThemeContext'

// --- Types & Configuration ---

const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/workflows', label: 'Workflows', icon: Zap },
    { path: '/products', label: 'Products', icon: Box },
    { path: '/api-keys', label: 'API Keys', icon: Key },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/billing', label: 'Billing', icon: CreditCard },
]

export function Layout() {
    const navigate = useNavigate()
    const location = useLocation()
    const { theme, toggleTheme } = useTheme()
    const activeItem = navItems.find(i => i.path === location.pathname)

    // State for interactive flows
    const [isNotificationOpen, setNotificationOpen] = useState(false)
    const [isProfileOpen, setProfileOpen] = useState(false)
    const [isActionMenuOpen, setActionMenuOpen] = useState(false)

    // Refs for outside-click detection
    const notificationRef = useRef<HTMLDivElement>(null)
    const profileRef = useRef<HTMLDivElement>(null)
    const actionMenuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setNotificationOpen(false)
            }
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setProfileOpen(false)
            }
            if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
                setActionMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="flex" style={{ minHeight: '100vh', background: 'var(--color-bg-primary)' }}>
            {/* Sidebar */}
            <aside className="sidebar">
                <div style={{ padding: 'var(--space-6)', borderBottom: '1px solid var(--color-border)' }}>
                    <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <div style={{
                            width: 32,
                            height: 32,
                            background: 'var(--color-primary)',
                            borderRadius: 'var(--radius-md)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Box size={20} color="white" />
                        </div>
                        <span className="font-bold text-lg tracking-tight">MicroAPI</span>
                    </NavLink>
                </div>

                <nav style={{ padding: 'var(--space-4) 0', flex: 1, overflowY: 'auto' }}>
                    <div style={{ padding: '0 var(--space-3) var(--space-2)', fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Platform
                    </div>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                            style={{ position: 'relative' }}
                        >
                            <item.icon size={18} />
                            <span>{item.label}</span>
                            {(item.label === 'Analytics' || item.label === 'Billing' || item.label === 'API Keys') && (
                                <span style={{
                                    position: 'absolute',
                                    right: 12,
                                    width: 6,
                                    height: 6,
                                    borderRadius: '50%',
                                    background: item.label === 'Analytics' ? 'var(--color-primary)' :
                                        item.label === 'Billing' ? 'var(--color-warning)' :
                                            'var(--color-error)',
                                    boxShadow: `0 0 10px ${item.label === 'Analytics' ? 'var(--color-primary)' :
                                        item.label === 'Billing' ? 'var(--color-warning)' :
                                            'var(--color-error)'}`
                                }}></span>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div style={{ padding: 'var(--space-4)', borderTop: '1px solid var(--color-border)' }}>
                    <NavLink to="/settings" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                        <SettingsIcon size={18} />
                        <span>Settings</span>
                    </NavLink>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, minWidth: 0, position: 'relative' }}>
                {/* Top Header */}
                <header style={{
                    height: 64,
                    padding: '0 var(--space-6)',
                    borderBottom: '1px solid var(--color-border)',
                    background: 'var(--color-bg-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'sticky',
                    top: 0,
                    zIndex: 100
                }}>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="text-tertiary">Organization</span>
                        <ChevronRight size={14} className="text-muted" />
                        <span className="font-medium">{activeItem?.label || 'Overview'}</span>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Clustered New Request Action */}
                        <div style={{ position: 'relative' }} ref={actionMenuRef}>
                            <Button
                                variant="primary"
                                size="sm"
                                onClick={() => setActionMenuOpen(!isActionMenuOpen)}
                                icon={<Plus size={16} />}
                            >
                                New Request
                            </Button>

                            <AnimatePresence>
                                {isActionMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="card"
                                        style={{
                                            position: 'absolute',
                                            top: 'calc(100% + 12px)',
                                            right: 0,
                                            width: 220,
                                            padding: 'var(--space-1)',
                                            boxShadow: 'var(--shadow-lg)',
                                            zIndex: 1000
                                        }}
                                    >
                                        <button className="sidebar-link w-full text-left" onClick={() => { setActionMenuOpen(false); navigate('/playground'); }}>
                                            <Activity size={14} />
                                            <span>Playground</span>
                                        </button>
                                        <button className="sidebar-link w-full text-left" onClick={() => { setActionMenuOpen(false); navigate('/submit-job'); }}>
                                            <Zap size={14} />
                                            <span>Inference Request</span>
                                        </button>
                                        <button className="sidebar-link w-full text-left border-t border-border mt-1 pt-1" onClick={() => { setActionMenuOpen(false); navigate('/jobs'); }}>
                                            <Terminal size={14} />
                                            <span>Batch Process</span>
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Theme Toggle */}
                        <button
                            className="text-tertiary hover:text-primary transition-colors p-2 rounded-full hover:bg-glass"
                            onClick={toggleTheme}
                            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        <div style={{ width: 1, height: 24, background: 'var(--color-border)' }}></div>

                        {/* Notifications */}
                        <div style={{ position: 'relative' }} ref={notificationRef}>
                            <button
                                className={`text-tertiary hover:text-primary transition-colors p-2 rounded-full hover:bg-glass ${isNotificationOpen ? 'text-primary bg-glass' : ''}`}
                                onClick={() => setNotificationOpen(!isNotificationOpen)}
                            >
                                <Bell size={20} />
                                <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, background: 'var(--color-primary)', borderRadius: '50%', border: '2px solid var(--color-bg-primary)' }}></span>
                            </button>

                            <AnimatePresence>
                                {isNotificationOpen && <NotificationPanel />}
                            </AnimatePresence>
                        </div>

                        {/* Profile Control Panel */}
                        <div style={{ position: 'relative' }} ref={profileRef}>
                            <button
                                className={`flex items-center gap-2 p-1.5 rounded-full hover:bg-glass transition-colors ${isProfileOpen ? 'bg-glass' : ''}`}
                                onClick={() => setProfileOpen(!isProfileOpen)}
                            >
                                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--color-bg-tertiary)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <User size={16} className="text-tertiary" />
                                    </div>
                                </div>
                            </button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <>
                                        {/* Backdrop */}
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onClick={() => setProfileOpen(false)}
                                            style={{
                                                position: 'fixed',
                                                inset: 0,
                                                background: 'rgba(0,0,0,0.4)',
                                                backdropFilter: 'blur(4px)',
                                                zIndex: 999
                                            }}
                                        />
                                        <AccountControlPanel onClose={() => setProfileOpen(false)} />
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    style={{ padding: 'var(--space-8)' }}
                >
                    <div className="container">
                        <Outlet />
                    </div>
                </motion.div>
            </main>
        </div>
    )
}

// --- Sub-components ---

function NotificationPanel() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="card"
            style={{
                position: 'absolute',
                top: 'calc(100% + 12px)',
                right: 0,
                width: 320,
                maxHeight: 480,
                overflowY: 'auto',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 1000
            }}
        >
            <div className="card-header" style={{ padding: 'var(--space-3) var(--space-4)' }}>
                <span className="font-semibold text-sm">Notifications</span>
                <span className="text-[10px] text-primary font-bold uppercase tracking-wider">3 Unread</span>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
                {[
                    { title: 'API Usage at 85%', desc: 'You are approaching your monthly quota limit.', type: 'error', color: 'var(--color-error)', time: '10m ago' },
                    { title: 'New Node Available', desc: 'A100 cluster in us-east-1 is now online.', type: 'info', color: 'var(--color-info)', time: '2h ago' },
                    { title: 'Key Rotated', desc: 'Production Main key was successfully rotated.', type: 'security', color: 'var(--color-warning)', time: '5h ago' }
                ].map((note, i) => (
                    <div key={i} className="px-4 py-3 border-b border-border last:border-0 hover:bg-glass cursor-pointer transition-colors group">
                        <div className="flex items-start gap-4">
                            <div className="mt-1">
                                {note.type === 'error' && <Activity size={16} style={{ color: note.color }} />}
                                {note.type === 'info' && <Bell size={16} />}
                                {note.type === 'security' && <Shield size={16} style={{ color: note.color }} />}
                            </div>
                            <div className="flex-1">
                                <div className="text-xs font-bold leading-tight flex items-center justify-between">
                                    {note.title}
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: note.color }}></div>
                                </div>
                                <div className="text-[11px] text-muted leading-snug mt-1">{note.desc}</div>
                                <div className="text-[10px] text-tertiary mt-2 font-mono">{note.time}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ padding: 'var(--space-3)', borderTop: '1px solid var(--color-border)', textAlign: 'center', background: 'var(--color-bg-tertiary)' }}>
                <button className="text-[11px] text-secondary hover:text-primary font-bold tracking-tight">VIEW ALL NOTIFICATIONS</button>
            </div>
        </motion.div>
    )
}

function AccountControlPanel({ onClose }: { onClose: () => void }) {
    const navigate = useNavigate()
    const { theme, toggleTheme } = useTheme()
    const menuItems = [
        { label: 'Account Settings', icon: User, path: '/settings/account' },
        { label: 'Security', icon: Shield, path: '/settings/security' },
        { label: 'Billing', icon: CreditCard, path: '/settings/billing' },
    ]

    return (
        <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="card"
            style={{
                position: 'fixed',
                top: 0,
                right: 0,
                width: 360,
                height: '100vh',
                borderRadius: 0,
                borderLeft: '1px solid var(--color-border)',
                boxShadow: '-10px 0 30px rgba(0,0,0,0.2)',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                padding: 0
            }}
        >
            {/* Header */}
            <div style={{ padding: 'var(--space-8) var(--space-6)', borderBottom: '1px solid var(--color-border)', background: 'var(--color-bg-secondary)' }}>
                <div className="flex justify-between items-start mb-6">
                    <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-lg)', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <User size={24} />
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-glass rounded-full transition-colors">
                        <ChevronRight size={20} />
                    </button>
                </div>
                <h2 className="text-xl font-bold mb-1">supremedev</h2>
                <div className="text-sm text-tertiary mb-4">supremedev@microapi.dev</div>

                <div className="flex gap-4 p-3 bg-elevated rounded-xl border border-border">
                    <div className="flex-1">
                        <div className="text-[10px] font-bold text-tertiary uppercase tracking-widest mb-1">Organization</div>
                        <div className="text-xs font-bold">MicroAPI</div>
                    </div>
                    <div className="w-[1px] bg-border"></div>
                    <div className="flex-1">
                        <div className="text-[10px] font-bold text-tertiary uppercase tracking-widest mb-1">Role</div>
                        <div className="text-xs font-bold text-primary">Owner</div>
                    </div>
                </div>
            </div>

            {/* Menu Sections */}
            <div style={{ flex: 1, padding: 'var(--space-4)', overflowY: 'auto' }}>
                <div className="text-[10px] font-bold text-tertiary uppercase tracking-[0.2em] mb-3 px-4">Account Control</div>
                <div className="flex flex-col gap-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => { onClose(); navigate(item.path); }}
                            className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-glass transition-all group border border-transparent hover:border-border"
                        >
                            <div className="w-8 h-8 rounded-lg bg-bg-secondary flex items-center justify-center text-tertiary group-hover:text-primary transition-colors">
                                <item.icon size={18} />
                            </div>
                            <span className="font-bold text-sm flex-1 text-left">{item.label}</span>
                            <ChevronRight size={14} className="text-tertiary opacity-0 group-hover:opacity-100 transition-all" />
                        </button>
                    ))}
                    <button
                        onClick={toggleTheme}
                        className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-glass transition-all group border border-transparent hover:border-border"
                    >
                        <div className="w-8 h-8 rounded-lg bg-bg-secondary flex items-center justify-center text-tertiary group-hover:text-primary transition-colors">
                            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                        </div>
                        <span className="font-bold text-sm flex-1 text-left">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                        <div className="w-8 h-4 bg-elevated rounded-full relative p-1 transition-colors group-hover:bg-primary/20">
                            <div className={`w-2 h-2 rounded-full transition-all ${theme === 'light' ? 'bg-tertiary ml-0' : 'bg-primary ml-auto'}`}></div>
                        </div>
                    </button>
                </div>
            </div>

            {/* Footer / Danger Zone */}
            <div style={{ padding: 'var(--space-6)', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-secondary)' }}>
                <button className="flex items-center gap-4 px-4 py-3.5 rounded-xl w-full hover:bg-error-light text-error transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-error/10 flex items-center justify-center">
                        <LogOut size={18} />
                    </div>
                    <span className="font-bold text-sm">Log out</span>
                </button>
                <div className="mt-6 text-[10px] text-tertiary text-center leading-relaxed">
                    Account Identity: <code className="bg-elevated px-1.5 py-0.5 rounded border border-border">usr_supremedev_892</code>
                </div>
            </div>
        </motion.div>
    )
}
