import { MVP_CONFIG } from "@/config/mvp";
import type { ReservationCatalog } from "@/types/reservation";

export const MOCK_RESERVATION_CATALOG = {
  venues: [
    {
      id: "lavalle-centro",
      name: "Lavalle Pádel Centro",
      address: "Lavalle 1845",
      neighborhood: "Centro",
    },
    {
      id: "lavalle-norte",
      name: "Lavalle Pádel Norte",
      address: "Av. Alberdi 1020",
      neighborhood: "Arroyito",
    },
    {
      id: "lavalle-sur",
      name: "Lavalle Pádel Sur",
      address: "Av. San Martín 4800",
      neighborhood: "Zona Sur",
    },
  ],
  courts: [
    {
      id: "centro-1",
      venueId: "lavalle-centro",
      name: "Cancha 1",
      surface: "Césped panorámico",
      indoor: true,
      basePrice: MVP_CONFIG.courtPrice,
    },
    {
      id: "centro-2",
      venueId: "lavalle-centro",
      name: "Cancha 2",
      surface: "Césped sintético",
      indoor: true,
      basePrice: MVP_CONFIG.courtPrice,
    },
    {
      id: "centro-3",
      venueId: "lavalle-centro",
      name: "Cancha 3",
      surface: "Césped sintético",
      indoor: false,
      basePrice: MVP_CONFIG.courtPrice,
    },
    {
      id: "norte-1",
      venueId: "lavalle-norte",
      name: "Cancha 1",
      surface: "Césped panorámico",
      indoor: true,
      basePrice: MVP_CONFIG.courtPrice,
    },
    {
      id: "norte-2",
      venueId: "lavalle-norte",
      name: "Cancha 2",
      surface: "Césped sintético",
      indoor: true,
      basePrice: MVP_CONFIG.courtPrice,
    },
    {
      id: "norte-3",
      venueId: "lavalle-norte",
      name: "Cancha 3",
      surface: "Césped sintético",
      indoor: false,
      basePrice: MVP_CONFIG.courtPrice,
    },
    {
      id: "sur-1",
      venueId: "lavalle-sur",
      name: "Cancha 1",
      surface: "Césped panorámico",
      indoor: true,
      basePrice: MVP_CONFIG.courtPrice,
    },
    {
      id: "sur-2",
      venueId: "lavalle-sur",
      name: "Cancha 2",
      surface: "Césped sintético",
      indoor: true,
      basePrice: MVP_CONFIG.courtPrice,
    },
    {
      id: "sur-3",
      venueId: "lavalle-sur",
      name: "Cancha 3",
      surface: "Césped sintético",
      indoor: false,
      basePrice: MVP_CONFIG.courtPrice,
    },
  ],
} as const satisfies ReservationCatalog;
