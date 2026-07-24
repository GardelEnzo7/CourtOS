import { AnimatedThemeToggle } from "@/components/theme/AnimatedThemeToggle";

import { LandingExperience } from "./landing-experience";

export function Hero() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center bg-background px-4 py-20 sm:p-6">
      <div className="absolute top-4 right-4 z-10 rounded-full border border-border bg-background/80 p-1 backdrop-blur sm:top-6 sm:right-6">
        <AnimatedThemeToggle />
      </div>

      <div className="w-full max-w-3xl">
        <LandingExperience />
      </div>
    </main>
  );
}
