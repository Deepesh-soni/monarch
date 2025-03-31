import React from "react";
import styled from "styled-components";

import Navbar from "@common/Navbar";

const ChildrenWrapper = styled.div`
  background-color: #142c8e0d;
`;

const Layout = ({ children }) => (
  <>
    <Navbar />
    <ChildrenWrapper>{children}</ChildrenWrapper>
  </>
);

export default Layout;
