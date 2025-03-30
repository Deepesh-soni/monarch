import React from "react";
import styled from "styled-components";

import FlexBox from "./FlexBox";

const CustomRatingBarStyle = styled(FlexBox)`
  column-gap: 0.5rem;
`;

const StarImageStyle = styled.img`
  width: ${props => props.width || "1.25rem"};
  height: ${props => props.height || "1.25rem"};  
  object-fit: cover;
`;

const StarContainer = styled(FlexBox)`
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${props => (props.selected ? 1 : 0.5)};
`;

const Rating = ({ rate, width, height }) => {
  const maxRating = [1, 2, 3, 4, 5];
  const starImageFilled = "/assets/Review/StarIcon.svg";
  const starImageCorner = "/assets/Review/blankstar.svg";
  const starImageHalf = "/assets/Review/Hstar.svg";
  const CustomRatingBar = () => {
    return (
      <CustomRatingBarStyle>
        {maxRating.map(item => {
          let starType;
          let selected = false;
          if (item <= rate) {
            starType = starImageFilled;
            selected = true;
          } else if (item === Math.ceil(rate) && rate % 1 !== 0) {
            starType = starImageHalf;
            selected = true;
          } else {
            starType = starImageCorner;
            selected = true;
          }

          return (
            <StarContainer key={item} selected={selected}>
              <StarImageStyle src={starType}  width={width} height={height}/>
            </StarContainer>
          );
        })}
      </CustomRatingBarStyle>
    );
  };

  return <CustomRatingBar />;
};

export default Rating;
