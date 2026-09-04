import React from 'react';
import { motion } from 'motion/react';
import { PageRoute } from '../types';

interface LogoProps {
  onNavigate?: (route: PageRoute) => void;
}

export const Logo: React.FC<LogoProps> = ({ onNavigate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0 }}
      onClick={() => onNavigate && onNavigate('home')}
      className="fixed z-50 top-5 left-4 sm:top-7 sm:left-8 cursor-pointer pointer-events-auto select-none"
      style={{ mixBlendMode: 'exclusion' }}
    >
      <svg
        viewBox="0 0 460 75"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[110px] sm:w-[155px] lg:w-[195px] h-auto"
      >
        <text
          x="0"
          y="56"
          fill="white"
          fontFamily="'Inter Tight', sans-serif"
          fontWeight="800"
          fontSize="58"
          letterSpacing="0.08em"
        >
          VALENCE
        </text>

        {/* Registered Trademark Mark ® */}
        <circle cx="432" cy="20" r="11" stroke="white" strokeWidth="2.5" fill="none" />
        <text
          x="432"
          y="24"
          fill="white"
          fontFamily="'Inter Tight', sans-serif"
          fontWeight="700"
          fontSize="12"
          textAnchor="middle"
        >
          R
        </text>
      </svg>
    </motion.div>
  );
};
