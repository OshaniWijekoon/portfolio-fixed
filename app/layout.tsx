import type { Metadata } from "next";
import {
  Inria_Serif,
  Noto_Serif_KR,
  Instrument_Sans,
  Joan,
} from "next/font/google";
import "./globals.css";

const inriaSerif = Inria_Serif({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-inria-serif",
  display: "swap",
});

const jejuMyeongjo = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jeju-myeongjo",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const joan = Joan({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-joan",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oshani Wijekoon — UI/UX & Web Developer",
  description: "Portfolio of Oshani Wijekoon, UI/UX & Web Developer.",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const bodyClass =
    inriaSerif.variable +
    " " +
    jejuMyeongjo.variable +
    " " +
    instrumentSans.variable +
    " " +
    joan.variable;

  return (
    <html lang="en">
      <body className={bodyClass}>{props.children}</body>
    </html>
  );
}