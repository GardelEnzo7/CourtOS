export type CustomerDetails = {
  firstName: string;
  lastName: string;
  phone: string;
};

export type CustomerField = keyof CustomerDetails;

export type Venue = {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
};

export type CourtSurface = "Césped sintético" | "Césped panorámico";

export type Court = {
  id: string;
  venueId: string;
  name: string;
  surface: CourtSurface;
  indoor: boolean;
  basePrice: number;
};

export type TimeSlotStatus = "available" | "occupied";

export type TimeSlot = {
  id: string;
  courtId: string;
  startsAt: string;
  durationMinutes: number;
  price: number;
  status: TimeSlotStatus;
};

export type TimeOption = {
  startsAt: string;
  availableCourtCount: number;
  totalCourtCount: number;
};

export type ReservationDraft = {
  customer: CustomerDetails;
  venueId: string | null;
  date: string | null;
  startsAt: string | null;
  courtId: string | null;
};

export type ReservationStep =
  | "customer"
  | "venue"
  | "date"
  | "time"
  | "court"
  | "summary"
  | "proof";

export type ReservationRecord = {
  number: string;
  createdAt: string;
  status: "pending";
  draft: ReservationDraft;
};

export type PaymentBreakdown = {
  total: number;
  deposit: number;
  balance: number;
};

export type ReservationCatalog = {
  venues: readonly Venue[];
  courts: readonly Court[];
};

export type ReservationFlowProps = {
  onExit: () => void;
};

export type ReservationProgressProps = {
  currentStep: number;
  totalSteps: number;
  label: string;
};
