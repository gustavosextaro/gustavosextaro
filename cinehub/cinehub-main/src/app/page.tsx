import { Suspense } from 'react';
import { config } from '@/lib/config';
import { buildUrlWithUtm } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AppFooter } from '@/components/app-footer';
import { TopPicksSkeleton } from '@/components/top-picks-skeleton';
import { getTopRatedMovies } from '@/services/letterboxd';
import { Testimonials, TestimonialCardProps } from '@/components/ui/twitter-testimonial-cards';
import { AppHeader } from '@/components/app-header';
import { SpreadsheetModal } from '@/components/spreadsheet-modal';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import { MicroExpander } from '@/components/ui/micro-expander';
import { Instagram, MessageCircle } from 'lucide-react';

export default async function Home() {

  const letterboxdUrl = buildUrlWithUtm(config.links.letterboxd, {
    source: 'cinemahub',
    medium: 'bio',
    campaign: 'letterboxd',
  });

  const topMovies = await getTopRatedMovies();
  const testimonialCards: TestimonialCardProps[] = topMovies.slice(0, 3).map((movie, index) => {
    const classNames = [
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-2xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/60 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-500 hover:grayscale-0 before:left-0 before:top-0",
      "[grid-area:stack] translate-x-8 sm:translate-x-16 translate-y-6 sm:translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-2xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/60 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-500 hover:grayscale-0 before:left-0 before:top-0",
      "[grid-area:stack] translate-x-16 sm:translate-x-32 translate-y-12 sm:translate-y-20 hover:translate-y-6 sm:hover:translate-y-10",
    ];
    return {
      className: `${classNames[index % classNames.length]} text-base sm:text-lg`,
      username: movie.title,
      handle: movie.genre,
      content: movie.plot,
    };
  });

  const instagramUrl = buildUrlWithUtm(config.socials.instagram, { source: 'cinemahub', medium: 'bio', campaign: 'header_icon' });
  const contactUrl = config.links.contact;

  return (
    
      <main className="container mx-auto flex max-w-[420px] flex-col gap-8 p-4 py-8 md:p-6 md:py-10">
        <div className="absolute top-4 right-4 flex gap-2">
            <a href={contactUrl} target="_blank" rel="noopener noreferrer">
                <MicroExpander
                    text="Contato"
                    variant="ghost"
                    icon={<MessageCircle className="w-5 h-5" />}
                />
            </a>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                <MicroExpander
                    text="Instagram"
                    variant="ghost"
                    icon={<Instagram className="w-5 h-5" />}
                />
            </a>
        </div>
        
        <AppHeader />

        <section className="flex flex-col gap-4 animate-fade-in-up">
          <SpreadsheetModal />
          <Card className="overflow-hidden bg-card/80 shadow-lg backdrop-blur-sm text-center">
            <CardHeader>
              <CardTitle>{config.cards.letterboxd.title}</CardTitle>
              <CardDescription>{config.cards.letterboxd.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href={letterboxdUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={config.cards.letterboxd.buttonText}
                className="w-full block"
              >
                <ShimmerButton
                  background="hsl(var(--secondary))"
                  className="w-full h-12 text-base font-semibold text-secondary-foreground"
                >
                  {config.cards.letterboxd.buttonText}
                </ShimmerButton>
              </a>
            </CardContent>
          </Card>
        </section>

        <section className="animate-fade-in-up mt-8" style={{ animationDelay: '200ms' }}>
          <h2 className="mb-4 text-center text-xl font-bold">{config.topPicks.title}</h2>
          <div className="relative mt-20 flex min-h-[300px] w-full items-start justify-center">
            <Suspense fallback={<TopPicksSkeleton />}>
              <Testimonials cards={testimonialCards} />
            </Suspense>
          </div>
        </section>

        <AppFooter />
      </main>
    
  );
}
