import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;

  @media screen and (min-width: 768px) {
    width: 100vw;
    height: 100vh;
    height: 100dvh; // dvh for safe area for full screen height in mobile browsers
  }
`;

const PreviewModal = ({ children }) => {
  // this prevents background scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  return <Container>{children}</Container>;
};

export default PreviewModal;
