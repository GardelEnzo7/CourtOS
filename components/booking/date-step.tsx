import { Check } from "lucide-react";

import {
  formatDayAndMonth,
  formatFullDate,
  formatWeekdayShort,
  isToday,
  toLocalDateKey,
} from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import type { Venue } from "@/types/reservation";

import { StepActions, StepHeader } from "./step-layout";

type DateStepProps = {
  dates: readonly Date[];
  referenceDate: Date;
  selectedDate: string | null;
  selectedVenue: Venue;
  onSelect: (date: string) => void;
  onBack: () => void;
  onContinue: () => void;
};

export function DateStep({
  dates,
  referenceDate,
  selectedDate,
  selectedVenue,
  onSelect,
  onBack,
  onContinue,
}: DateStepProps) {
  return (
    <div>
      <StepHeader
        eyebrow={selectedVenue.name}
        titleId="date-step-title"
        title="¿Qué día te queda mejor?"
        description="Elegí entre los próximos 14 días. La disponibilidad exacta se muestra al seleccionar cancha y horario."
      />

      <fieldset className="mt-7 min-w-0">
        <legend className="sr-only">Fechas disponibles</legend>
        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 sm:grid sm:grid-cols-7 sm:overflow-visible sm:pb-0">
          {dates.map((date) => {
            const dateKey = toLocalDateKey(date);
            const { day, month } = formatDayAndMonth(date);
            const today = isToday(date, referenceDate);
            const selected = selectedDate === dateKey;

            return (
              <label
                key={dateKey}
                className="relative block w-20 shrink-0 snap-start cursor-pointer sm:w-auto"
              >
                <input
                  type="radio"
                  name="reservation-date"
                  value={dateKey}
                  checked={selected}
                  onChange={() => onSelect(dateKey)}
                  aria-label={`Seleccionar ${formatFullDate(date)}`}
                  className="peer sr-only"
                />
                <span
                  className={cn(
                    "relative flex min-h-28 flex-col items-center justify-center rounded-2xl border border-border bg-background px-2 py-3 text-center transition-colors hover:bg-muted/50 peer-focus-visible:border-ring peer-focus-visible:ring-3 peer-focus-visible:ring-ring/30",
                    selected && "border-primary ring-2 ring-primary/20",
                  )}
                >
                  {selected && <Check aria-hidden="true" className="absolute top-2 right-2 size-3.5" />}
                  <span className="text-xs font-medium text-muted-foreground">{formatWeekdayShort(date)}</span>
                  <span className="mt-1 text-2xl font-bold leading-none text-foreground">{day}</span>
                  <span className="mt-1 text-xs text-muted-foreground">{month}</span>
                  <span className="mt-2 min-h-4 text-[10px] font-semibold text-foreground">
                    {today ? "Hoy" : selected ? "Elegida" : ""}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <StepActions
        onBack={onBack}
        onContinue={onContinue}
        continueDisabled={!selectedDate}
      />
    </div>
  );
}
