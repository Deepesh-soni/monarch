import styled from "styled-components";
import FlexBox from "@common/UI/FlexBox";
import { Body1, Support } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import { IoMdAdd } from "react-icons/io";
import AddWatchListModal from "./AddWatchListModal";
import { client } from "@axiosClient";
import { useEffect, useState } from "react";

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
    padding: 2rem;
  }
`;

const Card = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #ffffff;
  border: 1px solid #ebf0f4;
  box-shadow: 0px 3px 3px 0px #00000040;
  padding: 1.5rem;
  border-radius: 12px;
`;

const WatchList = () => {
  const [watchlists, setWatchlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      try {
        const response = await client.get("/watchlist");
        setWatchlists(response.data || []);
      } catch (error) {
        console.error("Failed to fetch watchlists", error);
      }
      setLoading(false);
    };
    fetchStockData();
  }, []);

  return (
    <Wrapper>
      {isModalOpen && (
        <AddWatchListModal toggleModal={() => setIsModalOpen(false)} />
      )}
      <FlexBox width="100%" height="100%" column rowGap="2rem">
        <FlexBox align="center" justify="space-between">
          <FlexBox column>
            <Body1 bold>My Watchlists</Body1>
            <Support color="#687792">
              Track and manage your favorite stocks
            </Support>
          </FlexBox>
          <FlexBox
            border="1.5px solid #142C8E"
            align="center"
            padding="0.5rem"
            columnGap="0.5rem"
            borderRadius="0.8rem"
            onClick={() => setIsModalOpen(true)}
            cursor="pointer"
          >
            <IoMdAdd color="#142C8E" />
            <Support color="#142C8E">New Watchlist</Support>
          </FlexBox>
        </FlexBox>
        {loading ? (
          <Support color="#687792">Loading watchlists...</Support>
        ) : watchlists.length > 0 ? (
          watchlists.map(watchlist => (
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
          ))
        ) : (
          <FlexBox
            border="1.5px solid #142C8E"
            align="center"
            padding="1rem"
            borderRadius="0.8rem"
            onClick={() => setIsModalOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <IoMdAdd color="#142C8E" />
            <Support color="#142C8E">Create New Watchlist</Support>
          </FlexBox>
        )}
      </FlexBox>
    </Wrapper>
  );
};

export default WatchList;
