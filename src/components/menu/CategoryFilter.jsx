import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import {
  setActiveCategory,
  selectActiveCategory,
  selectAllMenuItems,
} from '../../features/menu/menuSlice';

const CATEGORIES = [
  { value: 'all',         label: '✨ All'         },
  { value: 'coffee',      label: '☕ Coffee'       },
  { value: 'matcha',      label: '🍵 Matcha'       },
  { value: 'pastries',    label: '🥐 Pastries'     },
  { value: 'cold-drinks', label: '🧋 Cold Drinks'  },
];

export default function CategoryFilter() {
  const dispatch = useDispatch();
  const active   = useSelector(selectActiveCategory);
  const allItems = useSelector(selectAllMenuItems);

  // Count per category
  const counts = CATEGORIES.reduce((acc, cat) => {
    acc[cat.value] = cat.value === 'all'
      ? allItems.length
      : allItems.filter(i => i.category === cat.value).length;
    return acc;
  }, {});

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {CATEGORIES.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => dispatch(setActiveCategory(value))}
          className={`relative font-body text-sm px-5 py-2.5 rounded-full border transition-all duration-200 hover:scale-105 active:scale-95 ${
            active === value
              ? 'text-purple-900 border-purple-300 shadow-lg shadow-lilac/25'
              : 'bg-white/80 text-purple-500 border-lilac/40 hover:bg-lilac/10 hover:border-lilac/70'
          }`}
        >
          {/* Active background slides via layoutId */}
          {active === value && (
            <motion.span
              layoutId="category-pill"
              className="absolute inset-0 bg-gradient-to-r from-lilac to-blush/70 rounded-full -z-10"
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            />
          )}
          <span className="relative z-10">
            {label}
            {counts[value] > 0 && (
              <span className={`ml-1.5 text-xs ${active === value ? 'text-purple-700' : 'text-purple-300'}`}>
                ({counts[value]})
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
}
