import type { Metadata } from "next";
import "@/components/ui/globals.css";

export const metadata: Metadata = {
  title: "일한 시간 계산기",
  description: "일한 시간의 총량을 계산할 수 있는 홈페이지",
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
