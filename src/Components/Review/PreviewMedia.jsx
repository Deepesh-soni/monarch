import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TbChevronRight, TbChevronLeft } from "react-icons/tb";
import { TfiClose } from "react-icons/tfi";

import FlexBox from "@common/UI/FlexBox";
import PreviewModal from "./PreviewModal";
import { ACCENT_0 } from "@common/UI/colors";
import { device } from "@common/UI/Responsive";

const Wrapper = styled(FlexBox)`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.6);

  @media ${device.laptop} {
    border-radius: 1rem;
    width: 52rem;
    height: 28rem;
    background-color: ${ACCENT_0};
  }
`;

const CarouselItem = styled.div`
  width: 100%;
  height: 100%;
  display: ${({ visible }) => (visible ? "block" : "none")};
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;

  @media ${device.laptop} {
    border-radius: 1rem;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;

  @media ${device.laptop} {
    border-radius: 1rem;
  }
`;

const NavigationButton = styled(FlexBox)`
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  z-index: 300;
  mix-blend-mode: difference;
  border-radius: 0.5rem;
  cursor: pointer;

  @media ${device.laptop} {
    mix-blend-mode: normal;
    padding: 0.5rem;
    background-color: rgba(255, 255, 255, 1);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const IconContainer = styled(FlexBox)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  background-color: white;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;

  @media ${device.laptop} {
    top: -1.5rem;
    right: -4rem;
  }
`;

const NextButton = styled(NavigationButton)`
  right: 0.25rem;
  color: white;

  @media ${device.laptop} {
    right: -3.5rem;
    color: black;
  }
`;

const PrevButton = styled(NavigationButton)`
  left: 0.25rem;
  color: white;

  @media ${device.laptop} {
    left: -3.5rem;
    color: black;
  }
`;

const PreviewMedia = ({ media, handleClose, index }) => {
  const [currentIndex, setCurrentIndex] = useState(index);
  const [startX, setStartX] = useState(null);

  const handleTouchStart = event => {
    setStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = event => {
    const currentX = event.changedTouches[0].clientX;
    const deltaX = currentX - startX;

    const SWIPE_THRESHOLD = 50;

    if (deltaX > SWIPE_THRESHOLD) {
      handlePrevious(); // Left swipe
    } else if (deltaX < -SWIPE_THRESHOLD) {
      handleNext(); // Right swipe
    }

    setStartX(null);
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => {
      const nextIndex = (prevIndex + 1) % media.length;
      return nextIndex;
    });
  };

  const handlePrevious = () => {
    setCurrentIndex(prevIndex => {
      const prev = prevIndex === 0 ? media.length - 1 : prevIndex - 1;
      return prev;
    });
  };

  useEffect(() => {
    const handleKeyPress = event => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleNext, handlePrevious]);

  return (
    <PreviewModal>
      <Wrapper>
        <CarouselContainer
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {media?.map((item, index) => (
            <CarouselItem key={index} visible={index === currentIndex}>
              {item?.type === "image" ? (
                <Image src={item?.mediaUrl} alt={`Review Image ${index + 1}`} />
              ) : (
                <Video src={item?.mediaUrl} controls />
              )}
            </CarouselItem>
          ))}
          {media?.length > 1 && (
            <>
              <PrevButton
                onClick={handlePrevious}
                disabled={currentIndex === 0}
              >
                <TbChevronLeft size="2rem" />
              </PrevButton>
              <NextButton
                onClick={handleNext}
                disabled={currentIndex === media.length - 1}
              >
                <TbChevronRight size="2rem" />
              </NextButton>
            </>
          )}
          <IconContainer onClick={handleClose}>
            <TfiClose />
          </IconContainer>
        </CarouselContainer>
      </Wrapper>
    </PreviewModal>
  );
};

export default PreviewMedia;
