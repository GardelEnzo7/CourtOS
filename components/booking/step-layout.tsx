import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type StepHeaderProps = {
  eyebrow?: string;
  titleId: string;
  title: string;
  description: string;
};

export function StepHeader({
  eyebrow = "Reserva online",
  titleId,
  title,
  description,
}: StepHeaderProps) {
  return (
    <header>
      <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p>
      <h2
        id={titleId}
        className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl"
      >
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
        {description}
      </p>
    </header>
  );
}

type StepActionsProps = {
  onBack: () => void;
  onContinue?: () => void;
  continueLabel?: string;
  continueDisabled?: boolean;
  continueType?: "button" | "submit";
  busy?: boolean;
  children?: ReactNode;
};

export function StepActions({
  onBack,
  onContinue,
  continueLabel = "Continuar",
  continueDisabled = false,
  continueType = "button",
  busy = false,
  children,
}: StepActionsProps) {
  return (
    <div className="mt-8">
      {children}
      <div className="grid grid-cols-2 gap-3">
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
          type={continueType}
          disabled={continueDisabled || busy}
          onClick={continueType === "button" ? onContinue : undefined}
          className="h-12 rounded-xl text-base shadow-sm"
        >
          {busy ? "Confirmando…" : continueLabel}
          {!busy && <ArrowRight aria-hidden="true" />}
        </Button>
      </div>
    </div>
  );
}
