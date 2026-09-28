import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryItem } from '../types';

interface CartItem extends GalleryItem {
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const subtotal = items.reduce((acc, item) => {
    const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
    return acc + numericPrice * item.quantity;
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-neutral-950 border-l border-neutral-800 text-white p-6 sm:p-8 flex flex-col justify-between shadow-2xl"
          >
            {/* Header */}
            <div>
              <div className="flex justify-between items-center pb-6 border-b border-neutral-800">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium tracking-tight uppercase">ARCHIVE CART</span>
                  <span className="text-xs font-mono bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-full text-neutral-400">
                    {items.reduce((acc, i) => acc + i.quantity, 0)} ITEMS
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full border border-neutral-800 text-neutral-400 hover:text-white hover:border-white transition-colors flex items-center justify-center cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Items List */}
              <div className="mt-6 space-y-6 overflow-y-auto max-h-[55vh] pr-2">
                {items.length === 0 ? (
                  <div className="py-20 text-center text-neutral-500 text-sm font-light uppercase tracking-widest">
                    YOUR CART IS EMPTY
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 rounded-xl bg-neutral-900/60 border border-neutral-850"
                    >
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-20 h-28 object-cover rounded-lg bg-neutral-800"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h4 className="text-xs font-medium uppercase tracking-tight text-white pr-2">
                              {item.title}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-xs text-neutral-500 hover:text-rose-400 cursor-pointer"
                            >
                              ✕
                            </button>
                          </div>
                          <span className="text-xs font-mono text-neutral-400 mt-1 block">
                            {item.price}
                          </span>
                        </div>

                        {/* Quantity Buttons */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded bg-neutral-800 text-xs flex items-center justify-center hover:bg-neutral-700 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="text-xs font-mono">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded bg-neutral-800 text-xs flex items-center justify-center hover:bg-neutral-700 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Footer Summary */}
            <div className="pt-6 border-t border-neutral-800 space-y-4">
              <div className="space-y-2 text-xs font-mono text-neutral-400">
                <div className="flex justify-between">
                  <span>SUBTOTAL:</span>
                  <span className="text-white">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>WORLDWIDE EXPRESS SHIPPING:</span>
                  <span className="text-emerald-400">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between">
                  <span>DUTIES & TAXES:</span>
                  <span className="text-neutral-400">INCLUDED</span>
                </div>
              </div>

              <button
                disabled={items.length === 0}
                onClick={onCheckout}
                className="w-full py-4 bg-white text-black text-xs uppercase tracking-[0.2em] font-semibold rounded-xl hover:bg-black hover:text-white border border-white disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-lg"
              >
                PROCEED TO CHECKOUT (${subtotal.toLocaleString()}) →
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
