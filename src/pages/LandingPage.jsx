// import React, { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { fetchMenu } from '../features/menu/menuSlice';
// import Hero from '../components/landing/Hero';
// import FeaturedCarousel from '../components/landing/FeaturedCarousel';
// import Testimonials from '../components/landing/Testimonials';
// import Footer from '../components/layout/Footer';

// /* Reusable scroll-reveal wrapper */
// const Reveal = ({ children, delay = 0, className = '' }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 40 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true, amount: 0.2 }}
//     transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
//     className={className}
//   >
//     {children}
//   </motion.div>
// );

// /* Wave SVG divider */
// const WaveDivider = ({ flip = false, fill = '#ffffff' }) => (
//   <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`}>
//     <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M0 30 C480 60 960 0 1440 30 L1440 60 L0 60 Z" fill={fill} />
//     </svg>
//   </div>
// );

// const features = [
//   { emoji: '☕', label: 'Artisan Coffee',       desc: 'Single-origin beans, brewed to precision every morning.' },
//   { emoji: '🍵', label: 'Ceremonial Matcha',    desc: 'Imported from Uji, Japan — whisked the traditional way.' },
//   { emoji: '🥐', label: 'Fresh Pastries',       desc: 'Baked in-house daily. Warm, flaky, and totally irresistible.' },
//   { emoji: '🌱', label: 'Plant-Based Options',  desc: 'Oat, almond, coconut and soy milks always available.' },
// ];

// const perks = [
//   { emoji: '⚡', title: 'Order Online',  desc: 'Skip the wait — order from our menu and pick up in minutes.' },
//   { emoji: '🌿', title: 'Sustainably Sourced', desc: 'We partner with farmers who care about the planet as much as we do.' },
//   { emoji: '💕', title: 'Made With Love', desc: 'Every single item is crafted by hand with genuine care.' },
// ];

// export default function LandingPage() {
//   const dispatch = useDispatch();
//   useEffect(() => { dispatch(fetchMenu()); }, [dispatch]);

//   return (
//     <div className="min-h-screen font-body overflow-x-hidden">

//       {/* ── 1. Hero ── */}
//       <Hero />

//       {/* ── 2. Feature highlights ── */}
//       <section className="py-20 bg-white">
//         <div className="max-w-6xl mx-auto px-6">
//           <Reveal className="text-center mb-12">
//             <p className="font-body text-xs text-purple-400 tracking-[0.2em] uppercase mb-2">What we offer</p>
//             <h2 className="font-display text-4xl md:text-5xl text-purple-900">
//               Crafted for You 🌸
//             </h2>
//           </Reveal>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//             {features.map((f, i) => (
//               <Reveal key={f.label} delay={i * 0.08}>
//                 <motion.div
//                   whileHover={{ y: -6, scale: 1.02 }}
//                   className="bg-gradient-to-br from-cream to-white rounded-3xl p-6 border border-lilac/25 shadow-sm hover:shadow-xl hover:shadow-lilac/15 transition-shadow text-center"
//                 >
//                   <motion.div
//                     animate={{ y: [-4, 4, -4] }}
//                     transition={{ duration: 3.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
//                     className="text-4xl mb-4"
//                   >
//                     {f.emoji}
//                   </motion.div>
//                   <h3 className="font-display text-lg text-purple-900 mb-2">{f.label}</h3>
//                   <p className="font-body text-sm text-purple-400 leading-relaxed">{f.desc}</p>
//                 </motion.div>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       <WaveDivider fill="#FFFBF5" />

//       {/* ── 3. Featured carousel ── */}
//       <FeaturedCarousel />

//       <WaveDivider fill="#ffffff" flip />

