import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/layout/Footer';

const Reveal = ({ children, delay = 0, fromX = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: fromX === 0 ? 35 : 0, x: fromX }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true, amount: 0.25 }}
    transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const timeline = [
  { year: '2019', emoji: '💭', title: 'The Dream Begins',  desc: 'Started as a home coffee-roasting project with just a small kitchen and a very big dream.' },
  { year: '2021', emoji: '🎪', title: 'First Pop-Up',      desc: 'Our first weekend pop-up at the Blossom Market sold out completely in under two hours.' },
  { year: '2022', emoji: '🏡', title: 'BeansSprout Opens', desc: 'Opened our doors at 123 Blossom Lane. The queue on opening day was completely overwhelming — in the best way.' },
  { year: '2023', emoji: '🏆', title: 'Best Café Award',   desc: 'Named "Best Independent Café" by the City Coffee Guide — an honour we are incredibly proud of.' },
  { year: '2024', emoji: '💻', title: 'Order Online!',     desc: 'Launched our online ordering so you can enjoy BeansSprout from anywhere, anytime.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream pt-24 font-body overflow-x-hidden">

      {/* ── Hero ── */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-lilac/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blush/15 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <Reveal>
            <p className="text-xs text-purple-400 tracking-[0.2em] uppercase mb-3">About us</p>
            <h1 className="font-display text-5xl md:text-6xl text-purple-900 mb-5 leading-tight">
              The BeansSprout<br />Story 🌱
            </h1>
            <p className="text-purple-500 text-lg leading-relaxed max-w-2xl mx-auto">
              Born from a love for slow mornings, good company, and exceptional coffee — BeansSprout has been a neighbourhood favourite since day one.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Hours + Location ── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Hours */}
          <Reveal fromX={-30}>
            <div className="bg-gradient-to-br from-lilac/15 to-blush/10 rounded-3xl p-8 border border-lilac/25 h-full">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">⏰</span>
                <h2 className="font-display text-2xl text-purple-900">Opening Hours</h2>
              </div>
              <div className="space-y-0">
                {[
                  { day: 'Monday – Friday', hours: '7:00 AM – 9:00 PM', note: 'Breakfast & lunch served all day' },
                  { day: 'Saturday',        hours: '8:00 AM – 10:00 PM', note: 'Late night desserts available' },
                  { day: 'Sunday',          hours: '9:00 AM – 8:00 PM',  note: 'Brunch specials from 10 AM' },
                ].map(({ day, hours, note }, i) => (
                  <motion.div
                    key={day}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="py-4 border-b border-lilac/20 last:border-0"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-semibold text-purple-800">{day}</p>
                        <p className="text-xs text-purple-400 mt-0.5">{note}</p>
                      </div>
                      <span className="text-sm text-purple-600 font-medium bg-white/70 px-3 py-1 rounded-full border border-lilac/30 flex-shrink-0 ml-3">
                        {hours}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Location */}
          <Reveal fromX={30} delay={0.1}>
            <div className="bg-gradient-to-br from-mint/15 to-skyblue/10 rounded-3xl p-8 border border-mint/25 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">📍</span>
                <h2 className="font-display text-2xl text-purple-900">Find Us</h2>
              </div>
              <div className="space-y-3 mb-6">
                {[
                  { icon: '📍', text: '123 Blossom Lane, Café District' },
                  { icon: '📞', text: '+1 (555) 123-4567' },
                  { icon: '✉️', text: 'hello@beanssprout.com' },
                  { icon: '📷', text: '@beanssprout' },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-3">
                    <span className="text-lg">{icon}</span>
                    <span className="text-sm text-purple-600">{text}</span>
                  </div>
                ))}
              </div>
              {/* Map placeholder — replace iframe src with real Google Maps embed */}
              <div className="flex-1 rounded-2xl overflow-hidden border border-lilac/20 bg-gradient-to-br from-lilac/10 to-mint/10 min-h-[140px] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl mb-1">🗺️</div>
                  <p className="text-xs text-purple-400">
                    Replace with Google Maps iframe
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Founder ── */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="font-display text-4xl text-purple-900">Meet the Founder 🌸</h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-3xl p-8 md:p-12 border border-lilac/25 shadow-sm flex flex-col md:flex-row gap-8 items-center"
            >
              {/* Avatar */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-28 h-28 flex-shrink-0 rounded-full bg-gradient-to-br from-lilac to-blush flex items-center justify-center text-5xl shadow-xl shadow-lilac/30"
              >
                🧑‍🍳
              </motion.div>
              <div>
                <h3 className="font-display text-2xl text-purple-900 mb-1">Maryam T.</h3>
                <p className="text-sm text-purple-400 mb-4">Founder & Head Barista</p>
                <blockquote className="text-purple-600 leading-relaxed text-[15px] border-l-4 border-lilac pl-4 italic">
                  "I started BeansSprout because I wanted a place that felt like a warm hug — somewhere you could sit for hours, sip something beautiful, and feel completely at home. Every drink we make carries that intention, and every customer who walks through our door becomes part of our little family."
                </blockquote>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <h2 className="font-display text-4xl text-purple-900 text-center mb-12">Our Journey 💫</h2>
          </Reveal>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-lilac via-blush to-mint -translate-x-0.5" />

            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: i * 0.08, duration: 0.55 }}
                  className={`relative flex ${isLeft ? 'justify-start' : 'justify-end'} mb-8`}
                >
                  <div className="w-[46%]">
                    <motion.div
                      whileHover={{ scale: 1.03, y: -3 }}
                      className="bg-white border border-lilac/25 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:shadow-lilac/10 transition-all"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">{item.emoji}</span>
                        <span className="font-body text-xs text-purple-400 font-medium">{item.year}</span>
                      </div>
                      <h4 className="font-display text-base text-purple-900 mb-1">{item.title}</h4>
                      <p className="text-xs text-purple-400 leading-relaxed">{item.desc}</p>
                    </motion.div>
                  </div>

                  {/* Center dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.15 }}
                    className="absolute left-1/2 top-5 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-lilac to-blush border-2 border-white shadow-md"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
