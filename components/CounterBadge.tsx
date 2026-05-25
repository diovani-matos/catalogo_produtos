"use client";

import { useEffect, useState } from "react";

export default function CounterBadge() {
  const [count, setCount] = useState(0);
  const target = 1200;
  const duration = 2000;

  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      const currentCount = Math.floor(easeOut(progress) * target);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="hero-badge">
      <strong>+{count.toLocaleString("pt-BR")}</strong>
      <span>peças vendidas</span>
    </div>
  );
}
