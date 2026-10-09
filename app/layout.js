import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--f-display" });
const body = Hanken_Grotesk({ subsets: ["latin"], variable: "--f-body" });
export const metadata = {
  title: "TJ Mistry Interior | Interior Design in Surat",
  description: "Modular kitchens, TV units, pooja mandirs, false ceilings and complete home interiors in Surat. Visit our studio on Dandi Road.",
};
export default function RootLayout({ children }) {
  return (<html lang="en"><body className={`${display.variable} ${body.variable}`}>{children}</body></html>);
}
