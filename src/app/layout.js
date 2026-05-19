import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { ToastContainer } from "react-toastify";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "StudyNook",           // fallback if page has no metadata
    template: "%s",     // optional: wraps page titles automatically
  },
  description: "StudyNook is your ultimate study companion, providing a comprehensive platform for students to enhance their learning experience. With a wide range of features including personalized study plans, interactive quizzes, and collaborative study groups, StudyNook empowers students to achieve their academic goals efficiently and effectively.",
};


export default function RootLayout({ children }) {
  return (
       <html lang="en" suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} >

      <body className="min-h-full flex flex-col">
        <Providers>
        <Navbar />
        <main>
           {children}
        </main>
         
         <Footer /> 
         <ToastContainer />
         </Providers>
        </body>
    </html>
  );
}
