import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
const dmSans = DM_Sans({ subsets: ["latin"] });
import { AuthProvider } from "@/context/AuthContext";
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
    <AuthProvider>
      <html lang="en" className="relative">
        <body className={clsx(dmSans.className, "antialiased bg-[#EAEEFE] m-0 p-0")}>
          {children}
        </body>
      </html>
    </AuthProvider>
    
  );
}