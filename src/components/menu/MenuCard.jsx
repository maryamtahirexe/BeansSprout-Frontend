import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/helpers';

const EMOJI = { coffee: '☕', matcha: '🍵', pastries: '🥐', 'cold-drinks': '🧋' };

const TAG_COLORS = {
  vegan:         'bg-mint        text-green-800',
  'gluten-free': 'bg-beige       text-yellow-800',
  spicy:         'bg-red-100     text-red-700',
  popular:       'bg-blush       text-pink-800',
  seasonal:      'bg-skyblue     text-blue-800',
  new:           'bg-lilac       text-purple-800',
};

export default function MenuCard({ item }) {
  const { add, items } = useCart();
  const inCart = items.find(i => i._id === item._id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="group bg-white rounded-3xl border border-lilac/25 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-lilac/15 transition-shadow duration-300 flex flex-col"
    >
      {/* ── Image ── */}
      <div className="relative h-48 bg-gradient-to-br from-lilac/15 via-blush/10 to-mint/10 overflow-hidden flex-shrink-0">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <motion.div
            animate={{ y: [-4, 4, -4], rotate: [-3, 3, -3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full h-full flex items-center justify-center text-6xl"
          >
            {EMOJI[item.category] || '🍽'}
          </motion.div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category pill */}
        <span className="absolute top-3 left-3 font-body text-xs bg-white/85 backdrop-blur-sm text-purple-700 px-3 py-1 rounded-full border border-lilac/30 capitalize">
          {item.category?.replace('-', ' ')}
        </span>

        {/* Cart indicator */}
        {inCart && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 bg-mint text-green-800 text-xs font-body font-semibold px-2.5 py-1 rounded-full border border-green-200"
          >
            ✓ In cart ({inCart.quantity})
          </motion.span>
        )}
      </div>

      {/* ── Body ── */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Name + description */}
        <div className="flex-1">
          <h3 className="font-display text-lg text-purple-900 leading-snug">{item.name}</h3>
          {item.description && (
            <p className="font-body text-xs text-purple-400 mt-1 line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          )}
        </div>

        {/* Tags */}
        {item.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map(tag => (
              <span
                key={tag}
                className={`text-xs font-body px-2.5 py-0.5 rounded-full capitalize ${
                  TAG_COLORS[tag] || 'bg-lilac/30 text-purple-700'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price + Add */}
        <div className="flex items-center justify-between pt-1">
          <span className="font-display text-xl text-purple-800">{formatPrice(item.price)}</span>
          <motion.button
            whileTap={{ scale: 0.88 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => add(item)}
            className="bg-gradient-to-r from-lilac to-blush hover:from-purple-300 hover:to-pink-300 text-purple-900 font-body text-sm font-medium px-5 py-2.5 rounded-full border border-purple-200 shadow-sm hover:shadow-md hover:shadow-lilac/25 transition-shadow"
          >
            {inCart ? '+ More 🌸' : '+ Add 🌸'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
