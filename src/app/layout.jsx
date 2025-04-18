import "./globals.css";
import { HeroUIProvider } from "@heroui/react";
// import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
// import { ourFileRouter } from "./api/uploadthing/core";
// import { extractRouterConfig } from "uploadthing/server";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header/page";
import Footer from "./components/Footer/page";
import TawkTo from "./components/Tawk";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Allura&display=swap" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Barriecito&family=Lilita+One&family=Tektur:wght@400..900&display=swap" rel="stylesheet" />
        {/* Lora font family */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Lora:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        />

        {/* Satisfy font family */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Lora:ital,wght@0,400..700;1,400..700&family=Satisfy&display=swap"
          rel="stylesheet"
        ></link>

        {/* Poppins font. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Lora:ital,wght@0,400..700;1,400..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Satisfy&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className="overflow-x-hidden">
        <HeroUIProvider>
          <div className="flex flex-col items-center">
            <Header />
            {/* <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} /> */}

            {children}
            <Footer />
          </div>
        </HeroUIProvider>
        <ToastContainer />
      <TawkTo />
      </body>

    </html>
  );
}
