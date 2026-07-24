import { ArrowLeft, ExternalLink, ReceiptText, ShieldCheck } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/reservations/catalog";
import { cn } from "@/lib/utils";
import type { PaymentBreakdown } from "@/types/reservation";

import { StepHeader } from "./step-layout";

type ProofStepProps = {
  payment: PaymentBreakdown;
  whatsappUrl: string;
  onBack: () => void;
  onSend: () => void;
};

export function ProofStep({
  payment,
  whatsappUrl,
  onBack,
  onSend,
}: ProofStepProps) {
  return (
    <div>
      <StepHeader
        eyebrow="Pendiente de confirmación"
        titleId="proof-step-title"
        title="Enviá el comprobante de la seña"
        description="Abriremos WhatsApp con los datos del turno. Sólo tenés que adjuntar la imagen del comprobante y enviar el mensaje."
      />

      <div className="mt-7 rounded-2xl border border-border bg-background p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
            <ReceiptText aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm text-muted-foreground">Seña a transferir</p>
            <p className="mt-1 text-2xl font-bold text-foreground">
              {formatPrice(payment.deposit)}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Total del turno: {formatPrice(payment.total)} · Saldo en el club:{" "}
              {formatPrice(payment.balance)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-2xl bg-muted/60 p-4 text-sm leading-6 text-muted-foreground">
        <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
        <p>
          La reserva no queda confirmada automáticamente. Quedará pendiente
          hasta que Lavalle Pádel verifique el comprobante.
        </p>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="h-12 rounded-xl text-base"
        >
          <ArrowLeft aria-hidden="true" />
          Volver
        </Button>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          onClick={onSend}
          className={cn(
            buttonVariants(),
            "min-h-12 whitespace-normal rounded-xl px-4 py-2 text-center text-sm leading-tight shadow-sm sm:text-base",
          )}
        >
          Enviar comprobante por WhatsApp
          <ExternalLink aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
