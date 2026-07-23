import { ArrowLeft, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CLUB_CONFIG } from "@/config/club";
import { cn } from "@/lib/utils";
import type { VenueStepProps } from "@/types/reservation";

export function VenueStep({
  venues,
  selectedVenueId,
  onSelect,
  onBack,
  onContinue,
}: VenueStepProps) {
  return (
    <div>
      <header>
        <p className="text-sm font-medium text-muted-foreground">
          {CLUB_CONFIG.name}
        </p>
        <h2
          id="venue-step-title"
          className="mt-1 text-2xl font-bold tracking-tight text-foreground"
        >
          Elegí una sede
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Seleccioná dónde querés jugar. Podés volver y cambiar esta opción
          cuando lo necesites.
        </p>
      </header>

      <fieldset className="mt-6 space-y-3">
        <legend className="sr-only">Sedes disponibles</legend>

        {venues.map((venue) => {
          const isSelected = selectedVenueId === venue.id;

          return (
            <label key={venue.id} className="block cursor-pointer">
              <input
                type="radio"
                name="venue"
                value={venue.id}
                checked={isSelected}
                onChange={() => onSelect(venue.id)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "flex min-h-20 items-center justify-between gap-4 rounded-2xl border border-border bg-background px-4 py-3 text-left transition-colors peer-focus-visible:border-ring peer-focus-visible:ring-3 peer-focus-visible:ring-ring/30",
                  isSelected && "border-primary ring-2 ring-primary/20",
                )}
              >
                <span className="min-w-0">
                  <span className="block font-semibold text-foreground">
                    {venue.name}
                  </span>
                  {venue.description && (
                    <span className="mt-1 block text-sm text-muted-foreground">
                      {venue.description}
                    </span>
                  )}
                </span>

                <span
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 text-xs font-medium",
                    isSelected ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {isSelected && <Check aria-hidden="true" className="size-4" />}
                  {isSelected ? "Seleccionada" : "Seleccionar"}
                </span>
              </span>
            </label>
          );
        })}
      </fieldset>

      <div className="mt-7 grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="h-12 rounded-xl text-base"
        >
          <ArrowLeft aria-hidden="true" />
          Volver
        </Button>
        <Button
          type="button"
          disabled={!selectedVenueId}
          onClick={onContinue}
          className="h-12 rounded-xl text-base"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
}
