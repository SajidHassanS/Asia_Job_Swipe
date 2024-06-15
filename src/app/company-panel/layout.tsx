import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "@/components/ThemeProvider";
import  AppDataProvider  from "@/context";
import axios from "axios";
import { baseUrl } from "@/utils/constants";
// import 'chart.js/auto';



export const metadata: Metadata = {
  title: "Asia JobsSwipe",
  description: "Asia JobsSwipe Admin Panel",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let serverIsOnline = false;
  const checkServer = async () => {
    try {
      await axios.get(baseUrl).then((response) => {
        if (response.status === 200) {
          serverIsOnline = true;
        }
      });
    } catch (error: any) {
      console.log(error);
    }
  };

  await checkServer();
  return (
    <AppDataProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="w-full h-screen flex items-center justify-center text-center lg:hidden animate-pulse">
          Please open it on laptop or desktop
        </div>
        <div className="hidden lg:flex">{children}</div>
      </ThemeProvider>
    </AppDataProvider>
  );
}

