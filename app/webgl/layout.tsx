import { Metadata } from "next";

export const metadata: Metadata = {
  title: "WebGL",
  icons: "/favicon.ico",
};

export default function WebglLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
