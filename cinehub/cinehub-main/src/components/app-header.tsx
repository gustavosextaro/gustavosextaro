import Image from 'next/image';
import { config } from '@/lib/config';
import placeholderImages from '@/lib/placeholder-images.json';
import { Badge } from '@/components/ui/badge';

export function AppHeader() {
  const avatarImage = placeholderImages.placeholderImages.find(img => img.id === "avatar");

  return (
    <header className="flex flex-col items-center gap-4 text-center animate-fade-in-down">
      <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-primary/50 ring-offset-4 ring-offset-background shadow-lg">
        {avatarImage ? (
           <Image
            src={avatarImage.imageUrl}
            alt={config.name}
            fill
            sizes="96px"
            quality={100}
            style={{
              objectFit: 'cover',
              transform: 'scale(1.1)',
              objectPosition: '50% 30%',
              filter: 'contrast(1.1) brightness(1.05)',
            }}
            data-ai-hint={avatarImage.imageHint}
            priority
          />
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
            <span className="text-xs">96x96</span>
          </div>
        )}
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{config.name}</h1>
        <div className="mt-2 text-sm text-muted-foreground">
          <p>Apaixonado por cinema.</p>
          <p>Minha planilha com +2.000 filmes.</p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mt-2">
        <Badge variant="secondary" className="font-normal">+10k no TikTok</Badge>
        <Badge variant="secondary" className="font-normal">SaaS Creator</Badge>
        <Badge variant="secondary" className="font-normal">+1000 filmes</Badge>
      </div>
    </header>
  );
}
