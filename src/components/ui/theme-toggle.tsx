"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Both icons are rendered and swapped with the `dark` class, so the server and
 * client markup match without a "mounted" state.
 */
export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle colour theme"
      title="Toggle colour theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun aria-hidden="true" className="h-4 w-4 hidden dark:block" />
      <Moon aria-hidden="true" className="h-4 w-4 dark:hidden" />
    </Button>
  );
}
