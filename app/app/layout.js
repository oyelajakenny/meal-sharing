import localFont from "next/font/local";
import "./globals.css";
import ResponsiveNavbar from "@/components/NavBar";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Welcome to Meeshly",
  description: "Connect, Network on meals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="main">
        <ResponsiveNavbar />
        {children}
      </body>
      
    </html>
  );
}
