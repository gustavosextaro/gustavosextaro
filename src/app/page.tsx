
'use client';

import { Button } from "@/components/ui/button";
import { Instagram, Menu, BrainCircuit, LayoutGrid, Mic, Target, GaugeCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { useState, useEffect } from "react";
import { LetsWorkTogether } from "@/components/ui/lets-work-section";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LocationTag } from "@/components/ui/location-tag";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Typewriter } from "@/components/ui/typewriter";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { LazySection } from "@/components/ui/lazy-section";
import { TimelineSkeleton } from "@/components/ui/timeline-skeleton";
import { ContainerSkeleton } from "@/components/ui/container-skeleton";



function NavLinks() {
  return (
    <>
      <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Home</a>
      <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">SaaS</a>
      <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Contato</a>
      <a href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Posicionamento</a>
    </>
  );
}

const timelineData = [
  {
    id: 1,
    title: "Expert de IA",
    date: "Automação",
    content: "Agentes, automações e workflows aplicados.",
    category: "IA",
    icon: BrainCircuit,
    relatedIds: [2, 3],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Criador de SaaS",
    date: "Produto",
    content: "MVP, onboarding e produto de ponta a ponta.",
    category: "SaaS",
    icon: LayoutGrid,
    relatedIds: [1, 4],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Comunicação",
    date: "Conteúdo",
    content: "Roteiros, posts e narrativa pra vender.",
    category: "Comunicação",
    icon: Mic,
    relatedIds: [1, 4],
    status: "in-progress" as const,
    energy: 80,
  },
  {
    id: 4,
    title: "Posicionamento",
    date: "Estratégia",
    content: "Oferta clara, diferenciação e consistência.",
    category: "Posicionamento",
    icon: Target,
    relatedIds: [2, 3, 5],
    status: "in-progress" as const,
    energy: 70,
  },
  {
    id: 5,
    title: "Tráfego Pago",
    date: "Performance",
    content: "Anúncios que geram vendas e crescimento.",
    category: "Tráfego",
    icon: GaugeCircle,
    relatedIds: [4],
    status: "completed" as const,
    energy: 85,
  },
];


function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
}


