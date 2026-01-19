"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="p-2 opacity-0" aria-label="Toggle theme">
        <Sun className="h-5 w-5" />
      </button>
    ); // Avoid hydration mismatch by rendering placeholder
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-accent/10 transition-colors text-foreground focus:outline-none relative"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 90 : 0, scale: theme === "dark" ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center p-2"
      >
        <Sun className="h-5 w-5" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 0 : -90, scale: theme === "dark" ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center justify-center"
      >
        <Moon className="h-5 w-5" />
      </motion.div>
    </button>
  );
}
