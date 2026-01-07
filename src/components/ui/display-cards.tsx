"use client";

import { cn } from "@/lib/utils";
import { BrainCircuit, LayoutGrid, Mic, Target } from "lucide-react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <BrainCircuit className="size-4 text-accent" />,
  title = "Featured",
  description = "Discover amazing content",
  date,
  iconClassName = "text-accent",
  titleClassName = "text-accent",
}: DisplayCardProps) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[22rem] select-none flex-col justify-between rounded-xl border-2 border-transparent bg-surface/80 p-4 backdrop-blur-sm transition-all duration-500 hover:border-accent/50 hover:bg-surface",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <span className={cn("relative inline-block rounded-full bg-accent/20 p-2", iconClassName)}>
          {icon}
        </span>
        <p className={cn("text-lg font-semibold", titleClassName)}>{title}</p>
      </div>
      <p className="text-base text-text-muted">{description}</p>
      {date && <p className="text-sm text-muted-foreground">{date}</p>}
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const defaultCards: DisplayCardProps[] = [
    {
      title: "Expert de IA",
      description: "Agentes, automações e workflows aplicados.",
      icon: <BrainCircuit className="size-5 text-accent" />,
      className:
        "[grid-area:stack] transition-all duration-300 hover:-translate-y-10",
    },
    {
      title: "Criador de SaaS",
      description: "MVP, onboarding e produto de ponta a ponta.",
      icon: <LayoutGrid className="size-5 text-accent" />,
      className:
        "[grid-area:stack] transition-all duration-300 translate-x-12 translate-y-10 hover:-translate-y-1",
    },
    {
      title: "Comunicação",
      description: "Roteiros, posts e narrativa pra vender.",
      icon: <Mic className="size-5 text-accent" />,
      className:
        "[grid-area:stack] transition-all duration-300 translate-x-24 translate-y-20 hover:translate-y-10",
    },
     {
      title: "Posicionamento",
      description: "Oferta clara, diferenciação e consistência.",
      icon: <Target className="size-5 text-accent" />,
      className:
        "[grid-area:stack] transition-all duration-300 translate-x-36 translate-y-32 hover:translate-y-20",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid h-72 [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
