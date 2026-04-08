import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count, toggle } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/about', label: 'About' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-cream/95 backdrop-blur-md shadow-md shadow-lilac/20 py-3'
            : 'bg-transparent py-5'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl">🌸</span>
            <span className="font-display text-xl text-purple-800 group-hover:text-purple-600 transition-colors">
              BeansSprout
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`relative font-body text-sm font-medium transition-colors duration-200 ${
                  isActive(to)
                    ? 'text-purple-700'
                    : 'text-purple-500 hover:text-purple-800'
                }`}
              >
                {label}
                {isActive(to) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-lilac rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cart button */}
            <button
              onClick={toggle}
              className="relative p-2.5 rounded-full bg-lilac/30 hover:bg-lilac/60 text-purple-700 transition-all duration-200 hover:scale-105"
            >
              🛒
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-blush text-pink-800 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border border-white"
                >
                  {count}
                </motion.span>
              )}
            </button>

            {user ? (
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="font-body text-sm text-purple-600 hover:text-purple-800 px-3 py-1.5 rounded-full border border-lilac/50 hover:bg-lilac/20 transition-all"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/my-orders"
                  className="font-body text-sm text-purple-600 hover:text-purple-800 px-3 py-1.5 rounded-full border border-lilac/50 hover:bg-lilac/20 transition-all"
                >
                  Orders
                </Link>
                <button
                  onClick={logout}
                  className="font-body text-sm bg-blush hover:bg-pink-300 text-pink-800 px-4 py-1.5 rounded-full border border-pink-200 transition-all hover:scale-105"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="font-body text-sm text-purple-600 hover:text-purple-800 px-4 py-1.5 rounded-full border border-lilac/60 hover:bg-lilac/20 transition-all"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="font-body text-sm bg-lilac hover:bg-purple-300 text-purple-900 px-4 py-1.5 rounded-full border border-purple-200 transition-all hover:scale-105"
                >
                  Join us 🌸
                </Link>
              </div>
            )}
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <button onClick={toggle} className="relative p-2 rounded-full bg-lilac/30 text-purple-700">
              🛒
              {count > 0 && (
                <span className="absolute -top-1 -right-1 bg-blush text-pink-800 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-full bg-lilac/30 text-purple-700"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-cream/98 backdrop-blur-md border-t border-lilac/30 overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-3">
                {navLinks.map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`font-body py-2 text-sm ${isActive(to) ? 'text-purple-700 font-medium' : 'text-purple-500'}`}
                  >
                    {label}
                  </Link>
                ))}
                <div className="border-t border-lilac/30 pt-3 flex flex-col gap-2">
                  {user ? (
                    <>
                      {isAdmin && <Link to="/admin" className="font-body text-sm text-purple-600 py-2">Admin Panel</Link>}
                      <Link to="/my-orders" className="font-body text-sm text-purple-600 py-2">My Orders</Link>
                      <button onClick={logout} className="text-left font-body text-sm text-pink-600 py-2">Logout</button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="font-body text-sm text-purple-600 py-2">Sign in</Link>
                      <Link to="/signup" className="font-body text-sm text-purple-600 py-2">Create account</Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
