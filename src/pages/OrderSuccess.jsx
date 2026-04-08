import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectCurrentOrder } from '../features/orders/ordersSlice';
import { formatPrice, formatDateTime } from '../utils/helpers';

const EMOJI = { coffee: '☕', matcha: '🍵', pastries: '🥐', 'cold-drinks': '🧋' };

/* falling confetti pieces */
const CONFETTI = ['🌸', '✨', '🎉', '💕', '☕', '🌟', '🥐', '🍵'];

export default function OrderSuccess() {
  const order = useSelector(selectCurrentOrder);

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-white to-cream pt-24 pb-20 flex items-center justify-center px-4 overflow-hidden relative">

      {/* ── Falling confetti ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {CONFETTI.map((e, i) => (
          <motion.div
            key={i}
            className="absolute text-xl select-none"
            style={{ left: `${8 + i * 11.5}%`, top: '-8%' }}
            animate={{ y: ['0vh', '110vh'], rotate: [0, 720], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 3.5 + i * 0.35,
              repeat: Infinity,
              delay: i * 0.55,
              ease: 'linear',
            }}
          >
            {e}
          </motion.div>
        ))}
      </div>

      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 30 }}
        animate={{ opacity: 1, scale: 1,    y: 0  }}
        transition={{ type: 'spring', damping: 22, stiffness: 180 }}
        className="max-w-md w-full text-center relative z-10"
      >
        {/* Success badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 14, delay: 0.2 }}
          className="w-28 h-28 rounded-full bg-gradient-to-br from-mint to-green-300 flex items-center justify-center text-5xl mx-auto mb-6 shadow-2xl shadow-green-200/60"
        >
          ✅
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="font-display text-4xl md:text-5xl text-purple-900 mb-2">
            Order Placed! 🌸
          </h1>
          <p className="font-body text-purple-400 text-base mb-6 leading-relaxed">
            We'll start preparing your order right away.<br />
            You'll hear from us soon!
          </p>
        </motion.div>

        {/* Order details card */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl border border-lilac/30 p-6 mb-6 text-left shadow-lg shadow-lilac/10"
          >
            {/* Header row */}
            <div className="flex justify-between items-center pb-3 mb-3 border-b border-lilac/20">
              <div>
                <p className="font-body text-xs text-purple-400">Order reference</p>
                <p className="font-body text-sm font-semibold text-purple-800 mt-0.5">
                  #{order._id?.slice(-8).toUpperCase()}
                </p>
              </div>
              <span className="font-body text-xs bg-mint text-green-800 px-3 py-1.5 rounded-full border border-green-200 font-medium">
                Confirmed ✓
              </span>
            </div>

            {/* Timestamp */}
            {order.createdAt && (
              <p className="font-body text-xs text-purple-400 mb-3">
                {formatDateTime(order.createdAt)}
              </p>
            )}

            {/* Items */}
            <div className="space-y-2 mb-4">
              {order.items?.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">
                      {EMOJI[item.category] || '☕'}
                    </span>
                    <span className="font-body text-sm text-purple-700">
                      {item.name}
                      <span className="text-purple-400 ml-1">× {item.quantity}</span>
                    </span>
                  </div>
                  <span className="font-body text-sm text-purple-600">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-3 border-t border-lilac/20">
              <span className="font-body text-sm font-semibold text-purple-700">Total</span>
              <span className="font-display text-2xl text-purple-900">
                {formatPrice(order.totalAmount)}
              </span>
            </div>
          </motion.div>
        )}

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="flex flex-col gap-3"
        >
          <Link
            to="/my-orders"
            className="w-full bg-gradient-to-r from-lilac to-blush text-purple-900 font-body font-semibold py-4 rounded-full border border-purple-200 text-center hover:scale-[1.02] transition-all duration-200 shadow-xl shadow-lilac/20 text-sm"
          >
            View My Orders 📦
          </Link>
          <Link
            to="/menu"
            className="w-full bg-white text-purple-700 font-body font-medium py-3.5 rounded-full border border-lilac text-center hover:bg-lilac/10 transition-all text-sm"
          >
            Order More ☕
          </Link>
          <Link
            to="/"
            className="font-body text-xs text-purple-400 hover:text-purple-600 transition-colors py-1"
          >
            Back to home →
          </Link>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="font-body text-xs text-purple-300 mt-6"
        >
          🌸 A confirmation has been sent to your email
        </motion.p>
      </motion.div>
    </div>
  );
}
