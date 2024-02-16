import type { Metadata } from "next";
import Head from "next/head";
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
      <Head>
        <meta
          name="google-site-verification"
          content="au35IWAv6wyNMRau1Dq5Srahtv6GFA3uWlkYX86p5LA"
        />
      </Head>
      <body>{children}</body>
    </html>
  );
}
