import { useState, useEffect } from "react";
import styled from "styled-components";
import { SlArrowRight } from "react-icons/sl";
import FlexBox from "@common/UI/FlexBox";
import { Body1, Support, H1 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { H5 } from "../Components/common/Typography";
import { Medium } from "../Components/common/Paragraph";
import { client } from "@axiosClient";
import { useRouter } from "next/router";
// import { encode } from "js-base64";
import { Button, Skeleton, Tooltip } from "antd";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  padding: 1rem;
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
  gap: 1.25rem;
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
  width: 100%;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #ebf0f4;
  box-shadow: 0px 3px 3px 0px #00000040;
  padding: 1rem;
  border-radius: 0.4rem;
  max-height: 80vh; // ✅ prevents full-screen overflow
  overflow: hidden;

  @media ${device.laptop} {
    width: 40%;
  }
`;

const ScrollableListWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-top: 1rem;
  min-height: 0; // ✅ ensures proper flex behavior
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
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
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;

  @media ${device.laptop} {
    grid-template-columns: repeat(2, 1fr);
  }
`;


const Card = styled(FlexBox)`
  padding: 0.75rem;
  border: 1px solid #ebf0f4;
  background: #ffffff;
  border-radius: 12px;
  column-gap: 0.75rem;
  cursor: pointer;
  overflow: hidden;
  align-items: center;
  min-width: 0;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.05);
`;

const CardTitle = styled(Body1)`
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
`;

const CardDescription = styled(Support)`
  color: #687792;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.75rem;
  font-weight: 400;
`;


const Icon = styled(FlexBox)`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: #142c8e1a;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
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

const presetCustomScreens = [
  {
    details: {
      name: "Dividend Stocks",
      description: "Mkt. Cap >2500 & Div Yld >5 & ROCE >15",
    },
    query: {
      combinator: "and",
      rules: [
        { field: "mcap", operator: ">", value: 2500 },
        { field: "dividendYield", operator: ">", value: 5 },
        { field: "roceTtm", operator: ">", value: 15 },
      ],
    },
  },
  {
    details: {
      name: "Growth Stocks",
      description: "Mkt. Cap >5000 & PEG Ratio <1",
    },
    query: {
      combinator: "and",
      rules: [
        { field: "mcap", operator: ">", value: 5000 },
        { field: "pegRatio", operator: "<", value: 1 },
      ],
    },
  },
  {
    details: {
      name: "Steady Growth Champs",
      description:
        "Mkt. Cap >5000 & Div Yld >3 & ROCE > 15 & Debt/Equity <1",
    },
    query: {
      combinator: "and",
      rules: [
        { field: "mcap", operator: ">", value: 5000 },
        { field: "dividendYield", operator: ">", value: 3 },
        { field: "roceTtm", operator: ">", value: 15 },
        { field: "debtToEquity", operator: "<", value: 1 },
      ],
    },
  },
  {
    details: {
      name: "High-Growth Titans",
      description:
        "Mkt. Cap >500 & EBITDA growth >20 & ROE >10",
    },
    query: {
      combinator: "and",
      rules: [
        { field: "mcap", operator: ">", value: 500 },
        { field: "ebitdaGrowth", operator: ">", value: 20 },
        { field: "roeTtm", operator: ">", value: 10 },
      ],
    },
  },
  {
    details: {
      name: "High Volume Stocks",
      description: "Volume > 1M & PEG Ratio < 1.5",
    },
    query: {
      combinator: "and",
      rules: [
        { field: "volume", operator: ">", value: 1000000 },
        { field: "pegRatio", operator: "<", value: 1.5 },
      ],
    },
  },
  {
    details: {
      name: "Financially Fit Companies",
      description: "Int. Covrg Ratio > 2 & Mkt. Cap >500",
    },
    query: {
      combinator: "and",
      rules: [
        { field: "interestCoverageRatios", operator: ">", value: 2 },
        { field: "mcap", operator: ">", value: 500 },
      ],
    },
  },
];

const Screen = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [sectorData, setSectorData] = useState([]);
  const [myScreens, setMyScreens] = useState([]);
  const [isLoadingScreens, setIsLoadingScreens] = useState(false);
  const ITEMS_PER_PAGE = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(myScreens.length / ITEMS_PER_PAGE);
  const paginatedScreens = myScreens.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const router = useRouter();
  const { doesSessionExist } = useSessionContext();

  useEffect(() => {
    if (doesSessionExist) {
      const fetchMyList = async () => {
        setIsLoadingScreens(true);
        try {
          const response = await client.get("/screener");
          if (response?.data) {
            setMyScreens(response?.data);
            setCurrentPage(1);
          }
        } finally {
          setIsLoadingScreens(false);
        }
      };
      fetchMyList();
    }
  }, [doesSessionExist]);

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
        name: `Screens: ${sectorName}`,
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

  const handlePrebuilt = index => {
    const payload = presetCustomScreens[index];
    console.log(index, payload);
    const encoded = encodeURIComponent(encode(JSON.stringify(payload)));
    router.push(`/screener/screen?preset=${encoded}`);
  };

  return (
    <>
      <Wrapper>
        <FlexBox width="100%" height="100%" column rowGap="1.5rem" padding="1rem">
          <HeadingContainer>
            <FlexBox column>
              <H5 bold>Stock Screens</H5>
              <Medium color="#687792">
                Create your own custom screening criteria
              </Medium>
            </FlexBox>
            {doesSessionExist && (
              <Button
                type="primary"
                onClick={() => router.push("/screener/query")}
                icon={<IoMdAdd />}
              >
                New Screen
              </Button>
            )}
          </HeadingContainer>
          <Section>
            <LeftSection>
              {doesSessionExist && (
                <Container column>
                  <Title>Your Custom Screens</Title>
                  <Subtitle>Screens created by you</Subtitle>
                  {isLoadingScreens ? (
                    <CardGridContainer>
                      {[...Array(6)].map((_, index) => (
                        <Card key={index}>
                          <Skeleton.Avatar active shape="square" size="large" />
                          <Skeleton
                            active
                            title={false}
                            paragraph={{ rows: 2, width: ["80%", "60%"] }}
                            style={{ marginLeft: "0.75rem", flex: 1 }}
                          />
                        </Card>
                      ))}
                    </CardGridContainer>
                  ) : (
                    <CardGridContainer>
                      {paginatedScreens?.map(screen => (
                        <Tooltip key={screen.screenerId} title={<><strong>{screen.name}</strong><br />{screen.description}</>}>
                          <Card
                            key={screen.screenerId}
                            onClick={() => router.push(`/screener/query/${screen.fqn}`)}
                          >
                            <Icon>
                              <H1 bold>{screen?.name?.charAt(0)?.toUpperCase() ?? "S"}</H1>
                            </Icon>
                            <FlexBox column style={{ overflow: "hidden" }}>
                              <FlexBox align="center" columnGap="0.5rem">
                                <CardTitle>{screen.name}</CardTitle>
                                <SlArrowRight size={12} />
                              </FlexBox>
                              <CardDescription>{screen.description}</CardDescription>
                            </FlexBox>
                          </Card>
                        </Tooltip>
                      ))}
                    </CardGridContainer>
                  )}
                  {totalPages > 1 && (
                    <FlexBox justify="center" columnGap="0.5rem" style={{ marginTop: "1rem" }}>
                      <Button
                        size="small"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                      >
                        Prev
                      </Button>
                      <Body1>{currentPage} / {totalPages}</Body1>
                      <Button
                        size="small"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => p + 1)}
                      >
                        Next
                      </Button>
                    </FlexBox>
                  )}
                </Container>
              )}
              <Container column>
                <Title>Popular Stock Screens</Title>
                <Subtitle>Screens that are mostly used by investors</Subtitle>
                <CardGridContainer>
                  {presetCustomScreens?.map((screen, index) => (
                    <Card key={index} onClick={() => handlePrebuilt(index)}>
                      <Icon>
                        <H1 bold>
                          {screen?.details?.name?.charAt(0)?.toUpperCase() ??
                            "S"}
                        </H1>
                      </Icon>
                      <FlexBox column columnGap="0.5px">
                        <FlexBox align="center" columnGap="0.75rem">
                          <Body1>{screen?.details?.name}</Body1>
                          <SlArrowRight size={12} />
                        </FlexBox>
                        <Support color="#687792">
                          {screen?.details?.description}
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
                <ScrollableListWrapper>
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
                </ScrollableListWrapper>
              )}
            </RightSection>
          </Section>
        </FlexBox>
      </Wrapper>
    </>
  );
};

export default Screen;
