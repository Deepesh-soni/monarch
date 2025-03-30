import styled from "styled-components";
import { SlOptions } from "react-icons/sl";

import FlexBox from "@common/UI/FlexBox";
import { ACCENT_0, ACCENT_300 } from "@common/UI/colors";
import { boxShadowDs1 } from "@common/UI/styles";
import { Body1 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";

const HeaderContainer = styled(FlexBox)`
  background-color: ${ACCENT_0};
  align-items: center;
  justify-content: space-between;
  border-bottom: ${({ noBorder }) =>
    noBorder ? "none" : `1px solid ${ACCENT_300}`};
  padding: 1rem 1.5rem;
`;

const ItemWrapper = styled(FlexBox)`
  width: ${({ mobileWidth }) => (mobileWidth ? mobileWidth : "100%")};
  height: ${({ mobileHeight }) => (mobileHeight ? mobileHeight : "auto")};
  background-color: ${ACCENT_0};
  border-radius: 0.5rem;
  overflow: hidden;
  ${boxShadowDs1}

  @media ${device.laptop} {
    width: ${({ width }) => (width ? width : "100%")};
    height: ${({ height }) => (height ? height : "auto")};
  }
`;

const ChartWrapper = styled(FlexBox)`
  width: 100%;
  height: 100%;
  padding: ${({ noPadding }) => (noPadding ? "0rem" : "0.875rem")};
  justify-content: ${({ justify }) => (justify ? "center" : "justify")};

  @media ${device.laptop} {
    padding: ${({ noPadding }) => (noPadding ? "0rem" : "1.5rem")};
  }
`;

const SectionContainer = ({
  showHeader = true,
  width = "100%",
  mobileWidth = "100%",
  height,
  mobileHeight,
  showMenu,
  title,
  onMenuClick,
  children,
  margin,
  cta,
  noPadding,
  noBorder,
  justify,
}) => {

  return (
    <ItemWrapper
      column
      margin={margin}
      width={width}
      mobileWidth={mobileWidth}
      height={height}
      mobileHeight={mobileHeight}
    >
      {showHeader && (
        <HeaderContainer>
          <Body1 bold textTransform="capitalize">{title}</Body1>
          {cta
            ? cta
            : showMenu && (
                <FlexBox onClick={onMenuClick}>
                  <SlOptions />
                </FlexBox>
              )}
        </HeaderContainer>
      )}
      <ChartWrapper
        justify={justify}
        noPadding={noPadding}
        showHeader={showHeader}
      >
        {children}
      </ChartWrapper>
    </ItemWrapper>
  );
};

export default SectionContainer;
