import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

const SYMBOLS = ['8', '$', '^^', '%', '/'];

export const ProductInfo: React.FC = () => {
  const [symbol, setSymbol] = useState('8');
  const lastUpdateRef = useRef(0);

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

  return (
    <motion.div
      id="outro-info"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.45 }}
      data-outro-offset="166"
      className="fixed pointer-events-none z-20 right-4 sm:right-8 bottom-[80px] w-[330px] flex flex-col items-center max-sm:left-0 max-sm:right-0 max-sm:bottom-[48px] max-sm:w-full"
      style={{ mixBlendMode: 'exclusion' }}
    >
      {/* Top block - Perfectly centered column */}
      <div className="flex flex-col items-center w-full mb-[32px] max-sm:w-[252px] max-sm:mb-[12px]">
        {/* Animated Rotating Round Circle Badge */}
        <div className="relative w-[36px] h-[36px] max-sm:w-[26px] max-sm:h-[26px] mb-3 flex items-center justify-center">
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
              className="max-sm:stroke-[2]"
            />
          </svg>
          <span
            id="circle-symbol"
            className="relative text-[15px] max-sm:text-[11px] text-white uppercase tracking-[-0.04em] font-medium leading-none"
          >
            {symbol}
          </span>
        </div>

        {/* Collection label */}
        <div className="text-[30px] max-sm:text-[20px] leading-[100%] text-center tracking-[-0.04em] uppercase text-white font-medium w-full">
          ARCHIVE COLLECTION
          <br />
          "VALENCE"
        </div>
      </div>

      {/* Price */}
      <div className="text-[80px] max-sm:text-[60px] leading-[100%] text-center tracking-[-0.04em] text-white font-medium">
        $97,33
      </div>
    </motion.div>
  );
};
