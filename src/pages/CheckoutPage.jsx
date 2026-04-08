import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { selectCartItems, selectCartTotal, clearCart } from '../features/cart/cartSlice';
import { placeOrder, selectOrdersLoading } from '../features/orders/ordersSlice';
import { formatPrice } from '../utils/helpers';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const EMOJI = { coffee: '☕', matcha: '🍵', pastries: '🥐', 'cold-drinks': '🧋' };

export default function CheckoutPage() {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const { user }  = useAuth();
  const items     = useSelector(selectCartItems);
  const total     = useSelector(selectCartTotal);
  const loading   = useSelector(selectOrdersLoading);
  const [notes,   setNotes]   = useState('');

  // Redirect if cart is empty
  if (items.length === 0) {
    navigate('/menu');
    return null;
  }

  const handlePlaceOrder = async () => {
    const orderData = {
      items: items.map((i) => ({
        menuItemId: i._id,
        name:       i.name,
        price:      i.price,
        quantity:   i.quantity,
        image:      i.image || '',
      })),
      totalAmount: total,
      ...(notes.trim() && { notes }),
    };

    const result = await dispatch(placeOrder(orderData));
    if (placeOrder.fulfilled.match(result)) {
      dispatch(clearCart());
      navigate('/order-success');
    } else {
      toast.error(result.payload?.message || 'Failed to place order — please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white pt-24 pb-20">
      {/* Blobs */}
      <div className="fixed top-20 right-0 w-60 h-60 bg-lilac/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 left-0 w-60 h-60 bg-blush/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-display text-5xl text-purple-900 mb-2">Checkout ✨</h1>
          <p className="font-body text-purple-400">Review your order before confirming</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ── Order summary ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl border border-lilac/25 p-6 shadow-sm"
          >
            <h2 className="font-display text-xl text-purple-900 mb-5 flex items-center gap-2">
              <span>🛒</span> Order Summary
            </h2>

            <div className="space-y-3 mb-5">
              {items.map((item) => (
                <div key={item._id} className="flex items-center gap-3 py-2 border-b border-lilac/15 last:border-0">
                  {/* Thumbnail */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lilac/20 to-blush/10 flex items-center justify-center text-xl flex-shrink-0 overflow-hidden">
                    {item.image
                      ? <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                      : EMOJI[item.category] || '🍽'
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-medium text-purple-800 truncate">{item.name}</p>
                    <p className="font-body text-xs text-purple-400">× {item.quantity}</p>
                  </div>
                  <p className="font-body text-sm font-semibold text-purple-700 flex-shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-3 border-t border-lilac/20">
              <div className="flex justify-between font-body text-sm text-purple-500">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between font-body text-sm text-purple-500">
                <span>Service fee</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-lilac/20">
                <span className="font-body text-base font-semibold text-purple-800">Total</span>
                <span className="font-display text-2xl text-purple-900">{formatPrice(total)}</span>
              </div>
            </div>
          </motion.div>

          {/* ── Customer details + confirm ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white rounded-3xl border border-lilac/25 p-6 shadow-sm flex flex-col"
          >
            <h2 className="font-display text-xl text-purple-900 mb-5 flex items-center gap-2">
              <span>👤</span> Your Details
            </h2>

            <div className="space-y-3 mb-5">
              <div className="bg-gradient-to-r from-lilac/10 to-blush/5 rounded-2xl p-4 border border-lilac/20">
                <p className="font-body text-xs text-purple-400 mb-0.5">Name</p>
                <p className="font-body text-sm text-purple-800 font-medium">{user?.name}</p>
              </div>
              <div className="bg-gradient-to-r from-lilac/10 to-blush/5 rounded-2xl p-4 border border-lilac/20">
                <p className="font-body text-xs text-purple-400 mb-0.5">Email</p>
                <p className="font-body text-sm text-purple-800 font-medium">{user?.email}</p>
              </div>
            </div>

            {/* Notes */}
            <div className="mb-6 flex-1">
              <label className="font-body text-sm font-medium text-purple-700 mb-2 block">
                Special requests
                <span className="font-normal text-purple-400 ml-1">(optional)</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Extra oat milk? No sugar? Let us know 🌸"
                rows={4}
                className="w-full rounded-2xl border border-lilac/50 bg-cream/50 px-4 py-3 font-body text-sm text-purple-800 placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-lilac focus:border-transparent resize-none transition-all"
              />
            </div>

            {/* Place order */}
            <Button
              fullWidth
              size="lg"
              onClick={handlePlaceOrder}
              loading={loading}
              className="shadow-xl shadow-lilac/20"
            >
              Place Order 🌸
            </Button>

            <p className="font-body text-xs text-center text-purple-400 mt-3">
              💳 Payment collected at pickup · No card needed online
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
