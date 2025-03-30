import { useState, useEffect, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import { FiChevronDown } from "react-icons/fi";
import FlexBox from "./UI/FlexBox";
import { PRIMARY_800, ACCENT_100, ACCENT_200 } from "./UI/colors";
import { H3, Support } from "./UI/Headings";
import { PamprazziFAQsData } from "../../metadata/HomePage";

const ApproachContainer = styled.div`
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ApproachSection = styled(FlexBox)`
  width: 86.67%;
  max-width: 75rem;
  margin: 0 auto;
`;

const ApproachFAQSection = styled(FlexBox)`
  width: 100%;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    row-gap: 1.5rem;
  }
`;

const ApproachAllFAQs = styled(FlexBox)`
  width: 100%;
`;

const ApproachFAQHeader = styled(FlexBox)`
  width: 100%;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const ApproachFAQHeaderMobile = styled(FlexBox)`
  width: 100%;
  display: none;

  @media only screen and (max-width: 768px) {
    display: flex;
  }
`;

const ApproachFAQ = styled(FlexBox)`
  width: 100%;
  box-sizing: border-box;
  padding: 1.5rem;
  border-radius: 0.75rem;
  background-color: ${props => (props.open ? PRIMARY_800 : ACCENT_100)};
  cursor: pointer;

  ${props =>
    props.open
      ? css`
          ${H3}, ${Support} {
            color: ${ACCENT_100};
          }
        `
      : css`
          padding-left: 2rem;
        `}
`;

const ChevronContainer = styled(FlexBox)`
  width: 1.5rem;
  min-width: 1.5rem;
  max-width: 1.5rem;
  aspect-ratio: 1;
  height: 1.5rem;
  border-radius: 50%;
  background-color: ${ACCENT_200};
  transform: ${props => (props.up ? `rotate(-180deg)` : `rotate(0deg)`)};
  transition: transform 0.25s ease-in-out;
`;

const AccordionOpenAnimation = accordionAnswerHeight => keyframes`
  0% {
    max-height: 0;
    padding: 0;
  }
  100% {
    max-height: ${accordionAnswerHeight}px;
    padding: 1.5rem 0 0;
  }
`;

const ApproachAnswers = styled(FlexBox)`
  width: 100%;
  overflow: hidden;
  padding: 1.5rem 0 0;
  animation: ${props => AccordionOpenAnimation(props.accordionAnswerHeight)}
    0.25s ease-in-out;
`;

const FlexBoxImgWrapper = styled(FlexBox)`
  align-self: flex-start;
  width: 2.5rem;
  height: 2.5rem;
  min-width: 2.5rem;
  max-width: 2.5rem;
  min-height: 2.5rem;
  max-height: 2.5rem;
  img {
    width: 100%;
    height: 100%;
  }

  @media only screen and (max-width: 768px) {
    width: 1.5rem;
    height: 1.5rem;
    min-width: 1.5rem;
    max-width: 1.5rem;
    min-height: 1.5rem;
    max-height: 1.5rem;
  }
`;

const Approach = () => {
  const [activeFAQ, setActiveFAQ] = useState(PamprazziFAQsData[0].id);
  const [accordionAnswerHeight, setAccordionAnswerHeight] = useState(null);

  const AccordionAnswerRef = useRef(null);

  useEffect(() => {
    setAccordionAnswerHeight(AccordionAnswerRef.current.scrollHeight);
  }, [activeFAQ]);

  return (
    <ApproachContainer>
      <ApproachSection rowGap="2.5rem" align="center" justify="center" column>
        <ApproachFAQSection
          columnGap="1.5rem"
          align="center"
          justify="space-between"
        >
          <ApproachAllFAQs column rowGap="1.5rem">
            {PamprazziFAQsData.map(faq => (
              <ApproachFAQ
                key={faq.id}
                open={faq.id === activeFAQ}
                onClick={() => setActiveFAQ(faq.id)}
                column
              >
                <ApproachFAQHeader justify="space-between">
                  <FlexBox column rowGap="0.5rem">
                    <H3 bold>{faq.question}</H3>
                    <Support>{faq.subText}</Support>
                  </FlexBox>
                  <ChevronContainer
                    justify="center"
                    align="center"
                    up={faq.id === activeFAQ}
                  >
                    <FiChevronDown size={16} color={PRIMARY_800} />
                  </ChevronContainer>
                </ApproachFAQHeader>
                <ApproachFAQHeaderMobile
                  justify="space-between"
                  column
                  rowGap="1rem"
                >
                  <FlexBox align="center" justify="space-between">
                    <FlexBox column rowGap="0.5rem">
                      <H3 bold>{faq.question}</H3>
                    </FlexBox>
                    <ChevronContainer
                      justify="center"
                      align="center"
                      up={faq.id === activeFAQ}
                    >
                      <FiChevronDown size={16} color={PRIMARY_800} />
                    </ChevronContainer>
                  </FlexBox>
                  <Support>{faq.subText}</Support>
                </ApproachFAQHeaderMobile>
                {faq.id === activeFAQ && (
                  <ApproachAnswers
                    column
                    rowGap="1.5rem"
                    ref={AccordionAnswerRef}
                    accordionAnswerHeight={accordionAnswerHeight}
                  >
                    {faq.answers.map(answer => (
                      <FlexBox
                        key={answer.id}
                        align="center"
                        columnGap="0.5rem"
                      >
                        {answer.img && (
                          <FlexBoxImgWrapper>
                            <img
                              draggable={false}
                              src={answer.img}
                              alt="Approach Icon"
                            />
                          </FlexBoxImgWrapper>
                        )}
                        <Support>{answer.text}</Support>
                      </FlexBox>
                    ))}
                  </ApproachAnswers>
                )}
              </ApproachFAQ>
            ))}
          </ApproachAllFAQs>
        </ApproachFAQSection>
      </ApproachSection>
    </ApproachContainer>
  );
};

export default Approach;
