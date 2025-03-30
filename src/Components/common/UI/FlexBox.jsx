import styled from "styled-components";

const FlexBox = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: ${({ column }) => (column ? "column" : "row")};
  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};
  row-gap: ${({ rowGap }) => rowGap};
  column-gap: ${({ columnGap }) => columnGap};
  flex-wrap: ${({ wrap }) => wrap};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  position: ${({ position }) => position};
  cursor: ${({ cursor }) => cursor};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  background-color: ${({ backgroundColor }) => backgroundColor};

  pointer-events: ${({ disabled }) => (disabled ? "none" : "normal")};
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
`;

FlexBox.defaultProps = {
  column: false,
  align: "stretch",
  justify: "flex-start",
  rowGap: 0,
  columnGap: 0,
  wrap: "nowrap",
  margin: 0,
  padding: 0,
  width: "auto",
  height: "auto",
  position: "static",
  cursor: "unset",
  border: "none",
  borderRadius: "none",
  backgroundColor: "none",
};

export default FlexBox;
