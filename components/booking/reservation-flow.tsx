"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { CLUB_CONFIG } from "@/config/club";
import { generateNextCalendarDays } from "@/lib/date-utils";
import type {
  CustomerDetails,
  CustomerField,
  ReservationDraft,
  ReservationFlowProps,
  ReservationStep,
} from "@/types/reservation";

import { CustomerDetailsStep } from "./customer-details-step";
import { DateStep } from "./date-step";
import { ReservationProgress } from "./reservation-progress";
import { VenueStep } from "./venue-step";

type Direction = 1 | -1;

type MotionContext = {
  direction: Direction;
  reduceMotion: boolean;
};

const TOTAL_STEPS = 3;

const STEP_NUMBERS: Record<ReservationStep, number> = {
  customer: 1,
  venue: 2,
  date: 3,
};

const STEP_TITLE_IDS: Record<ReservationStep, string> = {
  customer: "customer-details-title",
  venue: "venue-step-title",
  date: "date-step-title",
};

const INITIAL_DRAFT: ReservationDraft = {
  customer: {
    name: "",
    phone: "",
    email: "",
  },
  venueId: null,
  date: null,
};

const stepVariants = {
  enter: ({ direction, reduceMotion }: MotionContext) => ({
    opacity: 0,
    x: reduceMotion ? 0 : direction * 48,
  }),
  center: {
    opacity: 1,
    x: 0,
  },
  exit: ({ direction, reduceMotion }: MotionContext) => ({
    opacity: 0,
    x: reduceMotion ? 0 : direction * -48,
  }),
};

export function ReservationFlow({ onExit }: ReservationFlowProps) {
  const [draft, setDraft] = useState<ReservationDraft>(INITIAL_DRAFT);
  const [step, setStep] = useState<ReservationStep>("customer");
  const [direction, setDirection] = useState<Direction>(1);
  const [baseDate] = useState(() => new Date());
  const shouldFocusStepRef = useRef(false);
  const reduceMotion = useReducedMotion() ?? false;
  const dates = useMemo(
    () => generateNextCalendarDays(baseDate, 14),
    [baseDate],
  );

  const handleStepRef = useCallback((node: HTMLElement | null) => {
    if (node && shouldFocusStepRef.current) {
      node.focus();
      shouldFocusStepRef.current = false;
    }
  }, []);

  function navigateTo(nextStep: ReservationStep, nextDirection: Direction) {
    shouldFocusStepRef.current = true;
    setDirection(nextDirection);
    setStep(nextStep);
  }

  function updateCustomer(field: CustomerField, value: string) {
    setDraft((currentDraft) => ({
      ...currentDraft,
      customer: {
        ...currentDraft.customer,
        [field]: value,
      },
    }));
  }

  function continueFromCustomer(customer: CustomerDetails) {
    setDraft((currentDraft) => ({
      ...currentDraft,
      customer,
    }));
    navigateTo("venue", 1);
  }

  function selectVenue(venueId: string) {
    setDraft((currentDraft) => ({
      ...currentDraft,
      // Date remains selected until availability depends on the venue.
      venueId,
    }));
  }

  function selectDate(date: string) {
    setDraft((currentDraft) => ({
      ...currentDraft,
      date,
    }));
  }

  const selectedVenue =
    CLUB_CONFIG.venues.find((venue) => venue.id === draft.venueId) ?? null;
  const currentStepNumber = STEP_NUMBERS[step];
  const motionContext = { direction, reduceMotion };

  return (
    <div>
      <ReservationProgress
        currentStep={currentStepNumber}
        totalSteps={TOTAL_STEPS}
      />

      <div className="mt-7 min-h-[31rem]">
        <AnimatePresence
          initial={false}
          mode="wait"
          custom={motionContext}
        >
          <motion.section
            key={step}
            ref={handleStepRef}
            tabIndex={-1}
            aria-labelledby={STEP_TITLE_IDS[step]}
            custom={motionContext}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: reduceMotion ? 0 : 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="outline-none"
          >
            {step === "customer" ? (
              <CustomerDetailsStep
                value={draft.customer}
                onChange={updateCustomer}
                onBack={onExit}
                onContinue={continueFromCustomer}
              />
            ) : step === "venue" ? (
              <VenueStep
                venues={CLUB_CONFIG.venues}
                selectedVenueId={draft.venueId}
                onSelect={selectVenue}
                onBack={() => navigateTo("customer", -1)}
                onContinue={() => navigateTo("date", 1)}
              />
            ) : (
              selectedVenue && (
                <DateStep
                  dates={dates}
                  referenceDate={baseDate}
                  selectedDate={draft.date}
                  selectedVenue={selectedVenue}
                  onSelect={selectDate}
                  onBack={() => navigateTo("venue", -1)}
                />
              )
            )}
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
}
