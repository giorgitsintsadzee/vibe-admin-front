import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/app/styles/ant.table.scss"
import RecoilWrapper from "./Components/RecoilWrapper/RecoilWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "vibe admin",
  description: "musicapp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RecoilWrapper>
      <html>
        <body className={`${inter.className}`}>
          {children}
        </body>

      </html>
    </RecoilWrapper>

  )
};