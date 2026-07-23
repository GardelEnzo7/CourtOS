"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { ClubIntro } from "./club-intro";
import { ReservationForm } from "./ReservationForm";

type ExperienceView = "intro" | "form";
type Direction = 1 | -1;

type MotionContext = {
  direction: Direction;
  reduceMotion: boolean;
};

const panelVariants = {
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

export function LandingExperience() {
  const [view, setView] = useState<ExperienceView>("intro");
  const [direction, setDirection] = useState<Direction>(1);
  const shouldFocusPanelRef = useRef(false);
  const reduceMotion = useReducedMotion() ?? false;

  const handlePanelRef = useCallback((node: HTMLElement | null) => {
    if (node && shouldFocusPanelRef.current) {
      node.focus();
      shouldFocusPanelRef.current = false;
    }
  }, []);

  function navigateTo(nextView: ExperienceView, nextDirection: Direction) {
    shouldFocusPanelRef.current = true;
    setDirection(nextDirection);
    setView(nextView);
  }

  const motionContext = { direction, reduceMotion };

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="w-full overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
    >
      <AnimatePresence
        initial={false}
        mode="wait"
        custom={motionContext}
      >
        <motion.section
          key={view}
          ref={handlePanelRef}
          tabIndex={-1}
          aria-labelledby={
            view === "intro" ? "club-intro-title" : "reservation-form-title"
          }
          custom={motionContext}
          variants={panelVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            duration: reduceMotion ? 0 : 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="outline-none"
        >
          {view === "intro" ? (
            <ClubIntro onSchedule={() => navigateTo("form", 1)} />
          ) : (
            <ReservationForm onBack={() => navigateTo("intro", -1)} />
          )}
        </motion.section>
      </AnimatePresence>
    </div>
  );
}
