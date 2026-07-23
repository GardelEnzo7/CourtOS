export type CustomerDetails = {
  name: string;
  phone: string;
  email: string;
};

export type ReservationDraft = {
  customer: CustomerDetails;
  venueId: string | null;
  date: string | null;
};

export type ReservationStep = "customer" | "venue" | "date";

export type CustomerField = keyof CustomerDetails;

export type Venue = {
  id: string;
  name: string;
  description?: string;
};

export type CustomerDetailsStepProps = {
  value: CustomerDetails;
  onChange: (field: CustomerField, value: string) => void;
  onBack: () => void;
  onContinue: (customer: CustomerDetails) => void;
};

export type VenueStepProps = {
  venues: readonly Venue[];
  selectedVenueId: string | null;
  onSelect: (venueId: string) => void;
  onBack: () => void;
  onContinue: () => void;
};

export type DateStepProps = {
  dates: readonly Date[];
  referenceDate: Date;
  selectedDate: string | null;
  selectedVenue: Venue;
  onSelect: (date: string) => void;
  onBack: () => void;
};

export type ReservationProgressProps = {
  currentStep: number;
  totalSteps: number;
};

export type ReservationFlowProps = {
  onExit: () => void;
};
