import { ArrowRight, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MVP_CONFIG } from "@/config/mvp";

import { Logo } from "./Logo";

type BookingIntroProps = {
  onSchedule: () => void;
};

const bookingSteps = [
  "Completá tus datos y elegí sucursal",
  "Elegí fecha y un horario con lugar",
  "Seleccioná cancha y pagá la seña",
];

export function BookingIntro({ onSchedule }: BookingIntroProps) {
  return (
    <div className="mx-auto max-w-lg text-center">
      <header className="flex flex-col items-center">
        <Logo />
        <p className="mt-4 text-sm font-medium tracking-wide text-muted-foreground">
          CourtOS
        </p>
        <h1
          id="booking-intro-title"
          className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          Tu próximo partido empieza acá.
        </h1>
        <p className="mt-4 max-w-md text-pretty text-base leading-7 text-muted-foreground">
          Completá tus datos, mirá cuántas canchas quedan libres en cada
          horario y confirmá tu turno pagando la seña.
        </p>
      </header>

      <ol className="mt-7 grid gap-3 text-left">
        {bookingSteps.map((step, index) => (
          <li
            key={step}
            className="flex items-center gap-3 rounded-2xl border border-border bg-background/60 px-4 py-3"
          >
            <span
              aria-hidden="true"
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground"
            >
              {index + 1}
            </span>
            <span className="text-sm font-medium text-foreground">{step}</span>
          </li>
        ))}
      </ol>

      <div className="mt-7 grid gap-3">
        <Button
          type="button"
          size="lg"
          onClick={onSchedule}
          className="h-12 w-full rounded-xl text-base shadow-sm"
        >
          Agendar turno
          <ArrowRight aria-hidden="true" />
        </Button>
        <a
          href={MVP_CONFIG.instagramUrlPlaceholder}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 text-base font-medium text-foreground transition-colors hover:bg-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none"
        >
          <ExternalLink aria-hidden="true" className="size-4" />
          Conocer CourtOS
        </a>
      </div>

      <p className="mt-5 text-xs text-muted-foreground">
        Disponibilidad simulada para demostración del MVP
      </p>
    </div>
  );
}
