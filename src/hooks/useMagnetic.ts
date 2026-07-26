import { useRef, useEffect } from "react";

export function useMagnetic(strength: number = 0.2) {
  const ref = useRef<HTMLDivElement | HTMLButtonElement | HTMLAnchorElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isHovering = false;
    let ticking = false;
    let targetX = 0;
    let targetY = 0;

    const handleMouseEnter = () => {
      isHovering = true;
    };

    const updateTransform = () => {
      if (el) {
        el.style.transform = `translate3d(${targetX}px, ${targetY}px, 0px)`;
      }
      ticking = false;
    };

    const handleMouseMove = (evt: Event) => {
      if (!isHovering) return;
      const e = evt as MouseEvent;
      const { left, top, width, height } = el.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const rawX = (e.clientX - centerX) * strength;
      const rawY = (e.clientY - centerY) * strength;

      // Clamp max magnetic pull to ±6px to guarantee buttons NEVER overlap!
      targetX = Math.min(Math.max(rawX, -6), 6);
      targetY = Math.min(Math.max(rawY, -6), 6);

      if (!ticking) {
        window.requestAnimationFrame(updateTransform);
        ticking = true;
      }
    };

    const handleMouseLeave = () => {
      isHovering = false;
      targetX = 0;
      targetY = 0;
      if (el) {
        el.style.transform = "translate3d(0px, 0px, 0px)";
      }
    };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return { ref, position: { x: 0, y: 0 } };
}
