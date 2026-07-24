import { Check, CloudSun, Warehouse } from "lucide-react";

import { formatPrice } from "@/lib/reservations/catalog";
import { cn } from "@/lib/utils";
import type { Court } from "@/types/reservation";

type CourtCardProps = {
  court: Court;
  price: number;
  selected: boolean;
  onSelect: () => void;
};

export function CourtCard({
  court,
  price,
  selected,
  onSelect,
}: CourtCardProps) {
  return (
    <label className="block cursor-pointer">
      <input
        type="radio"
        name="court"
        value={court.id}
        checked={selected}
        onChange={onSelect}
        className="peer sr-only"
      />
      <span
        className={cn(
          "flex min-h-36 flex-col rounded-2xl border border-border bg-background p-5 transition-colors hover:bg-muted/50 peer-focus-visible:border-ring peer-focus-visible:ring-3 peer-focus-visible:ring-ring/30",
          selected && "border-primary ring-2 ring-primary/20",
        )}
      >
        <span className="flex items-start justify-between gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
            {court.indoor ? <Warehouse aria-hidden="true" /> : <CloudSun aria-hidden="true" />}
          </span>
          {selected && <Check aria-hidden="true" className="size-4" />}
        </span>
        <span className="mt-4 font-semibold text-foreground">{court.name}</span>
        <span className="mt-1 text-sm text-muted-foreground">
          {court.surface} · {court.indoor ? "Cubierta" : "Exterior"}
        </span>
        <span className="mt-3 text-sm font-medium text-foreground">
          {formatPrice(price)}
        </span>
      </span>
    </label>
  );
}
