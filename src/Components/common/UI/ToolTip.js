// import ReactTooltip from "react-tooltip";
import { ACCENT_800 } from "./colors";

const ToolTip = ({
  children,
  id,
  className,
  closeOnScroll = true,
  delayHide,
  place,
}) => {
  return (
    // <ReactTooltip
    //   aria-haspopup="true"
    //   id={id || "global"}
    //   closeOnScroll={closeOnScroll}
    //   delayHide={delayHide}
    //   className={`custom-tooltip-radius custom-color ${className}`}
    //   place={place || "top"}
    //   backgroundColor={ACCENT_800}
    //   borderColor={ACCENT_800}
    //   arrowColor={ACCENT_800}
    //   padding="0.5rem"
    //   offset={{ left: -3 }}
    //   effect="solid"
    // >
    //   {children}
    // </ReactTooltip>
    null
  );
};

export default ToolTip;
