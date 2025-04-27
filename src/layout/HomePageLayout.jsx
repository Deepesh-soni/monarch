import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Navbar from "@common/NavBar";
import { Small } from "@Components/common/Typography";

const ChildrenWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  background-color: ${({ noBg }) =>
    noBg ? "transparent" : "rgba(20, 44, 142, 0.05)"};
`;

const CopyRightBox = styled.div`
  display: flex;
  background-color: black;
  width: 100%;
  height: 3rem;
  justify-content: center;
  align-items: center;
`;

const Layout = ({ children, noBg = false }) => (
  <>
    <Navbar />
    <ChildrenWrapper noBg={noBg}>{children}</ChildrenWrapper>
    <CopyRightBox>
      <Small color="white">© 2025 FinEase. All rights reserved.</Small>
    </CopyRightBox>
  </>
);

export default Layout;
