import { cn } from "@/lib/utils";
import type { TimeOption } from "@/types/reservation";

type TimeSlotOptionProps = {
  option: TimeOption;
  selected: boolean;
  onSelect: () => void;
};

function getAvailabilityPresentation(availableCount: number) {
  if (availableCount === 0) {
    return {
      label: "Completo",
      dotClassName: "bg-destructive",
    };
  }

  if (availableCount === 1) {
    return {
      label: "1 cancha disponible",
      dotClassName: "bg-amber-500",
    };
  }

  return {
    label: `${availableCount} canchas disponibles`,
    dotClassName: "bg-emerald-500",
  };
}

export function TimeSlotOption({
  option,
  selected,
  onSelect,
}: TimeSlotOptionProps) {
  const complete = option.availableCourtCount === 0;
  const presentation = getAvailabilityPresentation(
    option.availableCourtCount,
  );

  return (
    <label
      className={cn(
        "relative block",
        complete ? "cursor-not-allowed" : "cursor-pointer",
      )}
    >
      <input
        type="radio"
        name="reservation-time"
        value={option.startsAt}
        checked={selected}
        disabled={complete}
        onChange={onSelect}
        className="peer sr-only"
      />
      <span
        className={cn(
          "flex min-h-24 flex-col justify-center rounded-2xl border border-border bg-background px-4 py-3 transition-colors peer-focus-visible:border-ring peer-focus-visible:ring-3 peer-focus-visible:ring-ring/30",
          !complete && "hover:bg-muted/50",
          selected && "border-primary ring-2 ring-primary/20",
          complete && "border-dashed bg-muted/50 opacity-65",
        )}
      >
        <span className="text-lg font-bold text-foreground">
          {option.startsAt}
        </span>
        <span className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
          <span
            aria-hidden="true"
            className={cn("size-2 shrink-0 rounded-full", presentation.dotClassName)}
          />
          {presentation.label}
        </span>
      </span>
    </label>
  );
}
