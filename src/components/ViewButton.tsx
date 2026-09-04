import React from 'react';

export const ViewButton: React.FC = () => {
  return (
    <div
      id="outro-buy"
      className="fixed pointer-events-none z-20 flex items-center justify-center bg-white rounded-[1335px] right-8 bottom-8 w-[330px] h-[174px] max-sm:left-4 max-sm:right-4 max-sm:bottom-[60px] max-sm:w-auto max-sm:h-[100px]"
      style={{
        mixBlendMode: 'exclusion',
        transformOrigin: 'right bottom',
        transform: 'scale(0)'
      }}
    >
      <span
        className="text-[110px] max-sm:text-[72px] text-white tracking-[-0.04em] font-medium leading-none"
        style={{ mixBlendMode: 'exclusion' }}
      >
        view
      </span>
    </div>
  );
};
