import React from 'react';
import { motion } from 'motion/react';

export const Caption: React.FC = () => {
  return (
    <motion.div
      id="hero-caption"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
      className="fixed pointer-events-none z-20 left-4 lg:left-8 top-[118px] sm:top-[160px] lg:top-[220px] w-auto max-w-[340px] sm:max-w-[380px] lg:max-w-[420px] transition-opacity duration-150 ease-out"
      style={{
        mixBlendMode: 'exclusion',
        fontFamily: "'Inter Tight', sans-serif"
      }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="text-[10px] uppercase tracking-[0.25em] text-white font-medium">
          TOKYO / PARIS ARCHIVE 2026
        </span>
      </div>
      <div className="text-[13px] sm:text-[15px] leading-[130%] font-medium tracking-[-0.03em] uppercase text-white mb-2">
        ARCHITECTURAL MINIMALISM & SILHOUETTE SYNTHESIS
      </div>
      <div className="text-[11px] text-white/80 font-light tracking-[0.02em] uppercase">
        LIMITED RELEASE / 10 CORE ARCHIVAL PIECES
      </div>
    </motion.div>
  );
};
