import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Page Components (Lazy Loaded)
const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const LeadDetails = lazy(() => import('./pages/LeadDetails'));
const NotFound = lazy(() => import('./pages/NotFound'));

// A reusable loader for suspense
const SuspenseLoader = () => (
  <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-50/80 backdrop-blur-sm">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-600"></div>
  </div>
);

const AppContent = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-right" toastOptions={{
        style: {
          borderRadius: '12px',
          background: '#333',
          color: '#fff',
        },
      }} />
      <Navbar />
      <AnimatePresence mode="wait">
        <Suspense fallback={<SuspenseLoader />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            
            <Route path="/features" element={<Navigate to="/#features" replace />} />
            <Route path="/contact" element={<Navigate to="/#contact" replace />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/leads/:id" element={<LeadDetails />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
