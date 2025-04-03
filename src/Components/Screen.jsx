import { useState, useEffect } from "react";
import styled from "styled-components";
import { SlArrowRight } from "react-icons/sl";
import FlexBox from "@common/UI/FlexBox";
import { Body1, Support, H1 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import { IoMdSearch } from "react-icons/io";
import { H5 } from "../Components/common/Typography";
import { Medium } from "../Components/common/Paragraph";
import { client } from "@axiosClient";
import { useRouter } from "next/router";
import { encode } from "js-base64";
import { Button } from "antd";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  padding: 0 1rem;
  align-items: center;
  gap: 0.5rem;

  @media ${device.laptop} {
    width: 86.67%;
    max-width: 75rem;
    margin: auto;
    gap: 2.5rem;
  }
`;

const Section = styled(FlexBox)`
  width: 100%;
  column-gap: 1.25rem;
  flex-direction: column;

  @media ${device.laptop} {
    flex-direction: row;
    width: 100%;
  }
`;

const LeftSection = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  gap: 1.25rem;
  min-height: 100%;

  @media ${device.laptop} {
    width: 60%;
  }
`;

const RightSection = styled(FlexBox)`
  width: 40%;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #ebf0f4;
  box-shadow: 0px 3px 3px 0px #00000040;
  padding: 1rem;
  border-radius: 0.4rem;
  min-height: 100%;
`;

const Container = styled(FlexBox)`
  background: #ffffff;
  border: 1px solid #ebf0f4;
  box-shadow: 0px 3px 3px 0px #00000040;
  padding: 1rem;
  border-radius: 0.4rem;
`;

const CardGridContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(1, 1fr);
  gap: 1rem;
  @media ${device.laptop} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Card = styled(FlexBox)`
  padding: 0.5rem;
  border: 1px solid #ebf0f4;
  background: #ffffff;
  border-radius: 12px;
  column-gap: 5px;
`;

const Icon = styled(FlexBox)`
  width: 45px;
  height: 45px;
  border-radius: 12px;
  background: #142c8e1a;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: #687792;
  margin-bottom: 1rem;
`;

const SearchContainer = styled(FlexBox)`
  width: 100%;
  justify-content: center;
  gap: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  margin-bottom: 1rem;
`;

const SearchIcon = styled(IoMdSearch)`
  color: #687792;
  font-size: 1.2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  border: none;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  border-bottom: 1px solid #ebf0f4;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f5f7fa;
  }
`;

const HeadingContainer = styled(FlexBox)`
  align-items: center;
  justify-content: space-between;
  column-gap: 0.5rem;
  width: 100%;
`;


const Screen = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [sectorData, setSectorData] = useState([]);
  const [myScreens, setMyScreens] = useState([]);


  const router = useRouter();
  const { doesSessionExist } = useSessionContext();



  useEffect(() => {
    if (doesSessionExist) {
      const fetchMyList = async () => {
        const response = await client.get('/screener');
        if (response?.data) {
          setMyScreens(response?.data);
        }
      }
      fetchMyList();
    }
  }, [doesSessionExist])


  useEffect(() => {
    const fetchStockData = async () => {
      setLoading(true);
      try {
        const response = await client.get("/default/category");
        setSectorData(response?.data?.results || []);
      } catch (error) {
        console.error("Failed to load sectors", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStockData();
  }, []);

  const filteredSectors = sectorData.filter(sector =>
    sector?.sectorname?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSectorClick = sectorName => {
    const payload = {
      details: {
        name: `Screener: ${sectorName}`,
        description: "",
      },
      query: {
        combinator: "and",
        rules: [
          {
            field: "sectorName",
            operator: "=",
            value: sectorName,
          },
        ],
      },
    };

    const encoded = encode(JSON.stringify(payload));
    router.push(`/screener/screen?preset=${encoded}`);
  };

  return (
    <>
      <Wrapper>
        <FlexBox width="100%" height="100%" column rowGap="1.5rem">
          <HeadingContainer>
            <FlexBox column>
              <H5 bold>Stock Screens</H5>
              <Medium color="#687792">
                Create your own custom screening criteria
              </Medium>
            </FlexBox>
            {doesSessionExist && <Button type="primary" onClick={() => router.push('/screener/query')}>New Screen</Button>}


          </HeadingContainer>
          <Section>
            <LeftSection>
              {doesSessionExist && <Container column>
                <Title>Your Custom Screens</Title>
                <Subtitle>Screens created by you</Subtitle>
                <CardGridContainer>
                  {myScreens?.map(screen => (
                    <Card key={screen.screenerId} onClick={() => router.push(`/screener/query/${screen.fqn}`)}>
                      <Icon>
                        <H1 bold>{screen?.name?.charAt(0) ?? 'S'}</H1>
                      </Icon>
                      <FlexBox column columnGap="0.5px">
                        <FlexBox align="center" columnGap="0.75rem">
                          <Body1>{screen.name}</Body1>
                          <SlArrowRight size={12} />
                        </FlexBox>
                        <Support color="#687792">
                          {screen.description}
                        </Support>
                      </FlexBox>
                    </Card>
                  ))}
                </CardGridContainer>
              </Container>}
              <Container column>
                <Title>Popular Stock Screens</Title>
                <Subtitle>Screens that are mostly used by investors</Subtitle>
                <CardGridContainer>
                  {[...Array(1)].map((_, index) => (
                    <Card key={index}>
                      <Icon>
                        <H1 bold>G</H1>
                      </Icon>
                      <FlexBox column columnGap="0.5px">
                        <FlexBox align="center" columnGap="0.75rem">
                          <Body1>Growth Stocks</Body1>
                          <SlArrowRight size={12} />
                        </FlexBox>
                        <Support color="#687792">
                          High growth companies with strong momentum
                        </Support>
                      </FlexBox>
                    </Card>
                  ))}
                </CardGridContainer>
              </Container>
            </LeftSection>
            <RightSection>
              <Title>Browse Sectors</Title>
              <Subtitle>Explore stocks by industry sectors</Subtitle>
              <SearchContainer>
                <SearchIcon />
                <SearchInput
                  type="text"
                  placeholder="Search sectors..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </SearchContainer>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <List className="custom-scrollbar">
                  {filteredSectors.map(sector => (
                    <ListItem
                      key={sector?.sectorcode}
                      onClick={() => handleSectorClick(sector?.sectorname)}
                    >
                      {sector?.sectorname} <SlArrowRight />
                    </ListItem>
                  ))}
                </List>
              )}
            </RightSection>
          </Section>
        </FlexBox>
      </Wrapper>
    </>
  );
};

export default Screen;
