import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { CLUB_CONFIG } from "@/config/club";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `Reservas | ${CLUB_CONFIG.name} · CourtOS`,
  description: `Solicitá tu reserva de cancha en ${CLUB_CONFIG.name} de forma rápida y simple con CourtOS.`,
  applicationName: "CourtOS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ WebkitTextSizeAdjust: "100%" }}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
