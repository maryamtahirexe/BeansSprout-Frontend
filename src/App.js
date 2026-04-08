import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
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

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Navbar />
      <Suspense fallback={<div className="flex items-center justify-center h-screen text-lilac text-xl font-display">Loading... 🌸</div>}>
        <Routes>
          <Route path="/"             element={<LandingPage />} />
          <Route path="/menu"         element={<MenuPage />} />
          <Route path="/about"        element={<AboutPage />} />
          <Route path="/login"        element={<LoginPage />} />
          <Route path="/signup"       element={<SignupPage />} />
          <Route path="/checkout"     element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="/my-orders"    element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
          <Route path="/order-success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
          <Route path="/admin"        element={<ProtectedRoute adminOnly><AdminPanel /></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}