export default function Home() {
  const [showMainContent, setShowMainContent] = useState(false);

  if (!showMainContent) {
    return <LetsWorkTogether onStart={() => setShowMainContent(true)} />;
  }
  
  return (
    <div className="min-h-dvh w-full bg-background font-sans text-foreground animate-in fade-in-25 duration-1000">
       <LazySection rootMargin="0px" threshold={0}>
         <BackgroundBeams className="fixed inset-0 z-0" />
       </LazySection>
      <div className="relative z-10">
        <header className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="text-lg font-bold">
              <a href="#">Gustavo Sextaro</a>
            </div>
            <nav className="hidden items-center gap-6 md:flex">
              <NavLinks />
              <Button variant="outline" asChild>
                 <a href="https://wa.link/pldmwk" target="_blank" rel="noopener noreferrer">Vamos conversar</a>
              </Button>
              <ThemeToggle />
            </nav>
            <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu />
                    <span className="sr-only">Abrir menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col items-start gap-6 pt-10">
                    <NavLinks />
                     <Button asChild className="w-full" variant="outline">
                       <a href="https://wa.link/pldmwk" target="_blank" rel="noopener noreferrer">Vamos conversar</a>
                     </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
        </header>

        <main className="container mx-auto flex max-w-7xl flex-col items-center justify-center px-4 pt-28 text-center sm:px-6 md:pt-32 lg:px-8">
            <div className="flex flex-col items-center space-y-8">
              <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl uppercase">
                <span className="block">Gustavo</span>
                <span className="block text-accent">Sextaro</span>
              </h1>
              <p className="max-w-md text-base text-foreground/80 md:text-lg h-16">
                SaaS sem <Typewriter text={["comercial", "estrutura", "estratégia", "posicionamento"]} speed={70} waitTime={1500} deleteSpeed={40} className="text-accent" /> não vende. 
                <br />
                Especialista em gestão comercial, Antigravity e IAs.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <Button asChild size="lg" variant="outline">
                  <a href="https://instagram.com/eugustavosextaro" target="_blank" rel="noopener noreferrer">
                    <Instagram className="mr-2 h-5 w-5" />
                    @eugustavosextaro
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href="https://wa.link/pldmwk" target="_blank" rel="noopener noreferrer">converse comigo</a>
                </Button>
              </div>
            </div>
        </main>
        
        <div className="container mx-auto max-w-2xl flex flex-col items-center space-y-2 px-4 pt-24">
          <h2 className="text-4xl md:text-5xl font-bold text-center uppercase tracking-wider text-text">ESPECIALIDADES</h2>
           <div className="h-[500px] w-full">
            <ClientOnly>
              <RadialOrbitalTimeline timelineData={timelineData} />
            </ClientOnly>
          </div>
        </div>

        <LazySection fallback={<ContainerSkeleton />} rootMargin="400px" className="-mt-48">
          <ContainerScroll
            titleComponent={
              <h2 className="text-4xl font-semibold text-text">
                Domínios de Expertise
              </h2>
            }
          >
            <div className="w-full h-full p-4 md:p-10 bg-background text-text rounded-2xl flex flex-col gap-4 md:gap-6">
              <div className="md:hidden">
                  <h3 className="text-xl font-bold text-accent">Domínio em produção de conteúdo</h3>
                  <p className="text-sm text-text-muted">Estratégias de conteúdo viral, crescimento de audiência e monetização de plataformas.</p>
                  <Separator className="my-4 bg-border/50" />
                  <h3 className="text-xl font-bold text-accent">Domínio em criação de SaaS e Micro SaaS</h3>
                  <p className="text-sm text-text-muted">Do MVP ao lançamento, com desenvolvimento de produto, marketing e gestão de tráfego.</p>
                  <Separator className="my-4 bg-border/50" />
                  <h3 className="text-xl font-bold text-accent">Domínio em gestão de tráfego para negócios locais</h3>
                  <p className="text-sm text-text-muted">Campanhas de performance no Google Ads e Meta Ads para atrair clientes para estabelecimentos físicos.</p>
              </div>
              <div className="hidden md:flex flex-col gap-4 md:gap-6">
                <h3 className="text-xl md:text-2xl font-bold text-accent">Domínio em produção de conteúdo no TikTok e Instagram</h3>
                <p className="text-sm md:text-base text-text-muted">Estratégias de conteúdo viral, crescimento de audiência e monetização de plataformas de vídeo curto.</p>
                <Separator className="bg-border/50" />
                <h3 className="text-xl md:text-2xl font-bold text-accent">Domínio em criação de SaaS e Micro SaaS</h3>
                <p className="text-sm md:text-base text-text-muted">Do MVP ao lançamento, desenvolvimento de produtos de software como serviço focados em nichos de mercado.</p>
                <Separator className="bg-border/50" />
                <h3 className="text-xl md:text-2xl font-bold text-accent">Domínio em gestão de tráfego para negócios locais</h3>
                <p className="text-sm md:text-base text-text-muted">Campanhas de performance no Google Ads e Meta Ads para atrair clientes para estabelecimentos físicos.</p>
                <Separator className="bg-border/50" />
                <h3 className="text-xl md:text-2xl font-bold text-accent">Domínio em processos comerciais</h3>
                <p className="text-sm md:text-base text-text-muted">Estruturação de funis de venda, automação de marketing e otimização da jornada do cliente.</p>
              </div>
            </div>
          </ContainerScroll>
        </LazySection>
        
        <div className="container mx-auto max-w-2xl flex flex-col items-center gap-4 pt-12 pb-8">
            <ClientOnly>
              <LazySection rootMargin="200px" className="flex justify-center">
                <LocationTag />
              </LazySection>
            </ClientOnly>
            <footer className="text-center text-sm text-text-muted w-full">
              © {new Date().getFullYear()} Gustavo Sextaro
            </footer>
        </div>
      </div>
    </div>
  );
}
