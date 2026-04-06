import type { Metadata } from "next";
import { Geist, Geist_Mono, Exo } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar/Navbar";
import Footer from "./_components/Footer/Footer";
import { Toaster } from "react-hot-toast";
import { FaCheckCircle } from "react-icons/fa";
import { MdError } from "react-icons/md";
import Header from "./_components/Header/Header";
import WrapperSessionProvider from "./_components/WrapperSessionProvider/WrapperSessionProvider";
import CartContextProvider from "./_context/cartContext";
import { getUserCart } from "@/services/product.services";
import { getUserWishlist } from "./wishlist/whishlist.services";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ElleStore",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const res = await getUserCart();
  const resp = await getUserWishlist();

  return (
    <html lang="en">
      <body
        className={`${exo.className} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Global Toaster */}

        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            duration: 4000,
            style: {
              borderRadius: "16px",
              padding: "16px",
              fontWeight: "600",
              fontSize: "14px",
            },
            success: {
              icon: <FaCheckCircle className="text-[#50829F]! w-5 h-5" />, 
              style: {
                border: "1px solid #50829F",
                color: "#50829F",
                background: "#ffffff",
              },
            },
            error: {
              icon: <MdError className="text-[#e11d48] w-5 h-5" />, 
              style: {
                border: "1px solid #fca5a5",
                color: "#0f172a",
                background: "#ffffff",
              },
            },
          }}
        />

        <CartContextProvider res={res} resp={resp}>
          <WrapperSessionProvider>
            <Header />

            <Navbar />
            {children}
            <Footer />
          </WrapperSessionProvider>
        </CartContextProvider>
      </body>
    </html>
  );
}
