"use client"

import { useEffect } from "react";
import { usePathname } from 'next/navigation';

const ScrollToTop = () => {
  const pathname = usePathname(); // Get the current pathname

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;