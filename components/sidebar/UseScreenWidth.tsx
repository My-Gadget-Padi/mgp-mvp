"use client";
import { useState, useEffect } from 'react';

// Hook to determine if the screen width is less than a specified size
export function useScreenWidth(threshold: number) {
  const [isSmallScreen, setIsSmallScreen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < threshold;
    }
    return false; // Default value for server-side rendering or environments without window
  });

  useEffect(() => {
    function handleResize() {
      if (typeof window !== 'undefined') {
        setIsSmallScreen(window.innerWidth < threshold);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial size

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [threshold]);

  return isSmallScreen;
};