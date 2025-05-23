import styled, { css } from "styled-components";
import { ACCENT_800 } from "@common/UI/colors";

const commonStyles = css`
  font-family: "Montserrat", sans-serif;
  opacity: ${({ opacity = 1 }) => opacity};
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
  color: ${({ color = ACCENT_800 }) => color};
  text-align: ${({ textAlign = "left" }) => textAlign};
  margin: ${({ margin = 0 }) => margin};
  padding: ${({ padding = 0 }) => padding};
  white-space: ${({ whiteSpace = "inherit" }) => whiteSpace};
  text-transform: ${({ textTransform = "none" }) => textTransform};
  text-decoration: ${({ textDecoration = "none" }) => textDecoration};
  word-break: ${({ wordBreak = "inherit" }) => wordBreak};
  cursor: ${({ cursor = "inherit" }) => cursor};
  text-underline-offset: ${({ textUnderlineOffset = "inherit" }) =>
    textUnderlineOffset};
`;

const typographyFactory = (
  Component,
  fontSize,
  letterSpacing = "-4%",
  lineHeight = "120%"
) => styled(Component)`
  ${commonStyles}
  font-size: ${fontSize};
  line-height: ${lineHeight};
  letter-spacing: ${letterSpacing};
`;

export const DisplaySmall = typographyFactory("small", "48px", "-4%", "100%");
export const DisplayLarge = typographyFactory("large", "56px", "-4%", "100%");
export const H1 = typographyFactory("h1", "40px");
export const H2 = typographyFactory("h2", "36px");
export const H3 = typographyFactory("h3", "32px");
export const H4 = typographyFactory("h4", "28px");
export const H5 = typographyFactory("h5", "24px", "-2%");
export const H6 = typographyFactory("h6", "20px", "-2%");

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
