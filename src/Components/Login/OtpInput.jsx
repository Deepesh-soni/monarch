import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { ERROR, SECONDARY_200 } from "@common/UI/colors";
import { Support } from "@Components/common/UI/Headings";

const OtpContainer = styled(FlexBox)`
  margin-top: 10px;
  gap: 0.5rem;
`;

const OtpInputBox = styled.input`
  max-width: 3.125rem;
  height: 3.125rem;
  width: 100%;
  text-align: center;
  font-size: 1.25rem;
  border: solid 1px ${props => (props.isInvalid ? ERROR : SECONDARY_200)};
  border-radius: 0.5rem;
`;

const OtpInput = ({ length = 4, onOtpSubmit, errorMessage }) => {
  const [otpValues, setOtpValues] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otpValues];
    newOtp[index] = value.substring(value.length - 1);
    setOtpValues(newOtp);

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    }

    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = index => {
    const inputElement = inputRefs.current[index];

    if (inputElement && inputElement.type !== "number") {
      inputElement.setSelectionRange(1, 1);

      if (index > 0 && !otpValues[index - 1]) {
        const nextEmptyIndex = otpValues.indexOf("");
        if (nextEmptyIndex !== -1) {
          inputRefs.current[nextEmptyIndex].focus();
        }
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otpValues[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <FlexBox column rowGap="0.5rem" align="center">
      <OtpContainer>
        {otpValues.map((value, index) => (
          <OtpInputBox
            key={index}
            type="number"
            pattern="[0-9]*"
            ref={input => (inputRefs.current[index] = input)}
            value={value}
            onChange={e => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={e => handleKeyDown(index, e)}
            isInvalid={errorMessage}
          />
        ))}
      </OtpContainer>
      {errorMessage && <Support color={ERROR}>{errorMessage}</Support>}
    </FlexBox>
  );
};

export default OtpInput;
