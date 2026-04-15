// import React, { useEffect, useRef, useState } from 'react';
// import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';

// /* ─────────── floating particle ─────────── */
// const Particle = ({ emoji, x, y, delay, duration }) => (
//   <motion.div
//     className="absolute text-2xl pointer-events-none select-none"
//     style={{ left: `${x}%`, top: `${y}%` }}
//     animate={{
//       y:       [0, -18, 0],
//       x:       [0, 6, -4, 0],
//       rotate:  [-6, 6, -6],
//       opacity: [0.55, 1, 0.55],
//       scale:   [1, 1.1, 1],
//     }}
//     transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
//   >
//     {emoji}
//   </motion.div>
// );

// /* ─────────── blob ─────────── */
// const Blob = ({ color, w, h, top, left, delay }) => (
//   <motion.div
//     className={`absolute rounded-full blur-3xl opacity-35 pointer-events-none ${color} ${w} ${h}`}
//     style={{ top, left }}
//     animate={{ scale: [1, 1.2, 0.95, 1], x: [0, 20, -10, 0], y: [0, -15, 10, 0] }}
//     transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay }}
//   />
// );

// /* ─────────── typewriter words ─────────── */
// const words = ['Story', 'Moment', 'Journey', 'Escape'];

// export default function Hero() {
//   const [wordIdx, setWordIdx] = useState(0);
//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll({ target: containerRef });
//   const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
//   const heroY       = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

//   useEffect(() => {
//     const t = setInterval(() => setWordIdx(i => (i + 1) % words.length), 2800);
//     return () => clearInterval(t);
//   }, []);

//   const particles = [
//     { emoji: '🌸', x: 8,  y: 15, delay: 0,   duration: 4.2 },
//     { emoji: '✨', x: 90, y: 20, delay: 0.6, duration: 3.8 },
//     { emoji: '☕', x: 5,  y: 60, delay: 1.2, duration: 5.1 },
//     { emoji: '🌿', x: 92, y: 55, delay: 0.4, duration: 4.5 },
//     { emoji: '🧁', x: 15, y: 82, delay: 1.8, duration: 3.6 },
//     { emoji: '💫', x: 80, y: 80, delay: 0.9, duration: 4.8 },
//     { emoji: '🌸', x: 45, y: 8,  delay: 0.3, duration: 5.3 },
//     { emoji: '✨', x: 55, y: 88, delay: 1.5, duration: 4.0 },
//     { emoji: '🍵', x: 30, y: 12, delay: 2.1, duration: 3.9 },
//     { emoji: '🌸', x: 70, y: 10, delay: 0.7, duration: 5.0 },
//     { emoji: '☁️', x: 22, y: 45, delay: 1.0, duration: 6.2 },
//     { emoji: '💕', x: 78, y: 42, delay: 1.7, duration: 4.4 },
//   ];

//   return (
//     <section
//       ref={containerRef}
//       className="relative min-h-screen flex items-center justify-center overflow-hidden"
//       style={{ background: 'linear-gradient(160deg, #fffbf5 0%, #fdf4ff 40%, #fff7fb 70%, #f0fdf4 100%)' }}
//     >
//       {/* ── Blobs ── */}
//       <Blob color="bg-lilac"   w="w-[500px]" h="h-[500px]" top="-10%"  left="-15%"  delay={0}   />
//       <Blob color="bg-blush"   w="w-[400px]" h="h-[400px]" top="10%"   left="60%"   delay={2}   />
//       <Blob color="bg-mint"    w="w-[350px]" h="h-[350px]" top="55%"   left="5%"    delay={4}   />
//       <Blob color="bg-beige"   w="w-[300px]" h="h-[300px]" top="60%"   left="70%"   delay={1.5} />
//       <Blob color="bg-skyblue" w="w-[250px]" h="h-[250px]" top="30%"   left="25%"   delay={3}   />

//       {/* ── Floating particles ── */}
//       {particles.map((p, i) => <Particle key={i} {...p} />)}

//       {/* ── Subtle grid overlay ── */}
//       <div
//         className="absolute inset-0 opacity-[0.03] pointer-events-none"
//         style={{
//           backgroundImage: 'radial-gradient(circle, #7c3aed 1px, transparent 1px)',
//           backgroundSize: '40px 40px',
//         }}
//       />

//       {/* ── Hero content ── */}
//       <motion.div
//         style={{ opacity: heroOpacity, y: heroY }}
//         className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-24"
//       >
//         {/* Pill badge */}
//         <motion.div
//           initial={{ opacity: 0, y: 20, scale: 0.9 }}
//           animate={{ opacity: 1, y: 0,  scale: 1 }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//           className="inline-flex items-center gap-2 bg-white/75 backdrop-blur-md border border-lilac/50 rounded-full px-5 py-2 mb-8 shadow-sm"
//         >
//           <span className="w-2 h-2 rounded-full bg-mint animate-pulse" />
//           <span className="font-body text-sm text-purple-600 font-medium">
//             Now open · Order online today
//           </span>
//         </motion.div>

