// import React from 'react';
// import { motion } from 'framer-motion';
// import Footer from '../components/layout/Footer';

// const Reveal = ({ children, delay = 0, fromX = 0 }) => (
//   <motion.div
//     initial={{ opacity: 0, y: fromX === 0 ? 35 : 0, x: fromX }}
//     whileInView={{ opacity: 1, y: 0, x: 0 }}
//     viewport={{ once: true, amount: 0.25 }}
//     transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
//   >
//     {children}
//   </motion.div>
// );

// const timeline = [
//   { year: '2019', emoji: '💭', title: 'The Dream Begins',  desc: 'Started as a home coffee-roasting project with just a small kitchen and a very big dream.' },
//   { year: '2021', emoji: '🎪', title: 'First Pop-Up',      desc: 'Our first weekend pop-up at the Blossom Market sold out completely in under two hours.' },
//   { year: '2022', emoji: '🏡', title: 'BeansSprout Opens', desc: 'Opened our doors at 123 Blossom Lane. The queue on opening day was completely overwhelming — in the best way.' },
//   { year: '2023', emoji: '🏆', title: 'Best Café Award',   desc: 'Named "Best Independent Café" by the City Coffee Guide — an honour we are incredibly proud of.' },
//   { year: '2024', emoji: '💻', title: 'Order Online!',     desc: 'Launched our online ordering so you can enjoy BeansSprout from anywhere, anytime.' },
// ];

// export default function AboutPage() {
//   return (
//     <div className="min-h-screen bg-cream pt-24 font-body overflow-x-hidden">

//       {/* ── Hero ── */}
//       <section className="relative py-16 overflow-hidden">
//         <div className="absolute top-0 right-0 w-80 h-80 bg-lilac/20 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none" />
//         <div className="absolute bottom-0 left-0 w-64 h-64 bg-blush/15 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

//         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
//           <Reveal>
//             <p className="text-xs text-purple-400 tracking-[0.2em] uppercase mb-3">About us</p>
//             <h1 className="font-display text-5xl md:text-6xl text-purple-900 mb-5 leading-tight">
//               The BeansSprout<br />Story 🌱
//             </h1>
//             <p className="text-purple-500 text-lg leading-relaxed max-w-2xl mx-auto">
//               Born from a love for slow mornings, good company, and exceptional coffee — BeansSprout has been a neighbourhood favourite since day one.
//             </p>
//           </Reveal>
//         </div>
//       </section>

//       {/* ── Hours + Location ── */}
//       <section className="py-16 bg-white">
//         <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
//           {/* Hours */}
//           <Reveal fromX={-30}>
//             <div className="bg-gradient-to-br from-lilac/15 to-blush/10 rounded-3xl p-8 border border-lilac/25 h-full">
//               <div className="flex items-center gap-3 mb-6">
//                 <span className="text-3xl">⏰</span>
//                 <h2 className="font-display text-2xl text-purple-900">Opening Hours</h2>
//               </div>
//               <div className="space-y-0">
//                 {[
//                   { day: 'Monday – Friday', hours: '7:00 AM – 9:00 PM', note: 'Breakfast & lunch served all day' },
//                   { day: 'Saturday',        hours: '8:00 AM – 10:00 PM', note: 'Late night desserts available' },
//                   { day: 'Sunday',          hours: '9:00 AM – 8:00 PM',  note: 'Brunch specials from 10 AM' },
//                 ].map(({ day, hours, note }, i) => (
//                   <motion.div
//                     key={day}
//                     initial={{ opacity: 0, x: -15 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: i * 0.1 }}
//                     className="py-4 border-b border-lilac/20 last:border-0"
//                   >
//                     <div className="flex justify-between items-start">
//                       <div>
//                         <p className="text-sm font-semibold text-purple-800">{day}</p>
//                         <p className="text-xs text-purple-400 mt-0.5">{note}</p>
//                       </div>
//                       <span className="text-sm text-purple-600 font-medium bg-white/70 px-3 py-1 rounded-full border border-lilac/30 flex-shrink-0 ml-3">
//                         {hours}
//                       </span>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </Reveal>

