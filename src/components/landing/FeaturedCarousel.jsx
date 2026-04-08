import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllMenuItems, fetchMenu } from '../../features/menu/menuSlice';
import { formatPrice } from '../../utils/helpers';
import { useCart } from '../../hooks/useCart';

const EMOJI = { coffee: '☕', matcha: '🍵', pastries: '🥐', 'cold-drinks': '🧋' };

export default function FeaturedCarousel() {
  const dispatch  = useDispatch();
  const allItems  = useSelector(selectAllMenuItems);
  const featured  = allItems.slice(0, 5);
  const { add }   = useCart();
  const [current, setCurrent]   = useState(0);
  const [paused,  setPaused]    = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => { if (allItems.length === 0) dispatch(fetchMenu()); }, [dispatch, allItems.length]);

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
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, [paused, next, featured.length]);

  if (featured.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex justify-center gap-6">
            {Array.from({length:4}).map((_, i) => (
              <div key={i} className="w-48 h-64 rounded-3xl shimmer" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const item = featured[current];
  const variants = {
    enter:  (d) => ({ x: d > 0 ? 80  : -80,  opacity: 0, scale: 0.96 }),
    center: {      x: 0,                       opacity: 1, scale: 1    },
    exit:   (d) => ({ x: d > 0 ? -80 :  80,  opacity: 0, scale: 0.96 }),
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
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

        {/* Carousel body */}
        <div
          className="flex flex-col lg:flex-row items-center gap-12"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Big card */}
          <div className="flex-1 w-full max-w-lg mx-auto">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-lilac/15 border border-lilac/20 bg-white">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={item._id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Image area */}
                  <div className="relative h-72 bg-gradient-to-br from-lilac/20 via-blush/15 to-mint/10 flex items-center justify-center overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <motion.div
                        animate={{ scale: [1, 1.08, 1], rotate: [-3, 3, -3] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="text-[7rem] drop-shadow-lg"
                      >
                        {EMOJI[item.category] || '☕'}
                      </motion.div>
                    )}
                    {/* overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />

                    {/* Category badge */}
                    <span className="absolute top-4 left-4 font-body text-xs bg-white/80 backdrop-blur-sm text-purple-700 px-3 py-1 rounded-full border border-lilac/30 capitalize">
                      {item.category?.replace('-', ' ')}
                    </span>

                    {/* Tags */}
                    {item.tags?.length > 0 && (
                      <div className="absolute top-4 right-4 flex flex-col gap-1">
                        {item.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="font-body text-[10px] bg-mint/70 text-green-800 px-2 py-0.5 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-6 flex items-end justify-between">
                    <div>
                      <h3 className="font-display text-2xl text-purple-900 mb-1">{item.name}</h3>
                      {item.description && (
                        <p className="font-body text-sm text-purple-400 line-clamp-1 max-w-[260px]">
                          {item.description}
                        </p>
                      )}
                      <p className="font-display text-xl text-purple-700 mt-2">{formatPrice(item.price)}</p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => add(item)}
                      className="bg-gradient-to-r from-lilac to-blush text-purple-900 font-body text-sm font-medium px-5 py-2.5 rounded-full border border-purple-200 shadow-md shadow-lilac/20 flex-shrink-0 ml-4"
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
                    i === current
                      ? 'w-8 h-2.5 bg-gradient-to-r from-lilac to-blush'
                      : 'w-2.5 h-2.5 bg-lilac/30 hover:bg-lilac/60'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-3 flex-wrap justify-center">
            {featured.map((f, i) => (
              <motion.button
                key={f._id}
                onClick={() => go(i)}
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                  i === current
                    ? 'border-lilac shadow-lg shadow-lilac/30 scale-105'
                    : 'border-transparent opacity-50 hover:opacity-80'
                }`}
              >
                <div className="w-full h-full bg-gradient-to-br from-lilac/20 to-blush/20 flex items-center justify-center">
                  {f.image ? (
                    <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl">{EMOJI[f.category] || '☕'}</span>
                  )}
                </div>
                {i === current && (
                  <div className="absolute inset-0 ring-2 ring-lilac ring-inset rounded-2xl" />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
