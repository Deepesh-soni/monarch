import React from "react";
import { toast } from "react-toastify";
import { PRIMARY_300, LIGHT_RED, ACCENT_0 } from "./colors";

const CustomToast = ({ type, message }) => {
  const toastStyles = {
    success: {
      backgroundColor: PRIMARY_300,
      color: ACCENT_0,
    },
    error: {
      backgroundColor: LIGHT_RED,
      color: ACCENT_0,
    },
    // Add styles for other types (info, warning)
  };

  return <div style={toastStyles[type]}>{message}</div>;
};

export const showToast = (type, message) => {
  toast(<CustomToast type={type} message={message} />);
};
