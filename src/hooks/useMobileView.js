import { useState, useEffect } from "react";

/**
 * Custom hook to determine whether to show Mobile or Desktop layout
 *
 * @returns boolean value, true for Mobile layout, false for Desktop layout
 */
const useMobileView = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return true; // Default value for SSR or when `window` is not available
  });

  const setDeviceType = () => setIsMobile(window?.innerWidth < 768);

  useEffect(() => {
    setIsMobile(window?.innerWidth < 769);
    window.addEventListener("resize", setDeviceType);
    return () => {
      window.removeEventListener("resize", setDeviceType);
    };
  }, []);

  return isMobile;
};

export default useMobileView;
