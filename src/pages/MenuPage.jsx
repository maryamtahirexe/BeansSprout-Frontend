import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  fetchMenu,
  selectFilteredItems,
  selectMenuLoading,
  setSearchQuery,
  selectSearchQuery,
} from '../features/menu/menuSlice';
import MenuCard from '../components/menu/MenuCard';
import CategoryFilter from '../components/menu/CategoryFilter';
import { debounce } from '../utils/helpers';
import Footer from '../components/layout/Footer';

export default function MenuPage() {
  const dispatch = useDispatch();
  const items   = useSelector(selectFilteredItems);
  const loading = useSelector(selectMenuLoading);
  const query   = useSelector(selectSearchQuery);
  const searchRef = useRef(null);

  useEffect(() => { dispatch(fetchMenu()); }, [dispatch]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleSearch = React.useCallback(
    debounce((val) => dispatch(setSearchQuery(val)), 280),
    [dispatch]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-white to-cream pt-24">

      {/* ── Page header ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-body text-xs text-purple-400 tracking-[0.2em] uppercase mb-2"
        >
          Crafted with love
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="font-display text-5xl md:text-6xl text-purple-900 mb-3"
        >
          Our Menu 🌸
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="font-body text-purple-400 text-base mb-9"
        >
          Every item made to bring a little joy to your day
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="max-w-md mx-auto mb-8"
        >
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-300 pointer-events-none">🔍</span>
            <input
              ref={searchRef}
              type="text"
              placeholder="Search for your favourite..."
              defaultValue={query}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3.5 rounded-full border border-lilac/50 bg-white/90 backdrop-blur-sm font-body text-sm text-purple-800 placeholder:text-purple-300 focus:outline-none focus:ring-2 focus:ring-lilac focus:border-transparent shadow-sm transition-all"
            />
            {query && (
              <button
                onClick={() => {
                  dispatch(setSearchQuery(''));
                  if (searchRef.current) searchRef.current.value = '';
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-300 hover:text-purple-600 text-sm transition-colors"
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

      {/* ── Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading ? (
          /* Skeleton loader */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-3xl overflow-hidden">
                <div className="h-48 shimmer" />
                <div className="p-5 bg-white border border-lilac/20 rounded-b-3xl space-y-3">
                  <div className="h-5 w-3/4 shimmer rounded-full" />
                  <div className="h-3 w-full shimmer rounded-full" />
                  <div className="h-3 w-2/3 shimmer rounded-full" />
                  <div className="flex justify-between items-center pt-1">
                    <div className="h-6 w-16 shimmer rounded-full" />
                    <div className="h-9 w-24 shimmer rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-7xl mb-4">🔍</div>
            <p className="font-display text-2xl text-purple-400 mb-2">Nothing found</p>
            <p className="font-body text-sm text-purple-300 mb-6">
              Try a different search term or category
            </p>
            <button
              onClick={() => {
                dispatch(setSearchQuery(''));
                if (searchRef.current) searchRef.current.value = '';
              }}
              className="font-body text-sm text-purple-600 border border-lilac px-6 py-2.5 rounded-full hover:bg-lilac/20 transition-all"
            >
              Clear search
            </button>
          </motion.div>
        ) : (
          <>
            <motion.p
              key={items.length}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-body text-xs text-purple-400 mb-5"
            >
              Showing {items.length} item{items.length !== 1 ? 's' : ''}
            </motion.p>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
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
