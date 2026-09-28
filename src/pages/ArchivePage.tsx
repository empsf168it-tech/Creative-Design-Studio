import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GALLERY_IMAGES, GalleryItem, PageRoute } from '../types';
import { Footer } from '../components/Footer';

interface ArchivePageProps {
  onAddToCart: (item: GalleryItem) => void;
  onNavigate?: (route: PageRoute) => void;
}

export const ArchivePage: React.FC<ArchivePageProps> = ({ onAddToCart, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [addedItemNotification, setAddedItemNotification] = useState<string | null>(null);

  // Countdown timer state for Drop 04
  const [timeLeft, setTimeLeft] = useState({ hours: 48, minutes: 12, seconds: 39 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const categories = ['ALL', 'Outerwear', 'Tailoring', 'Footwear', 'Objects'];

  const filteredItems = GALLERY_IMAGES.filter(item => {
    const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleAdd = (item: GalleryItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onAddToCart(item);
    setAddedItemNotification(item.title);
    setTimeout(() => setAddedItemNotification(null), 3000);
  };

  const getCenteringClass = (idx: number, total: number) => {
    let classes = '';
    const rem4 = total % 4;
    const rem3 = total % 3;

    if (rem4 === 2 && idx === total - 2) {
      classes += ' xl:col-start-2';
    } else if (rem4 === 1 && idx === total - 1) {
      classes += ' xl:col-start-2';
    }

    if (rem3 === 1 && idx === total - 1) {
      classes += ' lg:col-start-2';
      if (rem4 !== 1 && rem4 !== 2) {
        classes += ' xl:col-start-auto';
      }
    }

    return classes;
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 selection:bg-white selection:text-black">
      {/* Toast Notification */}
      <AnimatePresence>
        {addedItemNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 z-50 bg-white text-black px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 border border-neutral-200"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs uppercase tracking-widest font-semibold">
              ADDED TO CART: {addedItemNotification}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-4 sm:px-8 lg:px-16 pb-32">
        {/* HOME-FORMATTED HERO SECTION FOR ARCHIVE PAGE */}
        <section className="relative w-full min-h-[75vh] lg:min-h-[82vh] rounded-3xl overflow-hidden mb-16 border border-neutral-800 bg-neutral-950 flex flex-col justify-between p-8 sm:p-14 lg:p-20">
          {/* Background Photography with Hero Vignette Overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=85&w=2000"
              alt="Valence Archival Collection"
              className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105 transition-transform duration-1000 hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black" />
          </div>

          {/* TOP META ROW */}
          <div className="relative z-10 flex flex-wrap justify-between items-center gap-4 border-b border-white/10 pb-6">
            <div className="text-xs uppercase tracking-[0.3em] text-neutral-400 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              VALENCE ® ARCHIVAL INDEX / DROP 04
            </div>
            <div className="text-xs font-mono tracking-widest text-neutral-400">
              EST. TOKYO 2026 — BISHU WOOL & TITANIUM
            </div>
          </div>

          {/* MAIN HERO CONTENT ROW */}
          <div className="relative z-10 my-auto py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="text-xs uppercase tracking-[0.35em] text-neutral-300 mb-3 font-mono">
                  [ COLLECTION INVENTORY 04 ]
                </div>
                <h1 className="text-5xl sm:text-7xl lg:text-9xl font-semibold tracking-tight uppercase leading-[0.9] text-white">
                  ARCHIVE <span className="font-light italic text-neutral-400">CATALOG</span>
                </h1>
                <p className="mt-6 text-sm sm:text-base text-neutral-300 font-light max-w-2xl leading-relaxed">
                  Algorithmic zero-waste garments engineered with 480GSM double-faced Japanese wool, CNC-milled Grade 5 aerospace titanium hardware, and encrypted NFC provenance tags.
                </p>
              </motion.div>
            </div>

            {/* RIGHT SIDE: SIGNATURE ANIMATED HERO CIRCLE BADGE (Home Page Hero Style) */}
            <div className="lg:col-span-4 flex lg:justify-end items-center">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
                {/* Outer Rotating Dashed Ring */}
                <svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 w-full h-full animate-[spin_12s_linear_infinite]"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="46"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeDasharray="6 6"
                    fill="none"
                    opacity="0.8"
                  />
                </svg>
                {/* Inner Ring & Glyph */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-white/30 backdrop-blur-md flex flex-col items-center justify-center bg-black/40">
                  <span className="text-2xl text-white font-mono">❖</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-300 mt-1 font-mono">
                    DROP 04
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM HERO STATS BAR */}
          <div className="relative z-10 pt-6 border-t border-white/10 flex flex-wrap justify-between items-center gap-6">
            <div className="flex items-center gap-8 font-mono text-xs text-neutral-400">
              <div>
                <span className="text-neutral-500 block text-[10px]">REMAINING PIECES</span>
                <span className="text-white font-semibold">24 / 50 ALLOCATED</span>
              </div>
              <div className="hidden sm:block border-l border-neutral-800 h-8" />
              <div className="hidden sm:block">
                <span className="text-neutral-500 block text-[10px]">DROP COUNTDOWN</span>
                <span className="text-white font-semibold">
                  {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
            </div>

            <a
              href="#archive-catalog-grid"
              className="px-8 py-3.5 bg-white text-black text-xs uppercase tracking-[0.2em] font-semibold rounded-full hover:bg-black hover:text-white border border-white transition-all shadow-md"
            >
              EXPLORE CATALOG ↓
            </a>
          </div>
        </section>

        {/* SEARCH & CATEGORY FILTER BAR */}
        <section id="archive-catalog-grid" className="max-w-[1400px] mx-auto mb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-neutral-800">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-widest transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-white text-black font-semibold hover:bg-black hover:text-white border border-white'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                  }`}
                >
                  {cat} {cat === 'ALL' ? `(${GALLERY_IMAGES.length})` : ''}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search archive pieces..."
                className="w-full bg-neutral-900 border border-neutral-800 rounded-full px-5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
              />
            </div>
          </div>
        </section>

        {/* SECTION 2: EDITORIAL LOOKBOOK GRID */}
        <section className="max-w-[1400px] mx-auto mb-28">
          <div className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-6">
            SECTION 02 / PIECES GRID — {filteredItems.length} RESULT{filteredItems.length === 1 ? '' : 'S'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -6 }}
                className={`group bg-neutral-950 border border-neutral-850 rounded-xl overflow-hidden flex flex-col justify-between ${getCenteringClass(idx, filteredItems.length)}`}
              >
                <div
                  className="relative aspect-[2/3] overflow-hidden cursor-pointer bg-neutral-900"
                  onClick={() => setSelectedItem(item)}
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-neutral-300 border border-white/10">
                    {item.category}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-black px-3 py-1.5 rounded-full text-xs font-semibold tracking-tight">
                    {item.price}
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-lg font-medium uppercase tracking-tight text-white mb-2 group-hover:text-neutral-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-neutral-900">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="flex-1 py-2.5 bg-neutral-900 border border-neutral-800 text-white text-[11px] uppercase tracking-widest rounded-lg hover:border-neutral-500 transition-colors cursor-pointer"
                    >
                      DETAILS
                    </button>
                    <button
                      onClick={(e) => handleAdd(item, e)}
                      className="flex-1 py-2.5 bg-white text-black text-[11px] uppercase tracking-widest font-semibold rounded-lg hover:bg-black hover:text-white border border-white transition-all cursor-pointer"
                    >
                      ADD +
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SECTION 3: DROP 04 PRE-ORDER & COUNTDOWN */}
        <section className="max-w-[1400px] mx-auto mb-28">
          <div className="p-6 sm:p-12 lg:p-16 rounded-3xl bg-neutral-950 border border-neutral-800 relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  SECTION 03 / UPCOMING ALLOCATION
                </div>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-medium uppercase tracking-tight leading-[0.95] mb-6">
                  DROP 04: <br />
                  <span className="text-neutral-500">MONOLITH V2</span>
                </h2>
                <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed mb-8 max-w-lg">
                  Strictly limited to 50 numbered allocations worldwide. Crafted from bonded 480GSM Japanese virgin wool with titanium quick-release harnesses.
                </p>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-xs uppercase tracking-widest text-neutral-300">
                  <span>ALLOCATED: 24 / 50 PIECES</span>
                </div>
              </div>

              {/* Countdown Box */}
              <div className="bg-neutral-900/80 p-5 sm:p-8 rounded-2xl border border-neutral-800 text-center">
                <div className="text-xs uppercase tracking-widest text-neutral-400 mb-6 font-mono">
                  ALLOCATION WINDOW CLOSES IN
                </div>

                <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mb-6 sm:mb-8">
                  <div className="bg-black py-4 px-2 sm:px-4 rounded-xl border border-neutral-800 flex flex-col items-center justify-center">
                    <div className="text-2xl sm:text-4xl lg:text-5xl font-mono font-medium text-white leading-none mb-2">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-neutral-500 leading-none">HOURS</div>
                  </div>

                  <div className="bg-black py-4 px-2 sm:px-4 rounded-xl border border-neutral-800 flex flex-col items-center justify-center">
                    <div className="text-2xl sm:text-4xl lg:text-5xl font-mono font-medium text-white leading-none mb-2">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-neutral-500 leading-none">MINUTES</div>
                  </div>

                  <div className="bg-black py-4 px-2 sm:px-4 rounded-xl border border-neutral-800 flex flex-col items-center justify-center">
                    <div className="text-2xl sm:text-4xl lg:text-5xl font-mono font-medium text-white leading-none mb-2">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-neutral-500 leading-none">SECONDS</div>
                  </div>
                </div>

                <button
                  onClick={() => alert("Pre-order slot request submitted to Tokyo atelier.")}
                  className="w-full py-4 bg-white text-black text-xs uppercase tracking-[0.2em] font-semibold rounded-xl hover:bg-black hover:text-white border border-white transition-all cursor-pointer shadow-lg"
                >
                  REQUEST PRE-ORDER ALLOCATION →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: PRIVATE COLLECTOR GUILD */}
        <section className="max-w-[1400px] mx-auto">
          <div className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
            SECTION 04 / PRIVATE COLLECTOR GUILD
          </div>
          <div className="p-10 sm:p-16 rounded-3xl bg-neutral-950 border border-neutral-800 text-white flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-5xl font-medium uppercase tracking-tight mb-4 leading-none text-white">
                JOIN THE VALENCE COLLECTOR GUILD
              </h2>
              <p className="text-neutral-400 text-sm font-light leading-relaxed">
                Receive encrypted drop passwords 24 hours prior to public release, private showroom invitations, and physical lookbook catalog mailings.
              </p>
            </div>

            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="collector@domain.com"
                className="px-6 py-4 rounded-xl bg-neutral-900 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white min-w-[280px]"
              />
              <button
                onClick={() => alert("Thank you for joining the VALENCE Collector Guild.")}
                className="px-8 py-4 bg-white text-black text-xs uppercase tracking-widest font-semibold rounded-xl hover:bg-black hover:text-white border border-white transition-all cursor-pointer whitespace-nowrap shadow-lg"
              >
                REQUEST ACCESS →
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* QUICK VIEW MODAL */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-neutral-950 border border-neutral-800 rounded-3xl max-w-4xl w-full overflow-hidden grid grid-cols-1 md:grid-cols-2 relative shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center border border-white/20 hover:bg-white hover:text-black transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="aspect-[2/3] bg-neutral-900">
                <img
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <span className="text-xs uppercase tracking-widest text-neutral-400">
                    {selectedItem.category} — ARCHIVE SPEC
                  </span>
                  <h2 className="text-3xl font-medium uppercase tracking-tight text-white mt-2 mb-4">
                    {selectedItem.title}
                  </h2>
                  <div className="text-2xl font-mono text-white mb-6">
                    {selectedItem.price}
                  </div>
                  <p className="text-sm text-neutral-300 font-light leading-relaxed mb-8">
                    {selectedItem.description}
                  </p>

                  <div className="space-y-3 text-xs font-mono text-neutral-400 border-t border-neutral-900 pt-6">
                    <div className="flex justify-between">
                      <span>COMPOSITION:</span>
                      <span className="text-white">100% VIRGIN WOOL / TITANIUM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ORIGIN:</span>
                      <span className="text-white">BISHU, JAPAN</span>
                    </div>
                    <div className="flex justify-between">
                      <span>AUTHENTICATION:</span>
                      <span className="text-white">ENCRYPTED NFC TAG</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    onClick={() => {
                      onAddToCart(selectedItem);
                      setSelectedItem(null);
                      setAddedItemNotification(selectedItem.title);
                      setTimeout(() => setAddedItemNotification(null), 3000);
                    }}
                    className="w-full py-4 bg-white text-black text-xs uppercase tracking-[0.2em] font-semibold rounded-xl hover:bg-black hover:text-white border border-white transition-all cursor-pointer shadow-lg"
                  >
                    ADD TO ARCHIVE CART ({selectedItem.price}) →
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Footer */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
};
