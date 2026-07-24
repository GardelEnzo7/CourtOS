import { Check, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Venue } from "@/types/reservation";

import { StepActions, StepHeader } from "./step-layout";

type VenueStepProps = {
  venues: readonly Venue[];
  selectedVenueId: string | null;
  onSelect: (venueId: string) => void;
  onBack: () => void;
  onContinue: () => void;
};

export function VenueStep({
  venues,
  selectedVenueId,
  onSelect,
  onBack,
  onContinue,
}: VenueStepProps) {
  return (
    <div>
      <StepHeader
        eyebrow="Lavalle Pádel"
        titleId="venue-step-title"
        title="Elegí una sucursal"
        description="Seleccioná la sede donde querés jugar. Cada una cuenta con tres canchas."
      />

      <fieldset className="mt-7 grid gap-3 sm:grid-cols-3">
        <legend className="sr-only">Sucursales disponibles</legend>
        {venues.map((venue, index) => {
          const selected = selectedVenueId === venue.id;

          return (
            <label key={venue.id} className="relative block cursor-pointer">
              <input
                type="radio"
                name="venue"
                value={venue.id}
                checked={selected}
                onChange={() => onSelect(venue.id)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "flex min-h-44 flex-col rounded-2xl border border-border bg-background p-5 transition-colors hover:bg-muted/50 peer-focus-visible:border-ring peer-focus-visible:ring-3 peer-focus-visible:ring-ring/30",
                  selected && "border-primary ring-2 ring-primary/20",
                )}
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                    <MapPin aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground">
                    Sede {index + 1}
                  </span>
                </span>
                <span className="mt-5 flex items-center justify-between gap-2 font-semibold text-foreground">
                  {venue.name}
                  {selected && (
                    <Check aria-hidden="true" className="size-4 shrink-0" />
                  )}
                </span>
                <span className="mt-2 text-sm leading-5 text-muted-foreground">
                  {venue.address} · {venue.neighborhood}
                </span>
              </span>
            </label>
          );
        })}
      </fieldset>

      <StepActions
        onBack={onBack}
        onContinue={onContinue}
        continueDisabled={!selectedVenueId}
      />
    </div>
  );
}
