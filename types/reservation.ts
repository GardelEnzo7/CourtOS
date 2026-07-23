export type CustomerDetails = {
  name: string;
  phone: string;
  email: string;
};

export type ReservationDraft = {
  customer: CustomerDetails;
  venueId: string | null;
};

export type ReservationStep = "customer" | "venue";

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
};

export type ReservationProgressProps = {
  currentStep: number;
  totalSteps: number;
};

export type ReservationFlowProps = {
  onExit: () => void;
};
