import type {
  Court,
  CustomerDetails,
  PaymentBreakdown,
  TimeSlot,
  Venue,
} from "@/types/reservation";

import {
  ReservationSummary,
  type SummaryEditActions,
} from "./reservation-summary";
import { StepActions, StepHeader } from "./step-layout";

type SummaryStepProps = {
  customer: CustomerDetails;
  venue: Venue;
  date: string;
  court: Court;
  slot: TimeSlot;
  payment: PaymentBreakdown;
  editActions: SummaryEditActions;
  onBack: () => void;
  onContinue: () => void;
};

export function SummaryStep(props: SummaryStepProps) {
  return (
    <div>
      <StepHeader
        eyebrow="Todo listo"
        titleId="summary-step-title"
        title="Revisá tu reserva"
        description="Comprobá los datos antes de continuar. Podés modificar directamente cualquier elección."
      />
      <div className="mt-7">
        <ReservationSummary {...props} />
      </div>
      <StepActions
        onBack={props.onBack}
        onContinue={props.onContinue}
        continueLabel="Continuar al pago"
      />
    </div>
  );
}
