'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, MousePointerClick, TrendingUp, Users } from 'lucide-react';

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
    // Refresh every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-muted-foreground">Carregando métricas...</div>
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
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Visualize as métricas de uso do CineHub
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Visualizações
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalPageviews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Todas as visualizações registradas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Visualizações Hoje
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.todayPageviews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Últimas 24 horas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Esta Semana
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.weekPageviews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Últimos 7 dias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Do TikTok
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.tiktokPercentage}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Visitantes via TikTok bio
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Clicks by Component */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MousePointerClick className="h-5 w-5" />
            Cliques por Componente
          </CardTitle>
          <CardDescription>
            Total de interações em cada elemento da página
          </CardDescription>
        </CardHeader>
        <CardContent>
          {clicksArray.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum clique registrado ainda.</p>
          ) : (
            <div className="space-y-2">
              {clicksArray.map(({ component, clicks }) => (
                <div key={component} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="font-medium">{formatComponentName(component)}</span>
                  <span className="text-2xl font-bold text-primary">{clicks.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Referrers */}
      <Card>
        <CardHeader>
          <CardTitle>Fontes de Tráfego</CardTitle>
          <CardDescription>
            De onde os visitantes estão vindo
          </CardDescription>
        </CardHeader>
        <CardContent>
          {referrersArray.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhuma fonte registrada ainda.</p>
          ) : (
            <div className="space-y-2">
              {referrersArray.map(({ referrer, count }) => (
                <div key={referrer} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <span className="font-medium">{referrer}</span>
                  <span className="text-lg font-bold text-primary">{count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function formatComponentName(component: string): string {
  const names: Record<string, string> = {
    'abrir-planilha': 'Abrir Planilha',
    'link-letterboxd-modal': 'Link Letterboxd (Modal)',
    'footer-instagram': 'Instagram (Footer)',
    'footer-contato': 'WhatsApp Contato (Footer)',
    'ir-letterboxd': 'Ir para Letterboxd',
    'pagamento-mensal': 'Pagamento Mensal',
    'pagamento-anual': 'Pagamento Anual',
  };
  return names[component] || component;
}
