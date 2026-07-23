"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
    
  return (
        <Button
        variant="ghost"
        size="icon"
        onClick={() =>
            setTheme(resolvedTheme === "dark" ? "light" : "dark")
        }
        className="relative"
        >
        <Sun
            className="
            h-5 w-5
            text-yellow-400
            rotate-90 scale-0
            transition-all duration-500
            dark:rotate-0 dark:scale-100
            "
        />

        <Moon
            className="
            absolute
            h-5 w-5
            rotate-0 scale-100
            transition-all duration-500
            dark:-rotate-90 dark:scale-0
            "
        />
        </Button>
  );
}