//           {/* Location */}
//           <Reveal fromX={30} delay={0.1}>
//             <div className="bg-gradient-to-br from-mint/15 to-skyblue/10 rounded-3xl p-8 border border-mint/25 h-full flex flex-col">
//               <div className="flex items-center gap-3 mb-6">
//                 <span className="text-3xl">📍</span>
//                 <h2 className="font-display text-2xl text-purple-900">Find Us</h2>
//               </div>
//               <div className="space-y-3 mb-6">
//                 {[
//                   { icon: '📍', text: '123 Blossom Lane, Café District' },
//                   { icon: '📞', text: '+1 (555) 123-4567' },
//                   { icon: '✉️', text: 'hello@beanssprout.com' },
//                   { icon: '📷', text: '@beanssprout' },
//                 ].map(({ icon, text }) => (
//                   <div key={text} className="flex items-center gap-3">
//                     <span className="text-lg">{icon}</span>
//                     <span className="text-sm text-purple-600">{text}</span>
//                   </div>
//                 ))}
//               </div>
//               {/* Map placeholder — replace iframe src with real Google Maps embed */}
//               <div className="flex-1 rounded-2xl overflow-hidden border border-lilac/20 bg-gradient-to-br from-lilac/10 to-mint/10 min-h-[140px] flex items-center justify-center">
//                 <div className="text-center">
//                   <div className="text-3xl mb-1">🗺️</div>
//                   <p className="text-xs text-purple-400">
//                     Replace with Google Maps iframe
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </Reveal>
//         </div>
//       </section>

//       {/* ── Founder ── */}
//       <section className="py-16 bg-cream">
//         <div className="max-w-4xl mx-auto px-6">
//           <Reveal>
//             <div className="text-center mb-10">
//               <h2 className="font-display text-4xl text-purple-900">Meet the Founder 🌸</h2>
//             </div>
//           </Reveal>
//           <Reveal delay={0.1}>
//             <motion.div
//               whileHover={{ scale: 1.01 }}
//               className="bg-white rounded-3xl p-8 md:p-12 border border-lilac/25 shadow-sm flex flex-col md:flex-row gap-8 items-center"
//             >
//               {/* Avatar */}
//               <motion.div
//                 animate={{ y: [-4, 4, -4] }}
//                 transition={{ duration: 4, repeat: Infinity }}
//                 className="w-28 h-28 flex-shrink-0 rounded-full bg-gradient-to-br from-lilac to-blush flex items-center justify-center text-5xl shadow-xl shadow-lilac/30"
//               >
//                 🧑‍🍳
//               </motion.div>
//               <div>
//                 <h3 className="font-display text-2xl text-purple-900 mb-1">Maryam T.</h3>
//                 <p className="text-sm text-purple-400 mb-4">Founder & Head Barista</p>
//                 <blockquote className="text-purple-600 leading-relaxed text-[15px] border-l-4 border-lilac pl-4 italic">
//                   "I started BeansSprout because I wanted a place that felt like a warm hug — somewhere you could sit for hours, sip something beautiful, and feel completely at home. Every drink we make carries that intention, and every customer who walks through our door becomes part of our little family."
//                 </blockquote>
//               </div>
//             </motion.div>
//           </Reveal>
//         </div>
//       </section>

//       {/* ── Timeline ── */}
//       <section className="py-16 bg-white">
//         <div className="max-w-3xl mx-auto px-6">
//           <Reveal>
//             <h2 className="font-display text-4xl text-purple-900 text-center mb-12">Our Journey 💫</h2>
//           </Reveal>

//           <div className="relative">
//             {/* Center line */}
//             <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-lilac via-blush to-mint -translate-x-0.5" />

