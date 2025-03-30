import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import FlexBox from "@common/UI/FlexBox";
import { Body2 } from "@Components/common/UI/Headings";
import styled from "styled-components";
import Rating from "@common/UI/DisplayRate";
import { Autoplay } from "swiper/modules";

const Wrapper = styled(FlexBox)`
  background-color: #fff;
  overflow-x: auto;
`;

const Image = styled.img`
  width: 4.375rem;
  height: 4.375rem;
`;

const Card = styled(FlexBox)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem;
  max-width: 30.9rem;
  column-gap: 1.25rem;
  gap: 1.25rem;
`;

const footerData = [
  {
    imageSrc: "/assets/Ellipse 5.svg",
    testimonial: {
      text: "As a busy salon owner, I needed a system that could handle a large volume of appointments. Your software has been a game-changer.",
      author: "Raj Patel, Raj's Beauty Lounge",
    },
    rating: 5,
  },
  {
    imageSrc: "/assets/Ellipse 5.svg",
    testimonial: {
      text: "The user-friendly interface and great customer support make it the best choice for our business.",
      author: "Priya Sharma,Sharma's Glam Studio",
    },
    rating: 4,
  },
  {
    imageSrc: "/assets/Ellipse 5.svg",
    testimonial: {
      text: "This software helped us increase efficiency by managing multiple appointments seamlessly.",
      author: "Vikram Singh,Style Studio",
    },
    rating: 5,
  },
  {
    imageSrc: "/assets/Ellipse 5.svg",
    testimonial: {
      text: "We’ve tried many systems before, but this one stands out for its reliability and ease of use.",
      author: "Anita Rao,Beauty Haven",
    },
    rating: 4,
  },
];

const FooterSlider = ({ data }) => (
  <Swiper
    spaceBetween={16}
    loop={true}
    autoplay={{
      delay: 3000,
      disableOnInteraction: false,
      transitionTimingFunction: "ease-out",
    }}
    modules={[Autoplay]}
    breakpoints={{
      320: {
        slidesPerView: 1,
        spaceBetween: 8,
      },
      1024: {
        slidesPerView: 2.5,
        spaceBetween: 16,
      },
    }}
    className="mySwiper"
  >
    {data?.map((item, index) => (
      <SwiperSlide key={index}>
        <Card column align="center">
          <Image
            src={item.imageSrc}
            alt={`Image of ${item.testimonial.author}`}
          />
          <Rating value={item.rating} />
          <Body2 style={{ textAlign: "center" }}>{item.testimonial.text}</Body2>
          <Body2 bold>{item.testimonial.author}</Body2>
        </Card>
      </SwiperSlide>
    ))}
  </Swiper>
);

const Footer = () => (
  <Wrapper align="center" justify="center">
    <FooterSlider data={footerData} />
  </Wrapper>
);

export default Footer;
