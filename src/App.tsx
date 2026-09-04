import React, { useEffect, useState, useRef } from 'react';
import { PageRoute, GalleryItem } from './types';
import { CustomCursor } from './components/CustomCursor';
import { Logo } from './components/Logo';
import { Caption } from './components/Caption';
import { HeaderNav } from './components/HeaderNav';
import { VideoCanvas } from './components/VideoCanvas';
import { BlackPanel } from './components/BlackPanel';

// Pages
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ArchivePage } from './pages/ArchivePage';

// Cart
import { CartDrawer } from './components/CartDrawer';

interface CartItem extends GalleryItem {
  quantity: number;
}

export const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [scrollY, setScrollY] = useState(0);
  const [wrapperHeight, setWrapperHeight] = useState(0);
  const [spacerHeight, setSpacerHeight] = useState('300vh');

  // Cart State
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const rafRef = useRef<number | null>(null);

  // Add to cart helper
  const handleAddToCart = (item: GalleryItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCartItems(prev =>
      prev
        .map(i => {
          if (i.id === id) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const handleCheckout = () => {
    alert("ORDER PROCESSED: Directing to secure Tokyo archive checkout protocol.");
    setCartItems([]);
    setCartOpen(false);
  };

  // Scroll to top when changing route
  const handleNavigate = (route: PageRoute) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Measure and calculate scroll spacer height dynamically for Home page
  useEffect(() => {
    if (currentRoute !== 'home') return;

    const calculateSpacer = () => {
      const vh = window.innerHeight;
      const totalHeight = wrapperHeight > 0 ? wrapperHeight + vh : vh * 3;
      setSpacerHeight(`${totalHeight}px`);
    };

    calculateSpacer();
    window.addEventListener('resize', calculateSpacer);
    return () => window.removeEventListener('resize', calculateSpacer);
  }, [wrapperHeight, currentRoute]);

  // Scroll listener via RequestAnimationFrame for Home page animations
  useEffect(() => {
    if (currentRoute !== 'home') return;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      const vh = window.innerHeight;

      // 1. Hide/show Main Canvas video container when scroll passes vh
      const mainCanvas = document.getElementById('main-canvas');
      if (mainCanvas) {
        if (currentScrollY >= vh) {
          mainCanvas.style.visibility = 'hidden';
        } else {
          mainCanvas.style.visibility = 'visible';
        }
      }

      // 2. Hero Caption Fade-Out on Scroll
      const heroCaption = document.getElementById('hero-caption');
      if (heroCaption) {
        const captionFade = Math.max(0, 1 - currentScrollY / (vh * 0.35));
        heroCaption.style.opacity = captionFade.toString();
      }

      rafRef.current = requestAnimationFrame(updateScroll);
    };

    rafRef.current = requestAnimationFrame(updateScroll);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [currentRoute]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative select-none bg-black text-white min-h-screen">
      {/* Custom Cursor for Desktop */}
      <CustomCursor />

      {/* Global Navigation Header */}
      <HeaderNav
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenCart={() => setCartOpen(true)}
        cartCount={totalCartCount}
      />

      {/* Global Logo */}
      <Logo onNavigate={handleNavigate} />

      {/* CART DRAWER */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* ROUTE 1: HOME PAGE (Full-Screen Scroll-Driven Video & Black Panel Gallery) */}
      {currentRoute === 'home' && (
        <div id="scroll-spacer" className="relative bg-black" style={{ height: spacerHeight }}>
          <VideoCanvas />
          <BlackPanel
            scrollY={scrollY}
            onWrapperHeightChange={(height) => setWrapperHeight(height)}
            onNavigate={handleNavigate}
          />
          <Caption />
        </div>
      )}

      {/* ROUTE 2: ABOUT PAGE */}
      {currentRoute === 'about' && (
        <AboutPage onNavigate={handleNavigate} />
      )}

      {/* ROUTE 3: CONTACT PAGE */}
      {currentRoute === 'contact' && (
        <ContactPage onNavigate={handleNavigate} />
      )}

      {/* ROUTE 4: ARCHIVE CATALOG PAGE */}
      {currentRoute === 'archive' && (
        <ArchivePage onAddToCart={handleAddToCart} onNavigate={handleNavigate} />
      )}
    </div>
  );
};

export default App;
