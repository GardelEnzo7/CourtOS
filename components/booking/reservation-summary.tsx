import {
  Building2,
  CalendarDays,
  Clock3,
  CreditCard,
  MapPin,
  Pencil,
  Receipt,
  Timer,
  UserRound,
  WalletCards,
  Warehouse,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatDateKey } from "@/lib/date-utils";
import { formatPrice } from "@/lib/reservations/catalog";
import type {
  Court,
  CustomerDetails,
  PaymentBreakdown,
  TimeSlot,
  Venue,
} from "@/types/reservation";

export type SummaryEditActions = {
  customer: () => void;
  venue: () => void;
  date: () => void;
  time: () => void;
  court: () => void;
};

type ReservationSummaryProps = {
  customer: CustomerDetails;
  venue: Venue;
  date: string;
  court: Court;
  slot: TimeSlot;
  payment: PaymentBreakdown;
  editActions?: SummaryEditActions;
};

export function ReservationSummary({
  customer,
  venue,
  date,
  court,
  slot,
  payment,
  editActions,
}: ReservationSummaryProps) {
  const rows = [
    {
      icon: Building2,
      label: "Sucursal",
      value: venue.name,
      detail: venue.neighborhood,
      edit: editActions?.venue,
    },
    {
      icon: MapPin,
      label: "Dirección",
      value: venue.address,
      detail: "Ubicación de la sucursal",
    },
    {
      icon: CalendarDays,
      label: "Fecha",
      value: formatDateKey(date),
      detail: "Fecha seleccionada",
      edit: editActions?.date,
    },
    {
      icon: Clock3,
      label: "Horario",
      value: slot.startsAt,
      detail: "Horario seleccionado",
      edit: editActions?.time,
    },
    {
      icon: Warehouse,
      label: "Cancha",
      value: court.name,
      detail: `${court.surface} · ${court.indoor ? "Cubierta" : "Exterior"}`,
      edit: editActions?.court,
    },
    {
      icon: Timer,
      label: "Duración",
      value: `${slot.durationMinutes} minutos`,
      detail: "Duración total del turno",
    },
    {
      icon: Receipt,
      label: "Precio total",
      value: formatPrice(payment.total),
      detail: "Valor completo del turno",
    },
    {
      icon: CreditCard,
      label: "Monto de la seña",
      value: formatPrice(payment.deposit),
      detail: "Requerida para solicitar el turno",
    },
    {
      icon: WalletCards,
      label: "Saldo restante",
      value: formatPrice(payment.balance),
      detail: "A pagar en el club",
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-background">
      <div className="flex items-start gap-3 border-b border-border p-4 sm:p-5">
        <UserRound
          aria-hidden="true"
          className="mt-0.5 size-5 shrink-0 text-muted-foreground"
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Datos personales
          </p>
          <p className="mt-1 font-semibold text-foreground">
            {customer.firstName} {customer.lastName}
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {customer.phone}
          </p>
        </div>
        {editActions?.customer && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={editActions.customer}
            aria-label="Modificar datos personales"
          >
            <Pencil aria-hidden="true" />
            Modificar
          </Button>
        )}
      </div>

      <dl className="grid sm:grid-cols-2">
        {rows.map(({ icon: Icon, label, value, detail, edit }) => (
          <div
            key={label}
            className="flex min-w-0 gap-3 border-b border-border p-4 last:border-b-0 sm:p-5 sm:[&:nth-child(odd)]:border-r sm:last:border-r-0"
          >
            <Icon
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0 text-muted-foreground"
            />
            <div className="min-w-0 flex-1">
              <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {label}
              </dt>
              <dd className="mt-1 font-semibold capitalize text-foreground">
                {value}
              </dd>
              <dd className="mt-0.5 text-sm text-muted-foreground">{detail}</dd>
            </div>
            {edit && (
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={edit}
                aria-label={`Modificar ${label.toLowerCase()}`}
              >
                <Pencil aria-hidden="true" />
              </Button>
            )}
          </div>
        ))}
      </dl>
    </div>
  );
}
