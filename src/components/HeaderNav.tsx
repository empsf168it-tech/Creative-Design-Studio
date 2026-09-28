import React, { useState, useEffect } from 'react';
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { route: PageRoute; label: string }[] = [
    { route: 'home', label: 'HOME' },
    { route: 'about', label: 'ABOUT' },
    { route: 'archive', label: 'ARCHIVE' },
    { route: 'contact', label: 'CONTACT' }
  ];

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-8 lg:px-12 flex justify-between items-center transition-all duration-300 ${
          scrolled
            ? 'py-3.5 sm:py-4 bg-black/90 backdrop-blur-xl border-b border-neutral-800 shadow-2xl shadow-black/80'
            : 'py-5 sm:py-7 bg-gradient-to-b from-black/80 via-black/30 to-transparent'
        }`}
      >
        {/* Brand Logo on Left */}
        <div
          onClick={() => onNavigate('home')}
          className="cursor-pointer pointer-events-auto select-none flex items-center"
        >
          <svg
            viewBox="0 0 460 75"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[110px] sm:w-[145px] lg:w-[170px] h-auto"
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
        </div>

        {/* Right Navigation & Cart */}
        <div className="flex items-center gap-6 sm:gap-8">
          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] uppercase tracking-wider text-white font-medium">
            {navLinks.map((link) => (
              <button
                key={link.route}
                onClick={() => onNavigate(link.route)}
                className={`transition-colors pointer-events-auto cursor-pointer ${
                  currentRoute === link.route
                    ? 'text-white font-bold underline underline-offset-8 decoration-2 decoration-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Hamburger + Cart Button */}
          <div className="flex items-center gap-4 sm:gap-6 pointer-events-auto">
            {/* Hamburger Icon for Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1 cursor-pointer text-white"
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
              className="text-[13px] sm:text-[14px] text-white font-medium hover:text-neutral-300 transition-colors cursor-pointer flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-900/80 border border-neutral-800 hover:border-neutral-600"
            >
              <span>[ CART ]</span>
              {cartCount > 0 && (
                <span className="text-[10px] bg-white text-black font-bold px-1.5 py-0.2 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
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
