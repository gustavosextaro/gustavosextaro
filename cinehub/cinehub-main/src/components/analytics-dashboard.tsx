'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, MousePointerClick, TrendingUp, Users, BarChart3, ExternalLink } from 'lucide-react';

interface AnalyticsData {
  totalPageviews: number;
  todayPageviews: number;
  weekPageviews: number;
  clicksByComponent: Record<string, number>;
  referrers: Record<string, number>;
  tiktokPercentage: number;
}

export function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/analytics');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground text-sm">Carregando métricas...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-destructive">Erro ao carregar métricas</div>
      </div>
    );
  }

  const clicksArray = Object.entries(data.clicksByComponent)
    .map(([component, clicks]) => ({ component, clicks }))
    .sort((a, b) => b.clicks - a.clicks);

  const referrersArray = Object.entries(data.referrers)
    .map(([referrer, count]) => ({ referrer, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl">
        {/* Header */}
        <div className="space-y-2 animate-fade-in-down">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10 backdrop-blur-sm">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Métricas em tempo real do CineHub
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 animate-fade-in-up">
          <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
            <CardHeader className="relative flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Visualizações
              </CardTitle>
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                {data.totalPageviews.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Desde o início
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent" />
            <CardHeader className="relative flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Visualizações Hoje
              </CardTitle>
              <div className="p-2 rounded-lg bg-blue-500/10">
                <Activity className="h-5 w-5 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                {data.todayPageviews.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Últimas 24 horas
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent" />
            <CardHeader className="relative flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Esta Semana
              </CardTitle>
              <div className="p-2 rounded-lg bg-green-500/10">
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                {data.weekPageviews.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Últimos 7 dias
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent" />
            <CardHeader className="relative flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Do TikTok
              </CardTitle>
              <div className="p-2 rounded-lg bg-purple-500/10">
                <ExternalLink className="h-5 w-5 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                {data.tiktokPercentage}%
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Visitantes via TikTok
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Clicks Section */}
        <Card className="border-primary/20 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm shadow-xl animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <MousePointerClick className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Cliques por Componente</CardTitle>
                <CardDescription className="mt-1">
                  Total de interações em cada elemento da página
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {clicksArray.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <MousePointerClick className="h-12 w-12 text-muted-foreground/30 mb-3" />
                <p className="text-sm text-muted-foreground">Nenhum clique registrado ainda.</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {clicksArray.map(({ component, clicks }, index) => (
                  <div 
                    key={component} 
                    className="group relative flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-muted/50 to-muted/30 hover:from-primary/10 hover:to-primary/5 transition-all duration-300 border border-border/50 hover:border-primary/30 hover:shadow-lg"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="font-medium text-foreground/90 group-hover:text-foreground transition-colors">
                        {formatComponentName(component)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        {clicks.toLocaleString()}
                      </div>
                      <MousePointerClick className="h-4 w-4 text-primary/50" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Referrers Section */}
        <Card className="border-primary/20 bg-gradient-to-br from-card/80 to-card/50 backdrop-blur-sm shadow-xl animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Fontes de Tráfego</CardTitle>
                <CardDescription className="mt-1">
                  De onde os visitantes estão vindo
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {referrersArray.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <ExternalLink className="h-12 w-12 text-muted-foreground/30 mb-3" />
                <p className="text-sm text-muted-foreground">Nenhuma fonte registrada ainda.</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {referrersArray.map(({ referrer, count }, index) => (
                  <div 
                    key={referrer} 
                    className="group flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-muted/50 to-muted/30 hover:from-blue-500/10 hover:to-blue-500/5 transition-all duration-300 border border-border/50 hover:border-blue-500/30 hover:shadow-lg"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                      <span className="font-medium text-foreground/90 group-hover:text-foreground transition-colors">
                        {referrer}
                      </span>
                    </div>
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-500/70 bg-clip-text text-transparent">
                      {count.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function formatComponentName(component: string): string {
  const names: Record<string, string> = {
    'abrir-planilha': 'Acessar Drive',
    'link-letterboxd-modal': 'Link Letterboxd (Modal)',
    'footer-instagram': 'Instagram (Footer)',
    'footer-contato': 'WhatsApp Contato (Footer)',
    'ir-letterboxd': 'Ir para Letterboxd',
    'pagamento-mensal': 'Pagamento Mensal',
    'pagamento-anual': 'Pagamento Anual',
  };
  return names[component] || component;
}

