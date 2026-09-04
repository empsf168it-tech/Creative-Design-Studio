import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageRoute } from '../types';

interface HeaderNavProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentRoute,
  onNavigate,
  onOpenCart,
  cartCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { route: PageRoute; label: string }[] = [
    { route: 'home', label: 'HOME' },
    { route: 'about', label: 'ABOUT' },
    { route: 'archive', label: 'ARCHIVE' },
    { route: 'contact', label: 'CONTACT' }
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
        className="fixed z-50 top-5 right-4 sm:top-7 sm:right-8 flex items-center gap-4 sm:gap-8"
        style={{ mixBlendMode: 'exclusion' }}
      >
        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[13px] uppercase tracking-wider text-white font-medium">
          {navLinks.map((link) => (
            <button
              key={link.route}
              onClick={() => onNavigate(link.route)}
              className={`hover:opacity-70 transition-opacity pointer-events-auto cursor-pointer ${
                currentRoute === link.route ? 'underline underline-offset-4 decoration-2 font-bold' : ''
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Hamburger + Cart Row */}
        <div className="flex items-center gap-4 sm:gap-6 pointer-events-auto">
          {/* Hamburger Icon for Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1 cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg
              viewBox="0 0 40 40"
              className="w-[22px] h-[22px] sm:w-[26px] sm:h-[26px]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 14H40" stroke="white" strokeWidth="2.5" />
              <path d="M0 26H40" stroke="white" strokeWidth="2.5" />
            </svg>
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="text-[13px] sm:text-[14px] text-white font-medium hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-1.5"
          >
            <span>[ CART ]</span>
            {cartCount > 0 && (
              <span className="text-[10px] bg-white text-black font-bold px-1.5 py-0.2 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile Full-Screen Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-black text-white p-8 flex flex-col justify-center items-center lg:hidden"
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-2xl p-2 cursor-pointer"
            >
              ✕
            </button>

            <nav className="flex flex-col items-center gap-8 text-3xl font-medium uppercase tracking-tight">
              {navLinks.map((link) => (
                <button
                  key={link.route}
                  onClick={() => {
                    onNavigate(link.route);
                    setMobileMenuOpen(false);
                  }}
                  className={`hover:text-neutral-400 transition-colors ${
                    currentRoute === link.route ? 'text-white underline underline-offset-8' : 'text-neutral-400'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="absolute bottom-12 text-xs uppercase tracking-widest text-neutral-500">
              VALENCE ARCHIVE SYSTEM © 2026
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
