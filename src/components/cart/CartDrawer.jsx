import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { formatPrice } from '../../utils/helpers';
import Modal from '../ui/Modal';
import CartItem from './CartItem';

export default function CartDrawer() {
  const { items, count, total, isOpen, close, increment, decrement, remove, clear } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showClearModal, setShowClearModal] = useState(false);

  const handleCheckout = () => {
    close();
    if (!isAuthenticated) {
      navigate('/login?returnUrl=/checkout');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 bg-purple-900/25 backdrop-blur-sm z-40"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-cream shadow-2xl shadow-purple-200/50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-lilac/30">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🛒</span>
                  <h2 className="font-display text-xl text-purple-900">
                    Your Cart
                    {count > 0 && (
                      <span className="ml-2 text-sm font-body bg-lilac text-purple-800 px-2 py-0.5 rounded-full">
                        {count}
                      </span>
                    )}
                  </h2>
                </div>
                <button
                  onClick={close}
                  className="text-purple-400 hover:text-purple-700 transition-colors text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-lilac/30"
                >
                  ✕
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4 py-12">
                    <div className="text-6xl animate-bounce">🧁</div>
                    <p className="font-display text-purple-400 text-lg">Your cart is empty</p>
                    <p className="font-body text-sm text-purple-300">Add some yummy items!</p>
                    <button
                      onClick={() => { close(); navigate('/menu'); }}
                      className="mt-2 bg-lilac hover:bg-purple-300 text-purple-900 font-body text-sm px-6 py-2.5 rounded-full border border-purple-200 transition-all hover:scale-105"
                    >
                      Browse Menu 🌸
                    </button>
                  </div>
                ) : (
                  <>
                    <AnimatePresence>
                      {items.map((item) => (
                        <CartItem key={item._id} item={item} />
                      ))}
                    </AnimatePresence>

                    {/* Clear cart */}
                    <button
                      onClick={() => setShowClearModal(true)}
                      className="w-full font-body text-xs text-pink-400 hover:text-pink-600 py-2 transition-colors"
                    >
                      Clear cart
                    </button>
                  </>
                )}
              </div>

              {/* Footer with total + checkout */}
              {items.length > 0 && (
                <div className="border-t border-lilac/30 px-6 py-5 space-y-4 bg-white/50">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm text-purple-600">Subtotal</span>
                    <span className="font-display text-xl text-purple-900">{formatPrice(total)}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-lilac to-blush hover:from-purple-300 hover:to-pink-300 text-purple-900 font-body font-medium py-3.5 rounded-full border border-purple-200 transition-all duration-300 hover:scale-[1.02] text-sm"
                  >
                    Proceed to Checkout ✨
                  </button>
                  <p className="text-center font-body text-xs text-purple-400">
                    {!isAuthenticated && 'You\'ll need to sign in to checkout'}
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Confirm clear modal */}
      <Modal isOpen={showClearModal} onClose={() => setShowClearModal(false)} title="Clear cart? 🗑">
        <p className="font-body text-sm text-purple-600 mb-4">
          Are you sure you want to remove all items from your cart?
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setShowClearModal(false)}
            className="flex-1 font-body text-sm py-2.5 rounded-full border border-lilac text-purple-700 hover:bg-lilac/20 transition-all"
          >
            Keep items
          </button>
          <button
            onClick={() => { clear(); setShowClearModal(false); }}
            className="flex-1 font-body text-sm py-2.5 rounded-full bg-pink-100 hover:bg-pink-200 text-pink-700 border border-pink-200 transition-all"
          >
            Yes, clear it
          </button>
        </div>
      </Modal>
    </>
  );
}
