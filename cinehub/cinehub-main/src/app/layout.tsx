import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const appName = "Cinema Hub";
const appDescription = "Cinema todo dia. Lista com +3.000 filmes. Assista, avalie e descubra.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:9002'),
  title: 'Cinema Hub | Gustavo Sextaro',
  description: appDescription,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: appName,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: appName,
    description: appDescription,
    url: "https://your-domain.com", // Replace with your actual domain
    siteName: appName,
    images: [
      {
        url: "/og-image.png", // Create and add an og-image.png to your /public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: appName,
    description: appDescription,
    images: ["/og-image.png"], // Create and add an og-image.png to your /public folder
  },
};

export const viewport: Viewport = {
  themeColor: "#333333",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
