import { formatDateKey } from "@/lib/date-utils";
import type { TimeOption } from "@/types/reservation";

import { StepActions, StepHeader } from "./step-layout";
import { TimeSlotOption } from "./time-slot";

type TimeStepProps = {
  date: string;
  options: readonly TimeOption[];
  selectedTime: string | null;
  onSelect: (startsAt: string) => void;
  onBack: () => void;
  onContinue: () => void;
};

export function TimeStep({
  date,
  options,
  selectedTime,
  onSelect,
  onBack,
  onContinue,
}: TimeStepProps) {
  return (
    <div>
      <StepHeader
        eyebrow={formatDateKey(date)}
        titleId="time-step-title"
        title="Elegí un horario con lugar"
        description="La disponibilidad ya contempla todas las canchas. Los horarios completos permanecen visibles, pero no pueden seleccionarse."
      />

      <div className="mt-5 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="size-2 rounded-full bg-emerald-500" />
          2 o más canchas
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="size-2 rounded-full bg-amber-500" />
          Última cancha
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="size-2 rounded-full bg-destructive" />
          Completo
        </span>
      </div>

      <fieldset className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <legend className="sr-only">Disponibilidad por horario</legend>
        {options.map((option) => (
          <TimeSlotOption
            key={option.startsAt}
            option={option}
            selected={selectedTime === option.startsAt}
            onSelect={() => onSelect(option.startsAt)}
          />
        ))}
      </fieldset>

      <StepActions
        onBack={onBack}
        onContinue={onContinue}
        continueDisabled={!selectedTime}
      />
    </div>
  );
}
