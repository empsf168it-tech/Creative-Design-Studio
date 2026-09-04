import React from 'react';
import { PageRoute } from '../types';

interface FooterProps {
  onNavigate?: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-neutral-950 text-white border-t border-neutral-800 pt-20 pb-12 px-6 sm:px-12 lg:px-16 relative z-30 selection:bg-white selection:text-black">
      <div className="max-w-[1600px] mx-auto">
        {/* TOP ROW: BRAND LOGO & NEWSLETTER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center pb-16 border-b border-neutral-800 gap-10">
          <div>
            <div className="text-4xl sm:text-6xl font-semibold tracking-tight uppercase mb-3 text-white">
              VALENCE<span className="text-xs align-super ml-1 text-neutral-400">®</span>
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-400 max-w-lg leading-relaxed">
              ARCHITECTURAL MINIMALISM & ZERO-WASTE SILHOUETTE SYNTHESIS — EST. TOKYO 2026
            </p>
          </div>

          {/* Highlighted Newsletter Input */}
          <div className="w-full lg:w-auto min-w-[320px] sm:min-w-[440px] bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
            <div className="text-xs uppercase tracking-widest text-neutral-300 mb-3 font-mono font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              JOIN PRIVATE ARCHIVE RELEASE LIST
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-3">
              <input
                type="email"
                placeholder="ENTER EMAIL ADDRESS..."
                className="bg-black/60 border border-neutral-700 rounded-xl px-4 py-2.5 text-xs uppercase tracking-wider text-white placeholder-neutral-500 focus:outline-none focus:border-white w-full transition-colors"
              />
              <button
                type="submit"
                onClick={() => alert("Subscribed to VALENCE private release list.")}
                className="px-5 py-2.5 bg-white text-black text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-neutral-200 transition-colors whitespace-nowrap cursor-pointer shadow-lg"
              >
                SUBSCRIBE →
              </button>
            </form>
          </div>
        </div>

        {/* MIDDLE ROW: 4 HIGHLIGHTED NAVIGATION & SPEC COLUMNS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-neutral-800 text-xs">
          {/* COLUMN 1: NAVIGATION LINKS */}
          <div className="bg-black/40 p-6 rounded-2xl border border-neutral-850 hover:border-neutral-700 transition-all">
            <div className="uppercase tracking-[0.25em] text-neutral-400 font-semibold mb-6 flex items-center gap-2 font-mono">
              <span className="text-white">01 //</span> NAVIGATION
            </div>
            <ul className="space-y-3.5 uppercase tracking-widest font-medium">
              {[
                { label: 'HOME LOOKBOOK', route: 'home' as PageRoute },
                { label: 'ATELIER MANIFESTO', route: 'about' as PageRoute },
                { label: 'ARCHIVAL CATALOG', route: 'archive' as PageRoute },
                { label: 'SANCTUARY CONTACT', route: 'contact' as PageRoute }
              ].map((link) => (
                <li key={link.route}>
                  <button
                    onClick={() => onNavigate?.(link.route)}
                    className="w-full group flex items-center justify-between text-white hover:text-white bg-neutral-900/80 hover:bg-white hover:text-black px-4 py-2.5 rounded-xl border border-neutral-800 transition-all duration-200 text-left font-semibold cursor-pointer shadow-sm"
                  >
                    <span>{link.label}</span>
                    <span className="text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 2: SANCTUARIES LINKS */}
          <div className="bg-black/40 p-6 rounded-2xl border border-neutral-850 hover:border-neutral-700 transition-all">
            <div className="uppercase tracking-[0.25em] text-neutral-400 font-semibold mb-6 flex items-center gap-2 font-mono">
              <span className="text-white">02 //</span> SANCTUARIES
            </div>
            <ul className="space-y-3.5 uppercase tracking-widest font-mono">
              {[
                { name: 'TOKYO', loc: 'GINZA 4-CHOME' },
                { name: 'PARIS', loc: 'LE MARAIS 3E' },
                { name: 'NEW YORK', loc: 'SOHO GREENE ST' },
                { name: 'KYOTO', loc: 'ARCHIVE LAB' }
              ].map((sanc) => (
                <li key={sanc.name}>
                  <button
                    onClick={() => onNavigate?.('contact')}
                    className="w-full text-left group flex flex-col bg-neutral-900/80 hover:bg-neutral-850 px-4 py-2.5 rounded-xl border border-neutral-800 hover:border-neutral-600 transition-all cursor-pointer"
                  >
                    <span className="text-white font-semibold text-xs tracking-wider flex items-center justify-between">
                      {sanc.name}
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-80" />
                    </span>
                    <span className="text-[10px] text-neutral-400 mt-0.5">{sanc.loc}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 3: MATERIAL SPECS LINKS */}
          <div className="bg-black/40 p-6 rounded-2xl border border-neutral-850 hover:border-neutral-700 transition-all">
            <div className="uppercase tracking-[0.25em] text-neutral-400 font-semibold mb-6 flex items-center gap-2 font-mono">
              <span className="text-white">03 //</span> MATERIAL SPECS
            </div>
            <ul className="space-y-3.5 uppercase tracking-widest font-mono">
              {[
                '480GSM BONDED JAPANESE WOOL',
                'GRADE 5 AEROSPACE TITANIUM',
                'TUSCAN VEGETABLE CALFSKIN',
                '99.4% PATTERN EFFICIENCY'
              ].map((spec) => (
                <li key={spec}>
                  <button
                    onClick={() => onNavigate?.('about')}
                    className="w-full text-left bg-neutral-900/80 hover:bg-neutral-850 px-4 py-2.5 rounded-xl border border-neutral-800 hover:border-neutral-600 transition-all cursor-pointer"
                  >
                    <span className="text-white font-medium text-[11px] tracking-wider block truncate">
                      {spec}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 4: PROVENANCE & LEGAL LINKS */}
          <div className="bg-black/40 p-6 rounded-2xl border border-neutral-850 hover:border-neutral-700 transition-all">
            <div className="uppercase tracking-[0.25em] text-neutral-400 font-semibold mb-6 flex items-center gap-2 font-mono">
              <span className="text-white">04 //</span> PROVENANCE
            </div>
            <ul className="space-y-3.5 uppercase tracking-widest font-medium">
              {[
                'TERMS OF PROVENANCE',
                'PRIVACY POLICY',
                'CIRCULAR BUY-BACK',
                'NFC AUTHENTICATION'
              ].map((legal) => (
                <li key={legal}>
                  <button
                    onClick={() => alert(`Opening ${legal} protocols.`)}
                    className="w-full group flex items-center justify-between text-white hover:text-white bg-neutral-900/80 hover:bg-neutral-800 px-4 py-2.5 rounded-xl border border-neutral-800 hover:border-neutral-600 transition-all text-left font-medium cursor-pointer"
                  >
                    <span className="text-white font-medium text-xs">{legal}</span>
                    <span className="text-neutral-400 group-hover:text-white transition-colors">↗</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR: COPYRIGHT & HIGHLIGHTED BACK TO TOP */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-[11px] uppercase tracking-widest text-neutral-400 gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-white font-semibold">VALENCE ® 2026 — ALL RIGHTS RESERVED</span>
          </div>

          <div className="font-mono text-neutral-400 hidden md:block">
            35.6762° N, 139.6503° E — TOKYO ATELIER
          </div>

          <button
            onClick={scrollToTop}
            className="px-6 py-2.5 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-all flex items-center gap-2 cursor-pointer shadow-md tracking-wider text-xs"
          >
            <span>BACK TO TOP</span>
            <span>↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
