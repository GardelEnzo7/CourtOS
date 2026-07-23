import { Button } from "@/components/ui/button";

export function ReservationForm() {
  return (
    <form className="space-y-5">
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
        Esto inicia una solicitud de reserva. El club deberá confirmarla y la
        disponibilidad no está garantizada.
      </p>
    </form>
  );
}
