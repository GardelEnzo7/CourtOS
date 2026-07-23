import type { ReservationProgressProps } from "@/types/reservation";

export function ReservationProgress({
  currentStep,
  totalSteps,
}: ReservationProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div>
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="font-medium text-foreground">
          Solicitud de reserva
        </span>
        <span className="text-muted-foreground">
          Paso {currentStep} de {totalSteps}
        </span>
      </div>

      <div
        role="progressbar"
        aria-label={`Paso ${currentStep} de ${totalSteps}`}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-valuenow={currentStep}
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary"
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300 motion-reduce:transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
