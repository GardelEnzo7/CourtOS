import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type ReservationFormProps = {
  onBack: () => void;
};

export function ReservationForm({ onBack }: ReservationFormProps) {
  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Volver
      </button>

      <header className="mt-3">
        <p className="text-sm font-medium text-muted-foreground">
          Lavalle Pádel
        </p>
        <h2
          id="reservation-form-title"
          className="mt-1 text-2xl font-bold tracking-tight text-foreground"
        >
          Empecemos con tus datos
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Completá esta información para iniciar la solicitud. Este paso todavía
          no confirma ningún turno.
        </p>
      </header>

      <form
        aria-labelledby="reservation-form-title"
        className="mt-6 space-y-5"
      >
        <div className="space-y-2">
          <label
            htmlFor="reservation-name"
            className="block text-sm font-medium text-foreground"
          >
            Nombre
          </label>

          <input
            id="reservation-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
            placeholder="Juan Pérez"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="reservation-phone"
            className="block text-sm font-medium text-foreground"
          >
            Teléfono
          </label>

          <input
            id="reservation-phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
            placeholder="341..."
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="reservation-email"
            className="block text-sm font-medium text-foreground"
          >
            Email
          </label>

          <input
            id="reservation-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
            placeholder="nombre@email.com"
          />
        </div>

        <Button
          className="mt-4 w-full rounded-xl bg-primary py-3 font-medium text-primary-foreground transition-colors hover:opacity-90"
          type="button"
          aria-describedby="reservation-disclaimer"
        >
          Continuar →
        </Button>

        <p
          id="reservation-disclaimer"
          className="text-center text-xs text-muted-foreground"
        >
          Solicitud sujeta a confirmación del club.
        </p>
      </form>
    </div>
  );
}
