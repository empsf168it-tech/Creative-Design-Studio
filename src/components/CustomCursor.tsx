import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGSVGElement>(null);

  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    // Smooth LERP animation loop for butter-smooth rounding cursor follower
    const animLoop = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.18;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${currentPos.current.x}px`;
        cursorRef.current.style.top = `${currentPos.current.y}px`;
      }

      rafRef.current = requestAnimationFrame(animLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(animLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-50 hidden lg:block"
      style={{
        transform: 'translate(-50%, -50%)',
        mixBlendMode: 'exclusion',
        top: '-100px',
        left: '-100px'
      }}
    >
      <svg
        ref={ringRef}
        width="54"
        height="54"
        viewBox="0 0 54 54"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-[spin_12s_linear_infinite]"
      >
        {/* Outer dashed rotating rounding ring */}
        <circle
          cx="27"
          cy="27"
          r="25"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        {/* Inner solid ring */}
        <circle
          cx="27"
          cy="27"
          r="20"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Japanese emblem symbol centered inside rounding ring */}
        <path
          d="M27 15V39M18.5 23H35.5M20.5 31H33.5M16.5 35.5C20.5 32.5 23 29.5 27 26.5C31 29.5 33.5 32.5 37.5 35.5"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
