import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  fetchMenu,
  selectFilteredItems,
  selectAllMenuItems,
  selectMenuLoading,
  setSearchQuery,
  selectSearchQuery,
} from '../features/menu/menuSlice';
import MenuCard from '../components/menu/MenuCard';
import CategoryFilter from '../components/menu/CategoryFilter';
import { debounce } from '../utils/helpers';
import Footer from '../components/layout/Footer';

/* ── Rotating food emoji around the cup ── */
const ORBIT_ITEMS = [
  { emoji: '🥐', angle: 0,   radius: 120, duration: 12 },
  { emoji: '🍵', angle: 72,  radius: 130, duration: 14 },
  { emoji: '🧁', angle: 144, radius: 118, duration: 10 },
  { emoji: '🌸', angle: 216, radius: 125, duration: 16 },
  { emoji: '🥮', angle: 288, radius: 122, duration: 11 },
];

function OrbitItem({ emoji, angle, radius, duration }) {
  return (
    <motion.div
      className="absolute text-2xl pointer-events-none select-none"
      style={{
        top: '50%',
        left: '50%',
        marginTop: -16,
        marginLeft: -16,
      }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    >
      <motion.div
        style={{
          x: Math.cos((angle * Math.PI) / 180) * radius,
          y: Math.sin((angle * Math.PI) / 180) * radius,
        }}
        animate={{ rotate: -360 }} // counter-rotate so emoji stays upright
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {emoji}
      </motion.div>
    </motion.div>
  );
}

function MenuHeroBanner({ totalItems }) {
  return (
    <div className="relative overflow-hidden py-16"
      style={{ background: 'linear-gradient(160deg, #fdf4ff 0%, #fce7f3 40%, #ede9fe 100%)' }}
    >
      {/* Blobs */}
      <motion.div
        className="absolute w-72 h-72 rounded-full blur-3xl opacity-30 bg-purple-200 pointer-events-none"
        style={{ top: '-30%', left: '-10%' }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full blur-3xl opacity-30 bg-pink-200 pointer-events-none"
        style={{ bottom: '-20%', right: '-10%' }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 9, repeat: Infinity, delay: 2 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <p className="font-body text-xs text-purple-400 tracking-[0.2em] uppercase mb-3">
              Crafted with love
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-purple-900 mb-4 leading-tight">
              Our Menu 🌸
            </h1>
            <p className="font-body text-purple-400 text-base mb-6 max-w-sm leading-relaxed">
              Every item made to bring a little joy to your day. {totalItems > 0 && `${totalItems} items to explore.`}
            </p>
            {/* Floating tags */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {['☕ Coffee', '🍵 Matcha', '🥐 Pastries', '🧋 Cold Drinks'].map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="font-body text-xs bg-white/70 backdrop-blur-sm text-purple-700 px-3 py-1.5 rounded-full border border-purple-200/60"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Animated cup + orbiting items */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex-shrink-0"
            style={{ width: 300, height: 300 }}
          >
            {/* Glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(216,180,254,0.35) 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Orbiting items */}
            {ORBIT_ITEMS.map((o, i) => (
              <OrbitItem key={i} {...o} />
            ))}

            {/* Central coffee cup */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ y: [-8, 8, -8], rotate: [-3, 3, -3] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="text-[7rem] drop-shadow-2xl"
              >
                ☕
              </motion.div>

              {/* Steam lines */}
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  className="absolute pointer-events-none"
                  style={{
                    width: 3,
                    height: 20,
                    borderRadius: 4,
                    background: 'rgba(167,139,250,0.5)',
                    top: '25%',
                    left: `${44 + i * 6}%`,
                  }}
                  animate={{ y: [-5, -18, -5], opacity: [0, 0.8, 0], scaleY: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.35, ease: 'easeInOut' }}
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Wave into white */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 50" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block' }}>
          <path d="M0 30 C480 50 960 10 1440 30 L1440 50 L0 50 Z" fill="white" />
        </svg>
      </div>
    </div>
  );
}

export default function MenuPage() {
  const dispatch  = useDispatch();
  const items     = useSelector(selectFilteredItems);
  const allItems  = useSelector(selectAllMenuItems);
  const loading   = useSelector(selectMenuLoading);
  const query     = useSelector(selectSearchQuery);
  const searchRef = useRef(null);

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = React.useCallback(
    debounce((val) => dispatch(setSearchQuery(val)), 280),
    [dispatch]
  );

  return (
    <div className="min-h-screen bg-white">

      {/* ── Animated banner ── */}
      <MenuHeroBanner totalItems={allItems.length} />

      {/* ── Search + filters ── */}
      <div className="bg-white pt-4 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto mb-6"
          >
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300 pointer-events-none">🔍</span>
              <input
                ref={searchRef}
                type="text"
                placeholder="Search for your favourite..."
                defaultValue={query}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 rounded-full border border-purple-200 bg-purple-50/50 font-body text-sm text-purple-800 placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-transparent shadow-sm transition-all"
              />
              {query && (
                <button
                  onClick={() => {
                    dispatch(setSearchQuery(''));
                    if (searchRef.current) searchRef.current.value = '';
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-300 hover:text-purple-600 transition-colors text-sm"
                >
                  ✕
                </button>
              )}
            </div>
          </motion.div>

          {/* Category filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <CategoryFilter />
          </motion.div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 bg-white">

        {/* Loading skeletons */}
        {loading && allItems.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-3xl overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-purple-100 to-pink-100 animate-pulse" />
                <div className="p-5 bg-white border border-purple-100 rounded-b-3xl space-y-3">
                  <div className="h-5 w-3/4 bg-purple-100 rounded-full animate-pulse" />
                  <div className="h-3 w-full bg-purple-50 rounded-full animate-pulse" />
                  <div className="flex justify-between pt-1">
                    <div className="h-6 w-14 bg-purple-100 rounded-full animate-pulse" />
                    <div className="h-9 w-24 bg-pink-100 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty DB state */}
        {!loading && allItems.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <div className="text-7xl mb-5">🌱</div>
            <p className="font-display text-2xl text-purple-700 mb-3">No menu items yet!</p>
            <p className="font-body text-sm text-purple-400 mb-2">
              Your database is empty. Run the seed file to add 40 items:
            </p>
            <code className="inline-block bg-purple-50 text-purple-600 text-xs px-4 py-2 rounded-xl border border-purple-200 mb-6">
              cd server &amp;&amp; node seedData.js
            </code>
            <br />
            <button
              onClick={() => dispatch(fetchMenu())}
              className="font-body text-sm text-purple-600 border border-purple-200 px-6 py-2.5 rounded-full hover:bg-purple-50 transition-all"
            >
              ↻ Retry fetch
            </button>
          </motion.div>
        )}

        {/* No search results */}
        {!loading && allItems.length > 0 && items.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="font-display text-2xl text-purple-400 mb-2">Nothing found</p>
            <p className="font-body text-sm text-purple-300 mb-6">Try a different search or category</p>
            <button
              onClick={() => {
                dispatch(setSearchQuery(''));
                if (searchRef.current) searchRef.current.value = '';
              }}
              className="font-body text-sm text-purple-600 border border-purple-200 px-6 py-2.5 rounded-full hover:bg-purple-50 transition-all"
            >
              Clear search
            </button>
          </motion.div>
        )}

        {/* Items grid */}
        {items.length > 0 && (
          <>
            <motion.p
              key={items.length}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-body text-xs text-purple-400 mb-5 mt-2"
            >
              Showing {items.length} item{items.length !== 1 ? 's' : ''}
            </motion.p>
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {items.map((item) => (
                  <MenuCard key={item._id} item={item} />
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
