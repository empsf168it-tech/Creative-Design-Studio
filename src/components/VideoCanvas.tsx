import React, { useEffect, useRef, useState } from 'react';
import { VIDEO_URLS } from '../types';

export const VideoCanvas: React.FC = () => {
  const leftVideoRef = useRef<HTMLVideoElement>(null);
  const rightVideoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [leftLoaded, setLeftLoaded] = useState(false);
  const [rightLoaded, setRightLoaded] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const activeSideRef = useRef<'left' | 'right'>('right');
  const mouseXRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Touch detection
    const checkTouch = () => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // Desktop Mouse Scrubbing Logic
  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX;
    };

    const scrubLoop = () => {
      const leftVid = leftVideoRef.current;
      const rightVid = rightVideoRef.current;
      const mouseX = mouseXRef.current;

      if (leftVid && rightVid && mouseX !== null) {
        const width = window.innerWidth;
        const centerX = width / 2;
        const dz = Math.max(50, width * 0.05);

        const leftBound = centerX - dz;
        const rightBound = centerX + dz;

        if (mouseX >= leftBound && mouseX <= rightBound) {
          if (activeSideRef.current === 'right') {
            rightVid.style.display = 'block';
            leftVid.style.display = 'none';
            if (!rightVid.seeking && rightVid.currentTime !== 0) {
              rightVid.currentTime = 0;
            }
          } else {
            leftVid.style.display = 'block';
            rightVid.style.display = 'none';
            if (!leftVid.seeking && leftVid.currentTime !== 0) {
              leftVid.currentTime = 0;
            }
          }
        } else if (mouseX < leftBound) {
          activeSideRef.current = 'right';
          rightVid.style.display = 'block';
          leftVid.style.display = 'none';

          const dist = leftBound - mouseX;
          const range = leftBound;
          const progress = Math.min(1, Math.max(0, dist / range));

          if (rightVid.duration && !rightVid.seeking) {
            const targetTime = progress * rightVid.duration;
            if (Math.abs(rightVid.currentTime - targetTime) > 0.03) {
              rightVid.currentTime = targetTime;
            }
          }
        } else if (mouseX > rightBound) {
          activeSideRef.current = 'left';
          leftVid.style.display = 'block';
          rightVid.style.display = 'none';

          const dist = mouseX - rightBound;
          const range = width - rightBound;
          const progress = Math.min(1, Math.max(0, dist / range));

          if (leftVid.duration && !leftVid.seeking) {
            const targetTime = progress * leftVid.duration;
            if (Math.abs(leftVid.currentTime - targetTime) > 0.03) {
              leftVid.currentTime = targetTime;
            }
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(scrubLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafIdRef.current = requestAnimationFrame(scrubLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isTouch]);

  // Mobile / Touch Auto-Play Logic
  useEffect(() => {
    if (!isTouch) return;

    const leftVid = leftVideoRef.current;
    const rightVid = rightVideoRef.current;
    if (!leftVid || !rightVid) return;

    leftVid.style.display = 'block';
    rightVid.style.display = 'none';
    leftVid.play().catch(() => {});

    const onLeftEnded = () => {
      leftVid.style.display = 'none';
      rightVid.style.display = 'block';
      rightVid.currentTime = 0;
      rightVid.play().catch(() => {});
    };

    const onRightEnded = () => {
      rightVid.style.display = 'none';
      leftVid.style.display = 'block';
      leftVid.currentTime = 0;
      leftVid.play().catch(() => {});
    };

    leftVid.addEventListener('ended', onLeftEnded);
    rightVid.addEventListener('ended', onRightEnded);

    return () => {
      leftVid.removeEventListener('ended', onLeftEnded);
      rightVid.removeEventListener('ended', onRightEnded);
    };
  }, [isTouch, leftLoaded, rightLoaded]);

  const bothLoaded = leftLoaded && rightLoaded;

  return (
    <div
      id="main-canvas"
      ref={containerRef}
      className="fixed pointer-events-none z-0 overflow-hidden transition-opacity duration-300 inset-0 w-full h-full"
      style={{ opacity: bothLoaded ? 1 : 0 }}
    >
      <video
        ref={leftVideoRef}
        src={VIDEO_URLS.left}
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setLeftLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ display: 'none' }}
      />
      <video
        ref={rightVideoRef}
        src={VIDEO_URLS.right}
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setRightLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ display: 'block' }}
      />

      {/* Localized Cap Text Masking Layer — Obscures cap text naturally while maintaining 100% video scrubbing & animations */}
      <div
        className="absolute pointer-events-none z-10 rounded-full select-none"
        style={{
          top: '36%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '200px',
          height: '70px',
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.75) 45%, rgba(0,0,0,0) 80%)',
          filter: 'blur(6px)',
        }}
      />
    </div>
  );
};
