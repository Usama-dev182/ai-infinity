"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";

// React Query was provided here but never used by any component; it was removed to keep
// it out of every page's client bundle. Re-add a QueryClientProvider when data hooks need it.
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
      {children}
      <Toaster />
    </ThemeProvider>
  );
}
