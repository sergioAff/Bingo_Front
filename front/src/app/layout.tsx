import type { Metadata } from "next";
import "./globals.css";
import { pressStart2P, roboto } from "@/app/fonts/fonts";
import ReduxProvider from "@/Components/ReduxProvider";
import Header from "@/Components/Header/header";
import Footer from "@/Components/Footer/footer";

export const metadata: Metadata = {
  title: "Bingo Gran Buda",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={`antialiased gradient-bg-animation`}>
          <Header font={pressStart2P.className} />
          <main className={`${roboto.className}`}>{children}</main>
          <Footer font={pressStart2P.className} />
        </body>
      </html>
    </ReduxProvider>
  );
}
