"use client";

import React from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  rootMargin?: string;
  threshold?: number;
}

export function LazySection({
  children,
  fallback = null,
  className,
  rootMargin = "200px",
  threshold = 0.1,
}: LazySectionProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({
    rootMargin,
    threshold,
    triggerOnce: true,
  });

  return (
    <div ref={ref} className={cn("w-full", className)}>
      {isInView ? (
        <div className="animate-in fade-in-50 duration-500">{children}</div>
      ) : (
        fallback
      )}
    </div>
  );
}