//       {/* ── 4. About teaser ── */}
//       <section className="py-20 bg-white">
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
//             {/* Text */}
//             <Reveal>
//               <p className="font-body text-xs text-purple-400 tracking-[0.2em] uppercase mb-3">
//                 Our little corner
//               </p>
//               <h2 className="font-display text-4xl md:text-5xl text-purple-900 mb-5 leading-tight">
//                 A Café Born from<br />Pure Passion 🌿
//               </h2>
//               <p className="font-body text-purple-500 leading-relaxed mb-4 text-[15px]">
//                 BeansSprout started as a dream — a cosy corner where every drink is made with intention, every bite crafted with care, and every guest leaves a little happier than they arrived.
//               </p>
//               <p className="font-body text-purple-400 leading-relaxed mb-8 text-[15px]">
//                 We believe coffee is more than a beverage. It's a ritual, a conversation starter, a warm pause in a busy day. Come in for a cup. Stay for the feeling.
//               </p>
//               <Link
//                 to="/about"
//                 className="inline-flex items-center gap-2 font-body text-sm text-purple-700 border border-lilac px-7 py-3 rounded-full hover:bg-lilac/20 transition-all hover:scale-105 shadow-sm"
//               >
//                 Read our story 
//                 <motion.span animate={{ x: [0,4,0] }} transition={{ duration: 1.2, repeat: Infinity }}>→</motion.span>
//               </Link>
//             </Reveal>

//             {/* Feature tiles */}
//             <Reveal delay={0.15}>
//               <div className="grid grid-cols-2 gap-4">
//                 {perks.map((p, i) => (
//                   <motion.div
//                     key={p.title}
//                     whileHover={{ scale: 1.04 }}
//                     className={`rounded-3xl p-6 border ${
//                       i === 0 ? 'bg-gradient-to-br from-lilac/20 to-blush/10 border-lilac/30 col-span-2' :
//                       i === 1 ? 'bg-gradient-to-br from-mint/20 to-skyblue/10 border-mint/30' :
//                                 'bg-gradient-to-br from-beige/40 to-blush/10 border-yellow-200/50'
//                     } shadow-sm hover:shadow-md transition-shadow`}
//                   >
//                     <div className="text-3xl mb-3">{p.emoji}</div>
//                     <h4 className="font-display text-base text-purple-900 mb-1">{p.title}</h4>
//                     <p className="font-body text-xs text-purple-400 leading-relaxed">{p.desc}</p>
//                   </motion.div>
//                 ))}
//               </div>
//             </Reveal>
//           </div>
//         </div>
//       </section>

//       <WaveDivider fill="#FFFBF5" />

//       {/* ── 5. Testimonials ── */}
//       <Testimonials />

//       {/* ── 6. CTA Banner ── */}
//       <section className="py-20 bg-cream">
//         <div className="max-w-5xl mx-auto px-6">
//           <Reveal>
//             <div className="relative bg-gradient-to-r from-lilac via-blush/70 to-lilac rounded-[2.5rem] p-12 md:p-16 text-center overflow-hidden shadow-2xl shadow-lilac/20">
//               {/* Decorative circles */}
//               <div className="absolute -top-12 -left-12 w-40 h-40 bg-white/15 rounded-full" />
//               <div className="absolute -bottom-8 -right-8 w-52 h-52 bg-white/15 rounded-full" />
//               <div className="absolute top-1/2 -translate-y-1/2 left-8 w-6 h-6 bg-white/30 rounded-full" />
//               <div className="absolute top-6 right-20 w-4 h-4 bg-white/30 rounded-full" />

//               {/* Floating emojis inside banner */}
//               {['🌸','✨','☕','🌿'].map((e, i) => (
//                 <motion.span
//                   key={i}
//                   className="absolute text-2xl pointer-events-none"
//                   style={{ top: `${20 + i * 18}%`, left: i % 2 === 0 ? `${5 + i * 3}%` : undefined, right: i % 2 !== 0 ? `${5 + i * 2}%` : undefined }}
//                   animate={{ y: [-8, 8, -8], rotate: [-5, 5, -5] }}
//                   transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
//                 >
//                   {e}
//                 </motion.span>
//               ))}

