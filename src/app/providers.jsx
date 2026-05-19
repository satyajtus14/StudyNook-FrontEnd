"use client";
import { ThemeProvider } from "next-themes";

export function Providers({ children }) {
  return (
    <ThemeProvider 
    attribute="class" 
    defaultTheme="light"
     enableSystem={false}
    disableTransitionOnChange
    scriptProps={{ "data-cfasync": "false" }} // ✅ Fixes the script tag warning
    >
      {children}
    </ThemeProvider>
  );
}