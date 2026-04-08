import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/helpers';

const EMOJI = { coffee: '☕', matcha: '🍵', pastries: '🥐', 'cold-drinks': '🧋' };

export default function CartItem({ item }) {
  const { increment, decrement, remove } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-center gap-3 bg-white/80 rounded-2xl p-3 border border-lilac/20 hover:border-lilac/40 transition-colors"
    >
      {/* Thumbnail */}
      <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-lilac/20 to-blush/10">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">
            {EMOJI[item.category] || '☕'}
          </div>
        )}
      </div>

      {/* Name + price */}
      <div className="flex-1 min-w-0">
        <p className="font-body text-sm font-medium text-purple-900 truncate leading-snug">
          {item.name}
        </p>
        <p className="font-body text-xs text-purple-400 mt-0.5">
          {formatPrice(item.price)} each
        </p>
        <p className="font-body text-xs font-semibold text-purple-700 mt-0.5">
          {formatPrice(item.price * item.quantity)}
        </p>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <button
          onClick={() => decrement(item._id)}
          className="w-7 h-7 rounded-full bg-lilac/30 hover:bg-red-100 hover:text-red-600 text-purple-800 flex items-center justify-center text-sm font-bold transition-all hover:scale-110 active:scale-90"
          aria-label="Decrease quantity"
        >
          −
        </button>
        <motion.span
          key={item.quantity}
          initial={{ scale: 1.3 }}
          animate={{ scale: 1 }}
          className="font-body text-sm font-semibold text-purple-800 w-5 text-center"
        >
          {item.quantity}
        </motion.span>
        <button
          onClick={() => increment(item._id)}
          className="w-7 h-7 rounded-full bg-lilac/30 hover:bg-lilac text-purple-800 flex items-center justify-center text-sm font-bold transition-all hover:scale-110 active:scale-90"
          aria-label="Increase quantity"
        >
          +
        </button>
        <button
          onClick={() => remove(item._id)}
          className="w-7 h-7 rounded-full bg-pink-50 hover:bg-pink-200 text-pink-500 flex items-center justify-center text-sm transition-all hover:scale-110 active:scale-90 ml-1"
          aria-label="Remove item"
        >
          🗑
        </button>
      </div>
    </motion.div>
  );
}
