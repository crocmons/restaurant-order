import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideNav from "@/components/shared/SideNav";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          
        <main className="bg-slate-100 min-h-screen">
          <div className="md:w-72 hidden md:block fixed">
            <SideNav />
          </div>
          <div className="md:ml-72">
            
            {children}
            </div>
        </main>
      </body>
    </html>
  );
}
