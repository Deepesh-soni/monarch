import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import { canHandleRoute, getRoutingComponent, redirectToAuth } from "supertokens-auth-react/ui";
import styled from "styled-components";
import FlexBox from "@Components/common/UI/FlexBox";
import { device } from "@Components/common/UI/Responsive";
import NavBar from "@common/NavBar";

const Wrapper = styled.div`
  background: url("/assets/home/page-bg.png");
  background-position: center;
`;

const Container = styled(FlexBox)`
  flex-direction: column;
  padding: 0 1rem;
  align-items: center;
  gap: 0.5rem;

  @media ${device.laptop} {
    flex-direction: column;
    justify-content: space-between;
    margin: auto;
    gap: 2.5rem;
    width: 86.67%;
    max-width: 75rem;
    padding-bottom: 150px;
  }
`;

const Auth = () => {
  const [ComponentToRender, setComponentToRender] = useState(null);

  useEffect(() => {
    if (!canHandleRoute([EmailPasswordPreBuiltUI])) {
      redirectToAuth();
    } else {
      const Comp = getRoutingComponent([EmailPasswordPreBuiltUI]);
      if (Comp && typeof Comp === "function") {
        setComponentToRender(() => Comp);
      } else {
        setComponentToRender(null); // Don't render if invalid
      }
    }
  }, []);

  if (!ComponentToRender) return null;

  return (
    <Wrapper>
      <NavBar />
      <Container>
        <div style={{ marginTop: "40px", width: "100%", maxWidth: "480px" }}>
          <ComponentToRender />
        </div>
      </Container>
    </Wrapper>
  );
};

export default Auth;
