import React, { useEffect, useRef, useState } from 'react';
import { GALLERY_IMAGES, GalleryItem, PageRoute } from '../types';
import { Footer } from './Footer';

// Dense grid layout with centered items for trailing rows
export function buildLayout(count: number, cols: number): number[][] {
  const rows: number[][] = [];
  let imgIdx = 0;

  while (imgIdx < count) {
    const rowItems: number[] = [];
    for (let c = 0; c < cols && imgIdx < count; c++) {
      rowItems.push(imgIdx++);
    }

    // Center items if the row is incomplete
    const emptyCount = cols - rowItems.length;
    const leftPad = Math.floor(emptyCount / 2);
    const rightPad = emptyCount - leftPad;

    const row: number[] = [
      ...Array(leftPad).fill(-1),
      ...rowItems,
      ...Array(rightPad).fill(-1)
    ];

    rows.push(row);
  }

  return rows;
}

interface BlackPanelProps {
  scrollY: number;
  onWrapperHeightChange?: (height: number) => void;
  onNavigate?: (route: PageRoute) => void;
}

export const BlackPanel: React.FC<BlackPanelProps> = ({
  scrollY,
  onWrapperHeightChange,
  onNavigate
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const innerWrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [cols, setCols] = useState(4);
  const [layout, setLayout] = useState<number[][]>([]);
  const [selectedShowroom, setSelectedShowroom] = useState('TOKYO GINZA');

  // Update cols based on window width
  useEffect(() => {
    const updateCols = () => {
      const w = window.innerWidth;
      let newCols = 4;
      if (w < 640) {
        newCols = 2;
      } else if (w < 1024) {
        newCols = 3;
      }
      setCols(newCols);
      setLayout(buildLayout(GALLERY_IMAGES.length, newCols));
    };

    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  // Report scroll height of inner wrapper to parent for spacer calculation
  useEffect(() => {
    if (innerWrapperRef.current) {
      const height = innerWrapperRef.current.scrollHeight;
      if (onWrapperHeightChange) {
        onWrapperHeightChange(height);
      }
    }
  }, [layout, cols, onWrapperHeightChange]);

  // Per-frame scale & position updates based on scrollY
  useEffect(() => {
    const vh = window.innerHeight;

    // 1. Position panel container
    if (panelRef.current) {
      if (scrollY <= vh) {
        const panelTranslateY = vh - scrollY;
        panelRef.current.style.transform = `translateY(${panelTranslateY}px)`;
      } else {
        panelRef.current.style.transform = `translateY(0px)`;
      }
    }

    // 2. Position inner wrapper
    if (innerWrapperRef.current) {
      if (scrollY > vh) {
        const wrapperTranslateY = -(scrollY - vh);
        innerWrapperRef.current.style.transform = `translateY(${wrapperTranslateY}px)`;
      } else {
        innerWrapperRef.current.style.transform = `translateY(0px)`;
      }
    }

    // 3. Card scale calculations
    const paddingTop = Math.min(160, vh * 0.15);
    const wrapperScreenTop = vh - scrollY + paddingTop;

    cardsRef.current.forEach((cardEl) => {
      if (!cardEl) return;

      const cardRect = cardEl.getBoundingClientRect();
      const cardHeight = cardRect.height;
      
      const cardOffsetTop = cardEl.offsetTop;
      const top = wrapperScreenTop + cardOffsetTop;
      const bottom = top + cardHeight;

      if (bottom <= 0 || top >= vh) {
        cardEl.style.transform = 'scale(0.85)';
        cardEl.style.opacity = '0';
      } else {
        const enter = Math.min(1, (vh - top) / (vh * 0.4));
        const exit = Math.min(1, bottom / (vh * 0.3));
        const opacity = Math.max(0, Math.min(enter, exit));
        cardEl.style.transform = `scale(1)`;
        cardEl.style.opacity = `${opacity}`;
      }
    });
  }, [scrollY, layout]);

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 bg-black z-10 overflow-hidden"
      style={{ transform: 'translateY(100vh)' }}
    >
      <div
        ref={innerWrapperRef}
        className="w-full px-4 sm:px-8 lg:px-12"
        style={{ paddingTop: 'min(140px, 15vh)' }}
      >
        {/* SECTION HEADER */}
        <div className="max-w-[1600px] mx-auto mb-10 border-b border-neutral-800 pb-6 flex justify-between items-end">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-2">
              VALENCE ARCHIVE GALLERY
            </div>
            <h2 className="text-3xl sm:text-4xl font-medium uppercase tracking-tight text-white">
              CURATED COLLECTION LOOKBOOK
            </h2>
          </div>
          {onNavigate && (
            <button
              onClick={() => onNavigate('archive')}
              className="px-5 py-2.5 rounded-full bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-black hover:text-white border border-white transition-all pointer-events-auto cursor-pointer shadow-md"
            >
              FULL CATALOG →
            </button>
          )}
        </div>

        {/* DENSE LUXURY GALLERY GRID — NO EMPTY GAPS */}
        <div
          className="grid gap-6 sm:gap-8 lg:gap-10 max-w-[1600px] mx-auto mb-28"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`
          }}
        >
          {layout.flatMap((row, rIdx) =>
            row.map((imgIdx, cIdx) => {
              const key = `cell-${rIdx}-${cIdx}`;

              if (imgIdx === -1) {
                return (
                  <div
                    key={key}
                    className="aspect-[2/3] w-full pointer-events-none opacity-0"
                  />
                );
              }

              const img = GALLERY_IMAGES[imgIdx];
              return (
                <div
                  key={key}
                  ref={(el) => {
                    cardsRef.current[imgIdx] = el;
                  }}
                  className="bp-card group relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-neutral-900 border border-neutral-800/80 hover:border-neutral-500 transition-all duration-500"
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <span className="text-xs uppercase tracking-widest text-neutral-400 font-mono">{img.category}</span>
                    <h3 className="text-lg font-medium uppercase tracking-tight text-white mt-1">{img.title}</h3>
                    <span className="text-sm font-semibold text-white mt-1">{img.price}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* ========================================================================= */}
        {/* 3 HIGH-LEVEL HOME SECTIONS (INTEGRATED INTO SCROLL FLOW) */}
        {/* ========================================================================= */}

        {/* HOME SECTION 1: PROTOTYPE SPOTLIGHT */}
        <section className="max-w-[1400px] mx-auto mb-32 border-t border-neutral-850 pt-20">
          <div className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            HOME SECTION 01 / PROTOTYPE HIGHLIGHTS
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl sm:text-5xl font-medium uppercase tracking-tight text-white">
                CURATED ARCHIVE SPOTLIGHT
              </h2>
              <p className="text-neutral-400 text-sm font-light mt-2 max-w-xl">
                Three core architectural silhouettes engineered from Japanese wool and raw titanium hardware.
              </p>
            </div>
            {onNavigate && (
              <button
                onClick={() => onNavigate('archive')}
                className="px-6 py-3 rounded-full bg-white text-black text-xs uppercase tracking-widest font-semibold hover:bg-black hover:text-white border border-white transition-all cursor-pointer pointer-events-auto shadow-md"
              >
                VIEW FULL ARCHIVE CATALOG →
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8">
            <div className="flex flex-col justify-between p-5 sm:p-6 lg:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-600 transition-all">
              <div>
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">SPOTLIGHT 01</span>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-medium uppercase tracking-tight text-white mt-2 mb-2 break-words">
                  STRUCTURED TRENCH
                </h3>
                <p className="text-xs font-mono text-neutral-400 mb-4 leading-snug break-words">$1,450 — 480GSM BONDED WOOL</p>
                <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">
                  Asymmetrical storm flap with raw aerospace titanium buckles and zero-waste pattern drafting.
                </p>
              </div>
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-neutral-900 mt-auto">
                <img src={GALLERY_IMAGES[1].url} alt="Structured Trench" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="flex flex-col justify-between p-5 sm:p-6 lg:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-600 transition-all">
              <div>
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">SPOTLIGHT 02</span>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-medium uppercase tracking-tight text-white mt-2 mb-2 break-words">
                  DECONSTRUCTED BLAZER
                </h3>
                <p className="text-xs font-mono text-neutral-400 mb-4 leading-snug break-words">$1,280 — DOUBLE-FACED VIRGIN WOOL</p>
                <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">
                  Exposed seam construction with concealed magnet lapel closures and internal harness straps.
                </p>
              </div>
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-neutral-900 mt-auto">
                <img src={GALLERY_IMAGES[2].url} alt="Deconstructed Blazer" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="flex flex-col justify-between p-5 sm:p-6 lg:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-neutral-600 transition-all">
              <div>
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">SPOTLIGHT 03</span>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-medium uppercase tracking-tight text-white mt-2 mb-2 break-words">
                  MONOLITH BOOT 04
                </h3>
                <p className="text-xs font-mono text-neutral-400 mb-4 leading-snug break-words">$950 — TUSCAN CALFSKIN</p>
                <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">
                  Hand-finished full-grain leather combat boot with custom sculpted Vibram tread sole.
                </p>
              </div>
              <div className="aspect-[3/4] rounded-xl overflow-hidden bg-neutral-900 mt-auto">
                <img src={GALLERY_IMAGES[3].url} alt="Monolith Boot 04" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* HOME SECTION 2: MATERIAL INNOVATION MATRIX */}
        <section className="max-w-[1400px] mx-auto mb-20 border-t border-neutral-850 pt-20">
          <div className="text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
            HOME SECTION 02 / MATERIAL SPECS
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium uppercase tracking-tight text-white mb-12">
            MATERIALITY & FABRIC ENGINEERING
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <div className="text-2xl text-neutral-300 mb-4 text-center">❖</div>
              <h3 className="text-lg font-medium uppercase text-white mb-2">480GSM BONDED WOOL</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Woven on antique shuttle looms in Bishu, Japan. Double-face bonded for weatherproof structure.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <div className="text-2xl text-neutral-300 mb-4 text-center">⚙</div>
              <h3 className="text-lg font-medium uppercase text-white mb-2">AEROSPACE TITANIUM</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Grade 5 titanium buckles and tags CNC-milled with laser-engraved archive codes.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <div className="text-2xl text-neutral-300 mb-4 text-center">∷</div>
              <h3 className="text-lg font-medium uppercase text-white mb-2">ZERO-WASTE PATTERNS</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Digital algorithmic pattern drafting achieving 99.4% fabric width utilization.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800">
              <div className="text-2xl text-neutral-300 mb-4 text-center">✦</div>
              <h3 className="text-lg font-medium uppercase text-white mb-2">ENCRYPTED NFC LEDGER</h3>
              <p className="text-xs text-neutral-400 font-light leading-relaxed">
                Encrypted NFC tags embedded inside garment linings for lifetime buy-back provenance.
              </p>
            </div>
          </div>
        </section>

        {/* Global Footer */}
        <Footer onNavigate={onNavigate} />
      </div>
    </div>
  );
};
