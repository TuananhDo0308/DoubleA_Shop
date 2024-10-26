import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Providers from "./GlobalRedux/provider";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DoubleA coffee shop",
  description: "Fresh eco-friendly drinks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="relative">
      <body
        className={clsx(dmSans.className, "antialiased h-screen w-screen bg-[#EAEEFE] m-0 p-0")}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
