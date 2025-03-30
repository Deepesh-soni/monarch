import styled from "styled-components";

const LoaderWrapper = styled.div`
  height: ${props => (props.fitContent ? "100%" : props.height)};
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Loader = ({ fitContent, height = "90vh" }) => (
  <LoaderWrapper fitContent={fitContent} height={height}>
    <img
      src="/assets/images/loader.gif"
      height={height || "90px"}
      alt="loader"
    />
  </LoaderWrapper>
);

export default Loader;
