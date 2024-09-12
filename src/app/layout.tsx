import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from '@/components/theme-toggle'
import "./globals.css";

export const metadata: Metadata = {
  title: "christianjuth.com",
  description: "My portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ModeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
