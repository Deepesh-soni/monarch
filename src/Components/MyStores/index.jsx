import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Bugsnag from "@bugsnag/js";
import { useQueryParam, StringParam } from "use-query-params";

import { setStoreId } from "@redux/slices/auth";
import { URL } from "@constants/urls";
import { client } from "@axiosClient";
import Loader from "@common/Loader";
import FlexBox from "@common/UI/FlexBox";
import { Case, Default, Switch } from "@common/ConditionalRendering";
import { Button } from "@common/UI/Buttons";
import { trackEvent } from "@utils/helper";
import StoreCard from "./StoreCard";
import SectionContainer from "@common/SectionContainer";
import { device } from "@common/UI/Responsive";
import { IN_REVIEW, PENDING } from "@constants";
import OwnerDetails from "./OwnerDetails";
// import AccSettings from "../UserProfile/AccSettings";

const Container = styled(FlexBox)`
  width: 100%;
  height: fit-content;
  flex-direction: column;
  row-gap: 2rem;
`;

const ExpandContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
  gap: 1rem;
  padding: 1rem;

  @media ${device.laptop} {
    gap: 3rem;
    padding: 1.5rem;
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${device.laptopL} {
    gap: 1.5rem;
    grid-template-columns: repeat(4, 1fr);
  }
`;

const MyStores = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [storeList, setStoreList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [source] = useQueryParam("source", StringParam);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get(URL.getOwnerStores);
        setStoreList(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error.message);
        Bugsnag.notify(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCardClick = store => {
    if (store?.store_status === PENDING) {
      router.push(
        `/onboarding-merchant?current=${store?.currentSection}&id=${store?.storeId}&source=${source}`
      );
    } else if (store?.store_status === IN_REVIEW) {
      alert("your store is under review currently");
    } else {
      dispatch(setStoreId(store?.storeId));
      router.push(`/dashboard/general`);
    }
  };

  const handleCreateNewStore = () => {
    trackEvent("list_your_store_cta_click");
    router.push(`/onboarding-merchant?current=1&source=${source}`);
  };

  return (
    <Container>
      <SectionContainer showHeader={false}>
        <OwnerDetails />
      </SectionContainer>
      <SectionContainer title="Store Management" noPadding>
        <Switch>
          <Case condition={loading}>
            <Loader fitContent />
          </Case>
          <Case condition={!loading && storeList?.length === 0}>
            <FlexBox
              width="100%"
              padding="1.5rem"
              align="center"
              justify="center"
            >
              <Button onClick={handleCreateNewStore}>List Your Store</Button>
            </FlexBox>
          </Case>
          <Default>
            <ExpandContainer>
              {storeList.map(store => (
                <StoreCard
                  key={store?.storeId}
                  handleCardClick={handleCardClick}
                  store={store}
                  numberOfStore={storeList?.length}
                />
              ))}
            </ExpandContainer>
          </Default>
        </Switch>
      </SectionContainer>
      {/* <AccSettings /> */}
    </Container>
  );
};

export default MyStores;
