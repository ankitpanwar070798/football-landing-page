"use client";
import { useEffect } from "react";
import type { Metadata } from "next";
import { Syne, Poppins, Urbanist } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { ApolloProvider } from '@apollo/client';
import client from '@/apollo/apollo-client';
import 'react-toastify/dist/ReactToastify.css';



const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: "400",
})

const urbanist = Urbanist({
  subsets: ['latin'],
  variable: '--font-urbanist',
  display: 'swap',
})

// export const metadata: Metadata = {
//   title: "Artz Trust",
//   description: "Artz Trust",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: false,
    })
  }, [])
  return (
    <html lang="en" className={`${syne.variable} ${poppins.variable}  ${urbanist.variable}`}>
      <body>
      <ApolloProvider client={client}>
        <AntdRegistry>
          <Navbar/>
          {children}
          <Footer/>
        </AntdRegistry>
        </ApolloProvider>
      </body>
    </html>
  );
}
