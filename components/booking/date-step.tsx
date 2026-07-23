import { ArrowLeft, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CLUB_CONFIG } from "@/config/club";
import {
  formatDayAndMonth,
  formatFullDate,
  formatWeekdayShort,
  isToday,
  toLocalDateKey,
} from "@/lib/date-utils";
import { cn } from "@/lib/utils";
import type { DateStepProps } from "@/types/reservation";

export function DateStep({
  dates,
  referenceDate,
  selectedDate,
  selectedVenue,
  onSelect,
  onBack,
}: DateStepProps) {
  return (
    <div>
      <header>
        <p className="text-sm font-medium text-muted-foreground">
          {CLUB_CONFIG.name}
        </p>
        <h2
          id="date-step-title"
          className="mt-1 text-2xl font-bold tracking-tight text-foreground"
        >
          Elegí una fecha
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Mostramos los próximos 14 días. En esta etapa, todos pueden
          seleccionarse.
        </p>
      </header>

      <div className="mt-5 rounded-2xl bg-secondary/70 px-4 py-3">
        <p className="text-xs font-medium text-muted-foreground">
          Sede seleccionada
        </p>
        <p className="mt-0.5 font-semibold text-secondary-foreground">
          {selectedVenue.name}
        </p>
      </div>

      <fieldset className="mt-6 min-w-0">
        <legend className="sr-only">Fechas disponibles</legend>

        <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 sm:grid sm:grid-cols-7 sm:overflow-visible sm:pb-0">
          {dates.map((date) => {
            const dateKey = toLocalDateKey(date);
            const { day, month } = formatDayAndMonth(date);
            const today = isToday(date, referenceDate);
            const isSelected = selectedDate === dateKey;

            return (
              <label
                key={dateKey}
                className="block w-20 shrink-0 snap-start cursor-pointer sm:w-auto"
              >
                <input
                  type="radio"
                  name="reservation-date"
                  value={dateKey}
                  checked={isSelected}
                  onChange={() => onSelect(dateKey)}
                  aria-label={`Seleccionar ${formatFullDate(date)}`}
                  className="peer sr-only"
                />
                <span
                  className={cn(
                    "relative flex min-h-28 flex-col items-center justify-center rounded-2xl border border-border bg-background px-2 py-3 text-center transition-colors peer-focus-visible:border-ring peer-focus-visible:ring-3 peer-focus-visible:ring-ring/30",
                    isSelected && "border-primary ring-2 ring-primary/20",
                  )}
                >
                  {isSelected && (
                    <Check
                      aria-hidden="true"
                      className="absolute top-2 right-2 size-3.5 text-foreground"
                    />
                  )}

                  <span className="text-xs font-medium text-muted-foreground">
                    {formatWeekdayShort(date)}
                  </span>
                  <span className="mt-1 text-2xl font-bold leading-none text-foreground">
                    {day}
                  </span>
                  <span className="mt-1 text-xs text-muted-foreground">
                    {month}
                  </span>

                  <span className="mt-2 min-h-4 text-[10px] font-semibold text-foreground">
                    {today ? "Hoy" : isSelected ? "Elegida" : ""}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
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
          disabled
          aria-describedby="date-next-step-note"
          className="h-12 rounded-xl text-base"
        >
          Continuar
        </Button>
      </div>

      <p
        id="date-next-step-note"
        className="mt-4 text-center text-xs leading-5 text-muted-foreground"
      >
        La selección de horario será el próximo paso a implementar.
      </p>
    </div>
  );
}
