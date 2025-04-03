"use client";
import React from "react";
import styled from "styled-components";

const StocksLogo = () => {
  return (
    <LogoContainer>
      <LogoWrapper>
        <StocksLogoSvg />
      </LogoWrapper>
    </LogoContainer>
  );
};

const StocksLogoSvg = () => {
  return (
    <svg
      width="418"
      height="182"
      viewBox="0 0 418 182"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="stocks-logo"
      style={{ width: "304px", height: "108px" }}
    >
      <g filter="url(#filter0_f_4_7)">
        <path
          d="M366 90.9466C366 112.578 295.671 130.113 208.917 130.113C122.162 130.113 51.8333 112.578 51.8333 90.9466C51.8333 69.3155 122.162 51.78 208.917 51.78C295.671 51.78 366 69.3155 366 90.9466Z"
          fill="url(#paint0_linear_4_7)"
          fillOpacity="0.5"
        />
      </g>
      <path
        d="M44.7418 112.887C54.0191 113.285 64.3839 113.73 74.0556 104.681C74.8585 105.691 75.9881 106.948 77.4581 108.205C80.7509 111.023 85.797 113.875 92.6667 113.875H332.667C347.624 113.875 359.75 101.749 359.75 86.7914V37.6247C359.75 22.667 347.624 10.5414 332.667 10.5414H92.6667C77.6554 10.5414 66.0735 22.7213 66.0735 37.6247V52.6133C66.0735 58.2829 66.0655 67.1465 62.5851 77.2064C59.1171 87.2305 52.1617 98.5436 38.0927 108.973L33.0245 112.73H39.3333C41.0835 112.73 42.891 112.807 44.7418 112.887Z"
        fill="white"
        stroke="url(#paint1_linear_4_7)"
        strokeWidth="4.16667"
        strokeMiterlimit="16"
      />
      <text
        fill="url(#paint2_linear_4_7)"
        xmlSpace="preserve"
        style={{ whiteSpace: "pre" }}
        fontFamily="Montserrat"
        fontSize="69.6417"
        fontWeight="500"
        letterSpacing="-0.05em"
      >
        <tspan x="102.275" y="85.2996">
          Stocks
        </tspan>
      </text>
      <defs>
        <filter
          id="filter0_f_4_7"
          x="0.583344"
          y="0.529968"
          width="416.667"
          height="180.833"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="25.625"
            result="effect1_foregroundBlur_4_7"
          />
        </filter>
        <linearGradient
          id="paint0_linear_4_7"
          x1="366.573"
          y1="130.113"
          x2="305.542"
          y2="-39.373"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#009CDE" />
          <stop offset="1" stopColor="#142C8E" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_4_7"
          x1="358.248"
          y1="111.791"
          x2="267.556"
          y2="-89.791"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#009CDE" />
          <stop offset="1" stopColor="#142C8E" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_4_7"
          x1="316.474"
          y1="95.333"
          x2="250.394"
          y2="-44.5455"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#009CDE" />
          <stop offset="1" stopColor="#142C8E" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 20px;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default StocksLogo;
