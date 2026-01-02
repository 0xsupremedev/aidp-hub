import { Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Playground from './pages/Playground'
import Metrics from './pages/Metrics'
import SubmitJob from './pages/SubmitJob'
import Nodes from './pages/Nodes'
import Marketplace from './pages/Marketplace'
import Jobs from './pages/Jobs'
import Governance from './pages/Governance'
import Staking from './pages/Staking'
import Settings from './pages/Settings'
import APIKeys from './pages/APIKeys'

import Campaign from './pages/Campaign';
import SubmitProject from './pages/SubmitProject';
import AccountSettings from './pages/settings/AccountSettings';
import SecuritySettings from './pages/settings/SecuritySettings';
import BillingSettings from './pages/settings/BillingSettings';
import Workflows from './pages/Workflows';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/workflows" element={<Workflows />} />
                <Route path="/products" element={<Marketplace />} />
                <Route path="/api-keys" element={<APIKeys />} />
                <Route path="/analytics" element={<Metrics />} />
                <Route path="/billing" element={<Staking />} />
                <Route path="/playground" element={<Playground />} />
                <Route path="/submit-job" element={<SubmitJob />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/nodes" element={<Nodes />} />
                <Route path="/governance" element={<Governance />} />
                <Route path="/metrics" element={<Metrics />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/settings/account" element={<AccountSettings />} />
                <Route path="/settings/security" element={<SecuritySettings />} />
                <Route path="/settings/billing" element={<BillingSettings />} />
                <Route path="/campaign" element={<Campaign />} />
                <Route path="/submit-project" element={<SubmitProject />} />
                <Route path="/marketplace" element={<Navigate to="/products" replace />} />
            </Route>
        </Routes>
    )
}


export default App

