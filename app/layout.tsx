import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mây Bông — Một cái ôm cho mọi ngày",
  description: "Cửa hàng gấu bông mềm mại, an toàn và đáng yêu. Gói quà miễn phí, giao hàng toàn quốc.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
