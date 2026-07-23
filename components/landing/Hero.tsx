import { ReservationForm } from "./ReservationForm";
import { Logo } from "./Logo";
import { AnimatedThemeToggle } from "@/components/theme/AnimatedThemeToggle";

export function Hero() {
  return (
        <main className="min-h-screen bg-background flex items-center justify-center p-6">
            <div className="absolute top-6 right-6 rounded-full border border-border bg-background/80 p-1 backdrop-blur">
                <AnimatedThemeToggle />
            </div>
            <div className="w-full max-w-md">
                {/* Header */}
                    <div className="flex flex-col items-center gap-4 mb-8">
                    <Logo />
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-foreground">
                        Lavalle Pádel
                        </h1>

                        <p className="mt-2 text-muted-foreground">
                        Reservá tu cancha en menos de un minuto.
                        </p>
                    </div>
                </div>
                {/* Card */}
                <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                    <ReservationForm />
                </div>
            </div>
        </main>
  );
}
