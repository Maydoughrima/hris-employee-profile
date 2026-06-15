import { Inter, Poppins } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

export const metadata = {
  title: "HRIS Employee Profile Module",
  description: "Employee profile management system",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased bg-background`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}