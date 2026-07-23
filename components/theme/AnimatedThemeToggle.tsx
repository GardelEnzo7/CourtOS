"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const subscribeToClient = () => () => {};
const THEME_CHANGE_DELAY_MS = 350;
const TOTAL_ANIMATION_MS = 850;

export function AnimatedThemeToggle() {
  const mounted = useSyncExternalStore(
    subscribeToClient,
    () => true,
    () => false,
  );
  const reduceMotion = useReducedMotion() ?? false;
  const { resolvedTheme, setTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);
  const isAnimatingRef = useRef(false);
  const themeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasResolvedTheme =
    resolvedTheme === "light" || resolvedTheme === "dark";
  const isDark = resolvedTheme === "dark";
  const canToggle = mounted && hasResolvedTheme;

  useEffect(() => {
    return () => {
      if (themeTimerRef.current) {
        clearTimeout(themeTimerRef.current);
      }

      if (settleTimerRef.current) {
        clearTimeout(settleTimerRef.current);
      }
    };
  }, []);

  function handleToggle() {
    if (!canToggle || isAnimatingRef.current) {
      return;
    }

    const nextTheme = isDark ? "light" : "dark";

    if (reduceMotion) {
      setTheme(nextTheme);
      return;
    }

    isAnimatingRef.current = true;
    setIsAnimating(true);

    themeTimerRef.current = setTimeout(() => {
      setTheme(nextTheme);
      themeTimerRef.current = null;
    }, THEME_CHANGE_DELAY_MS);

    settleTimerRef.current = setTimeout(() => {
      isAnimatingRef.current = false;
      setIsAnimating(false);
      settleTimerRef.current = null;
    }, TOTAL_ANIMATION_MS);
  }

  const accessibleLabel = !canToggle
    ? "Cambiar tema"
    : isDark
      ? "Cambiar a modo claro"
      : "Cambiar a modo oscuro";

  const motionDuration = reduceMotion ? 0 : 0.22;
  const actionOffset = isAnimating ? (isDark ? 20 : -20) : 0;

  return (
    <motion.button
      type="button"
      aria-label={accessibleLabel}
      aria-busy={isAnimating || undefined}
      title={accessibleLabel}
      disabled={!canToggle || isAnimating}
      onClick={handleToggle}
      initial={false}
      animate={{ width: isAnimating && !reduceMotion ? 88 : 44 }}
      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
      transition={{
        duration: reduceMotion ? 0 : 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative isolate flex h-11 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border bg-card shadow-sm transition-shadow hover:shadow-md focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none disabled:cursor-default"
    >
      <span
        aria-hidden="true"
        className="absolute inset-[3px] overflow-hidden rounded-full"
      >
        <motion.span
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgb(157 194 220), rgb(222 237 246))",
          }}
          initial={false}
          animate={{ opacity: isDark ? 0 : 1 }}
          transition={{ duration: motionDuration }}
        />

        <motion.span
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgb(23 31 52), rgb(47 65 101))",
          }}
          initial={false}
          animate={{ opacity: isDark ? 1 : 0 }}
          transition={{ duration: motionDuration }}
        />

        <motion.span
          className="absolute top-2 left-3 size-1 rounded-full bg-white/75"
          initial={false}
          animate={{
            opacity: isDark ? (isAnimating ? 0.85 : 0.55) : 0,
            scale: isAnimating && isDark ? 1.15 : 1,
          }}
          transition={{ duration: motionDuration }}
        />
        <motion.span
          className="absolute top-3 right-4 size-0.5 rounded-full bg-white/65"
          initial={false}
          animate={{ opacity: isDark ? 0.65 : 0 }}
          transition={{ duration: motionDuration }}
        />
        <motion.span
          className="absolute bottom-2 left-6 size-0.5 rounded-full bg-white/60"
          initial={false}
          animate={{ opacity: isDark && isAnimating ? 0.55 : 0 }}
          transition={{ duration: motionDuration }}
        />

        <motion.span
          className="absolute right-2 bottom-2 h-2 w-7 rounded-full bg-white/45 blur-[0.5px]"
          initial={false}
          animate={{
            opacity: isDark ? 0 : isAnimating ? 0.8 : 0.45,
            x: isAnimating && !isDark ? -5 : 0,
          }}
          transition={{ duration: motionDuration }}
        />
        <motion.span
          className="absolute bottom-3 left-2 h-1.5 w-5 rounded-full bg-white/35 blur-[0.5px]"
          initial={false}
          animate={{
            opacity: isDark || !isAnimating ? 0 : 0.55,
            x: isAnimating && !isDark ? 5 : 0,
          }}
          transition={{ duration: motionDuration }}
        />
      </span>

      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.span
          className="flex size-8 items-center justify-center rounded-full shadow-sm ring-1 ring-black/10"
          initial={false}
          animate={{
            x: reduceMotion ? 0 : actionOffset,
            scale: isAnimating && !reduceMotion ? 0.94 : 1,
            backgroundColor: isDark ? "#f5cf67" : "#eef2f7",
          }}
          transition={{
            duration: motionDuration,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <AnimatePresence initial={false} mode="wait">
            {isDark ? (
              <motion.span
                key="light-action"
                initial={reduceMotion ? false : { opacity: 0, rotate: -45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, rotate: 45 }
                }
                transition={{ duration: reduceMotion ? 0 : 0.14 }}
              >
                <Sun className="size-[18px] text-[#6e5114]" strokeWidth={2} />
              </motion.span>
            ) : (
              <motion.span
                key="dark-action"
                initial={reduceMotion ? false : { opacity: 0, rotate: 45 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, rotate: -45 }
                }
                transition={{ duration: reduceMotion ? 0 : 0.14 }}
              >
                <Moon
                  className="size-[17px] text-[#506078]"
                  strokeWidth={2.2}
                />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.span>
      </span>
    </motion.button>
  );
}
