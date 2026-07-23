import type { Venue } from "@/types/reservation";

export const LAVALLE_CONFIG = {
  // PLACEHOLDER: reemplazar por la URL real del Instagram de Lavalle Pádel.
  // La URL actual abre Instagram, pero no apunta a una cuenta específica.
  instagramUrlPlaceholder: "https://www.instagram.com/",
  // PLACEHOLDER: reemplazar estos nombres por las tres sedes reales.
  venues: [
    { id: "sede-1", name: "Sede 1" },
    { id: "sede-2", name: "Sede 2" },
    { id: "sede-3", name: "Sede 3" },
  ] as const satisfies readonly Venue[],
} as const;
