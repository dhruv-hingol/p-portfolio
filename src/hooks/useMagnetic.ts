import { useRef, useState, useEffect } from "react";

export function useMagnetic(strength: number = 0.2) {
  const ref = useRef<HTMLDivElement | HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isHovering = false;

    const handleMouseEnter = () => {
      isHovering = true;
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
      const clampedX = Math.min(Math.max(rawX, -6), 6);
      const clampedY = Math.min(Math.max(rawY, -6), 6);

      setPosition({ x: clampedX, y: clampedY });
    };

    const handleMouseLeave = () => {
      isHovering = false;
      setPosition({ x: 0, y: 0 });
    };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return { ref, position };
}
