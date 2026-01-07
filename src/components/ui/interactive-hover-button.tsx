"use client"

import React from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-48 cursor-pointer overflow-hidden rounded-full border border-border bg-transparent p-3 text-center font-semibold text-foreground transition-colors hover:text-primary-foreground",
        className,
      )}
      {...props}
    >
      <div className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
        <span>{text}</span>
        <div className="opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <ArrowRight />
        </div>
      </div>
      <div className="absolute inset-0 z-0 h-full w-full transform bg-primary transition-transform duration-300 group-hover:translate-y-0 translate-y-full"></div>
    </button>
  );
});


InteractiveHoverButton.displayName = "InteractiveHoverButton"

export { InteractiveHoverButton }
