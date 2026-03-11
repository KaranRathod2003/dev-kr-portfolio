import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SessionProvider from "@/components/providers/SessionProvider";
import GrainOverlay from "@/components/ui/GrainOverlay";
import ScrollProgress from "@/components/ui/ScrollProgress";
// import image from "./public/og-image.png";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Developer Portfolio | Creative & Modern",
//   description:
//     "A modern developer portfolio showcasing projects, skills, and a creative community board.",
//   openGraph: {
//     title: "Developer Portfolio",
//     description: "Modern developer portfolio with creative community features",
//     type: "website",
//   },
// };

export const metadata: Metadata = {
  // 1. Title mein apna naam aur main skill zaroor daalein
  title: "Kr | Full-Stack Developer & Portfolio", 
  description:
    "Explore the portfolio of Kr, a Full-Stack Developer specializing in React, Node.js, and PostgreSQL. View projects, skills, and community features.",
  
  // 2. Keywords (optional but helpful for some engines)
  keywords: ["Web Developer", "React Developer", "Next.js Portfolio", "Full Stack Developer", "PostgreSQL"],

  // 3. OpenGraph (Jab aap link WhatsApp ya Twitter par share karenge)
  openGraph: {
    title: "Kr | Full-Stack Developer Portfolio",
    description: "Modern web applications built with React and Node.js.",
    url: "https://dev-kr-portfolio.vercel.app/",
    siteName: "Kr Portfolio",
    type: "website",
    images: [
      {
        url: "./public/og-image.png", // Public folder mein ek image rakhein jo share karte waqt dikhe
        width: 1200,
        height: 630,
      },
    ],
  },
  
  // 4. Search engine bots ko allow karna
  robots: {
    index: true,
    follow: true,
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <SessionProvider>
          <GrainOverlay />
          <ScrollProgress />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
