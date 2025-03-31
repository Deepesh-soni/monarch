import React from "react";
import styled from "styled-components";

import Navbar from "@common/Navbar";

const ChildrenWrapper = styled.div``;

const Layout = ({ children }) => (
  <>
    <Navbar />
    <ChildrenWrapper>{children}</ChildrenWrapper>
  </>
);

export default Layout;
