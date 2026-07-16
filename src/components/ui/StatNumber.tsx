"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

interface StatNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export default function StatNumber({ value, prefix = "", suffix = "", decimals, className }: StatNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, value]);

  const dec = decimals ?? (value % 1 !== 0 ? 1 : 0);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec })}
      {suffix}
    </span>
  );
}
