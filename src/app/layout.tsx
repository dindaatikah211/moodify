import type { ReactNode } from "react";
import { PwaProvider } from "@/features/pwa/components/PwaProvider";
import SmoothScroll from "@/shared/components/commons/SmoothScroll";
import { FONT_VARIABLES } from "@/shared/constants/Fonts";
import { SITE_METADATA, SITE_VIEWPORT } from "@/shared/constants/Site";
import "./globals.css";

export const metadata = SITE_METADATA;

export const viewport = SITE_VIEWPORT;

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="id" className={`${FONT_VARIABLES} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <PwaProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </PwaProvider>
      </body>
    </html>
  );
}