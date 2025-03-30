import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import FlexBox from "@common/UI/FlexBox";
import { Body1, H4, H2 } from "@common/UI/Headings";
import { Button } from "@common/UI/Buttons";
import { SECONDARY_901 } from "@common/UI/colors";
import ShareComponent from "./ShareComponent";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  row-gap: 0.5rem;
  height: 100%;
`;

const ContainerText = styled(FlexBox)`
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 0.5rem;
`;

const Hr = styled.hr`
  border-top: 1px solid ${SECONDARY_901};
  width: 100%;
`;

const Container = styled(FlexBox)`
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  padding: 0.25rem;
  justify-content: center;
  gap: 1rem;
`;

const Congratulations = ({
  setModalOpen,
  couponData,
  couponCode,
  couponString,
}) => {
  const storeId = useSelector(state => state.auth.storeId);

  return (
    <Wrapper>
      <ContainerText>
        <img
          src="/assets/approved.svg"
          width="48rem"
          height="48rem"
          alt="Approved"
        />
        <H2 bold>Congratulations!</H2>
        <H4 color="#717171">The offer you created will be active from</H4>
        <Body1>
          {dayjs(couponData?.startDate).format("DD MMMM, YYYY HH:mm A")}
        </Body1>
      </ContainerText>
      <Hr />
      <ContainerText>
        <H4 bold>Share</H4>
        <H4>Share this offer on your socials from below</H4>
      </ContainerText>
      <Container>
        <ShareComponent
          couponCode={couponCode}
          couponString={couponString}
          storeId={storeId}
        />
      </Container>
      <Button
        width="100%"
        align="center"
        backgroundColor="#808080"
        onClick={() => setModalOpen(false)}
      >
        Done
      </Button>
    </Wrapper>
  );
};

export default Congratulations;
