import type { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title: "Artz Trust",
  description: "Artz Trust",
};

export default function CoachingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>{children}</section>
  );
}
