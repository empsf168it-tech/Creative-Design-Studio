import React from 'react';

export const WhiteOverlay: React.FC = () => {
  return (
    <div
      id="outro-overlay"
      className="fixed inset-0 pointer-events-none z-12 bg-white"
      style={{ opacity: 0 }}
    />
  );
};
