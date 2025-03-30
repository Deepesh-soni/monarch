import styled from "styled-components";
import { FiX } from "react-icons/fi";

import { ACCENT_800, ACCENT_600, ERROR, ACCENT_0 } from "./colors";
import FlexBox from "./FlexBox";
import { Body2, Support } from "./Headings";

const Wrapper = styled(FlexBox)`
  width: 100%;
  cursor: pointer;
  position: relative;
  column-gap: 0.5rem;
  align-items: center;
  border-radius: 0.5rem;
  box-sizing: border-box;
  background-color: ${ACCENT_0};
  padding: ${({ theme }) => theme?.input?.padding};
  border: 1px solid ${({ theme }) => theme?.input?.border};
`;

const TextAreaInput = styled.textarea`
  flex: 1;
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  font-family: Poppins;
  font-size: 0.875rem;
  line-height: 1.5rem;
  font-weight: 500;
  width: 100%;

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

const TextArea2 = ({
  label,
  labelColor,
  error,
  type,
  placeholder,
  showCross,
  required = false,
  value,
  onFocus,
  onSubmit,
  onChange,
  onCrossIconClick,
  icon: Icon,
  onIconClick,
  theme,
  onBlur,
}) => {
  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      onSubmit?.();
    }
  };

  return (
    <FlexBox column rowGap="0.5rem">
      {label && (
        <Body2 color={labelColor}>
          {label}
          {required && <RequiredIndicator>*</RequiredIndicator>}
        </Body2>
      )}
      <Wrapper theme={theme}>
        <TextAreaInput
          value={value}
          type={type}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          theme={theme}
          rows={3}
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
      {error && <Support color={ERROR}>{error}</Support>}
    </FlexBox>
  );
};

TextArea2.defaultProps = {
  theme: {
    input: {
      padding: "0.75rem",
      border: ACCENT_600,
      requiredColor: ERROR,
      IconColor: ACCENT_800,
      crossIconColor: ACCENT_800,
    },
    label: {
      color: ACCENT_800,
    },
  },
};

export default TextArea2;
