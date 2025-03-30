import styled from "styled-components";

import { DUSTY_ORANGE_700 } from "@common/UI/colors";
import { H1 } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";

const Wrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 7rem;
  aspect-ratio: 1;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(135deg, #fff 0%, #000 100%), #ffefb0;
  background-blend-mode: soft-light, normal;

  @media ${device.laptop} {
    width: 11rem;
  }
`;

const Initials = styled(H1)`
  font-size: 3rem;
  color: ${DUSTY_ORANGE_700};
  font-weight: 700;
  text-transform: uppercase;

  @media ${device.laptop} {
    font-size: 4rem;
  }
`;

const Avatar = ({ name, firstname, lastname }) => {
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
    <Wrapper>
      <Initials>{initials}</Initials>
    </Wrapper>
  );
};

export default Avatar;
