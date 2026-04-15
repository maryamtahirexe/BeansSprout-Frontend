import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllMenuItems, selectMenuLoading, fetchMenu } from '../../features/menu/menuSlice';
import { formatPrice } from '../../utils/helpers';
import { useCart } from '../../hooks/useCart';

const EMOJI = { coffee: '☕', matcha: '🍵', pastries: '🥐', 'cold-drinks': '🧋' };

const TAG_BG = {
  popular:       'bg-pink-100 text-pink-700',
  vegan:         'bg-green-100 text-green-700',
  seasonal:      'bg-blue-100 text-blue-700',
  new:           'bg-purple-100 text-purple-700',
  'gluten-free': 'bg-yellow-100 text-yellow-700',
};

/* Skeleton while loading */
function CarouselSkeleton() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="h-3 w-28 rounded-full bg-purple-100 mx-auto mb-3 animate-pulse" />
          <div className="h-10 w-64 rounded-full bg-purple-100 mx-auto animate-pulse" />
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 w-full max-w-lg mx-auto">
            <div className="rounded-3xl overflow-hidden border border-purple-100">
              <div className="h-72 bg-gradient-to-br from-purple-100 to-pink-100 animate-pulse" />
              <div className="p-6 bg-white space-y-3">
                <div className="h-6 w-48 rounded-full bg-purple-100 animate-pulse" />
                <div className="h-4 w-full rounded-full bg-purple-50 animate-pulse" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-7 w-16 rounded-full bg-purple-100 animate-pulse" />
                  <div className="h-10 w-24 rounded-full bg-pink-100 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex lg:flex-col gap-3">
            {[0,1,2,3,4].map(i => (
              <div key={i} className="w-20 h-20 rounded-2xl bg-purple-100 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Empty state when DB has no items */
function EmptyState() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="font-display text-2xl text-purple-800 mb-2">Menu coming soon!</h3>
          <p className="font-body text-sm text-purple-400 mb-6">
            Run <code className="bg-purple-50 px-2 py-1 rounded text-purple-600 text-xs">node seedData.js</code> in your server folder to add menu items.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default function FeaturedCarousel() {
  const dispatch = useDispatch();
  const allItems = useSelector(selectAllMenuItems);
  const loading  = useSelector(selectMenuLoading);
  const { add }  = useCart();

  const featured  = allItems.slice(0, 5);
  const [current,   setCurrent]   = useState(0);
  const [paused,    setPaused]    = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (allItems.length === 0) dispatch(fetchMenu());
  }, [dispatch, allItems.length]);

  // Reset current index when items load
  useEffect(() => {
    setCurrent(0);
  }, [allItems.length]);

  const go = useCallback((idx) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current]);

  const next = useCallback(() => {
    if (featured.length === 0) return;
    setDirection(1);
    setCurrent(c => (c + 1) % featured.length);
  }, [featured.length]);

  useEffect(() => {
    if (paused || featured.length === 0) return;
    const t = setInterval(next, 2000);
    return () => clearInterval(t);
  }, [paused, next, featured.length]);

  // Show skeleton while loading
  if (loading && allItems.length === 0) return <CarouselSkeleton />;

  // Show empty state if load finished but no items
  if (!loading && allItems.length === 0) return <EmptyState />;

  // Safety: clamp current index
  const safeIdx = Math.min(current, featured.length - 1);
  const item = featured[safeIdx];
  if (!item) return null;

  const variants = {
    enter:  (d) => ({ x: d > 0 ? 80 : -80,  opacity: 0, scale: 0.97 }),
    center: {      x: 0,                      opacity: 1, scale: 1    },
    exit:   (d) => ({ x: d > 0 ? -80 : 80,  opacity: 0, scale: 0.97 }),
  };

  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-body text-xs text-purple-400 tracking-[0.2em] uppercase mb-2">
            Fan favourites
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-purple-900">
            Today's Picks 🌸
          </h2>
        </motion.div>

        <div
          className="flex flex-col lg:flex-row items-center gap-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* ── Big Card ── */}
          <div className="flex-1 w-full max-w-lg mx-auto">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-purple-200/30 border border-purple-100 bg-white">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={item._id || safeIdx}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Image / emoji area */}
                  <div className="relative h-72 overflow-hidden" style={{
                    background: 'linear-gradient(135deg, #f3e8ff 0%, #fce7f3 50%, #ecfdf5 100%)'
                  }}>
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <motion.div
                        animate={{ scale: [1, 1.08, 1], rotate: [-3, 3, -3] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-full h-full flex items-center justify-center text-[7rem] drop-shadow-lg"
                      >
                        {EMOJI[item.category] || '☕'}
                      </motion.div>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent" />

                    {/* Category badge */}
                    <span className="absolute top-4 left-4 font-body text-xs bg-white/85 backdrop-blur-sm text-purple-700 px-3 py-1.5 rounded-full border border-purple-100 capitalize font-medium">
                      {item.category?.replace('-', ' ')}
                    </span>

                    {/* Tags */}
                    {item.tags?.length > 0 && (
                      <div className="absolute top-4 right-4 flex flex-col gap-1.5">
                        {item.tags.slice(0, 2).map(tag => (
                          <span key={tag} className={`font-body text-[10px] px-2 py-0.5 rounded-full font-medium ${TAG_BG[tag] || 'bg-gray-100 text-gray-600'}`}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-6 flex items-end justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-2xl text-purple-900 mb-1 truncate">{item.name}</h3>
                      {item.description && (
                        <p className="font-body text-sm text-purple-400 line-clamp-1">
                          {item.description}
                        </p>
                      )}
                      <p className="font-display text-xl text-purple-700 mt-2">{formatPrice(item.price)}</p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.88 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => add(item)}
                      className="bg-gradient-to-r from-purple-400 to-pink-400 text-white font-body text-sm font-semibold px-5 py-2.5 rounded-full shadow-lg shadow-purple-300/30 flex-shrink-0 hover:shadow-xl transition-shadow"
                    >
                      Add 🌸
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-5">
              {featured.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === safeIdx
                      ? 'w-8 h-2.5 bg-gradient-to-r from-purple-400 to-pink-400'
                      : 'w-2.5 h-2.5 bg-purple-200 hover:bg-purple-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* ── Thumbnails ── */}
          <div className="flex lg:flex-col gap-3 flex-wrap justify-center">
            {featured.map((f, i) => (
              <motion.button
                key={f._id || i}
                onClick={() => go(i)}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                  i === safeIdx
                    ? 'border-purple-400 shadow-lg shadow-purple-300/30 scale-105'
                    : 'border-transparent opacity-50 hover:opacity-80'
                }`}
              >
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #f3e8ff, #fce7f3)' }}
                >
                  {f.image ? (
                    <img
                      src={f.image}
                      alt={f.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  ) : (
                    <span className="text-2xl">{EMOJI[f.category] || '☕'}</span>
                  )}
                </div>
                {i === safeIdx && (
                  <div className="absolute inset-0 ring-2 ring-purple-400 ring-inset rounded-2xl" />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