//         {/* Main heading */}
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
//         >
//           <h1 className="font-display leading-[1.1] mb-6">
//             <span className="block text-6xl md:text-8xl text-purple-900">
//               Every Sip
//             </span>
//             <span className="block text-6xl md:text-8xl mt-1">
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-500">
//                 Tells a{' '}
//               </span>
//               <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-500">
//                 <AnimatePresence mode="wait">
//                   <motion.span
//                     key={wordIdx}
//                     initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
//                     animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
//                     exit={{   opacity: 0, y: -20, filter: 'blur(8px)' }}
//                     transition={{ duration: 0.45 }}
//                     className="inline-block"
//                   >
//                     {words[wordIdx]}
//                   </motion.span>
//                 </AnimatePresence>
//                 {/* underline */}
//                 <motion.span
//                   className="absolute -bottom-2 left-0 right-0 h-1.5 rounded-full bg-gradient-to-r from-lilac to-blush"
//                   initial={{ scaleX: 0 }}
//                   animate={{ scaleX: 1 }}
//                   transition={{ duration: 0.8, delay: 0.9 }}
//                 />
//               </span>
//             </span>
//           </h1>
//         </motion.div>

//         {/* Subtitle */}
//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.45 }}
//           className="font-body text-lg md:text-xl text-purple-400 max-w-xl mx-auto mb-10 leading-relaxed"
//         >
//           Artisan coffee, dreamy matcha &amp; cloud-soft pastries —
//           crafted to make your day a little sweeter 🌿
//         </motion.p>

//         {/* CTA buttons */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.6 }}
//           className="flex flex-wrap gap-4 justify-center mb-16"
//         >
//           <Link
//             to="/menu"
//             className="group relative overflow-hidden bg-gradient-to-r from-lilac to-blush text-purple-900 font-body font-semibold px-10 py-4 rounded-full border border-purple-200 text-base shadow-xl shadow-lilac/25 hover:shadow-2xl hover:shadow-lilac/40 transition-all duration-300 hover:scale-105"
//           >
//             <span className="relative z-10">View Our Menu ✨</span>
//             <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300 rounded-full" />
//           </Link>
//           <Link
//             to="/about"
//             className="bg-white/70 backdrop-blur-sm hover:bg-white text-purple-700 font-body font-semibold px-10 py-4 rounded-full border border-lilac/50 text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
//           >
//             Our Story 🌿
//           </Link>
//         </motion.div>

//         {/* Floating coffee cup */}
//         <motion.div
//           animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
//           transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
//           className="text-8xl md:text-[7rem] mx-auto w-fit drop-shadow-lg"
//         >
//           ☕
//         </motion.div>

//         {/* Stats row */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.85 }}
//           className="flex flex-wrap justify-center gap-8 mt-12 mb-8"
//         >
//           {[
//             { value: '50+', label: 'Menu items' },
//             { value: '4.9★', label: 'Average rating' },
//             { value: '10k+', label: 'Happy customers' },
//           ].map(({ value, label }) => (
//             <div key={label} className="text-center">
//               <p className="font-display text-2xl text-purple-800">{value}</p>
//               <p className="font-body text-xs text-purple-400 mt-0.5">{label}</p>
//             </div>
//           ))}
//         </motion.div>
//       </motion.div>

//       {/* ── Scroll chevron ── */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.4 }}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
//       >
//         <p className="font-body text-xs text-purple-300 tracking-widest uppercase">Scroll</p>
//         <motion.div
//           animate={{ y: [0, 6, 0] }}
//           transition={{ duration: 1.4, repeat: Infinity }}
//           className="text-purple-300 text-lg"
//         >
//           ↓
//         </motion.div>
//       </motion.div>

