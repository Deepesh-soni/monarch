import styled, { css } from "styled-components";
import {
  ACCENT_100,
  ACCENT_500,
  ERROR_RED_500,
  ERROR_RED_600,
  ACCENT_0,
  ACCENT_800,
  ACCENT_900,
} from "./colors";

export const Button = styled.button`
  box-sizing: border-box;
  display: ${({ block }) => (block ? "block" : "inline")};
  background-color: ${({ color }) => color || "#142C8E"};
  padding: ${({ padding }) => padding || "0.5rem 1rem"};
  color: ${ACCENT_100};
  line-height: 1.25rem;
  min-width: ${({ width }) => !width && "7rem"};
  width: ${({ width }) => (width ? width : "fit-content")};
  font-family: "Montserrat";
  font-size: 12.5px;
  font-weight: 600;
  border-radius: 0.625rem;
  border: 1px solid ${({ color }) => color || "#142C8E"};
  overflow: hidden;
  letter-spacing: -2%;
  cursor: pointer;
  text-transform: uppercase;
  white-space: nowrap;
  border-radius: ${({ borderRadius }) => borderRadius || "0.625rem"};

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || "#142C8E"};
    border-color: ${({ hoverColor }) => hoverColor || "#142C8E"};
  }

  /* Danger Button */
  ${({ danger }) =>
    danger &&
    css`
      border: 1px solid ${ERROR_RED_500};
      background-color: ${ERROR_RED_500};
      color: ${({ color }) => color || ACCENT_0};

      &:hover {
        background-color: ${ERROR_RED_600};
        border-color: ${ERROR_RED_600};
        color: ${({ hoverColor }) => hoverColor || ACCENT_0};
      }
    `}

  /* Secondary Button */
  ${({ secondary }) =>
    secondary &&
    css`
      border: 1px solid ${ACCENT_800};
      background-color: ${ACCENT_800};
      color: ${({ color }) => color || ACCENT_0};

      &:hover {
        background-color: ${ACCENT_800};
        color: ${({ hoverColor }) => hoverColor || ACCENT_0};
        border-color: ${ACCENT_800};
      }
    `}

  /* Outline Button */
  ${({ outline, secondary }) =>
    outline &&
    !secondary &&
    css`
      background-color: transparent;
      color: ${({ color }) => color || "#142C8E"};
      border-color: "#142C8E";

      &:hover {
        background-color: transparent;
        color: ${({ hoverColor }) => hoverColor || "#142C8E"};
        border-color: "#142C8E";
      }
    `}

  /* Disabled Button */
  ${({ disabled, outline }) =>
    disabled &&
    css`
      cursor: not-allowed;
      opacity: 40%;
      background-color: ${outline ? "transparent" : ACCENT_500};
      border: 1px solid ${ACCENT_500};
      color: ${outline ? ACCENT_500 : ACCENT_100};

      &:hover {
        background-color: ${outline ? "transparent" : ACCENT_500};
        border-color: ${outline ? ACCENT_500 : "transparent"};
        color: ${outline ? ACCENT_500 : ACCENT_100};
      }
    `}

  /* Text CTA Button */
  ${({ textCta, secondary }) =>
    textCta &&
    !secondary &&
    css`
      color: ${({ color }) => color || "#142C8E"};
      border: none;
      padding: 0.5rem 0rem;
      min-width: unset;
      background: transparent;
      text-decoration: ${({ textDecoration }) => textDecoration};

      &:hover {
        background-color: transparent;
        color: ${({ color }) => color || "#142C8E"};
      }
    `}

  /* Secondary Text CTA Button */
  ${({ textCta, secondary }) =>
    textCta &&
    secondary &&
    css`
      color: ${({ color }) => color || ACCENT_800};
      border: none;
      padding: 0.5rem 0rem;
      min-width: unset;
      background: transparent;
      text-decoration: ${({ textDecoration }) => textDecoration};

      &:hover {
        background-color: transparent;
        color: ${({ color }) => color || ACCENT_900};
      }
    `}
`;
