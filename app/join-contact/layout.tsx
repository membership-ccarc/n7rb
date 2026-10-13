import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: {
    default: "Join / Contact",
    template: "%s | CCARC | N7RB Helena, Montana",
  },
  description: "Join or contact the Capital City Amateur Radio Club in Helena, Montana.",
  path: "/join-contact",
  ogTitle: "Join / Contact | CCARC Helena, Montana",
});

export default function JoinContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
