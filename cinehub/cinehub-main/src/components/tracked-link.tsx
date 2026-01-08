'use client';

import { trackClick } from '@/lib/analytics';
import { ShimmerButton } from '@/components/ui/shimmer-button';

interface TrackedLinkProps {
  href: string;
  trackingId: string;
  buttonText: string;
  className?: string;
}

export function TrackedLink({ href, trackingId, buttonText, className }: TrackedLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={buttonText}
      onClick={() => trackClick(trackingId)}
      className="w-full block"
    >
      <ShimmerButton
        background="hsl(var(--secondary))"
        className={className || "w-full h-12 text-base font-semibold text-secondary-foreground"}
      >
        {buttonText}
      </ShimmerButton>
    </a>
  );
}
