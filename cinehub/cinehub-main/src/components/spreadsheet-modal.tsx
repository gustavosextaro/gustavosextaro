'use client';

import { useState } from 'react';
import { config } from '@/lib/config';
import { buildUrlWithUtm } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ShimmerButton } from './ui/shimmer-button';

export function SpreadsheetModal() {
  const [isYearly, setIsYearly] = useState(false);
  const paymentUrl = isYearly ? config.links.payment_yearly : config.links.payment_monthly;
  const utmParams = {
    source: 'cinemahub',
    medium: 'modal',
    campaign: isYearly ? 'yearly_subscription' : 'monthly_subscription',
  };

  const finalPaymentUrl = buildUrlWithUtm(paymentUrl, utmParams);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="overflow-hidden bg-card/80 shadow-lg backdrop-blur-sm text-center cursor-pointer hover:border-primary/40 transition-colors">
          <CardHeader>
            <CardTitle>{config.cards.spreadsheet.title}</CardTitle>
            <CardDescription>{config.cards.spreadsheet.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <ShimmerButton
              background="hsl(var(--secondary))"
              className="w-full h-12 text-base font-semibold text-secondary-foreground pointer-events-none"
            >
              {config.cards.spreadsheet.buttonText}
            </ShimmerButton>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-xs text-muted-foreground">{config.cards.spreadsheet.note}</p>
          </CardFooter>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-[400px] p-0 sm:p-0 rounded-xl overflow-hidden border-border/50">
        <div className="p-6 sm:p-8 text-center bg-card/80">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-bold tracking-tighter">{config.modals.subscription.title}</DialogTitle>
            <DialogDescription className="text-lg text-muted-foreground">{config.modals.subscription.subtitle}</DialogDescription>
          </DialogHeader>

          <p className="text-sm text-muted-foreground mb-6">
            {config.modals.subscription.description}
          </p>

          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center rounded-full bg-secondary p-1">
              <Button
                onClick={() => setIsYearly(false)}
                variant="ghost"
                className={cn(
                  "rounded-full h-8 px-4 text-sm font-medium transition-colors",
                  !isYearly ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Mensal
              </Button>
              <div className="relative">
                <Button
                    onClick={() => setIsYearly(true)}
                    variant="ghost"
                    className={cn(
                    "rounded-full h-8 px-4 text-sm font-medium transition-colors",
                    isYearly ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'text-muted-foreground hover:text-foreground'
                    )}
                >
                    Anual
                </Button>
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-primary/80 px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">60% OFF</span>
              </div>
            </div>
          </div>


          <div className="mb-6">
            <p className="text-4xl font-bold text-foreground">
              {isYearly ? config.modals.subscription.price_yearly : config.modals.subscription.price_monthly}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <a href={finalPaymentUrl} target="_blank" rel="noopener noreferrer">
              <Button
                className="w-full h-12 text-base font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/80"
              >
                {isYearly ? config.modals.subscription.button_primary_yearly : config.modals.subscription.button_primary_monthly}
              </Button>
            </a>
            <DialogTrigger asChild>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                    {config.modals.subscription.button_secondary}
                </Button>
            </DialogTrigger>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
