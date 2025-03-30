import React, { useEffect } from "react";
import styled from "styled-components";
import { SlSymbolMale } from "react-icons/sl";
import { IoIosFemale } from "react-icons/io";
import { IoMaleFemaleOutline } from "react-icons/io5";
import dayjs from "dayjs";

import FlexBox from "@common/UI/FlexBox";
import { Body1, Support } from "@common/UI/Headings";
import { Button } from "@common/UI/Buttons";
import AnimationInput from "@common/UI/AnimationInput";
import { ACCENT_0, ACCENT_800, ERROR } from "@common/UI/colors";
import { device } from "@common/UI/Responsive";
import CheckBox from "@common/UI/CheckBox";
import Chip from "@common/UI/Chips";

const Container = styled(FlexBox)`
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  @media ${device.laptop} {
    align-items: center;
  }
`;

const RequiredIndicator = styled.span`
  color: ${ERROR};
`;

const userGender = [
  {
    id: "male",
    label: "Male",
    icon: SlSymbolMale,
  },
  {
    id: "female",
    label: "Female",
    icon: IoIosFemale,
  },
  {
    id: "others",
    label: "Others",
    icon: IoMaleFemaleOutline,
  },
];

const CreateUser = ({ handleCreateUser, userInfo, setUserInfo }) => {
  const { name, emailId, dob, gender, referedBy, marketingEmails } =
    userInfo || {};

  const isFormValid =
    name.trim() !== "" &&
    emailId.trim() !== "" &&
    dob.trim() !== "" &&
    gender.trim() !== "";

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleOptionSelect = id => {
    setUserInfo({
      ...userInfo,
      gender: id,
    });
  };

  const handleCheckboxChange = () => {
    setUserInfo({
      ...userInfo,
      marketingEmails: !marketingEmails,
    });
  };

  return (
    <FlexBox column alignItems="center" padding="1.5rem" rowGap="1rem">
      <AnimationInput
        required
        type="text"
        name="name"
        label="Owner's Full name"
        value={name}
        onChange={handleInputChange}
      />
      <AnimationInput
        required
        type="emailId"
        name="emailId"
        label="E-Mail Id"
        value={emailId}
        onChange={handleInputChange}
      />
      <AnimationInput
        required
        type="date"
        name="dob"
        label="Date Of Birth"
        max={dayjs().format("YYYY-MM-DD")}
        value={dob}
        onChange={handleInputChange}
      />

      <FlexBox column rowGap="0.25rem">
        <Support>
          Gender<RequiredIndicator> *</RequiredIndicator>
        </Support>
        <Container>
          {userGender.map(type => {
            const Icon = type.icon;
            return (
              <Chip
                width="100%"
                key={type.id}
                selected={gender === type.id}
                onClick={() => handleOptionSelect(type.id)}
              >
                <FlexBox
                  columnGap="0.5rem"
                  padding="0.25rem 1rem"
                  align="center"
                >
                  <Icon
                    size={24}
                    color={gender === type.id ? ACCENT_0 : ACCENT_800}
                  />
                  <Body1 color={gender === type.id ? ACCENT_0 : ACCENT_800}>
                    {type.label}
                  </Body1>
                </FlexBox>
              </Chip>
            );
          })}
        </Container>
      </FlexBox>

      <AnimationInput
        type="text"
        name="referedBy"
        label="Referral code (optional)"
        value={referedBy}
        onChange={handleInputChange}
      />

      <FlexBox align="center" columnGap="0.25rem">
        <CheckBox check={marketingEmails} onClick={handleCheckboxChange} />
        <Support>Receive marketing emails</Support>
      </FlexBox>

      <Button width="100%" onClick={handleCreateUser} disabled={!isFormValid}>
        Done
      </Button>
    </FlexBox>
  );
};

export default CreateUser;
