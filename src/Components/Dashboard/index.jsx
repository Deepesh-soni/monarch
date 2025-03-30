import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { HiMiniUserGroup, HiCurrencyRupee } from "react-icons/hi2";
import { FaChartLine } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import Bugsnag from "@bugsnag/js";
import { client } from "@axiosClient";
import dayjs from "dayjs";
import Select from "react-select";
import { useRouter } from "next/router";

import { URL } from "@constants/urls";
import FlexBox from "@common/UI/FlexBox";
import { H1, Body1, Body2 } from "@common/UI/Headings";
import { Button } from "@common/UI/Buttons";
import { device } from "@common/UI/Responsive";
import PieGraph from "@common/Analytics/PieGraph";
import BarGraph from "@common/Analytics/BarGraph";
import CardWithCount from "@common/Analytics/CardWithCount";
import SectionContainer from "@common/SectionContainer";
import ServiceTable from "@common/ServiceTable";
import SampleDataModal from "@common/SampleDataModal";
import { trackEvent } from "@utils/helper";
import { ProfilePercent } from "./ProfilePercent";
import UpcomingBookings from "./UpcomingBookings";
import AppointmentProgress from "./AppointmentProgress";

const Container = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  overflow-y: scroll;
  gap: 1rem;

  @media ${device.laptop} {
    gap: 1.5rem;
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
// const staffName = [];
// const staffCountValue = [];
const staffCountValue = [80, 40, 29, 55, 16, 88];

const months = [
  { value: 1, label: "Jan" },
  { value: 2, label: "Feb" },
  { value: 3, label: "Mar" },
  { value: 4, label: "Apr" },
  { value: 5, label: "May" },
  { value: 6, label: "Jun" },
  { value: 7, label: "Jul" },
  { value: 8, label: "Aug" },
  { value: 9, label: "Sep" },
  { value: 10, label: "Oct" },
  { value: 11, label: "Nov" },
  { value: 12, label: "Dec" },
];

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
      <Button disabled>Refer</Button>
    </FlexBox>
  </FlexBox>
);

const StaffMatrix = () => (
  <ChartWrapper>
    <BarGraph data={barGraphData} />
  </ChartWrapper>
);

const TableWrap = ({ salesServices }) => (
  <ChartWrapper>
    <ServiceTable data={salesServices} />
  </ChartWrapper>
);

const Dashboard = () => {
  const [totalCount, setTotalCount] = useState({});
  const [salesServices, setSalesServices] = useState({});
  const [month, setMonth] = useState(6);
  const storeId = useSelector(state => state?.auth?.storeId);

  const [virtualFootfall, setVirtualFootfall] = useState(
    Math.floor(Math.random() * 26)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const pathSegments = pathname.split("/").filter(segment => segment !== "");

  const openModal = title => {
    trackEvent("db_section_cta_click", {
      current_page: pathSegments?.[0],
      current_section: title,
      cta_title: "Sample Data",
      source: null,
    });
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const totalCountData = async storeId => {
    try {
      const response = await client.post(
        URL.totalCountData,
        {
          storeId,
          date: dayjs(new Date()).format("YYYY-MM-DD"),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTotalCount(response?.data?.data);
    } catch (error) {
      console.error("Error:", error);
      Bugsnag.notify(error);
    }
  };

  const SalesByServices = async (storeId, month) => {
    try {
      const response = await client.post(
        URL.salesService,
        {
          storeId,
          month,
          year: 2024,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSalesServices(response?.data?.data);
    } catch (error) {
      console.error("Error:", error);
      Bugsnag.notify(error);
    }
  };

  const handleMonthChange = option => {
    setMonth(option.value);
    SalesByServices(storeId, option.value);
  };

  useEffect(() => {
    if (!storeId) return;
    totalCountData(storeId);
    SalesByServices(storeId, month);
  }, [storeId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVirtualFootfall(Math.floor(Math.random() * 26));
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      {isModalOpen && <SampleDataModal closeModal={closeModal} />}
      <FlexBox columnGap="1rem">
        <CardWithCount
          title="Customer Count"
          count={totalCount?.customerCount}
          icon={HiMiniUserGroup}
        />
        <CardWithCount
          title="Today's Income"
          count={totalCount?.todayIncome}
          icon={HiCurrencyRupee}
          onClick={() => router.push("/transactions/general")}
        />
        <CardWithCount
          title="Virtual Footfall"
          count={virtualFootfall}
          icon={FaChartLine}
        />
      </FlexBox>

      <MidCard columnGap="1rem">
        <FlexBox>
          <SectionContainer title="Last  minute bookings" noPadding>
            <UpcomingBookings />
          </SectionContainer>
        </FlexBox>

        <FlexBox width="100%">
          <SectionContainer title="Appointment progress" noPadding>
            <AppointmentProgress />
          </SectionContainer>
        </FlexBox>
      </MidCard>

      <MidCard columnGap="1.5rem">
        <SectionContainer
          title="Total Sales"
          width="100%"
          cta={
            <Button onClick={() => openModal("Total Sales")} outline>
              Sample Data
            </Button>
          }
        >
          <ChartComponent />
        </SectionContainer>
        <SectionContainer
          title="Care Coin Balance"
          width="100%"
          cta={
            <Button onClick={() => openModal("Care Coin Balance")} outline>
              Sample Data
            </Button>
          }
        >
          <CoinBal />
        </SectionContainer>
        <ProfilePercent />
      </MidCard>
      <BottomCard columnGap="1.5rem">
        <SectionContainer
          title="Performance This Month"
          cta={
            <Button onClick={() => openModal("Performance This Month")} outline>
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
            <Select
              value={months.find(monthOption => monthOption.value === month)}
              onChange={handleMonthChange}
              options={months}
            />
          }
        >
          <TableWrap salesServices={salesServices} />
        </SectionContainer>
      </BottomCard>
    </Container>
  );
};

export default Dashboard;
