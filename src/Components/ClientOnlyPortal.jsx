import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Bugsnag from "@bugsnag/js";

export default function ClientOnlyPortal({ children, selector }) {
  const ref = useRef();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      ref.current = document.querySelector(selector);
      setMounted(true);
    } catch (error) {
      Bugsnag.notify(error);
    }
  }, [selector]);

  return mounted ? createPortal(children, ref.current) : null;
}
