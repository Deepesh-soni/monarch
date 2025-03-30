import styled from "styled-components";
import {
  ACCENT_800,
  RED,
  ERROR,
  SECONDARY_200,
  SECONDARY_300,
  WHITE,
} from "./colors";
import { Support } from "./Headings";

const ExternalWrapper = styled.div`
  width: 100%;
  ${({ readOnly }) =>
    readOnly &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
    `}
`;

const Container = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const TextAreaInput = styled.textarea`
  width: 100%;
  border: 1px solid ${SECONDARY_200};
  font-size: 0.875rem;
  line-height: 1rem;
  font-family: "Poppins";
  padding: 0.875rem;
  outline-color: transparent;
  border-radius: 0.5rem;
  resize: ${({ resize }) => resize || "vertical"};

  &:focus {
    border: 1px solid ${SECONDARY_300};
  }

  &:not(:placeholder-shown) + span,
  &:focus + span {
    color: ${SECONDARY_200};
    transform: translateX(2px) translateY(-25px);
    font-size: 0.75rem;
    padding-inline: 0.5rem;
    background-color: ${WHITE};
  }
`;

const Label = styled.span`
  position: absolute;
  left: 1rem;
  font-size: 1rem;
  color: ${SECONDARY_200};
  pointer-events: none;
  transition: 0.6s;
  top: 1rem;
`;

const RequiredIndicator = styled.span`
  color: ${({ theme }) => theme?.input?.requiredColor || ERROR};
`;

const TextArea = ({
  name,
  resize,
  label,
  error,
  required = false,
  value,
  rows = 3,
  onChange,
  onFocus,
  onSubmit,
  theme,
  onBlur,
  type,
  readOnly,
  disabled,
}) => {
  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      onSubmit?.();
    }
  };

  return (
    <ExternalWrapper>
      <Container>
        <TextAreaInput
          name={name}
          value={value}
          rows={rows}
          type={type}
          onFocus={e => onFocus?.(e)}
          onBlur={e => onBlur?.(e)}
          placeholder=""
          disabled={disabled}
          onChange={onChange}
          theme={theme}
          resize={resize}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
        />
        <Label>
          {label}
          {required && <RequiredIndicator> *</RequiredIndicator>}
        </Label>
      </Container>
      {error && <Support color={RED}>{error}</Support>}
    </ExternalWrapper>
  );
};

TextArea.defaultProps = {
  theme: {
    input: {
      padding: "0.75rem",
      border: SECONDARY_200,
      requiredColor: ACCENT_800,
      IconColor: ACCENT_800,
      crossIconColor: ACCENT_800,
    },
  },
};

export default TextArea;
