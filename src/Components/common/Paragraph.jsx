import styled, { css } from "styled-components";

import { ACCENT_800 } from "@common/UI/colors";
import { device } from "@common/UI/Responsive";

const commonStyles = css`
  font-family: "Montserrat";
  display: ${({ display }) => display || "initial"};
  opacity: ${({ opacity }) => opacity || 1};
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
  color: ${({ color }) => color || ACCENT_800};
  text-align: ${({ textAlign }) => textAlign || "left"};
  margin: ${({ margin }) => margin || 0};
  padding: ${({ padding }) => padding || 0};
  white-space: ${({ whiteSpace }) => whiteSpace || "inherit"};
  text-transform: ${({ textTransform }) => textTransform || "none"};
  text-decoration: ${({ textDecoration }) => textDecoration || "none"};
  word-break: ${({ wordBreak }) => wordBreak || "inherit"};
  cursor: ${({ cursor }) => !!cursor && cursor};
  text-underline-offset: ${({ textUnderlineOffset }) =>
    textUnderlineOffset || "none"};
`;

export const Large = styled.p`
  ${commonStyles}
  font-size: 18px;
  line-height: 145%;
  letter-spacing: -4%;
`;
export const Medium = styled.p`
  ${commonStyles}
  font-size: 16px;
  line-height: 145%;
  letter-spacing: -4%;
`;
export const Small = styled.p`
  ${commonStyles}
  font-size: 14px;
  line-height: 145%;
  letter-spacing: -4%;
`;
export const XSmall = styled.p`
  ${commonStyles}
  font-size: 12px;
  line-height: 145%;
  letter-spacing: -4%;
`;
