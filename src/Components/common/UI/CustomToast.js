import styled from "styled-components";
import { ACCENT_100, ACCENT_800, ERROR } from "./colors";
import { Body1 } from "./Headings";

const Toast = styled.div`
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  background: ${props => (props.appearance === "error" ? ERROR : ACCENT_800)};
  box-shadow: 0px 0px 8px 4px rgba(0, 0, 0, 0.04);
`;

const CustomToast = ({ appearance, children }) => (
  <Toast appearance={appearance}>
    <Body1 bold color={ACCENT_100}>
      {children}
    </Body1>
  </Toast>
);

export default CustomToast;
