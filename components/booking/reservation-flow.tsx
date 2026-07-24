"use client";

import { useCallback, useMemo, useReducer, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { generateNextCalendarDays } from "@/lib/date-utils";
import {
  getCourt,
  getPaymentBreakdown,
  getVenue,
  mockReservationDataSource,
} from "@/lib/reservations/catalog";
import { whatsappPaymentProofChannel } from "@/lib/reservations/payment-proof";
import type {
  CustomerDetails,
  CustomerField,
  ReservationDraft,
  ReservationFlowProps,
  ReservationRecord,
  ReservationStep,
} from "@/types/reservation";

import { CourtStep } from "./court-step";
import { CustomerDetailsStep } from "./customer-details-step";
import { DateStep } from "./date-step";
import { ProofStep } from "./proof-step";
import { ReservationProgress } from "./reservation-progress";
import { SuccessScreen } from "./success-screen";
import { SummaryStep } from "./summary-step";
import { TimeStep } from "./time-step";
import { VenueStep } from "./venue-step";

type Direction = 1 | -1;

type FlowState = {
  step: ReservationStep;
  direction: Direction;
  draft: ReservationDraft;
  reservation: ReservationRecord | null;
};

type FlowAction =
  | { type: "navigate"; step: ReservationStep; direction: Direction }
  | { type: "set-customer-field"; field: CustomerField; value: string }
  | { type: "set-customer"; value: CustomerDetails }
  | { type: "set-venue"; venueId: string }
  | { type: "set-date"; date: string }
  | { type: "set-time"; startsAt: string }
  | { type: "set-court"; courtId: string }
  | { type: "confirm"; reservation: ReservationRecord }
  | { type: "reset" };

const INITIAL_DRAFT: ReservationDraft = {
  customer: { firstName: "", lastName: "", phone: "" },
  venueId: null,
  date: null,
  startsAt: null,
  courtId: null,
};

const INITIAL_STATE: FlowState = {
  step: "customer",
  direction: 1,
  draft: INITIAL_DRAFT,
  reservation: null,
};

const STEPS: readonly ReservationStep[] = [
  "customer",
  "venue",
  "date",
  "time",
  "court",
  "summary",
  "proof",
];

const STEP_LABELS: Record<ReservationStep, string> = {
  customer: "Tus datos",
  venue: "Sucursal",
  date: "Fecha",
  time: "Horario",
  court: "Cancha",
  summary: "Resumen",
  proof: "Comprobante",
};

const STEP_TITLE_IDS: Record<ReservationStep, string> = {
  customer: "customer-details-title",
  venue: "venue-step-title",
  date: "date-step-title",
  time: "time-step-title",
  court: "court-step-title",
  summary: "summary-step-title",
  proof: "proof-step-title",
};

function reducer(state: FlowState, action: FlowAction): FlowState {
  switch (action.type) {
    case "navigate":
      return { ...state, step: action.step, direction: action.direction };
    case "set-customer-field":
      return {
        ...state,
        draft: {
          ...state.draft,
          customer: { ...state.draft.customer, [action.field]: action.value },
        },
      };
    case "set-customer":
      return { ...state, draft: { ...state.draft, customer: action.value } };
    case "set-venue":
      return {
        ...state,
        draft: {
          ...state.draft,
          venueId: action.venueId,
          date: null,
          startsAt: null,
          courtId: null,
        },
      };
    case "set-date":
      return {
        ...state,
        draft: {
          ...state.draft,
          date: action.date,
          startsAt: null,
          courtId: null,
        },
      };
    case "set-time":
      return {
        ...state,
        draft: {
          ...state.draft,
          startsAt: action.startsAt,
          courtId: null,
        },
      };
    case "set-court":
      return {
        ...state,
        draft: { ...state.draft, courtId: action.courtId },
      };
    case "confirm":
      return { ...state, reservation: action.reservation, direction: 1 };
    case "reset":
      return INITIAL_STATE;
  }
}

const stepVariants = {
  enter: ({
    direction,
    reduceMotion,
  }: {
    direction: Direction;
    reduceMotion: boolean;
  }) => ({
    opacity: 0,
    x: reduceMotion ? 0 : direction * 40,
  }),
  center: { opacity: 1, x: 0 },
  exit: ({
    direction,
    reduceMotion,
  }: {
    direction: Direction;
    reduceMotion: boolean;
  }) => ({
    opacity: 0,
    x: reduceMotion ? 0 : direction * -40,
  }),
};

function createReservationNumber() {
  return `SOL-${String(Date.now()).slice(-6)}`;
}

export function ReservationFlow({ onExit }: ReservationFlowProps) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const shouldFocusStepRef = useRef(false);
  const reduceMotion = useReducedMotion() ?? false;
  const catalog = mockReservationDataSource.getCatalog();
  const baseDate = useMemo(() => new Date(), []);
  const dates = useMemo(
    () => generateNextCalendarDays(baseDate, 14),
    [baseDate],
  );

  const venue = getVenue(catalog, state.draft.venueId);
  const courts = catalog.courts.filter((item) => item.venueId === venue?.id);
  const timeOptions = state.draft.date
    ? mockReservationDataSource.getTimeOptions(courts, state.draft.date)
    : [];
  const availableSlots =
    state.draft.date && state.draft.startsAt
      ? mockReservationDataSource.getAvailableCourtSlots(
          courts,
          state.draft.date,
          state.draft.startsAt,
        )
      : [];
  const court = getCourt(catalog, state.draft.courtId);
  const slot =
    availableSlots.find((item) => item.courtId === state.draft.courtId) ?? null;
  const payment = slot ? getPaymentBreakdown(slot.price) : null;

  const handleStepRef = useCallback((node: HTMLElement | null) => {
    if (node && shouldFocusStepRef.current) {
      node.focus();
      shouldFocusStepRef.current = false;
    }
  }, []);

  function navigate(step: ReservationStep, direction: Direction) {
    shouldFocusStepRef.current = true;
    dispatch({ type: "navigate", step, direction });
  }

  function markRequestAsSent() {
    dispatch({
      type: "confirm",
      reservation: {
        number: createReservationNumber(),
        createdAt: new Date().toISOString(),
        status: "pending",
        draft: state.draft,
      },
    });
  }

  if (state.reservation && venue && court && slot) {
    return (
      <SuccessScreen
        reservation={state.reservation}
        venue={venue}
        court={court}
        slot={slot}
        onNewReservation={() => dispatch({ type: "reset" })}
      />
    );
  }

  const currentStepNumber = STEPS.indexOf(state.step) + 1;
  const motionContext = { direction: state.direction, reduceMotion };

  return (
    <div>
      <ReservationProgress
        currentStep={currentStepNumber}
        totalSteps={STEPS.length}
        label={STEP_LABELS[state.step]}
      />

      <div className="mt-7 min-h-[30rem]">
        <AnimatePresence initial={false} mode="wait" custom={motionContext}>
          <motion.section
            key={state.step}
            ref={handleStepRef}
            tabIndex={-1}
            aria-labelledby={STEP_TITLE_IDS[state.step]}
            custom={motionContext}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: reduceMotion ? 0 : 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="outline-none"
          >
            {state.step === "customer" && (
              <CustomerDetailsStep
                value={state.draft.customer}
                onChange={(field, value) =>
                  dispatch({ type: "set-customer-field", field, value })
                }
                onBack={onExit}
                onContinue={(value) => {
                  dispatch({ type: "set-customer", value });
                  navigate(
                    state.draft.date &&
                      state.draft.startsAt &&
                      state.draft.courtId
                      ? "summary"
                      : "venue",
                    1,
                  );
                }}
              />
            )}
            {state.step === "venue" && (
              <VenueStep
                venues={catalog.venues}
                selectedVenueId={state.draft.venueId}
                onSelect={(venueId) =>
                  dispatch({ type: "set-venue", venueId })
                }
                onBack={() => navigate("customer", -1)}
                onContinue={() => navigate("date", 1)}
              />
            )}
            {state.step === "date" && venue && (
              <DateStep
                dates={dates}
                referenceDate={baseDate}
                selectedDate={state.draft.date}
                selectedVenue={venue}
                onSelect={(date) => dispatch({ type: "set-date", date })}
                onBack={() => navigate("venue", -1)}
                onContinue={() => navigate("time", 1)}
              />
            )}
            {state.step === "time" && state.draft.date && (
              <TimeStep
                date={state.draft.date}
                options={timeOptions}
                selectedTime={state.draft.startsAt}
                onSelect={(startsAt) =>
                  dispatch({ type: "set-time", startsAt })
                }
                onBack={() => navigate("date", -1)}
                onContinue={() => navigate("court", 1)}
              />
            )}
            {state.step === "court" &&
              state.draft.date &&
              state.draft.startsAt && (
                <CourtStep
                  courts={courts}
                  slots={availableSlots}
                  date={state.draft.date}
                  startsAt={state.draft.startsAt}
                  selectedCourtId={state.draft.courtId}
                  onSelect={(courtId) =>
                    dispatch({ type: "set-court", courtId })
                  }
                  onBack={() => navigate("time", -1)}
                  onContinue={() => navigate("summary", 1)}
                />
              )}
            {state.step === "summary" &&
              venue &&
              state.draft.date &&
              court &&
              slot &&
              payment && (
                <SummaryStep
                  customer={state.draft.customer}
                  venue={venue}
                  date={state.draft.date}
                  court={court}
                  slot={slot}
                  payment={payment}
                  editActions={{
                    customer: () => navigate("customer", -1),
                    venue: () => navigate("venue", -1),
                    date: () => navigate("date", -1),
                    time: () => navigate("time", -1),
                    court: () => navigate("court", -1),
                  }}
                  onBack={() => navigate("court", -1)}
                  onContinue={() => navigate("proof", 1)}
                />
              )}
            {state.step === "proof" &&
              venue &&
              state.draft.date &&
              state.draft.startsAt &&
              court &&
              payment && (
                <ProofStep
                  payment={payment}
                  whatsappUrl={whatsappPaymentProofChannel.getSubmissionUrl({
                    customer: state.draft.customer,
                    venue,
                    date: state.draft.date,
                    startsAt: state.draft.startsAt,
                    court,
                  })}
                  onBack={() => navigate("summary", -1)}
                  onSend={markRequestAsSent}
                />
              )}
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
}
