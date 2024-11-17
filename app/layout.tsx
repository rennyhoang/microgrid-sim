import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

export const metadata: Metadata = {
  title: "SunScope",
  description: "A tool to help you visualize sustainable solar solutions",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
      <main>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        {children}
        </ThemeProvider>
      </main>
    </body>
    </html>
  )
}
