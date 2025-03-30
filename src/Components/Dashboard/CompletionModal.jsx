import React from "react";
import styled, { css } from "styled-components";
import { TfiClose } from "react-icons/tfi";
import { SlArrowRight } from "react-icons/sl";
import { useRouter } from "next/router";

import FlexBox from "@common/UI/FlexBox";
import { Body1, Body2 } from "@common/UI/Headings";
import Modal from "@common/UI/Modal";
import { PRIMARY_800, ACCENT_300 } from "@common/UI/colors";

const Cross = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

const Heading = styled(FlexBox)`
  position: relative;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${ACCENT_300};
`;

const Body = styled(FlexBox)`
  width: 100%;
`;

const Icon = styled(SlArrowRight)`
  display: none;
`;

const LineItem = styled(FlexBox)`
  width: 100%;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${ACCENT_300};
  cursor: pointer;

  ${({ subItem }) =>
    subItem &&
    css`
      /* padding: 0.5rem 1rem; */
      border-bottom: 1px solid ${ACCENT_300};
    `}

  &:hover {
    ${Body2} {
      color: ${PRIMARY_800};
    }

    ${Icon} {
      display: block;
    }
  }
`;

const routeLookup = {
  service: { route: "/services/serviceInfo?active=1", displayName: "Services" },
  storeDetails: {
    route: "/settings/information",
    displayName: "Shop Details",
  },
  image: { route: "/settings/images", displayName: "Shop Images" },
  timing: { route: "/settings/timings", displayName: "Shop Timing" },
  about: {
    route: "/settings/information",
    displayName: "Shop Information",
  },
  stylist: { route: "/staff-management/general", displayName: "Staff Details" },
};

const CompletionModal = ({ closeModal, data }) => {
  const router = useRouter();

  const handleClick = route => {
    if (!route) return;
    router.push(route);
  };

  const renderLineItem = (key, value, subItem) => (
    <LineItem
      subItem={subItem}
      key={key}
      onClick={() => handleClick(routeLookup[key]?.route)}
    >
      <Body2 bold textAlign="center">
        {routeLookup[key]?.displayName || key}
      </Body2>
      <FlexBox align="center" columnGap="0.5rem">
        <Body2 bold textAlign="center">
          {value} %
        </Body2>
        <Icon color={PRIMARY_800} />
      </FlexBox>
    </LineItem>
  );

  return (
    <Modal
      XS
      onClose={closeModal}
      height="fit-content"
      mobileHeight="fit-content"
      mobileWidth="90%"
      mobileBorderRadius="0.5rem"
      borderRadius="1rem"
    >
      <Heading>
        <Cross onClick={closeModal}>
          <TfiClose />
        </Cross>
        <Body1>Profile Completion Percentage</Body1>
      </Heading>
      <Body column>
        {Object.entries(data).map(([key, value]) => {
          if (key === "overallPercentage") return;
          if (typeof value === "object") {
            return Object.entries(value?.subItem).map(([key, value]) =>
              renderLineItem(key, value, true)
            );
          } else return renderLineItem(key, value);
        })}
      </Body>
    </Modal>
  );
};

export default CompletionModal;
