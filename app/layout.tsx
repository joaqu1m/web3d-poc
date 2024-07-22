import { GlobalEventProvider } from "@/app/_context/GlobalEventProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web3d",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* https://github.com/mdn/dom-examples/blob/main/webgl-examples/tutorial/sample5/index.html */}
      {/* <script
        src="https://cdnjs.cloudflare.com/ajax/libs/gl-matrix/2.8.1/gl-matrix-min.js"
        integrity="sha512-zhHQR0/H5SEBL3Wn6yYSaTTZej12z0hVZKOv3TwCUXT1z5qeqGcXJLLrbERYRScEDDpYIJhPC1fk31gqR783iQ=="
        crossOrigin="anonymous"
        defer
      ></script> */}
      <body className={inter.className}>
        <GlobalEventProvider>{children}</GlobalEventProvider>
      </body>
    </html>
  );
}