//               <div className="relative z-10">
//                 <motion.div
//                   animate={{ rotate: [-5, 5, -5] }}
//                   transition={{ duration: 3, repeat: Infinity }}
//                   className="text-5xl mb-5 mx-auto w-fit"
//                 >
//                   🌸
//                 </motion.div>
//                 <h2 className="font-display text-4xl md:text-5xl text-purple-900 mb-4">
//                   Ready to Order?
//                 </h2>
//                 <p className="font-body text-purple-700 mb-8 text-lg max-w-md mx-auto">
//                   Browse our full menu and order your favourite drink online — ready for pickup!
//                 </p>
//                 <Link
//                   to="/menu"
//                   className="inline-block bg-white text-purple-800 font-body font-semibold px-12 py-4 rounded-full hover:bg-purple-50 transition-all hover:scale-105 shadow-xl shadow-purple-300/30 text-base"
//                 >
//                   Explore the Menu ✨
//                 </Link>
//               </div>
//             </div>
//           </Reveal>
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// }
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchMenu } from '../features/menu/menuSlice';
import Hero from '../components/landing/Hero';
import FeaturedCarousel from '../components/landing/FeaturedCarousel';
import Testimonials from '../components/landing/Testimonials';
import Footer from '../components/layout/Footer';

const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const FEATURES = [
  { emoji: '☕', label: 'Artisan Coffee',      desc: 'Single-origin beans, brewed to precision every morning.',       bg: 'from-purple-50 to-pink-50',   border: 'border-purple-100' },
  { emoji: '🍵', label: 'Ceremonial Matcha',   desc: 'Imported from Uji, Japan — whisked the traditional way.',       bg: 'from-green-50 to-teal-50',    border: 'border-green-100'  },
  { emoji: '🥐', label: 'Fresh Pastries',      desc: 'Baked in-house daily. Warm, flaky, and totally irresistible.',  bg: 'from-yellow-50 to-orange-50', border: 'border-yellow-100' },
  { emoji: '🌱', label: 'Plant-Based Options', desc: 'Oat, almond, coconut and soy milks always on hand.',           bg: 'from-lime-50 to-green-50',    border: 'border-lime-100'   },
];

const PERKS = [
  { emoji: '⚡', title: 'Order Online',         desc: 'Skip the wait — order from our menu and pick up in minutes.',          bg: 'from-purple-50 to-pink-50',   border: 'border-purple-100', wide: true },
  { emoji: '🌿', title: 'Sustainably Sourced',  desc: 'We partner with farmers who care about the planet.',                   bg: 'from-green-50 to-teal-50',    border: 'border-green-100'         },
  { emoji: '💕', title: 'Made With Love',        desc: 'Every single item is crafted by hand with genuine care.',             bg: 'from-pink-50 to-rose-50',     border: 'border-pink-100'          },
];

