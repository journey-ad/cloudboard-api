import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { Geist, Geist_Mono, Bungee_Shade } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import clsx from "clsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bungeeShade = Bungee_Shade({
  variable: "--font-bungee-shade",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "CloudBoard",
  description: "Open source Windows & iOS clipboard synchronization tool, supports end-to-end encryption",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html suppressHydrationWarning lang={locale}>
      <body
        className={clsx(
          geistSans.variable,
          geistMono.variable,
          bungeeShade.variable,
          "antialiased"
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
