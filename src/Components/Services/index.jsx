import React, { useEffect, useState } from "react";
import { useQueryParam, NumberParam } from "use-query-params";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { CDN } from "@constants/urls";
import Bugsnag from "@bugsnag/js";

import { Body2 } from "@common/UI/Headings";
import FlexBox from "@common/UI/FlexBox";
import { PRIMARY_800 } from "@common/UI/colors";
import { device } from "@common/UI/Responsive";
import { URL } from "@constants/urls";
import { client } from "@axiosClient";
import Loader from "@common/Loader";
import { ServicesList } from "./ServicesList";
import { trackEvent } from "@utils/helper";
import useIsDesktop from "@hooks/useIsDesktop";
import SectionContainer from "@common/SectionContainer";

const Wrapper = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  position: relative;
  row-gap: 0.5rem;
  column-gap: 3rem;
`;

const Categories = styled(FlexBox)`
  width: calc(100% - 2rem);
  padding: 0 1rem 0 30rem;
  column-gap: 1rem;
  overflow-x: auto;
  justify-content: center;
  z-index: 5;

  @media ${device.laptop} {
    max-width: 100%;
    padding: 0;
    margin: 0;
    column-gap: 1rem;
  }
  @media (max-width: 768px) {
    max-width: 25rem;
    width: 100%;
    margin-inline: auto;
    justify-content: flex-start;
    padding: 0.1rem;
  }
`;

const CategoryTile = styled(FlexBox)`
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  max-width: 5rem;
  gap: 0.5rem;
  justify-content: flex-start;

  img {
    width: 3.5rem;
    opacity: 0.7;
    border-radius: 3.125rem;
    box-sizing: border-box;

    ${({ active }) =>
      active &&
      css`
        width: 3.5rem;
        border: 2px solid ${PRIMARY_800};
        opacity: 1;
      `}
  }

  @media (max-width: 768px) {
    img {
      width: 3rem;
      opacity: 0.7;
      border-radius: 3.125rem;

      ${({ active }) =>
        active &&
        css`
          border: 2px solid ${PRIMARY_800};
          opacity: 1;
        `}
    }
  }
`;

const CategoryName = styled(Body2)`
  text-align: center;
  text-wrap: wrap;
  font-size: ${useIsDesktop ? "0.8rem" : ""};
  ${({ active }) =>
    active &&
    css`
      font-weight: 700;
    `}
`;

const ServicesWrapper = styled(FlexBox)`
  width: 100%;
  max-width: 50rem;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Services = () => {
  const [activeCategory, setActiveCategory] = useQueryParam(
    "active",
    NumberParam
  );
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceLoading, setServiceLoading] = useState(false);

  const router = useRouter();
  const storeId = useSelector(state => state.auth.storeId);

  const fetchServicesForCategory = async () => {
    setServiceLoading(true);
    try {
      const response = await client.get(
        `${URL.getService}/${storeId}/${activeCategory}`
      );
      setServices(response.data);
    } catch (error) {
      toast.error(error.message);
      Bugsnag.notify(error);
    } finally {
      setServiceLoading(false);
    }
  };

  const fetchAllCategory = async () => {
    try {
      const response = await client.get(URL.getAllCategory);
      const catData = response.data;

      if (!activeCategory) {
        setActiveCategory(catData?.[0]?.categoryId, "replaceIn");
      }

      setCategories(catData);
    } catch (error) {
      Bugsnag.notify(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllCategory();
  }, []);

  useEffect(() => {
    if (!router.isReady || !activeCategory) return;
    fetchServicesForCategory();
  }, [router, activeCategory]);

  const selectedCategory = categories?.filter(
    category => category?.categoryId === activeCategory
  )?.[0];

  return (
    <SectionContainer showHeader={false} width="100%" mobileHeight="100%">
      <Wrapper>
        <Categories>
          {categories.map(item => (
            <CategoryTile
              key={item?.categoryId}
              active={item?.categoryId === activeCategory}
              onClick={() => {
                trackEvent("service_cat_tile_click", {
                  current_page: "services",
                  item_type: "category icon",
                  selected_option: item?.title,
                });
                setActiveCategory(item?.categoryId, "replace");
              }}
            >
              <img src={`${CDN}${item?.icon}`} alt={item?.title} />

              <CategoryName active={item?.categoryId === activeCategory}>
                {item?.title}
              </CategoryName>
            </CategoryTile>
          ))}
        </Categories>
        <FlexBox height="50%">
          {serviceLoading ? (
            <Loader fitContent />
          ) : (
            <ServicesWrapper column>
              <ServicesList
                category={selectedCategory}
                activeCategory={selectedCategory?.title}
                services={services}
                refreshList={fetchServicesForCategory}
              />
            </ServicesWrapper>
          )}
        </FlexBox>
      </Wrapper>
    </SectionContainer>
  );
};

export default Services;
