import React from "react";
import styled from "styled-components";
import Link from "next/link";

import FlexBox from "@common/UI/FlexBox";
import {
  ACCENT_0,
  ACCENT_800,
  SECONDARY_200,
  PRIMARY_900,
} from "@common/UI/colors";
import { H1, Body2 } from "@common/UI/Headings";
import { Button } from "@common/UI/Buttons";
import Input from "@common/UI/InputBox";

const CountryCodeSelect = styled.select`
  font-size: 1rem;
  padding: 1rem;
  background: ${ACCENT_0};
  border-radius: 0.5rem;
  border-style: none;
`;

const CountryCodeAndPhoneBox = styled(FlexBox)`
  border: 1px solid ${SECONDARY_200};
  border-radius: 0.5rem;
`;

const Hr = styled.hr`
  border-top: 1px solid ${SECONDARY_200};
  margin: 0;
  width: 100%;
`;

const phoneInputTheme = {
  input: {
    padding: "0.75rem",
    border: ACCENT_0,
    requiredColor: "red",
    IconColor: ACCENT_800,
    crossIconColor: ACCENT_800,
  },
};

const PhoneNumber = ({
  phoneNumber,
  handlePhoneNumberChange,
  handleFormSubmit,
}) => {
  const isPhoneNumberValid = phoneNumber && /^\d{10}$/.test(phoneNumber);

  return (
    <FlexBox column alignItems="center" padding="1.5rem" rowGap="1rem">
      <H1 bold>Welcome to Pamprazzi</H1>
      <CountryCodeAndPhoneBox column>
        <CountryCodeSelect>
          <option value="+91">India(+91)</option>
        </CountryCodeSelect>
        <Hr />
        <Input
          type="number"
          placeholder="Phone Number"
          value={phoneNumber}
          theme={phoneInputTheme}
          onChange={handlePhoneNumberChange}
          onSubmit={handleFormSubmit}
        />
      </CountryCodeAndPhoneBox>
      <Body2>
        We&apos;ll send a sms to confirm your number. Standard message and data
        rates apply.{" "}
        <Body2 color={PRIMARY_900} textDecoration="underline" cursor="pointer">
          <Link href="/privacy-policy" target="_blank">
            Privacy Policy
          </Link>
        </Body2>
      </Body2>
      <Button
        width="100%"
        onClick={handleFormSubmit}
        disabled={!isPhoneNumberValid}
      >
        GET OTP
      </Button>
    </FlexBox>
  );
};

export default PhoneNumber;
