import styled, { css } from "styled-components";
import { IoMdArrowRoundForward } from "react-icons/io";
import {
  PRIMARY_800,
  ACCENT_100,
  PRIMARY_900,
  ACCENT_500,
  ERROR_RED_500,
  ERROR_RED_600,
  ACCENT_0,
  PRIMARY_400,
  PRIMARY_500,
  ACCENT_400,
  ACCENT_800,
  ACCENT_900,
  BLACK,
} from "./colors";
import FlexBox from "./FlexBox";

const InnerWrapper = styled(FlexBox)`
  align-items: center;
  justify-content: center;
  flex-direction: ${({ iconPosition }) =>
    iconPosition === "right" ? "row-reverse" : "row"};
  gap: ${({ columnGap }) => columnGap || "0.25rem"};
`;

export const Button = styled.button`
  box-sizing: border-box;
  display: ${({ block }) => (block ? "block" : "inline")};
  background-color: ${({ color }) => color || PRIMARY_800};
  padding: ${({ padding }) => padding || "0.5rem 1rem"};
  color: ${ACCENT_100};
  line-height: 1.25rem;
  min-width: ${({ width }) => !width && "7rem"};
  width: ${({ width }) => (width ? width : "fit-content")};
  font-family: "Poppins";
  font-size: 0.875rem;
  font-weight: 700;
  border-radius: 0.625rem;
  border: 1px solid ${({ color }) => color || PRIMARY_800};
  overflow: hidden;
  letter-spacing: 0.07rem;
  cursor: pointer;
  text-transform: uppercase;
  white-space: nowrap;
  border-radius: ${({ borderRadius }) => borderRadius || "0.625rem"};

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || PRIMARY_900};
    border-color: ${({ hoverColor }) => hoverColor || PRIMARY_900};
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

  ${({ oval }) =>
    oval &&
    css`
      padding: 0.5rem;
      border-radius: 2rem;
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
      color: ${({ color }) => color || PRIMARY_800};
      border-color: ${PRIMARY_800};

      &:hover {
        background-color: transparent;
        color: ${({ hoverColor }) => hoverColor || PRIMARY_900};
        border-color: ${PRIMARY_900};
      }
    `}

  /* Outline Secondary Button */
  ${({ outline, secondary }) =>
    outline &&
    secondary &&
    css`
      border: 1px solid ${PRIMARY_400};
      background-color: ${ACCENT_100};
      color: ${({ color }) => color || PRIMARY_800};

      &:hover {
        background-color: ${ACCENT_100};
        color: ${({ hoverColor }) => hoverColor || PRIMARY_900};
        border-color: ${PRIMARY_500};
      }
    `}

  /* Outline Tertiary Button */
  ${({ outline, tertiary }) =>
    outline &&
    tertiary &&
    css`
      background-color: transparent;
      color: ${({ color }) => color || PRIMARY_800};
      border: 1px solid ${ACCENT_400};

      &:hover {
        background-color: transparent;
        color: ${({ hoverColor }) => hoverColor || PRIMARY_900};
        border-color: ${ACCENT_500};
      }
    `}

  /* Outline Danger Button */
  ${({ outline, danger }) =>
    outline &&
    danger &&
    css`
      border: 1px solid ${ACCENT_400};
      background-color: transparent;
      color: ${({ color }) => color || ERROR_RED_500};

      &:hover {
        background-color: transparent;
        color: ${({ hoverColor }) => hoverColor || ERROR_RED_600};
        border-color: ${ACCENT_400};
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
      color: ${({ color }) => color || PRIMARY_800};
      border: none;
      padding: 0.5rem 0rem;
      min-width: unset;
      background: transparent;
      text-decoration: ${({ textDecoration }) => textDecoration};

      &:hover {
        background-color: transparent;
        color: ${({ color }) => color || PRIMARY_900};
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
    
// WhiteButton
${({ whiteButton }) =>
    whiteButton &&
    css`
      border: 1px solid ${ACCENT_0};
      background-color: ${ACCENT_0};
      color: ${({ color }) => color || BLACK};

      &:hover {
        background-color: ${ACCENT_0};
        color: ${({ hoverColor }) => hoverColor || BLACK};
        border-color: ${ACCENT_0};
      }
    `}
`;

/**
 * CTA with an icon on the either side of text.
 * Default icon is `IoMdArrowRoundForward` (Right arrow).
 * @example
 * ```
 * <IconButton color="red" iconPosition = "right" outline Icon={SomeIcon}>CLICK ME</IconButton>
 * ```
 */
export const IconButton = ({
  children,
  iconPosition = "left",
  spacing = 0,
  Icon = IoMdArrowRoundForward,
  strokeWidth = 2,
  ...props
}) => (
  <Button {...props}>
    <InnerWrapper iconPosition={iconPosition} columnGap={spacing}>
      <Icon size="1rem" strokeWidth={strokeWidth} />
      {children}
    </InnerWrapper>
  </Button>
);

/**
 * CTA without background color and border.
 * An icon on the right side of cta text is shown on hover.
 * Default icon is `IoMdArrowRoundForward` (Right arrow).
 *  * @example
 * ```
 * <TextButton color="red" iconPosition = "right" Icon={SomeIcon}>CLICK ME</TextButton>
 * ```
 */
export const TextButton = ({
  children,
  Icon = IoMdArrowRoundForward,
  iconPosition = "left",
  ...props
}) => {
  return (
    <Button textCta {...props}>
      <InnerWrapper iconPosition={iconPosition}>
        <Icon size="1rem" strokeWidth={2} />
        {children}
      </InnerWrapper>
    </Button>
  );
};
