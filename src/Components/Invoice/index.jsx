import React, { useState } from "react";
import styled from "styled-components";
import { FiFileText } from "react-icons/fi";
import dynamic from "next/dynamic";

import FlexBox from "@common/UI/FlexBox";

const PreviewInvoice = dynamic(() => import("./PreviewInvoice"));

const MenuIcon = styled(FlexBox)`
  height: 1.5rem;
  width: 1.5rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Invoice = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  //TODO: use query params to toggle
  const togglePreview = () => setShowModal(prev => !prev);

  return (
    <>
      {showModal && <PreviewInvoice data={data} toggleModal={togglePreview} />}
      <MenuIcon onClick={togglePreview}>
        <FiFileText size={20} />
      </MenuIcon>
    </>
  );
};

export default Invoice;