//       {/* ── Wave divider ── */}
//       <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
//         <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path
//             d="M0 40 C360 80 1080 0 1440 40 L1440 80 L0 80 Z"
//             fill="#ffffff"
//             fillOpacity="0.8"
//           />
//         </svg>
//       </div>
//     </section>
//   );
// }
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const Blob = ({ color, style, delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl opacity-40 pointer-events-none ${color}`}
    style={style}
    animate={{ scale: [1, 1.18, 0.95, 1], x: [0, 18, -10, 0], y: [0, -12, 8, 0] }}
    transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

const Particle = ({ emoji, x, y, delay, duration }) => (
  <motion.div
    className="absolute text-2xl pointer-events-none select-none"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{ y: [0, -20, 0], x: [0, 8, -5, 0], rotate: [-8, 8, -8], opacity: [0.5, 1, 0.5] }}
    transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
  >
    {emoji}
  </motion.div>
);

const WORDS = ['Story', 'Moment', 'Journey', 'Escape'];

const PARTICLES = [
  { emoji: '🌸', x: 7,  y: 18, delay: 0,   duration: 4.2 },
  { emoji: '✨', x: 88, y: 22, delay: 0.7, duration: 3.8 },
  { emoji: '☕', x: 4,  y: 58, delay: 1.3, duration: 5.1 },
  { emoji: '🌿', x: 91, y: 52, delay: 0.4, duration: 4.5 },
  { emoji: '🧁', x: 14, y: 80, delay: 1.8, duration: 3.6 },
  { emoji: '💫', x: 82, y: 78, delay: 0.9, duration: 4.8 },
  { emoji: '🌸', x: 44, y: 7,  delay: 0.3, duration: 5.3 },
  { emoji: '✨', x: 56, y: 90, delay: 1.5, duration: 4.0 },
  { emoji: '🍵', x: 28, y: 11, delay: 2.1, duration: 3.9 },
  { emoji: '🌸', x: 72, y: 9,  delay: 0.7, duration: 5.0 },
  { emoji: '☁️', x: 20, y: 42, delay: 1.0, duration: 6.2 },
  { emoji: '💕', x: 76, y: 40, delay: 1.7, duration: 4.4 },
];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const heroY       = useTransform(scrollYProgress, [0, 0.45], [0, -60]);

  useEffect(() => {
    const t = setInterval(() => {
      setWordIdx(i => (i + 1) % WORDS.length);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #fdf4ff 0%, #fce7f3 30%, #ede9fe 60%, #ecfdf5 100%)',
      }}
    >
      {/* ── Blobs ── */}
      <Blob color="bg-purple-200"  style={{ width: 520, height: 520, top: '-10%',  left: '-18%'  }} delay={0}   />
      <Blob color="bg-pink-200"    style={{ width: 420, height: 420, top: '5%',    right: '-15%' }} delay={2}   />
      <Blob color="bg-green-200"   style={{ width: 360, height: 360, bottom: '0%', left: '28%'  }} delay={4}   />
      <Blob color="bg-yellow-100"  style={{ width: 300, height: 300, bottom: '8%', right: '-8%' }} delay={1.5} />
      <Blob color="bg-blue-200"    style={{ width: 260, height: 260, top: '32%',   left: '18%'  }} delay={3}   />

      {/* ── Dot grid ── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #7c3aed 1.5px, transparent 1.5px)',
          backgroundSize: '44px 44px',
        }}
      />

      {/* ── Particles ── */}
      {PARTICLES.map((p, i) => <Particle key={i} {...p} />)}

      {/* ── Main content ── */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-20"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.92 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="inline-flex items-center gap-2.5 bg-white/70 backdrop-blur-md border border-purple-200/60 rounded-full px-5 py-2 mb-8 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
          <span className="font-body text-sm text-purple-600 font-medium">
            Now open · Order online today
          </span>
        </motion.div>

        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-display leading-[1.1] mb-6">
            {/* Line 1 */}
            <span className="block text-6xl md:text-8xl text-purple-900 mb-2">
              Every Sip
            </span>

            {/* Line 2 */}
            <span className="block text-6xl md:text-8xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-400 to-purple-500">
                Tells a{' '}
              </span>

              {/* Cycled word - uses key to trigger re-animation, never blank */}
              <span className="relative inline-block min-w-[200px] md:min-w-[320px] text-left">
                <motion.span
                  key={wordIdx}
                  initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
                  exit={{   opacity: 0, y: -18, filter: 'blur(8px)' }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
                >
                  {WORDS[wordIdx]}
                </motion.span>

                {/* Animated underline */}
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 0.95 }}
                />
              </span>
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.7, delay: 0.48 }}
          className="font-body text-lg md:text-xl text-purple-500 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Artisan coffee, dreamy matcha &amp; cloud-soft pastries —<br />
          crafted to make your day a little sweeter 🌿
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.7, delay: 0.62 }}
          className="flex flex-wrap gap-4 justify-center mb-16"
        >
          <Link
            to="/menu"
            className="group relative overflow-hidden bg-gradient-to-r from-purple-400 to-pink-400 text-white font-body font-semibold px-10 py-4 rounded-full text-base shadow-xl shadow-purple-300/30 hover:shadow-2xl hover:shadow-purple-400/40 transition-all duration-300 hover:scale-105"
          >
            View Our Menu ✨
          </Link>
          <Link
            to="/about"
            className="bg-white/75 backdrop-blur-sm hover:bg-white text-purple-700 font-body font-semibold px-10 py-4 rounded-full border border-purple-200/60 text-base transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Our Story 🌿
          </Link>
        </motion.div>

        {/* Floating coffee */}
        <motion.div
          animate={{ y: [-10, 10, -10], rotate: [-2, 2, -2] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-8xl md:text-[7rem] mx-auto w-fit drop-shadow-xl"
        >
          ☕
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0  }}
          transition={{ duration: 0.7, delay: 0.88 }}
          className="flex flex-wrap justify-center gap-10 mt-12 mb-8"
        >
          {[
            { value: '50+',  label: 'Menu items'      },
            { value: '4.9★', label: 'Average rating'  },
            { value: '10k+', label: 'Happy customers' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="font-display text-2xl text-purple-800">{value}</p>
              <p className="font-body text-xs text-purple-400 mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <p className="font-body text-[11px] text-purple-300 tracking-widest uppercase">Scroll</p>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.3, repeat: Infinity }}
          className="text-purple-300 text-base"
        >
          ↓
        </motion.div>
      </motion.div>

      {/* ── Bottom wave into white ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block' }}>
          <path d="M0 50 C360 80 1080 20 1440 50 L1440 80 L0 80 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

