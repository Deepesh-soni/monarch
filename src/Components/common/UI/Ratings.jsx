import React, { useState } from "react";
import styled from "styled-components";

const CustomRatingBarStyle = styled.div`
  display: flex;
`;

const StarImageStyle = styled.img`
  width: 1.25rem;
  height: 1rem;
  object-fit: cover;
  padding-right: 0.4rem;
`;

const Rating = ({ rate }) => {
  const [defaultRating, setDefaultRating] = useState(rate);
  const maxRating = [1, 2, 3, 4, 5];

  // const starImageFilled =
  //   "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png";
  const starImageFilled = "/assets/Review/StarIcon.svg";

  const starImageCorner = "/assets/Review/blankstar.svg";

  const handleRatingClick = item => {
    setDefaultRating(item);
  };

  const CustomRatingBar = () => {
    return (
      <CustomRatingBarStyle>
        {maxRating.map(item => (
          <StarContainer
            key={item}
            onClick={() => handleRatingClick(item)}
            selected={item <= defaultRating}
          >
            <StarImageStyle
              src={item <= defaultRating ? starImageFilled : starImageCorner}
            />
          </StarContainer>
        ))}
      </CustomRatingBarStyle>
    );
  };

  return <CustomRatingBar />;
};

const StarContainer = styled.div`
  cursor: pointer;
  opacity: ${props => (props.selected ? 1 : 0.5)};
`;

export default Rating;
