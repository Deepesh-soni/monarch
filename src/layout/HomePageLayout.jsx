import React from "react";
import styled from "styled-components";

import Navbar from "@common/NavBar";
import { Small } from "@Components/common/Typography";

const ChildrenWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

const CopyRightBox = styled.div`
  display: flex;
  background-color: black;
  width: 100%;
  height: 3rem;
  justify-content: center;
  align-items: center;
`;

const Layout = ({ children }) => (
  <>
    <Navbar />
    <ChildrenWrapper>{children}</ChildrenWrapper>
    <CopyRightBox>
      <Small color="white">
        Copyright © 2025 FinEase Pvt. Ltd. All rights reserved.
      </Small>
    </CopyRightBox>
  </>
);

export default Layout;
