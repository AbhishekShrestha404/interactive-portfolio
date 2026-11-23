import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dot = dotRef.current;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    let frame = 0;
    let hasPosition = false;

    const animate = () => {
      x += (targetX - x) * 0.22;
      y += (targetY - y) * 0.22;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.1) {
        frame = requestAnimationFrame(animate);
      } else {
        frame = 0;
      }
    };

    const move = (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (!hasPosition) {
        x = targetX;
        y = targetY;
        dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        hasPosition = true;
      }
      dot.style.opacity = '1';
      if (!frame) frame = requestAnimationFrame(animate);
    };

    const hide = () => { dot.style.opacity = '0'; };
    const leaveWindow = (event) => { if (!event.relatedTarget) hide(); };

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerout', leaveWindow);
    window.addEventListener('blur', hide);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerout', leaveWindow);
      window.removeEventListener('blur', hide);
    };
  }, []);

  return <span className="cursor-dot" ref={dotRef} aria-hidden="true" />;
}
