import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  fetchMyOrders,
  selectMyOrders,
  selectOrdersLoading,
} from '../features/orders/ordersSlice';
import { formatPrice, formatDateTime, statusColor } from '../utils/helpers';
import Footer from '../components/layout/Footer';

const STATUS_STEPS = ['pending', 'confirmed', 'preparing', 'ready', 'completed'];
const STATUS_LABELS = {
  pending:   { emoji: '🕐', label: 'Pending'   },
  confirmed: { emoji: '✅', label: 'Confirmed' },
  preparing: { emoji: '👨‍🍳', label: 'Preparing' },
  ready:     { emoji: '🎉', label: 'Ready!'    },
  completed: { emoji: '💕', label: 'Completed' },
};

function OrderProgressBar({ status }) {
  const step = STATUS_STEPS.indexOf(status);
  return (
    <div className="mb-4">
      {/* Bar */}
      <div className="flex items-center gap-0 mb-2">
        {STATUS_STEPS.map((s, i) => (
          <React.Fragment key={s}>
            {/* Dot */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.07 }}
              className={`w-3 h-3 rounded-full flex-shrink-0 border-2 border-white shadow-sm transition-all duration-500 ${
                i <= step
                  ? 'bg-gradient-to-br from-lilac to-blush'
                  : 'bg-gray-200'
              } ${i === step ? 'w-4 h-4 ring-2 ring-lilac ring-offset-1' : ''}`}
            />
            {/* Connector */}
            {i < STATUS_STEPS.length - 1 && (
              <div className={`flex-1 h-1 transition-all duration-700 ${i < step ? 'bg-gradient-to-r from-lilac to-blush' : 'bg-gray-100'}`} />
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Labels */}
      <div className="flex justify-between">
        {STATUS_STEPS.map((s, i) => (
          <span
            key={s}
            className={`font-body text-[10px] transition-colors ${
              i === step
                ? 'text-purple-600 font-semibold'
                : i < step
                ? 'text-purple-400'
                : 'text-gray-300'
            }`}
          >
            {STATUS_LABELS[s]?.emoji}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const dispatch = useDispatch();
  const orders   = useSelector(selectMyOrders);
  const loading  = useSelector(selectOrdersLoading);

  useEffect(() => { dispatch(fetchMyOrders()); }, [dispatch]);

  return (
    <div className="min-h-screen bg-cream pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <p className="font-body text-xs text-purple-400 tracking-[0.2em] uppercase mb-2">
            Your history
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-purple-900 mb-2">
            My Orders 📦
          </h1>
          <p className="font-body text-purple-400">
            Every cup and pastry you've ordered from BeansSprout
          </p>
        </motion.div>

        {/* Loading skeletons */}
        {loading && (
          <div className="space-y-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-3xl overflow-hidden">
                <div className="h-44 shimmer" />
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && orders.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-7xl mb-5"
            >
              📭
            </motion.div>
            <p className="font-display text-2xl text-purple-400 mb-2">No orders yet</p>
            <p className="font-body text-sm text-purple-300 mb-8">
              Your order history will appear here once you place your first order
            </p>
            <a
              href="/menu"
              className="inline-flex items-center gap-2 font-body text-sm text-purple-700 border border-lilac px-8 py-3.5 rounded-full hover:bg-lilac/20 transition-all hover:scale-105 shadow-sm"
            >
              Browse our menu 🌸
            </a>
          </motion.div>
        )}

        {/* Orders list */}
        {!loading && orders.length > 0 && (
          <AnimatePresence>
            <div className="space-y-5">
              {orders.map((order, i) => {
                const cfg = STATUS_LABELS[order.status] || STATUS_LABELS.pending;
                return (
                  <motion.div
                    key={order._id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.45 }}
                    className="bg-white rounded-3xl border border-lilac/25 p-6 shadow-sm hover:shadow-xl hover:shadow-lilac/10 transition-all duration-300"
                  >
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="font-body text-xs text-purple-400">
                            Order
                          </span>
                          <span className="font-body text-xs font-semibold text-purple-700 bg-lilac/20 px-2 py-0.5 rounded-full">
                            #{order._id?.slice(-8).toUpperCase()}
                          </span>
                        </div>
                        <p className="font-body text-xs text-purple-300">
                          {formatDateTime(order.createdAt)}
                        </p>
                      </div>

                      {/* Status badge */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">{cfg.emoji}</span>
                        <span className={`font-body text-xs font-semibold px-3 py-1.5 rounded-full capitalize ${statusColor(order.status)}`}>
                          {cfg.label}
                        </span>
                      </div>
                    </div>

                    {/* Progress tracker */}
                    <OrderProgressBar status={order.status} />

                    {/* Items */}
                    <div className="space-y-2 mb-4 bg-cream/50 rounded-2xl p-4 border border-lilac/15">
                      {order.items?.map((item, j) => (
                        <div key={j} className="flex items-center justify-between">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="font-body text-sm text-purple-700 truncate">
                              {item.name}
                            </span>
                            <span className="font-body text-xs text-purple-400 flex-shrink-0">
                              × {item.quantity}
                            </span>
                          </div>
                          <span className="font-body text-sm text-purple-600 flex-shrink-0 ml-3">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-lilac/20">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-body px-2.5 py-1 rounded-full capitalize ${
                          order.paymentStatus === 'paid'
                            ? 'bg-mint text-green-800'
                            : 'bg-beige text-yellow-700'
                        }`}>
                          {order.paymentStatus === 'paid' ? '💳 Paid' : '💸 Pending payment'}
                        </span>
                      </div>
                      <span className="font-display text-xl text-purple-900">
                        {formatPrice(order.totalAmount)}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        )}
      </div>

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}
