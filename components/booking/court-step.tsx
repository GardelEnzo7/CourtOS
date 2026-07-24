import { formatDateKey } from "@/lib/date-utils";
import type { Court, TimeSlot } from "@/types/reservation";

import { CourtCard } from "./court-card";
import { StepActions, StepHeader } from "./step-layout";

type CourtStepProps = {
  courts: readonly Court[];
  slots: readonly TimeSlot[];
  date: string;
  startsAt: string;
  selectedCourtId: string | null;
  onSelect: (courtId: string) => void;
  onBack: () => void;
  onContinue: () => void;
};

export function CourtStep({
  courts,
  slots,
  date,
  startsAt,
  selectedCourtId,
  onSelect,
  onBack,
  onContinue,
}: CourtStepProps) {
  return (
    <div>
      <StepHeader
        eyebrow={`${formatDateKey(date)} · ${startsAt}`}
        titleId="court-step-title"
        title="Elegí una cancha disponible"
        description="Mostramos únicamente las canchas libres para el horario que elegiste. El precio ya incluye la franja horaria."
      />
      <fieldset className="mt-7 grid gap-3 sm:grid-cols-3">
        <legend className="sr-only">Canchas disponibles</legend>
        {slots.map((slot) => {
          const court = courts.find((item) => item.id === slot.courtId);
          if (!court) return null;

          return (
            <CourtCard
              key={court.id}
              court={court}
              price={slot.price}
              selected={selectedCourtId === court.id}
              onSelect={() => onSelect(court.id)}
            />
          );
        })}
      </fieldset>
      <StepActions
        onBack={onBack}
        onContinue={onContinue}
        continueDisabled={!selectedCourtId}
      />
    </div>
  );
}
