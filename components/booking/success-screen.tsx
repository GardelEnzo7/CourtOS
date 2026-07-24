import { Check, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getPaymentBreakdown } from "@/lib/reservations/catalog";
import type {
  Court,
  ReservationRecord,
  TimeSlot,
  Venue,
} from "@/types/reservation";

import { ReservationSummary } from "./reservation-summary";

type SuccessScreenProps = {
  reservation: ReservationRecord;
  venue: Venue;
  court: Court;
  slot: TimeSlot;
  onNewReservation: () => void;
};

export function SuccessScreen({
  reservation,
  venue,
  court,
  slot,
  onNewReservation,
}: SuccessScreenProps) {
  const payment = getPaymentBreakdown(slot.price);

  return (
    <section aria-labelledby="success-title" className="text-center">
      <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <Check aria-hidden="true" className="size-7" />
      </span>
      <p className="mt-5 text-sm font-medium text-muted-foreground">
        Solicitud {reservation.number}
      </p>
      <h2
        id="success-title"
        className="mt-1 text-3xl font-bold tracking-tight text-foreground"
      >
        Solicitud enviada correctamente
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
        Recibimos tu solicitud de reserva. Una vez que Lavalle Pádel verifique
        el comprobante de la seña, confirmará tu turno.
      </p>

      <div className="mx-auto mt-5 w-fit rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground">
        Pendiente de confirmación
      </div>

      <div className="mt-7 text-left">
        <ReservationSummary
          customer={reservation.draft.customer}
          venue={venue}
          date={reservation.draft.date!}
          court={court}
          slot={slot}
          payment={payment}
        />
      </div>

      <Button
        type="button"
        size="lg"
        onClick={onNewReservation}
        className="mt-7 h-12 w-full rounded-xl text-base sm:w-auto sm:px-8"
      >
        <RotateCcw aria-hidden="true" />
        Nueva reserva
      </Button>
    </section>
  );
}
