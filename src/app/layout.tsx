import type { Metadata } from "next";
import "@/components/ui/globals.css";

export const metadata: Metadata = {
  title: "일한 시간 계산기",
  description: "일한 시간 계산기",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
