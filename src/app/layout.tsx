import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactQueryProvider } from "./providers";
import ErrorBoundary from "@/components/ErrorBoundary";
import DevErrorHandler from "@/components/DevErrorHandler";
import { Navigation } from "@/components/Navigation";

export const metadata: Metadata = {
  title: "LiveSpaces - Real Estate Marketplace",
  description: "Your portal to real estate properties in Botswana",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Alata, sans-serif" }}>
        <DevErrorHandler />
        <ErrorBoundary>
          <ReactQueryProvider>
            <TooltipProvider>
              <Navigation />
              <main className="pt-16">
                <Toaster />
                <Sonner />
                {children}
              </main>
            </TooltipProvider>
          </ReactQueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
