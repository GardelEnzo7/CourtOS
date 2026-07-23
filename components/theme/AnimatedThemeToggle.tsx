"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const subscribeToClient = () => () => {};

export function AnimatedThemeToggle() {
  const mounted = useSyncExternalStore(
    subscribeToClient,
    () => true,
    () => false,
  );
  const [expanded, setExpanded] = useState(false);
  const isAnimatingRef = useRef(false);
  const themeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const collapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    return () => {
      if (themeTimerRef.current) {
        clearTimeout(themeTimerRef.current);
      }

      if (collapseTimerRef.current) {
        clearTimeout(collapseTimerRef.current);
      }
    };
  }, []);

  function handleClick() {
    if (!mounted || isAnimatingRef.current) {
      return;
    }

    isAnimatingRef.current = true;
    setExpanded(true);

    themeTimerRef.current = setTimeout(() => {
      setTheme(isDark ? "light" : "dark");
      themeTimerRef.current = null;
    }, 250);

    collapseTimerRef.current = setTimeout(() => {
      setExpanded(false);
      isAnimatingRef.current = false;
      collapseTimerRef.current = null;
    }, 700);
  }

  const ariaLabel = !mounted
    ? "Cambiar tema"
    : isDark
      ? "Cambiar a modo claro"
      : "Cambiar a modo oscuro";

  return (
    <motion.button
      type="button"
      aria-label={ariaLabel}
      aria-pressed={mounted ? isDark : undefined}
      disabled={!mounted || expanded}
      onClick={handleClick}
      whileTap={{ scale: 0.96 }}
      animate={{
        width: expanded ? 100 : 46,
      }}
      transition={{
        duration: 0.35,
        ease: "easeInOut",
      }}
      className="relative flex h-11 items-center overflow-hidden rounded-full border border-border bg-card shadow-md"
    >
      {/* Fondo */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: expanded
            ? "linear-gradient(90deg,#1e293b,#fbbf24)"
            : "linear-gradient(90deg,#0f172a,#1e293b)",
        }}
        transition={{ duration: 0.35 }}
      />

      {/* Contenido */}
      <div className="relative flex h-full w-full items-center justify-between px-3">
        <motion.div
          animate={{
            rotate: expanded ? 180 : 0,
            opacity: isDark
              ? expanded
                ? 0
                : 1
              : expanded
                ? 1
                : 0,
            scale: expanded ? 0.5 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          <Moon size={18} className="text-white" />
        </motion.div>

        <motion.div
          animate={{
            rotate: expanded ? 0 : -180,
            opacity: isDark
              ? expanded
                ? 1
                : 0
              : expanded
                ? 0
                : 1,
            scale: expanded ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        >
          <Sun size={18} className="text-yellow-300" />
        </motion.div>
      </div>
    </motion.button>
  );
}
