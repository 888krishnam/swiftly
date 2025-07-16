"use client";

import { useState, useEffect } from "react";

export const useScroll = (threshold: number) => {
  console.log("useScroll hook called with threshold:", threshold); // Add this
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    console.log("useEffect is running!"); // Add this first
    console.log(threshold);
    const handleScroll = () => {
      console.log("Scrolled By", window.scrollY);
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]); 

  return isScrolled;
};
