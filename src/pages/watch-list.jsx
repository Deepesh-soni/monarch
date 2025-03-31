import styled from "styled-components";
import FlexBox from "@common/UI/FlexBox";
import { Body1, Support } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import { IoMdAdd } from "react-icons/io";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  padding: 0 1rem;
  align-items: center;
  gap: 0.5rem;

  @media ${device.laptop} {
    flex-direction: column;
    justify-content: space-between;
    margin: auto;
    gap: 2.5rem;
    width: 86.67%;
  }
`;

const Card = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #ffffff;
  border: 1px solid #ebf0f4;
  box-shadow: 0px 3px 3px 0px #00000040;
  padding: 0.5rem;
`;

const watchlists = [
  {
    id: 1,
    name: "Growth Portfolio",
    stocks: "2 Stocks",
    description:
      "High-growth tech companies with strong momentum and market leadership potential",
    image: "/growthimage.svg",
  },
  {
    id: 2,
    name: "Dividend Income",
    stocks: "5 Stocks",
    description:
      "Stable dividend-paying companies with a history of consistent returns",
    image: "/growthimage.svg",
  },
  {
    id: 3,
    name: "Bluechip Portfolio",
    stocks: "8 Stocks",
    description:
      "Investments in well-established, financially sound companies with strong market presence",
    image: "/growthimage.svg",
  },
  {
    id: 4,
    name: "Tech Innovation",
    stocks: "6 Stocks",
    description:
      "Emerging technology companies with potential for disruptive growth and innovation",
    image: "/growthimage.svg",
  },
  {
    id: 5,
    name: "Sustainable Investments",
    stocks: "4 Stocks",
    description:
      "Companies focusing on renewable energy, sustainability, and environmental responsibility",
    image: "/growthimage.svg",
  },
];

const WatchList = () => {
  return (
    <Wrapper>
      <FlexBox width="100%" height="100%" backgroundColor="#142C8E0D" column>
        <FlexBox align="center" justify="space-between">
          <FlexBox column>
            <Body1 bold>My Watchlists</Body1>
            <Support color="#687792">
              Track and manage your favourite stocks
            </Support>
          </FlexBox>
          <FlexBox
            border="1.5px solid #142C8E"
            align="center"
            padding="0.5rem"
            columnGap="0.5rem"
            borderRadius="0.8rem"
          >
            <IoMdAdd color="#142C8E" />
            <Support color="#142C8E">New Watchlist</Support>
          </FlexBox>
        </FlexBox>
        {watchlists.map(watchlist => (
          <Card key={watchlist.id}>
            <FlexBox columnGap="0.5rem" align="center">
              <img
                src={watchlist.image}
                width={70}
                height={70}
                alt={watchlist.name}
              />
              <FlexBox column rowGap="8px">
                <Body1>{watchlist.name}</Body1>
                <Support color="#687792">{watchlist.stocks}</Support>
              </FlexBox>
            </FlexBox>
            <Support>{watchlist.description}</Support>
          </Card>
        ))}
      </FlexBox>
    </Wrapper>
  );
};

export default WatchList;
