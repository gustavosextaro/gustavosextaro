"use client";

export function ContainerSkeleton() {
  return (
    <div className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20">
      <div className="py-10 md:py-40 w-full relative flex flex-col items-center gap-8">
        {/* Title skeleton */}
        <div className="h-12 w-64 bg-muted/30 rounded-lg animate-pulse" />
        
        {/* Card skeleton */}
        <div className="max-w-5xl w-full h-[30rem] md:h-[40rem] border-4 border-muted/20 rounded-[30px] bg-muted/10 relative overflow-hidden">
          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          {/* Content placeholders */}
          <div className="p-8 md:p-12 flex flex-col gap-6">
            <div className="h-8 w-3/4 bg-muted/20 rounded animate-pulse" />
            <div className="h-4 w-full bg-muted/20 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-muted/20 rounded animate-pulse" />
            <div className="h-px bg-muted/20 my-4" />
            <div className="h-8 w-2/3 bg-muted/20 rounded animate-pulse" />
            <div className="h-4 w-full bg-muted/20 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
