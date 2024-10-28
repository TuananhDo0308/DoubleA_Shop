import UserProfileNavbar from "@/components/UserProfileNavbar";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"] });


export default function UserInfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <body
        className={"antialiased h-screen w-screen bg-[#EAEEFE] m-0 p-0"}
      >
        <UserProfileNavbar/>
        {children}
      </body>

  );
}
