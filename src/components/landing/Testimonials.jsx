import React from 'react';
import { motion } from 'framer-motion';

const reviews = [
  {
    name: 'Ayesha R.',
    handle: '@ayeshar',
    text: 'The matcha latte here is absolutely heavenly. I come every single morning without fail — it literally makes my whole day better!',
    emoji: '🍵',
    gradient: 'from-mint/40 to-skyblue/20',
    border: 'border-mint/40',
    stars: 5,
  },
  {
    name: 'Sara M.',
    handle: '@saramirza',
    text: 'BeansSprout has the cutest vibes and their croissants melt in your mouth. Total perfection. 10/10 would recommend.',
    emoji: '🥐',
    gradient: 'from-beige/60 to-blush/20',
    border: 'border-yellow-200/60',
    stars: 5,
  },
  {
    name: 'Zara K.',
    handle: '@zarakhan',
    text: 'I ordered online and my coffee was ready by the time I got there. Super smooth experience and the app is so pretty!',
    emoji: '☕',
    gradient: 'from-lilac/25 to-blush/15',
    border: 'border-lilac/40',
    stars: 5,
  },
  {
    name: 'Nadia T.',
    handle: '@nadiatahir',
    text: 'Everything about BeansSprout is magical — the pastel aesthetic, the amazing drinks, the warm atmosphere. My favourite place!',
    emoji: '✨',
    gradient: 'from-blush/30 to-lilac/15',
    border: 'border-pink-200/60',
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-cream overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-body text-xs text-purple-400 tracking-[0.2em] uppercase mb-2">
            What people say
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-purple-900">
            Spreading the Love 💕
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className={`bg-gradient-to-br ${r.gradient} p-6 md:p-7 rounded-3xl border ${r.border} shadow-sm hover:shadow-lg hover:shadow-purple-100/50 transition-shadow cursor-default`}
            >
              {/* Quote mark */}
              <div className="font-display text-5xl text-purple-200 leading-none mb-2 select-none">"</div>

              {/* Text */}
              <p className="font-body text-base text-purple-800 leading-relaxed mb-5">
                {r.text}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lilac to-blush flex items-center justify-center text-lg shadow-sm">
                    {r.emoji}
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-purple-800">{r.name}</p>
                    <p className="font-body text-xs text-purple-400">{r.handle}</p>
                  </div>
                </div>
                {/* Stars */}
                <div className="flex gap-0.5">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <span key={j} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom nudge */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center font-body text-sm text-purple-400 mt-8"
        >
          Join 10,000+ happy customers · ★ 4.9 average rating
        </motion.p>
      </div>
    </section>
  );
}
