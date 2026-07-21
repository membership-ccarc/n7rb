import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Join / Contact",
    template: "%s | CCARC | N7RB Helena, Montana",
  },
  description: "Join or contact the Capital City Amateur Radio Club in Helena, Montana.",
  alternates: { canonical: "/join-contact" },
};

export default function JoinContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
