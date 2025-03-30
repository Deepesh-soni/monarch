import React, { useState, useEffect } from "react";
import { SlHeart, SlSymbolMale } from "react-icons/sl";
import { CiDiscount1 } from "react-icons/ci";
import { IoIosFemale } from "react-icons/io";
import { IoMaleFemaleOutline } from "react-icons/io5";
import { client } from "@axiosClient";
import { URL, CDN } from "@constants/urls";
import { toast } from "react-toastify";
import Bugsnag from "@bugsnag/js";
import styled from "styled-components";
import FlexBox from "@common/UI/FlexBox";
import { H5, Body2, Body1 } from "@common/UI/Headings";
import {
  ACCENT_0,
  ACCENT_700,
  PRIMARY_800,
  listingChip,
} from "@common/UI/colors";
import { device } from "@common/UI/Responsive";

const Wrapper = styled(FlexBox)`
  border: 1px solid ${listingChip};
  padding: 0 0 1rem 0;
  width: 100%;
  border-radius: 0.625rem;
  max-width: 23.75rem;
  row-gap: 0.5rem;
  margin: auto;

  @media ${device.laptop} {
    margin: 0;
  }
`;

const Banner = styled(FlexBox)`
  position: relative;
  top: 0;
`;

const Img = styled.img`
  height: 13.5rem;
  object-fit: cover;
  border-radius: 0.625rem 0.625rem 0rem 0rem;
`;

const OfferBanner = styled(FlexBox)`
  position: absolute;
  bottom: -0.9rem;
  align-items: center;
  width: 90%;
  column-gap: 0.5rem;
  background-color: ${PRIMARY_800};
  border-radius: 0.25rem;
  justify-content: center;
`;

const AmenityWrapper = styled(FlexBox)`
  gap: 0.5rem;
  @media ${device.laptop} {
    gap: 1rem;
  }
`;

const AmenitiesWrapper = styled(FlexBox)`
  gap: 0.75rem;
  overflow-x: auto;
  width: 100%;
  flex-wrap: wrap;
  overflow: hidden;
`;

const Card = ({ data }) => {
  const [amenitiesList, setAmenitiesList] = useState([]);
  const { storeImages, storeAmenities, storeCoupons, gender, storeName } =
    data || {};

  const thumbnail = storeImages?.find(image => image.isThumbnail)?.imageUrl;

  const renderGenderIcon = () => {
    const genderIcons = {
      male: <SlSymbolMale color={ACCENT_700} />,
      female: <IoIosFemale color={ACCENT_700} />,
      unisex: <IoMaleFemaleOutline color={ACCENT_700} />,
    };
    return gender ? genderIcons[gender.toLowerCase()] : null;
  };

  const OfferRendering = () => {
    const [coupons, setCoupons] = useState([]);
    const selectedCoupons = coupons.filter(coupon =>
      storeCoupons.includes(coupon?._id)
    );

    useEffect(() => {
      const fetchCoupons = async () => {
        try {
          const res = await client.get(URL.getAllCoupons);
          setCoupons(res?.data?.data);
        } catch (error) {
          toast.error(error.message);
          Bugsnag.notify(error);
        }
      };
      fetchCoupons();
    }, [storeCoupons]);

    if (!selectedCoupons.length) return null;

    return (
      <OfferBanner>
        <CiDiscount1 color={ACCENT_0} />
        <Body2 color={ACCENT_0} padding="0.2rem 0">
          {selectedCoupons[0]?.couponString}
        </Body2>
      </OfferBanner>
    );
  };

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const res = await client.get(URL.getAllAmenities);
        setAmenitiesList(res?.data?.data);
      } catch (error) {
        toast.error(error.message);
        Bugsnag.notify(error);
      }
    };
    fetchAmenities();
  }, []);

  return (
    <Wrapper column>
      <Banner column>
        <Img
          src={thumbnail || "https://picsum.photos/200/300"}
          alt="Banner Image"
        />
        <FlexBox justify="center">
          {storeCoupons?.length > 0 && <OfferRendering />}
        </FlexBox>
      </Banner>

      <FlexBox column rowGap="0.5rem" padding="0 1rem">
        <FlexBox justify="space-between" padding="1rem 0 0 0">
          <H5 bold>{storeName}</H5>
          <FlexBox>
            <SlHeart size="1.25rem" color={PRIMARY_800} />
          </FlexBox>
        </FlexBox>
        <FlexBox columnGap="0.875rem" align="center">
          {renderGenderIcon()}
          <Body2>Salon for {gender}</Body2>
        </FlexBox>
        <AmenitiesWrapper>
          {amenitiesList?.map(amenity => {
            if (!storeAmenities?.slice(0, 4)?.includes(amenity?.name))
              return null;
            return (
              <AmenityWrapper key={amenity?.name}>
                <img
                  src={`${CDN}/amenities/dark-icons/${amenity?.icon?.darkIcon}`}
                  width="24"
                  height="24"
                />
                <Body1 color="#717171">{amenity?.name}</Body1>
              </AmenityWrapper>
            );
          })}
        </AmenitiesWrapper>
      </FlexBox>
    </Wrapper>
  );
};

export default Card;
