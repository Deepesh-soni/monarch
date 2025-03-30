import React from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { H3, Support } from "@common/UI/Headings";
import { TbChevronRight } from "react-icons/tb";
import { boxShadowDs1 } from "@common/UI/styles";
import { ACCENT_0, ACCENT_200 } from "@common/UI/colors";

const SettingsBox = styled(FlexBox)`
  width: 54.25rem;
  height: 3rem;
  ${boxShadowDs1}
  border-radius: 0.313rem;
  align-items: center;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  background-color: ${ACCENT_0};
  column-gap: 3rem;
`;

const IconWrap = styled(FlexBox)`
  background-color: ${ACCENT_200};
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  align-items: center;
  justify-content: center;
`;

const AccSettings = () => {
  return (
    <SettingsBox>
      <IconWrap>
        <img
          src="assets/settings.webp"
          alt="icon"
          width={25}
          height={25}
          border-radius={50}
        />
      </IconWrap>
      <H3 bold>Account Settings</H3>
      <Support>
        Manage all your account settings and other profile related setiings from
        here.
      </Support>
      <TbChevronRight size="1.5rem" />
    </SettingsBox>
  );
};

export default AccSettings;
