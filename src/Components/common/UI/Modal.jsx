import { useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import Bugsnag from "@bugsnag/js";

import useOutsideAlert from "@hooks/useOutsideAlert";
import ClientOnlyPortal from "@components/ClientOnlyPortal";
import { ACCENT_0 } from "./colors";
import { boxShadowDs2 } from "./styles";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background-color: ${ACCENT_0};
  border: ${({ border }) => border || "none"};
  border-radius: ${({ borderRadius }) => borderRadius};
  ${({ boxShadow }) => boxShadow && boxShadowDs2};
  overflow: ${({ overflow }) => overflow || "auto"};
  animation: fade-in 0.3s ease-in-out;

  @media screen and (max-width: 768px) {
    width: ${({ mobileWidth }) => mobileWidth || "100vw"};
    height: ${({ mobileHeight }) => mobileHeight || "100vh"};
    height: ${({ mobileHeight }) =>
      mobileHeight || "100dvh"}; // dvh for safe area incase of mobile browsers
    max-width: unset;
    max-height: unset;
    border-radius: ${({ mobileBorderRadius }) => mobileBorderRadius || "unset"};
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-1.5rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  * {
    box-sizing: border-box;
  }

  ${({ XS }) =>
    XS &&
    css`
      width: ${({ width }) => width || "30vw"};
      height: ${({ height }) => height || "60vh"};
      max-width: ${({ maxWidth }) => maxWidth || "30rem"};
      /* max-height: ${({ maxHeight }) => maxHeight || "30rem"}; */
    `}

  ${({ S }) =>
    S &&
    css`
      width: ${({ width }) => width || "40vw"};
      height: ${({ height }) => height || "80vh"};
      max-width: ${({ maxWidth }) => maxWidth || "40rem"};
      max-height: ${({ maxHeight }) => maxHeight || "40rem"};
    `}

  ${({ M1 }) =>
    M1 &&
    css`
      width: ${({ width }) => width || "50vw"};
      height: ${({ height }) => height || "80vh"};
      max-width: ${({ maxWidth }) => maxWidth || "45rem"};
      max-height: ${({ maxHeight }) => maxHeight || "45rem"};
    `}

  ${({ M2 }) =>
    M2 &&
    css`
      width: ${({ width }) => width || "50vw"};
      height: ${({ height }) => height || "100vh"};
      height: ${({ height }) => height || "100dvh"};
      max-width: ${({ maxWidth }) => maxWidth || "45rem"};
      max-height: ${({ maxHeight }) => maxHeight || "100vh"};
      max-height: ${({ maxHeight }) => maxHeight || "100dvh"};
    `}

  ${({ M3 }) =>
    M3 &&
    css`
      width: ${({ width }) => width || "55vw"};
      height: ${({ height }) => height || "60vh"};
      max-width: ${({ maxWidth }) => maxWidth || "55rem"};
      max-height: ${({ maxHeight }) => maxHeight || "90vh"};
    `}

  ${({ L }) =>
    L &&
    css`
      width: ${({ width }) => width || "75vw"};
      height: ${({ height }) => height || "100vh"};
      height: ${({ height }) => height || "100dvh"};
      max-width: ${({ maxWidth }) => maxWidth || "67.5rem"};
      max-height: ${({ maxHeight }) => maxHeight || "100vh"};
      max-height: ${({ maxHeight }) => maxHeight || "100dvh"};
    `}
`;

const Modal = ({
  XS,
  S,
  M1,
  M2,
  L,
  M3,
  width,
  height,
  maxWidth,
  maxHeight,
  mobileWidth,
  mobileHeight,
  border,
  borderRadius = "1rem",
  mobileBorderRadius,
  children,
  boxShadow,
  overflow,
  togglePopup = null,
  backgroundClickEnabled = false,
  ignoreId = null,
}) => {
  const containerRef = useRef(null);

  // togglePopup callback required when backgroundClickEnabled is true
  useOutsideAlert(
    containerRef,
    backgroundClickEnabled ? togglePopup : () => {},
    ignoreId
  );

  // This prevents background scrolling when modal is open
  useEffect(() => {
    try {
      document.body.style.top = `-${window.scrollY}px`;
      document.body.classList.add("modal-open");
      return () => {
        document.body.classList.remove("modal-open");
        const scrollY = document.body.style.top;
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      };
    } catch (error) {
      Bugsnag.notify(error);
    }
  }, []);

  return (
    <ClientOnlyPortal selector="#modalPortal">
      <Container>
        <Content
          XS={XS}
          S={S}
          M1={M1}
          M2={M2}
          L={L}
          M3={M3}
          ref={containerRef}
          width={width}
          height={height}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
          mobileWidth={mobileWidth}
          mobileHeight={mobileHeight}
          border={border}
          borderRadius={borderRadius}
          mobileBorderRadius={mobileBorderRadius}
          boxShadow={boxShadow}
          overflow={overflow}
        >
          {children}
        </Content>
      </Container>
    </ClientOnlyPortal>
  );
};

export default Modal;
