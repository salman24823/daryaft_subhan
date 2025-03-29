"use client";
import { useEffect } from "react";

const TawkTo = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/67e7c36501c5b0190a989b42/1ingl6i01";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div>
<h1>Chat Return Working</h1>
  </div>; // No UI element needed
};

export default TawkTo;