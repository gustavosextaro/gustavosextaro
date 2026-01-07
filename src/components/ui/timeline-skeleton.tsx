"use client";

export function TimelineSkeleton() {
  return (
    <div className="h-[500px] w-full flex items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Central pulse */}
        <div className="absolute w-32 h-32 rounded-full bg-muted/20 animate-pulse" />
        
        {/* Orbital circles */}
        {[0, 1, 2, 3, 4].map((index) => {
          const angle = (index * 360) / 5;
          const radius = 120;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;
          
          return (
            <div
              key={index}
              className="absolute w-16 h-16 rounded-full bg-muted/30 animate-pulse"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
                animationDelay: `${index * 0.2}s`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
