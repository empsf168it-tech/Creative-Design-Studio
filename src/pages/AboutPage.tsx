import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Footer } from '../components/Footer';
import { PageRoute } from '../types';
import trenchImg from '../assets/images/valence_trench_look.png';

const SYMBOLS = ['8', '$', '^^', '%', '/'];

interface AboutPageProps {
  onNavigate?: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [expandedMaterial, setExpandedMaterial] = useState<number | null>(null);
  const [symbol, setSymbol] = useState('8');
  const lastUpdateRef = useRef(0);

  // Round Symbol Scroll Animation (Identical to Home Page Hero Animation)
  useEffect(() => {
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastUpdateRef.current > 80) {
        lastUpdateRef.current = now;
        const randomSym = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        setSymbol(randomSym);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const materials = [
    {
      id: 1,
      title: "JAPANESE BONDED WOOL",
      spec: "480 GSM / Double-Faced",
      desc: "Woven in Bishu, Japan on antique shuttle looms. Double-face bonded with breathable waterproof membrane for absolute structure.",
      icon: "❖"
    },
    {
      id: 2,
      title: "AEROSPACE TITANIUM",
      spec: "Grade 5 Titanium Hardware",
      desc: "Precision CNC-milled hardware with raw brushed finish. Lightweight, hypoallergenic, and impervious to oxidization.",
      icon: "⚙"
    },
    {
      id: 3,
      title: "FULL-GRAIN CALFSKIN",
      spec: "1.4mm Vegetable Tanned",
      desc: "Sourced from Tuscan tanneries using natural mimosa and chestnut tannins. Develops an extraordinary patina over years of wear.",
      icon: "✦"
    },
    {
      id: 4,
      title: "ZERO-WASTE TAILORING",
      spec: "Algorithmic Patterning",
      desc: "Each pattern piece is digitally nested to utilize 99.4% of cloth width, eliminating fabric waste during production.",
      icon: "∷"
    }
  ];

  const roadmap = [
    {
      phase: "PHASE 01",
      year: "2024 — 2025",
      title: "GENESIS & ARCHIVE FORMULATION",
      detail: "Establishment of the Tokyo research laboratory. Creation of initial 10 core archival prototypes utilizing zero-waste patterning algorithms."
    },
    {
      phase: "PHASE 02",
      year: "2026 — PRESENT",
      title: "SCROLL-DRIVEN ARCHIVE DROP",
      detail: "Launch of the scroll-driven interactive digital lookbook and global direct-to-collector archive release."
    },
    {
      phase: "PHASE 03",
      year: "Q3 2026",
      title: "GINZA PHYSICAL VAULT",
      detail: "Opening of VALENCE Vault Ginza — an architectural sanctuary for private appointments, bespoke fitting, and hardware replacement."
    },
    {
      phase: "PHASE 04",
      year: "2027",
      title: "CIRCULAR AUTHENTICATION PROTOCOL",
      detail: "Implementation of NFC-embedded titanium microchips inside garment linings for lifetime buy-back and provenance tracking."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 selection:bg-white selection:text-black">
      <div className="px-4 sm:px-8 lg:px-16 pb-32">
        {/* SECTION 1: ABOUT PAGE HERO SECTION — EXACT HOME PAGE HERO FORMAT & ROUND ANIMATION */}
        <section className="max-w-[1400px] mx-auto mb-24">
          <div className="relative w-full h-[85vh] sm:h-[90vh] rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl flex flex-col justify-between p-6 sm:p-12">
            {/* Hero Background Image */}
            <motion.img
              initial={{ scale: 1.03, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              src={trenchImg}
              alt="VALENCE Atelier Editorial"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />

            {/* Dark Gradient Overlay for Vignette Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/60 pointer-events-none" />

            {/* Top Hero Header Badge (Matching Home Page Format) */}
            <div className="relative z-10 flex justify-between items-start w-full">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xs uppercase tracking-[0.25em] text-white/90 flex flex-col gap-1 font-medium bg-black/50 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>TOKYO / PARIS ATELIER 2026</span>
                </div>
                <span className="text-[10px] text-neutral-400">ARCHITECTURAL MINIMALISM & SILHOUETTE SYNTHESIS</span>
              </motion.div>
            </div>

            {/* Hero Main Headline */}
            <div className="relative z-10 my-auto max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.3 }}
              >
                <div className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-3">
                  SECTION 01 / BRAND MANIFESTO
                </div>
                <h1 className="text-5xl sm:text-7xl lg:text-9xl font-medium tracking-tight uppercase leading-[0.92] text-white">
                  VALENCE <span className="text-neutral-400 font-light italic">MANIFESTO</span>
                </h1>
                <p className="text-base sm:text-2xl text-neutral-200 mt-6 max-w-3xl font-light leading-relaxed">
                  VALENCE operates at the intersection of extreme minimalism, architectural silhouettes, and scroll-driven interactive digital presentation. We build garments as permanent artifacts—uncompromised by seasonal trends.
                </p>
              </motion.div>
            </div>

            {/* Hero Bottom Bar — Exact Home Page Round Symbol Animation & Spec Display */}
            <div className="relative z-10 flex justify-between items-end w-full">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xs uppercase tracking-widest text-neutral-400 font-mono hidden sm:block"
              >
                EST. TOKYO 2026
              </motion.div>

              {/* Round Symbol Rotating Animation & Value (Home Page ProductInfo Format) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col items-center sm:items-end ml-auto bg-black/60 backdrop-blur-md px-8 py-5 rounded-2xl border border-white/10 text-white"
              >
                {/* Round Icon SVG Animation */}
                <div className="flex flex-col items-center mb-2">
                  <div className="relative w-[34px] h-[34px] sm:w-[40px] sm:h-[40px] mb-1.5 flex items-center justify-center">
                    <svg
                      viewBox="0 0 40 40"
                      className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite]"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="20"
                        cy="20"
                        r="18.75"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeDasharray="4 4"
                      />
                    </svg>
                    <span className="relative text-[15px] sm:text-[17px] text-white uppercase tracking-[-0.04em] font-medium leading-none">
                      {symbol}
                    </span>
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-medium text-center">
                    ATELIER COLLECTION "VALENCE"
                  </div>
                </div>

                {/* Large Spec Display (Matching Home Page $97,33 Format) */}
                <div className="text-[60px] sm:text-[80px] leading-[100%] text-center sm:text-right tracking-[-0.04em] text-white font-medium">
                  99,4%
                </div>
              </motion.div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-neutral-800">
            <div>
              <div className="text-4xl lg:text-5xl font-medium tracking-tight mb-1">10</div>
              <div className="text-xs text-neutral-400 uppercase tracking-widest">Archival Garments</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-medium tracking-tight mb-1">99.4%</div>
              <div className="text-xs text-neutral-400 uppercase tracking-widest">Pattern Efficiency</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-medium tracking-tight mb-1">GRADE 5</div>
              <div className="text-xs text-neutral-400 uppercase tracking-widest">Aerospace Titanium</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-medium tracking-tight mb-1">TOKYO</div>
              <div className="text-xs text-neutral-400 uppercase tracking-widest">Design Laboratory</div>
            </div>
          </div>
        </section>

        {/* SECTION 2: MATERIALITY & CRAFTSMANSHIP MATRIX */}
        <section className="max-w-[1400px] mx-auto mb-28">
          <div className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
            SECTION 02 / MATERIALITY MATRIX
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium uppercase tracking-tight mb-12">
            MATERIAL SPECS & ENGINEERING
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {materials.map((mat) => (
              <motion.div
                key={mat.id}
                whileHover={{ y: -4 }}
                onClick={() => setExpandedMaterial(expandedMaterial === mat.id ? null : mat.id)}
                className="cursor-pointer p-6 sm:p-8 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-neutral-500 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between h-full"
              >
                <div className="flex-1 flex flex-col">
                  {/* Centered Icon & Technical Spec Badge on all views */}
                  <div className="flex flex-col items-center gap-3 mb-6">
                    <span className="text-3xl text-neutral-300 text-center flex justify-center items-center">{mat.icon}</span>
                    <span className="text-xs uppercase tracking-widest px-3 py-1 bg-neutral-800 text-neutral-300 rounded-full border border-neutral-700 text-center font-mono">
                      {mat.spec}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-medium uppercase tracking-tight mb-3 text-white">
                    {mat.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-1">
                    {mat.desc}
                  </p>
                </div>

                <div className="text-xs uppercase tracking-widest text-white flex items-center gap-2 mt-auto pt-2">
                  <span>{expandedMaterial === mat.id ? "[ COLLAPSE TECHNICAL SPEC ]" : "[ EXPAND TECHNICAL SPEC ]"}</span>
                  <span>→</span>
                </div>

                {expandedMaterial === mat.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 pt-6 border-t border-neutral-800 text-xs text-neutral-400 space-y-2"
                  >
                    <div className="flex justify-between">
                      <span className="text-neutral-500">ORIGIN:</span>
                      <span className="text-neutral-200">HONSHU / TUSCANY</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">TEST RATING:</span>
                      <span className="text-neutral-200">ISO 105-X12 COLOR FASTNESS</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">CARE PROTOCOL:</span>
                      <span className="text-neutral-200">SPECIALIST DRY CLEAN ONLY</span>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 3: CREATIVE LEADERSHIP & ATELIER */}
        <section className="max-w-[1400px] mx-auto mb-28">
          <div className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
            SECTION 03 / CREATIVE DIRECTION
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium uppercase tracking-tight mb-12">
            ATELIER LEADERSHIP
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="p-8 rounded-xl bg-neutral-950 border border-neutral-800">
              <div className="text-6xl font-extralight text-neutral-700 mb-6">01</div>
              <h3 className="text-xl font-medium uppercase tracking-tight text-white mb-1">
                KENJI TAKAHASHI
              </h3>
              <p className="text-xs text-neutral-400 uppercase tracking-widest mb-4">
                Director of Silhouette & Archive Research
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed font-light">
                Formerly of Yohji Yamamoto and Comme des Garçons. Spent 15 years mastering zero-waste drape mechanics in Kyoto.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-neutral-950 border border-neutral-800">
              <div className="text-6xl font-extralight text-neutral-700 mb-6">02</div>
              <h3 className="text-xl font-medium uppercase tracking-tight text-white mb-1">
                ELENA VANCE
              </h3>
              <p className="text-xs text-neutral-400 uppercase tracking-widest mb-4">
                Lead Textile & Hardware Engineer
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed font-light">
                Specialist in high-tenacity technical weaves and aerospace titanium casting. Head of material innovation at VALENCE Tokyo.
              </p>
            </div>

            <div className="p-8 rounded-xl bg-neutral-950 border border-neutral-800">
              <div className="text-6xl font-extralight text-neutral-700 mb-6">03</div>
              <h3 className="text-xl font-medium uppercase tracking-tight text-white mb-1">
                MARCUS CHEN
              </h3>
              <p className="text-xs text-neutral-400 uppercase tracking-widest mb-4">
                Digital Interaction & Web Architecture
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed font-light">
                Architect of scroll-driven real-time canvas experiences, combining webGL precision with interactive high-fashion lookbooks.
              </p>
            </div>
          </div>

          {/* Philosophy Quote */}
          <div className="p-10 rounded-2xl bg-neutral-900/40 border border-neutral-800 text-center relative overflow-hidden">
            <div className="text-xl sm:text-3xl font-light italic text-neutral-200 max-w-3xl mx-auto leading-relaxed mb-4">
              "True luxury does not shout with logos; it asserts itself through weight, drape, hardware feedback, and absolute permanence."
            </div>
            <div className="text-xs uppercase tracking-[0.2em] text-neutral-400">
              — VALENCE DESIGN LAB STATEMENT (2026)
            </div>
          </div>
        </section>

        {/* SECTION 4: PROVENANCE & ROADMAP */}
        <section className="max-w-[1400px] mx-auto">
          <div className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
            SECTION 04 / PROVENANCE & ROADMAP
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium uppercase tracking-tight mb-12">
            2024 — 2027 ROADMAP
          </h2>

          <div className="space-y-4">
            {roadmap.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-xl border border-neutral-800 bg-neutral-950 text-white hover:border-neutral-600 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 font-mono">
                      {item.phase}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-medium uppercase tracking-tight text-white">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-xs tracking-widest font-mono text-neutral-400">
                    {item.year}
                  </span>
                </div>
                <p className="mt-4 text-sm font-light leading-relaxed max-w-3xl text-neutral-400">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Global Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
