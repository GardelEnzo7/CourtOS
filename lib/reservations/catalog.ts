import { MVP_CONFIG } from "@/config/mvp";
import { MOCK_RESERVATION_CATALOG } from "@/data/mock-reservation-data";
import type {
  Court,
  PaymentBreakdown,
  ReservationCatalog,
  TimeOption,
  TimeSlot,
  Venue,
} from "@/types/reservation";

export interface ReservationDataSource {
  getCatalog(): ReservationCatalog;
  getTimeOptions(
    courts: readonly Court[],
    date: string,
  ): readonly TimeOption[];
  getAvailableCourtSlots(
    courts: readonly Court[],
    date: string,
    startsAt: string,
  ): readonly TimeSlot[];
}

const SLOT_TIMES = [
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
] as const;

const AVAILABILITY_PATTERN = [0, 0, 1, 2, 3, 2, 0, 1, 3, 2, 0] as const;
const SLOT_DURATION_MINUTES = 90;

function stringHash(value: string) {
  return [...value].reduce(
    (hash, character) => (hash * 31 + character.charCodeAt(0)) >>> 0,
    7,
  );
}

function getAvailabilityCount(date: string, timeIndex: number) {
  const dayOffset = stringHash(date) % AVAILABILITY_PATTERN.length;
  return AVAILABILITY_PATTERN[
    (timeIndex + dayOffset) % AVAILABILITY_PATTERN.length
  ];
}

function getSlotsForTime(
  courts: readonly Court[],
  date: string,
  startsAt: string,
): readonly TimeSlot[] {
  const timeIndex = SLOT_TIMES.indexOf(
    startsAt as (typeof SLOT_TIMES)[number],
  );
  if (timeIndex < 0 || courts.length === 0) return [];

  const availableCount = Math.min(
    getAvailabilityCount(date, timeIndex),
    courts.length,
  );
  const courtOffset = stringHash(`${date}-${startsAt}`) % courts.length;

  return courts.map((court, courtIndex) => {
    const availabilityRank =
      (courtIndex - courtOffset + courts.length) % courts.length;

    return {
      id: `${court.id}-${date}-${startsAt}`,
      courtId: court.id,
      startsAt,
      durationMinutes: SLOT_DURATION_MINUTES,
      price: court.basePrice,
      status: availabilityRank < availableCount ? "available" : "occupied",
    };
  });
}

function createTimeOptions(
  courts: readonly Court[],
  date: string,
): readonly TimeOption[] {
  return SLOT_TIMES.map((startsAt) => {
    const availableSlots = getSlotsForTime(courts, date, startsAt).filter(
      (slot) => slot.status === "available",
    );

    return {
      startsAt,
      availableCourtCount: availableSlots.length,
      totalCourtCount: courts.length,
    };
  });
}

export const mockReservationDataSource: ReservationDataSource = {
  getCatalog: () => MOCK_RESERVATION_CATALOG,
  getTimeOptions: createTimeOptions,
  getAvailableCourtSlots: (courts, date, startsAt) =>
    getSlotsForTime(courts, date, startsAt).filter(
      (slot) => slot.status === "available",
    ),
};

export function getVenue(
  catalog: ReservationCatalog,
  venueId: string | null,
): Venue | null {
  return catalog.venues.find((venue) => venue.id === venueId) ?? null;
}

export function getCourt(
  catalog: ReservationCatalog,
  courtId: string | null,
): Court | null {
  return catalog.courts.find((court) => court.id === courtId) ?? null;
}

export function getPaymentBreakdown(total: number): PaymentBreakdown {
  const deposit = Math.ceil((total * MVP_CONFIG.depositRate) / 500) * 500;
  return { total, deposit, balance: total - deposit };
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(price);
}
