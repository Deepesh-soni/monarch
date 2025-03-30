import styled from "styled-components";
import { FiX } from "react-icons/fi";
import {
  ACCENT_800,
  RED,
  ACCENT_0,
  ERROR,
  ACCENT_600,
  SECONDARY_200,
  ACCENT_500,
} from "./colors";
import { Body2, Support } from "./Headings";
import FlexBox from "./FlexBox";

const Wrapper = styled(FlexBox)`
  width: ${({ width }) => width || "100%"};
  cursor: text;
  position: relative;
  column-gap: 0.5rem;
  align-items: center;
  border-radius: 0.5rem;
  box-sizing: border-box;
  background-color: ${ACCENT_0};
  padding: ${({ theme }) => theme?.input?.padding};
  border: 1px solid ${({ theme }) => theme?.input?.border};
`;

export const InputBox = styled.input`
  flex: 1;
  width: ${({ width }) => width};
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  font-family: "Poppins";
  font-size: 1rem;
  line-height: 2rem;
  font-weight: ${({ fontWeight }) => fontWeight || 500};
  color: ${ACCENT_800};
  cursor: ${({ cursor }) => cursor || "text"};
  opacity: ${({ opacity }) => opacity || 1};
  ::placeholder {
    color: ${ACCENT_600};
  }
`;

const CloseIconWrapper = styled(FlexBox)`
  background-color: ${ACCENT_0};
  align-items: center;
  justify-content: center;
`;

const RequiredIndicator = styled.span`
  color: ${({ theme }) => theme?.input?.requiredColor || ERROR};
`;

const Input = ({
  disabled,
  label,
  labelColor,
  error,
  type,
  pattern,
  placeholder,
  showCross,
  required = false,
  value,
  onChange,
  onFocus,
  onSubmit,
  onKeyDown,
  onCrossIconClick,
  icon: Icon,
  onIconClick,
  theme,
  onBlur,
  width,
  wrapperWidth = "100%",
  onClick = () => {},
  readOnly = false,
  cursor,
  opacity,
  max,
  min,
}) => {
  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      onSubmit?.();
    }
  };

  return (
    <FlexBox column rowGap="0.5rem" width={wrapperWidth}>
      {label && (
        <Body2 color={labelColor}>
          {label}
          {required && <RequiredIndicator>*</RequiredIndicator>}
        </Body2>
      )}
      <Wrapper theme={theme} width={width} onClick={onClick}>
        <InputBox
          value={value}
          type={type}
          pattern={pattern}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown || handleKeyDown}
          theme={theme}
          readOnly={readOnly}
          max={max}
          min={min}
          cursor={cursor}
          opacity={opacity}
          disabled={disabled}
        />
        {showCross && !!value && (
          <CloseIconWrapper onClick={onCrossIconClick}>
            <FiX size="1.5rem" color={theme?.input?.crossIconColor} />
          </CloseIconWrapper>
        )}
        {Icon && (
          <Icon
            color={theme?.input?.IconColor}
            size="1.375rem"
            onClick={onIconClick}
          />
        )}
      </Wrapper>
      {error && <Support color={RED}>{error}</Support>}
    </FlexBox>
  );
};

Input.defaultProps = {
  theme: {
    input: {
      padding: "0.75rem",
      border: SECONDARY_200,
      requiredColor: "red",
      IconColor: ACCENT_800,
      crossIconColor: ACCENT_800,
    },
  },
};

export default Input;
