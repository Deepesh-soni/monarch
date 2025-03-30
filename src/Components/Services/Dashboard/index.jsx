import React, { useState } from "react";
import styled from "styled-components";
import { FaPaintBrush } from "react-icons/fa";
import { ImScissors } from "react-icons/im";
import { MdFaceRetouchingNatural } from "react-icons/md";

import FlexBox from "@common/UI/FlexBox";
import { H1, Body1, Body2 } from "@common/UI/Headings";
import { Button } from "@common/UI/Buttons";
import { device } from "@common/UI/Responsive";
import Modal from "@common/UI/Modal";
import PieGraph from "@common/Analytics/PieGraph";
import BarGraph from "@common/Analytics/BarGraph";
import SectionContainer from "@common/SectionContainer";
import ServiceTable from "@common/ServiceTable";
import SampleDataModal from "@common/SampleDataModal";

const Container = styled(FlexBox)`
  flex-direction: column;
  overflow-y: scroll;
  width: 100%;
  gap: 1rem;
  padding: 1rem;

  @media ${device.laptop} {
    gap: 1.5rem;
    padding: 0;
  }
`;

const ChartWrapper = styled(FlexBox)`
  width: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const MidCard = styled(FlexBox)`
  flex-direction: column-reverse;
  gap: 1rem;

  @media ${device.laptop} {
    gap: 1.5rem;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const BottomCard = styled(FlexBox)`
  flex-direction: column;
  row-gap: 1rem;

  @media ${device.laptop} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

// Data
const data = [
  {
    name: "Makeup",
    icon: <FaPaintBrush />,
    customer: 4,
    total: "₹700.00",
  },
  {
    name: "Facial",
    icon: <MdFaceRetouchingNatural />,
    customer: 5,
    total: "₹900.00",
  },
  {
    name: "Haircut",
    icon: <ImScissors />,
    customer: 11,
    total: "₹300.00",
  },
];

//data for pieChart
const pieGraphLabels = ["Red", "Blue", "Yellow", "Green"];
const dataPie = [12, 19, 3, 5];
const backgroundColorPie = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
];
const borderColorPie = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
];

const staffName = ["Alice", "Bob", "Charlie", "David", "Eva", "Frank"];
const staffCountValue = [80, 40, 29, 55, 16, 88];

const barGraphData = {
  labels: staffName,
  datasets: [
    {
      data: staffCountValue,
    },
  ],
};

const ChartComponent = () => (
  <PieGraph
    labels={pieGraphLabels}
    data={dataPie}
    backgroundColor={backgroundColorPie}
    borderColor={borderColorPie}
    totalItems="35,897"
    graphTitle="total sales"
    height="16rem"
  />
);

const CoinBal = () => (
  <FlexBox column height="100%" justify="center">
    <FlexBox align="center" columnGap="0.5rem">
      <img src="/assets/coin.svg" alt="Coin" />
      <H1 bold>1000</H1>
      <Body2>in wallet</Body2>
    </FlexBox>
    <FlexBox column rowGap="1.5rem">
      <Body1>
        Care Coins get added to your account as you use Pamprazzi and avail our
        services.
      </Body1>
      <Button>Refer</Button>
    </FlexBox>
  </FlexBox>
);

const StaffMatrix = () => (
  <ChartWrapper>
    <BarGraph data={barGraphData} />
  </ChartWrapper>
);

const TableWrap = () => (
  <ChartWrapper>
    <ServiceTable data={data} />
  </ChartWrapper>
);

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <Container>
      {isModalOpen && (
        <Modal
          XS
          isOpen={isModalOpen}
          onClose={closeModal}
          height="fit-content"
          mobileHeight="fit-content"
          mobileWidth="90%"
          mobileBorderRadius="0.5rem"
          borderRadius="1rem"
        >
          <SampleDataModal closeModal={closeModal} />
        </Modal>
      )}
      <BottomCard columnGap="1.5rem">
        <SectionContainer
          title="Performance This Month"
          cta={
            <Button onClick={() => openModal()} outline>
              Sample Data
            </Button>
          }
        >
          <StaffMatrix />
        </SectionContainer>
        <SectionContainer
          noPadding
          title="Sales By Services"
          cta={
            <Button onClick={() => openModal()} outline>
              Sample Data
            </Button>
          }
        >
          <TableWrap />
        </SectionContainer>
      </BottomCard>
      <MidCard columnGap="1.5rem">
        <SectionContainer
          title="Total Sales"
          cta={
            <Button onClick={() => openModal()} outline>
              Sample Data
            </Button>
          }
        >
          <ChartComponent />
        </SectionContainer>
      </MidCard>
    </Container>
  );
};

export default Dashboard;
