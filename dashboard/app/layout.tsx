import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PM Designer 儀表板",
  description: "PM Designer 專案追蹤儀表板：RACI / WBS / 會議與 action item 檢視",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
