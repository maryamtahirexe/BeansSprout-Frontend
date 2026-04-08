import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import CartDrawer from './components/cart/CartDrawer';
import ProtectedRoute from './components/auth/ProtectedRoute';

const LandingPage  = lazy(() => import('./pages/LandingPage'));
const MenuPage     = lazy(() => import('./pages/MenuPage'));
const AboutPage    = lazy(() => import('./pages/AboutPage'));
const LoginPage    = lazy(() => import('./pages/LoginPage'));
const SignupPage   = lazy(() => import('./pages/SignupPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrdersPage   = lazy(() => import('./pages/OrdersPage'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));
const AdminPanel   = lazy(() => import('./pages/AdminPanel'));

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen bg-cream">
      <div className="flex flex-col items-center gap-4">
        <div className="text-5xl animate-bounce">☕</div>
        <p className="font-display text-xl text-purple-400">Brewing something lovely...</p>
        <div className="flex gap-1.5 mt-2">
          {[0,1,2].map(i => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-lilac animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#FFFBF5',
            border: '1px solid #D8B4FE',
            color: '#6b21a8',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '14px',
            borderRadius: '16px',
          },
          success: { iconTheme: { primary: '#BBF7D0', secondary: '#166534' } },
          error:   { iconTheme: { primary: '#F9A8D4', secondary: '#9f1239' } },
        }}
      />
      <Navbar />
      <CartDrawer />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"              element={<LandingPage />} />
          <Route path="/menu"          element={<MenuPage />} />
          <Route path="/about"         element={<AboutPage />} />
          <Route path="/login"         element={<LoginPage />} />
          <Route path="/signup"        element={<SignupPage />} />
          <Route path="/checkout"      element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="/my-orders"     element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
          <Route path="/order-success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
          <Route path="/admin"         element={<ProtectedRoute adminOnly><AdminPanel /></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
