import React, { useRef, useEffect, useState } from "react";
import { Tooltip } from "antd";
import styled from "styled-components";

const EllipsisText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const TextWithEllipsis = ({ children, ...props }) => {
  const textRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const element = textRef.current;
      if (element) {
        setIsOverflowing(element.scrollWidth > element.clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    
    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [children]);

  return (
    <Tooltip title={children} visible={isOverflowing ? undefined : false}>
      <EllipsisText ref={textRef} {...props}>
        {children}
      </EllipsisText>
    </Tooltip>
  );
};

export default TextWithEllipsis;
