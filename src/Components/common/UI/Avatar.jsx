import styled from "styled-components";
import { FiMoreHorizontal } from "react-icons/fi";

import { DUSTY_ORANGE_700, ERROR } from "./colors";
import { Body2 } from "./Headings";
import FlexBox from "./FlexBox";

const Container = styled(FlexBox)`
  position: relative;
`;

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  width: ${({ width }) => (width ? width : "2rem")};
  height: ${({ height }) => (height ? height : "2rem")};
  padding: 0.625rem 0.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-shrink: 0;
  border-radius: 3rem;
  background: linear-gradient(135deg, #fff 0%, #000 100%), #ffefb0;
  background-blend-mode: soft-light, normal;
`;

const Initials = styled(Body2)`
  color: ${DUSTY_ORANGE_700};
  font-weight: 700;
  text-transform: uppercase;
`;

const Dot = styled.div`
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  top: 0.25rem;
  right: 0.25rem;
  border-radius: 4rem;
  background-color: ${ERROR};
`;

const Avatar = ({
  name,
  firstname,
  lastname,
  typing,
  showDot,
  isDisabled,
  height,
  width,
}) => {
  let initials = "";
  if (name) {
    initials = name
      .split(" ")
      .map(part => part.charAt(0))
      .join("")
      .slice(0, 2);
  } else if (firstname) {
    initials = `${firstname?.charAt(0)}${
      !!lastname ? lastname?.charAt(0) : ""
    }`;
  }

  return (
    <Container className={isDisabled ? "grayscale" : ""}>
      <Wrapper width={width} height={height}>
        {typing ? (
          <FiMoreHorizontal
            size={18}
            strokeWidth={3}
            color={DUSTY_ORANGE_700}
          />
        ) : (
          <Initials>{initials}</Initials>
        )}
      </Wrapper>
      {showDot && <Dot />}
    </Container>
  );
};

export default Avatar;
