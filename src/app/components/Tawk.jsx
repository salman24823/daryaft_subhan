"use client"; // Ensures this runs only on the client side

import { useEffect } from "react";

const TawkChat = () => {
  useEffect(() => {
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    var s1 = document.createElement("script");
    s1.async = true;
    s1.src = "https://embed.tawk.to/67e4f388a833f41905201cd9/1inb5ejm5";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");

    document.body.appendChild(s1); // Append to <body>

    return () => {
      document.body.removeChild(s1); // Cleanup on unmount
    };
  }, []);

  return null; // No visible UI
};

export default TawkChat;