//             {timeline.map((item, i) => {
//               const isLeft = i % 2 === 0;
//               return (
//                 <motion.div
//                   key={item.year}
//                   initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
//                   whileInView={{ opacity: 1, x: 0 }}
//                   viewport={{ once: true, amount: 0.4 }}
//                   transition={{ delay: i * 0.08, duration: 0.55 }}
//                   className={`relative flex ${isLeft ? 'justify-start' : 'justify-end'} mb-8`}
//                 >
//                   <div className="w-[46%]">
//                     <motion.div
//                       whileHover={{ scale: 1.03, y: -3 }}
//                       className="bg-white border border-lilac/25 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:shadow-lilac/10 transition-all"
//                     >
//                       <div className="flex items-center gap-2 mb-2">
//                         <span className="text-xl">{item.emoji}</span>
//                         <span className="font-body text-xs text-purple-400 font-medium">{item.year}</span>
//                       </div>
//                       <h4 className="font-display text-base text-purple-900 mb-1">{item.title}</h4>
//                       <p className="text-xs text-purple-400 leading-relaxed">{item.desc}</p>
//                     </motion.div>
//                   </div>

//                   {/* Center dot */}
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     whileInView={{ scale: 1 }}
//                     viewport={{ once: true }}
//                     transition={{ delay: i * 0.08 + 0.15 }}
//                     className="absolute left-1/2 top-5 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-lilac to-blush border-2 border-white shadow-md"
//                   />
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }
import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Footer from '../components/layout/Footer';

/* ─── Reveal helper ─── */
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

/* ─── Timeline data ─── */
const timeline = [
  { year: '2019', emoji: '💭', title: 'The Dream Begins',  desc: 'Started as a home coffee-roasting project with just a small kitchen and a very big dream.' },
  { year: '2021', emoji: '🎪', title: 'First Pop-Up',      desc: 'Our first weekend pop-up at the Blossom Market sold out completely in under two hours.' },
  { year: '2022', emoji: '🏡', title: 'BeansSprout Opens', desc: 'Opened our doors at 123 Blossom Lane. The queue on opening day was completely overwhelming — in the best way.' },
  { year: '2023', emoji: '🏆', title: 'Best Café Award',   desc: 'Named "Best Independent Café" by the City Coffee Guide — an honour we are incredibly proud of.' },
  { year: '2024', emoji: '💻', title: 'Order Online!',     desc: 'Launched our online ordering so you can enjoy BeansSprout from anywhere, anytime.' },
];

/* ─── Floating food items orbiting the cup ─── */
const floatingItems = [
  { emoji: '🥐', angle: 0,   radius: 170, size: 44, duration: 18, delay: 0    },
  { emoji: '🍪', angle: 60,  radius: 190, size: 38, duration: 22, delay: -4   },
  { emoji: '🧁', angle: 120, radius: 165, size: 42, duration: 20, delay: -8   },
  { emoji: '🥨', angle: 180, radius: 185, size: 36, duration: 25, delay: -12  },
  { emoji: '🍩', angle: 240, radius: 175, size: 40, duration: 19, delay: -6   },
  { emoji: '🫐', angle: 300, radius: 180, size: 34, duration: 23, delay: -10  },
  { emoji: '🥖', angle: 45,  radius: 205, size: 32, duration: 28, delay: -15  },
  { emoji: '🍫', angle: 160, radius: 160, size: 36, duration: 17, delay: -3   },
];

