import { useEffect } from "react";

// Custom hook that listens for an out of target event
//TODO: revisit this logic

const useOutsideAlert = (ref, handleClick = () => {}, ignoreId) => {
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        ref?.current &&
        !ref.current.contains(event?.target) &&
        !event?.target?.id?.includes?.(ignoreId)
      ) {
        handleClick();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, ignoreId, handleClick]);
};

export default useOutsideAlert;
