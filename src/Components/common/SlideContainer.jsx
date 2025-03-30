import styled from "styled-components";
import FlexBox from "@common/UI/FlexBox";
import { device } from "@common/UI/Responsive";

const SlideContainer = styled(FlexBox)`
  flex: 1;
  flex-direction: column;

  @media ${device.laptop} {
    animation: fade-in 500ms forwards,
      ${({ slideDirection }) => `slide-${slideDirection}`} 500ms forwards;

    @keyframes fade-in {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }

    @keyframes slide-left {
      0% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(0);
      }
    }

    @keyframes slide-right {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(0);
      }
    }
  }
`;

export default SlideContainer;
