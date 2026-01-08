"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Film } from "lucide-react";

interface TestimonialCardProps {
  className?: string;
  username?: string;
  handle?: string;
  content?: string;
  date?: string;
  onHover?: () => void;
  onLeave?: () => void;
  isActive?: boolean;
  onTap?: () => void;
}

function TestimonialCard({
  className,
  username = "Movie Title",
  handle = "Genre",
  content = "Movie description goes here. It's a fantastic film that you should definitely watch.",
  date,
  onHover,
  onLeave,
  isActive,
  onTap,
}: TestimonialCardProps) {
  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
      if (!isActive) {
        e.preventDefault();
        onTap?.();
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={cn(
        "relative flex h-auto min-h-[140px] sm:min-h-[180px] w-[260px] sm:w-[380px] -skew-y-[8deg] select-none flex-col rounded-2xl border border-border bg-card/90 backdrop-blur-sm px-4 sm:px-5 py-3 sm:py-4 transition-all duration-500",
        "dark:after:absolute dark:after:-right-1 dark:after:top-[-5%] dark:after:h-[110%] dark:after:w-[20rem] dark:after:bg-gradient-to-l dark:after:from-background dark:after:to-transparent dark:after:content-[''] dark:after:pointer-events-none",
        isActive && "ring-2 ring-primary/50",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-bold text-foreground truncate text-sm sm:text-lg">{username}</span>
          </div>
          <span className="text-muted-foreground text-xs sm:text-sm">{handle}</span>
        </div>
        <Film className="size-5 sm:size-6 text-foreground/70 shrink-0" />
      </div>

      {/* Content */}
      <p className="text-foreground text-sm sm:text-base leading-relaxed mb-2 sm:mb-3 line-clamp-3 sm:line-clamp-4">
        {content}
      </p>

      {/* Footer */}
      {date && (
        <div className="flex items-center justify-between text-muted-foreground text-xs sm:text-sm mt-auto">
          <span>{date}</span>
        </div>
      )}
    </div>
  );
}

interface TestimonialsProps {
  cards?: TestimonialCardProps[];
}

function Testimonials({ cards }: TestimonialsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const getCardClassName = (index: number, baseClassName: string) => {
    const focusedIndex = hoveredIndex ?? activeIndex;
    
    if (focusedIndex === 0 && index === 1) {
      return baseClassName + " !translate-y-20 sm:!translate-y-32 !translate-x-14 sm:!translate-x-24";
    }
    if (focusedIndex === 0 && index === 2) {
      return baseClassName + " !translate-y-28 sm:!translate-y-44 !translate-x-24 sm:!translate-x-40";
    }
    if (focusedIndex === 1 && index === 2) {
      return baseClassName + " !translate-y-24 sm:!translate-y-40 !translate-x-24 sm:!translate-x-40";
    }
    return baseClassName;
  };

  const handleTap = (index: number) => {
    if (activeIndex === index) {
      return;
    }
    setActiveIndex(index);
  };

  const defaultCards: TestimonialCardProps[] = [
    {
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-2xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/60 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-500 hover:grayscale-0 before:left-0 before:top-0",
      username: "The Outrun",
      handle: "Drama",
      content: "Após uma passagem pela reabilitação, uma jovem retorna à fazenda de ovelhas onde cresceu, nas Ilhas Orkney, na Escócia, e tenta lidar com seu passado.",
    },
    {
      className:
        "[grid-area:stack] translate-x-8 sm:translate-x-16 translate-y-6 sm:translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-2xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/60 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-500 hover:grayscale-0 before:left-0 before:top-0",
      username: "White Bird in a Blizzard",
      handle: "Drama",
      content: "Em 1988, a vida de uma adolescente é lançada no caos quando sua mãe desaparece.",
    },
    {
      className: "[grid-area:stack] translate-x-16 sm:translate-x-32 translate-y-12 sm:translate-y-20 hover:translate-y-6 sm:hover:translate-y-10",
      username: "Neurotic Quest for Serenity",
      handle: "Comédia",
      content: "Um grupo de pacientes com transtorno obsessivo-compulsivo espera pela chegada de seu terapeuta para suas consultas e precisa suportar os hábitos estranhos uns dos outros.",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <TestimonialCard
          key={index}
          {...cardProps}
          className={getCardClassName(index, cardProps.className || "")}
          onHover={() => setHoveredIndex(index)}
          onLeave={() => setHoveredIndex(null)}
          isActive={activeIndex === index}
          onTap={() => handleTap(index)}
        />
      ))}
    </div>
  );
}

// Demo component for 21st.dev
function Component() {
  return (
    <div className="flex min-h-[500px] w-full items-center justify-center bg-background p-8">
      <Testimonials />
    </div>
  );
}

export { TestimonialCard, Testimonials, Component };
export type { TestimonialCardProps, TestimonialsProps };