/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Portal from './pages/Portal';
import About from './pages/About';
import Platforms from './pages/Platforms';
import Partner from './pages/Partner';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AIEthics from './pages/AIEthics';
import CookiePolicy from './pages/CookiePolicy';
import DPA from './pages/DPA';
import SecurityPolicy from './pages/SecurityPolicy';
import { AuthProvider } from './components/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/portal" element={<Portal />} />
            <Route path="/about" element={<About />} />
            <Route path="/platforms" element={<Platforms />} />
            <Route path="/partner" element={<Partner />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/recruitment" element={<AdminDashboard />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/ai-ethics" element={<AIEthics />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/dpa" element={<DPA />} />
            <Route path="/security-policy" element={<SecurityPolicy />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}
