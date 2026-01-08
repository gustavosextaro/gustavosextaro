'use client';

import { Instagram, MessageCircle } from 'lucide-react';
import { config } from '@/lib/config';
import { buildUrlWithUtm } from '@/lib/utils';
import { trackClick } from '@/lib/analytics';

export function AppFooter() {
  const instagramUrl = buildUrlWithUtm(config.socials.instagram, { source: 'cinemahub', medium: 'bio', campaign: 'footer' });
  const contactUrl = config.links.contact;

  return (
    <footer className="w-full mt-8 border-t border-border/50 pt-8 flex flex-col items-center gap-4 text-center animate-fade-in-up" style={{ animationDelay: '400ms' }}>
      <div className="flex items-center gap-6">
        <a 
          href={instagramUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Instagram" 
          onClick={() => trackClick('footer-instagram')}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Instagram className="h-6 w-6" />
        </a>
        <a 
          href={contactUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Contato" 
          onClick={() => trackClick('footer-contato')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="text-sm">Contato</span>
        </a>
      </div>
      <div className="text-xs text-muted-foreground">
        <p>{config.footer.text}</p>
      </div>
    </footer>
  );
}