/* ─── Animated smiley coffee cup SVG ─── */
const CoffeeCup = () => (
  <motion.div
    animate={{ y: [0, -18, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    className="relative z-10"
    style={{ filter: 'drop-shadow(0 24px 48px rgba(139,92,246,0.35))' }}
  >
    <svg width="220" height="240" viewBox="0 0 220 240" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Saucer */}
      <ellipse cx="110" cy="218" rx="80" ry="14" fill="#E9D5FF" opacity="0.6"/>
      <ellipse cx="110" cy="215" rx="72" ry="10" fill="#DDD6FE"/>

      {/* Cup body */}
      <path d="M40 90 Q38 175 60 200 Q85 222 110 222 Q135 222 160 200 Q182 175 180 90 Z" fill="url(#cupGrad)"/>

      {/* Cup rim */}
      <ellipse cx="110" cy="90" rx="70" ry="18" fill="#C4B5FD"/>
      <ellipse cx="110" cy="88" rx="68" ry="16" fill="#DDD6FE"/>

      {/* Coffee surface inside rim */}
      <ellipse cx="110" cy="90" rx="60" ry="13" fill="#6D4C41"/>
      <ellipse cx="110" cy="90" rx="50" ry="10" fill="#8D6E63"/>

      {/* Latte art heart */}
      <g opacity="0.85">
        <path d="M101 86 C101 83 105 81 108 84 C111 81 115 83 115 86 C115 90 108 95 108 95 C108 95 101 90 101 86Z" fill="#FFCCBC"/>
      </g>

      {/* Steam wisps */}
      <motion.path
        d="M90 70 Q85 55 92 45 Q99 35 94 22"
        stroke="#C4B5FD" strokeWidth="2.5" strokeLinecap="round" fill="none"
        animate={{ opacity: [0.3, 1, 0.3], pathLength: [0, 1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d="M110 65 Q105 48 112 38 Q119 28 114 14"
        stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round" fill="none"
        animate={{ opacity: [0.3, 1, 0.3], pathLength: [0, 1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      <motion.path
        d="M130 70 Q135 53 128 43 Q121 33 126 20"
        stroke="#C4B5FD" strokeWidth="2.5" strokeLinecap="round" fill="none"
        animate={{ opacity: [0.3, 1, 0.3], pathLength: [0, 1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Handle */}
      <path d="M178 115 Q210 115 210 145 Q210 175 178 175" stroke="#A78BFA" strokeWidth="8" fill="none" strokeLinecap="round"/>
      <path d="M178 115 Q204 115 204 145 Q204 173 178 173" stroke="#DDD6FE" strokeWidth="4" fill="none" strokeLinecap="round"/>

      {/* Cute face - eyes */}
      <motion.g
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, times: [0, 0.05, 0.1], ease: 'easeInOut', repeatDelay: 3 }}
        style={{ transformOrigin: '110px 145px' }}
      >
        <ellipse cx="93" cy="145" rx="7" ry="7" fill="#4A2C5E"/>
        <ellipse cx="127" cy="145" rx="7" ry="7" fill="#4A2C5E"/>
        {/* Eye shine */}
        <circle cx="96" cy="142" r="2.5" fill="white"/>
        <circle cx="130" cy="142" r="2.5" fill="white"/>
      </motion.g>

      {/* Cute face - smile */}
      <path d="M92 162 Q110 180 128 162" stroke="#4A2C5E" strokeWidth="3.5" fill="none" strokeLinecap="round"/>

      {/* Rosy cheeks */}
      <ellipse cx="82" cy="160" rx="10" ry="7" fill="#F9A8D4" opacity="0.55"/>
      <ellipse cx="138" cy="160" rx="10" ry="7" fill="#F9A8D4" opacity="0.55"/>

      {/* Gradient defs */}
      <defs>
        <linearGradient id="cupGrad" x1="40" y1="90" x2="180" y2="220" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EDE9FE"/>
          <stop offset="40%" stopColor="#DDD6FE"/>
          <stop offset="100%" stopColor="#C4B5FD"/>
        </linearGradient>
      </defs>
    </svg>
  </motion.div>
);

/* ─── Orbit ring component ─── */
const OrbitRing = ({ radius, duration, children, startAngle = 0 }) => (
  <motion.div
    className="absolute"
    style={{
      width: radius * 2,
      height: radius * 2,
      top: '50%',
      left: '50%',
      marginTop: -radius,
      marginLeft: -radius,
      borderRadius: '50%',
    }}
    animate={{ rotate: 360 }}
    transition={{ duration, repeat: Infinity, ease: 'linear' }}
  >
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: `translateX(-50%) translateY(-50%) rotate(${startAngle}deg)`,
      }}
    >
      {children}
    </div>
  </motion.div>
);

/* ─── Individual floating food item ─── */
const FloatingFood = ({ emoji, size, orbitDuration, orbitRadius, startAngle, selfDuration = 3, selfDelay = 0 }) => (
  <motion.div
    className="absolute"
    style={{
      width: orbitRadius * 2,
      height: orbitRadius * 2,
      top: '50%',
      left: '50%',
      marginTop: -orbitRadius,
      marginLeft: -orbitRadius,
      pointerEvents: 'none',
    }}
    animate={{ rotate: 360 }}
    transition={{ duration: orbitDuration, repeat: Infinity, ease: 'linear' }}
  >
    {/* Counter-rotate the emoji so it stays upright */}
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%) translateY(-50%)',
        fontSize: size,
      }}
      animate={{ rotate: -360 }}
      transition={{ duration: orbitDuration, repeat: Infinity, ease: 'linear' }}
    >
      <motion.span
        style={{ display: 'block' }}
        animate={{ y: [0, -6, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: selfDuration, repeat: Infinity, ease: 'easeInOut', delay: selfDelay }}
      >
        {emoji}
      </motion.span>
    </motion.div>
  </motion.div>
);

/* ─── Hero section ─── */
const HeroSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lilac/25 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blush/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-mint/15 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        {/* Subtle dot grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#7C3AED"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)"/>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            <Reveal>
              <motion.p
                className="text-xs text-purple-400 tracking-[0.25em] uppercase mb-4 font-body font-semibold"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                ✦ Our Story ✦
              </motion.p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-purple-900 mb-6 leading-[1.1]">
                The<br />
                <span className="relative inline-block">
                  BeansSprout
                  <motion.div
                    className="absolute bottom-1 left-0 h-3 bg-blush/40 rounded-full -z-10"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>{' '}
                Story 🌱
              </h1>
              <p className="text-purple-500 text-lg leading-relaxed max-w-md font-body">
                Born from a love for slow mornings, good company, and exceptional coffee — BeansSprout has been a neighbourhood favourite since day one.
              </p>
            </Reveal>

            {/* Stat pills */}
            <Reveal delay={0.2}>
              <div className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start">
                {[
                  { label: 'Est.', value: '2019', icon: '📅' },
                  { label: 'Cups served', value: '50k+', icon: '☕' },
                  { label: 'Happy regulars', value: '2,000+', icon: '💜' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05, y: -3 }}
                    className="flex items-center gap-2 bg-white/70 backdrop-blur border border-lilac/30 rounded-2xl px-4 py-2.5 shadow-sm"
                  >
                    <span className="text-lg">{stat.icon}</span>
                    <div>
                      <p className="text-[10px] text-purple-400 font-body leading-none">{stat.label}</p>
                      <p className="text-sm font-display text-purple-900 font-bold leading-tight">{stat.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: Animated Cup Scene */}
          <div className="relative order-1 lg:order-2 flex-shrink-0" style={{ width: 420, height: 420 }}>

            {/* Glow rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="rounded-full border-2 border-lilac/20"
                style={{ width: 340, height: 340 }}
                animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                className="rounded-full border border-blush/20"
                style={{ width: 390, height: 390 }}
                animate={{ scale: [1, 1.06, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />
            </div>

            {/* Floating food items */}
            <FloatingFood emoji="🥐" size={38} orbitRadius={170} orbitDuration={20} selfDuration={2.8} selfDelay={0}/>
            <FloatingFood emoji="🍪" size={32} orbitRadius={185} orbitDuration={26} selfDuration={3.2} selfDelay={1}/>
            <FloatingFood emoji="🧁" size={36} orbitRadius={160} orbitDuration={17} selfDuration={2.5} selfDelay={0.5}/>
            <FloatingFood emoji="🥨" size={30} orbitRadius={195} orbitDuration={30} selfDuration={3.8} selfDelay={1.5}/>
            <FloatingFood emoji="🍩" size={34} orbitRadius={175} orbitDuration={22} selfDuration={3.1} selfDelay={0.8}/>
            <FloatingFood emoji="🫐" size={28} orbitRadius={188} orbitDuration={28} selfDuration={2.9} selfDelay={2}/>
            <FloatingFood emoji="🥖" size={32} orbitRadius={165} orbitDuration={24} selfDuration={3.5} selfDelay={1.2}/>
            <FloatingFood emoji="🍫" size={30} orbitRadius={200} orbitDuration={21} selfDuration={3.0} selfDelay={0.3}/>

            {/* Center: Coffee cup */}
            <div className="absolute inset-0 flex items-center justify-center">
              <CoffeeCup />
            </div>

            {/* Sparkles */}
            {[
              { x: '15%', y: '20%', delay: 0 },
              { x: '80%', y: '15%', delay: 0.7 },
              { x: '85%', y: '75%', delay: 1.4 },
              { x: '10%', y: '80%', delay: 2.1 },
              { x: '50%', y: '5%',  delay: 0.4 },
            ].map((sp, i) => (
              <motion.div
                key={i}
                className="absolute text-xl pointer-events-none"
                style={{ left: sp.x, top: sp.y }}
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5], rotate: [0, 180, 360] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: sp.delay, ease: 'easeInOut' }}
              >
                ✨
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

/* ─── Values strip ─── */
const ValuesStrip = () => (
  <section className="py-10 bg-lilac overflow-hidden">
    <motion.div
      className="flex gap-12 whitespace-nowrap"
      animate={{ x: ['0%', '-50%'] }}
      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
    >
      {[...Array(2)].flatMap(() => [
        '☕ Specialty Roasts',
        '🌱 Ethically Sourced',
        '🥐 House-Made Pastries',
        '💜 Community First',
        '🏆 Award Winning',
        '🫶 Made with Love',
      ]).map((item, i) => (
        <span key={i} className="text-sm text-purple-800 font-body tracking-wider font-medium">{item}</span>
      ))}
    </motion.div>
  </section>
);

/* ─── Hours + Location ─── */
const InfoSection = () => (
  <section className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Hours */}
      <Reveal fromX={-30}>
        <div className="bg-gradient-to-br from-lilac/15 to-blush/10 rounded-3xl p-8 border border-lilac/25 h-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl">⏰</div>
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
                transition={{ delay: i * 0.12 }}
                className="py-4 border-b border-lilac/20 last:border-0"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-semibold text-purple-800 font-body">{day}</p>
                    <p className="text-xs text-purple-400 mt-0.5 font-body">{note}</p>
                  </div>
                  <span className="text-sm text-purple-600 font-medium bg-white/80 px-3 py-1.5 rounded-full border border-lilac/30 flex-shrink-0 ml-3 font-body shadow-sm">
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
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl">📍</div>
            <h2 className="font-display text-2xl text-purple-900">Find Us</h2>
          </div>
          <div className="space-y-3 mb-6">
            {[
              { icon: '📍', text: '123 Blossom Lane, Café District' },
              { icon: '📞', text: '+1 (555) 123-4567' },
              { icon: '✉️', text: 'hello@beanssprout.com' },
              { icon: '📷', text: '@beanssprout' },
            ].map(({ icon, text }) => (
              <motion.div
                key={text}
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 cursor-default"
              >
                <span className="text-lg">{icon}</span>
                <span className="text-sm text-purple-600 font-body">{text}</span>
              </motion.div>
            ))}
          </div>
          <div className="flex-1 rounded-2xl overflow-hidden border border-lilac/20 bg-gradient-to-br from-lilac/10 to-mint/10 min-h-[140px] flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl mb-1">🗺️</div>
              <p className="text-xs text-purple-400 font-body">Replace with Google Maps iframe</p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ─── Founder ─── */
const FounderSection = () => (
  <section className="py-20 bg-cream relative overflow-hidden">
    {/* Decorative */}
    <div className="absolute top-0 right-0 w-72 h-72 bg-blush/10 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-64 h-64 bg-lilac/10 rounded-full blur-3xl pointer-events-none" />

    <div className="max-w-4xl mx-auto px-6">
      <Reveal>
        <div className="text-center mb-10">
          <p className="text-xs text-purple-400 tracking-[0.2em] uppercase font-body font-semibold mb-2">The person behind the cup</p>
          <h2 className="font-display text-4xl text-purple-900">Meet the Founder 🌸</h2>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <motion.div
          whileHover={{ scale: 1.005 }}
          className="bg-white rounded-3xl p-8 md:p-12 border border-lilac/25 shadow-sm flex flex-col md:flex-row gap-8 items-center relative overflow-hidden"
        >
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blush/20 to-transparent rounded-bl-full" />

          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-32 h-32 rounded-full bg-gradient-to-br from-lilac to-blush flex items-center justify-center text-5xl shadow-xl shadow-lilac/30"
            >
              🧑‍🍳
            </motion.div>
            {/* Badge */}
            <motion.div
              className="absolute -bottom-2 -right-2 bg-purple-600 text-white text-xs font-body font-semibold px-3 py-1 rounded-full shadow-lg"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Founder
            </motion.div>
          </div>

          <div>
            <h3 className="font-display text-2xl text-purple-900 mb-0.5">Maryam T.</h3>
            <p className="text-sm text-purple-400 mb-5 font-body">Head Barista & Chief Dream-Maker</p>
            <blockquote className="text-purple-600 leading-relaxed text-[15px] border-l-4 border-lilac pl-5 italic font-body">
              "I started BeansSprout because I wanted a place that felt like a warm hug — somewhere you could sit for hours, sip something beautiful, and feel completely at home. Every drink we make carries that intention, and every customer who walks through our door becomes part of our little family."
            </blockquote>
          </div>
        </motion.div>
      </Reveal>
    </div>
  </section>
);

/* ─── Timeline ─── */
const TimelineSection = () => (
  <section className="py-20 bg-white">
    <div className="max-w-3xl mx-auto px-6">
      <Reveal>
        <div className="text-center mb-14">
          <p className="text-xs text-purple-400 tracking-[0.2em] uppercase font-body font-semibold mb-2">How we got here</p>
          <h2 className="font-display text-4xl text-purple-900">Our Journey 💫</h2>
        </div>
      </Reveal>

      <div className="relative">
        {/* Center line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-lilac via-blush to-mint -translate-x-px" />

        {timeline.map((item, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex ${isLeft ? 'justify-start' : 'justify-end'} mb-10`}
            >
              <div className="w-[46%]">
                <motion.div
                  whileHover={{ scale: 1.04, y: -4 }}
                  className="bg-white border border-lilac/25 rounded-2xl p-5 shadow-sm hover:shadow-xl hover:shadow-lilac/15 transition-all duration-300 cursor-default"
                >
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="font-body text-xs text-purple-400 font-semibold tracking-wider">{item.year}</span>
                  </div>
                  <h4 className="font-display text-base text-purple-900 mb-1.5">{item.title}</h4>
                  <p className="text-xs text-purple-400 leading-relaxed font-body">{item.desc}</p>
                </motion.div>
              </div>

              {/* Center dot */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.2, type: 'spring', stiffness: 300 }}
                className="absolute left-1/2 top-5 -translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-lilac to-blush border-2 border-white shadow-lg shadow-lilac/40"
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

/* ─── CTA ─── */
const CtaSection = () => (
  <section className="py-20 bg-lilac relative overflow-hidden">
    {/* Background pattern */}
    <div className="absolute inset-0 pointer-events-none opacity-10">
      <svg width="100%" height="100%"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0L0 0 0 40" fill="none" stroke="purple" strokeWidth="0.8"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)"/></svg>
    </div>
    <div className="absolute top-0 right-1/4 w-64 h-64 bg-lilac/20 rounded-full blur-3xl pointer-events-none" />

    <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
      <Reveal>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-6xl mb-6 inline-block"
        >
          ☕
        </motion.div>
        <h2 className="font-display text-4xl md:text-5xl text-white mb-5">Come say hello!</h2>
        <p className="text-purple-800 text-lg font-body mb-8 leading-relaxed">
          We'd love to see you. Pull up a chair, order something warm, and stay awhile.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.a
            href="#order"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="bg-cream text-purple-900 font-body font-semibold px-8 py-3.5 rounded-full shadow-xl shadow-purple-950/30 hover:bg-cream transition-colors"
          >
            Order Online 
          </motion.a>
          <motion.a
            href="#menu"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="bg-transparent text-white font-body font-semibold px-8 py-3.5 rounded-full border-2 border-white/30 hover:border-white/60 transition-colors"
          >
            View Menu 
          </motion.a>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ─── Page ─── */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream font-body overflow-x-hidden">
      {/* Hero */}
      <div className="pt-24 bg-cream">
        <HeroSection />
      </div>

      {/* Marquee */}
      <ValuesStrip />

      {/* Info */}
      <InfoSection />

      {/* Founder */}
      <FounderSection />

      {/* Timeline */}
      <TimelineSection />

      {/* CTA */}
      <CtaSection />

      <Footer />
    </div>
  );
}