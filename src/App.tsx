/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Portal from './pages/Portal';
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
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}
