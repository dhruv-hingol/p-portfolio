import React, { useState, useEffect, useRef } from "react";

interface LazySectionProps {
  children: React.ReactNode;
  minHeight?: string;
  className?: string;
  id?: string;
}

export default function LazySection({
  children,
  minHeight = "400px",
  className = "",
  id,
}: LazySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    // Trigger section DOM mounting 300px before scrolling into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "150px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      id={id}
      className={className}
      style={{ minHeight: shouldRender ? "auto" : minHeight }}
    >
      {shouldRender ? children : null}
    </div>
  );
}
