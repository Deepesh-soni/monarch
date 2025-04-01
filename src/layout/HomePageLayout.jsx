import React from "react";
import styled from "styled-components";

import Navbar from "@common/NavBar";

const ChildrenWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Layout = ({ children }) => (
  <>
    <Navbar />
    <ChildrenWrapper>{children}</ChildrenWrapper>
  </>
);

export default Layout;
