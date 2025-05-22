import type { Metadata } from "next";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Toastify imports

import "react-toastify/dist/ReactToastify.css";

// Importing Providers from layout-providers
import { Providers } from "./layout-providers";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/localworx-logo.jpg",
  },
  title: "LocalWorx | Empowering Local Businesses with Peer-Powered Promotion",
  description:
    "LocalWorx.io is a decentralized platform that helps local businesses grow with word-of-mouth marketing, Bitcoin micro-payments, and community collaboration. Promote, earn, and support local resilience — without the gatekeepers.",
  openGraph: {
    title:
      "LocalWorx | Empowering Local Businesses Through Peer-Powered Promotion",
    description:
      "LocalWorx.io is a decentralized platform that helps local businesses grow through word-of-mouth marketing, Bitcoin micro-payments, and community collaboration. Promote, earn, and support local resilience — without the gatekeepers.",
    url: "https://LocalWorx.io",
    siteName: "LocalWorx",
    images: [
      {
        url: "https://localworx.io/localworx-logo.jpg",
        width: 64,
        height: 64,
        alt: "LocalWorx Logo",
        type: "image/png",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