export default function LandingPage() {
  const dispatch = useDispatch();
  useEffect(() => { dispatch(fetchMenu()); }, [dispatch]);

  return (
    <div className="min-h-screen font-body overflow-x-hidden">

      {/* ── 1. Hero (has its own gradient background) ── */}
      <Hero />

      {/* ── 2. Features — white bg ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-12">
            <p className="font-body text-xs text-purple-400 tracking-[0.2em] uppercase mb-2">What we offer</p>
            <h2 className="font-display text-4xl md:text-5xl text-purple-900">Crafted for You 🌸</h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`bg-gradient-to-br ${f.bg} rounded-3xl p-6 border ${f.border} shadow-sm hover:shadow-xl hover:shadow-purple-100/50 transition-all text-center`}
                >
                  <motion.div
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 3.5 + i * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-4xl mb-4"
                  >
                    {f.emoji}
                  </motion.div>
                  <h3 className="font-display text-base text-purple-900 mb-2">{f.label}</h3>
                  <p className="font-body text-sm text-purple-400 leading-relaxed">{f.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Featured carousel — very light purple bg ── */}
      <section className="bg-purple-50/40">
        <FeaturedCarousel />
      </section>

      {/* ── 4. About teaser — white bg ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <Reveal>
              <p className="font-body text-xs text-purple-400 tracking-[0.2em] uppercase mb-3">Our little corner</p>
              <h2 className="font-display text-4xl md:text-5xl text-purple-900 mb-5 leading-tight">
                A Café Born from<br />Pure Passion 🌿
              </h2>
              <p className="font-body text-purple-500 leading-relaxed mb-4 text-[15px]">
                BeansSprout started as a dream — a cosy corner where every drink is made with intention,
                every bite crafted with care, and every guest leaves a little happier than they arrived.
              </p>
              <p className="font-body text-purple-400 leading-relaxed mb-8 text-[15px]">
                We believe coffee is more than a beverage. It's a ritual, a conversation starter,
                a warm pause in a busy day.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-body text-sm text-purple-700 border border-purple-200 px-7 py-3 rounded-full hover:bg-purple-50 transition-all hover:scale-105 shadow-sm"
              >
                Read our story
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>→</motion.span>
              </Link>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                {PERKS.map((p, i) => (
                  <motion.div
                    key={p.title}
                    whileHover={{ scale: 1.03 }}
                    className={`rounded-3xl p-6 border ${p.border} bg-gradient-to-br ${p.bg} shadow-sm hover:shadow-md transition-all ${p.wide ? 'col-span-2' : ''}`}
                  >
                    <div className="text-3xl mb-3">{p.emoji}</div>
                    <h4 className="font-display text-base text-purple-900 mb-1">{p.title}</h4>
                    <p className="font-body text-sm text-purple-400 leading-relaxed">{p.desc}</p>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 5. Testimonials — very light pink bg ── */}
      <section className="bg-pink-50/30">
        <Testimonials />
      </section>

      {/* ── 6. CTA Banner — white bg ── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="relative bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-[2.5rem] p-12 md:p-16 text-center overflow-hidden shadow-2xl shadow-purple-300/30">
              {/* Decorative circles */}
              <div className="absolute -top-16 -left-16 w-48 h-48 bg-white/10 rounded-full pointer-events-none" />
              <div className="absolute -bottom-12 -right-12 w-56 h-56 bg-white/10 rounded-full pointer-events-none" />
              <div className="absolute top-1/2 -translate-y-1/2 left-8 w-6 h-6 bg-white/25 rounded-full pointer-events-none" />
              <div className="absolute top-8 right-24 w-4 h-4 bg-white/25 rounded-full pointer-events-none" />

              {/* Floating emoji inside banner */}
              {['🌸', '✨', '☕', '🌿'].map((e, i) => (
                <motion.span
                  key={i}
                  className="absolute text-2xl pointer-events-none select-none"
                  style={{
                    top:   `${20 + i * 18}%`,
                    left:  i % 2 === 0 ? `${4 + i * 2}%` : undefined,
                    right: i % 2 !== 0 ? `${4 + i * 2}%` : undefined,
                  }}
                  animate={{ y: [-8, 8, -8], rotate: [-5, 5, -5] }}
                  transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                >
                  {e}
                </motion.span>
              ))}

              <div className="relative z-10">
                <motion.div
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-5xl mb-5 mx-auto w-fit"
                >
                  🌸
                </motion.div>
                <h2 className="font-display text-4xl md:text-5xl text-white mb-4 drop-shadow-sm">
                  Ready to Order?
                </h2>
                <p className="font-body text-purple-100 mb-8 text-lg max-w-md mx-auto">
                  Browse our full menu and order your favourite drink online — ready for pickup!
                </p>
                <Link
                  to="/menu"
                  className="inline-block bg-white text-purple-700 font-body font-semibold px-12 py-4 rounded-full hover:bg-purple-50 transition-all hover:scale-105 shadow-xl shadow-purple-400/20 text-base"
                >
                  Explore the Menu ✨
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
