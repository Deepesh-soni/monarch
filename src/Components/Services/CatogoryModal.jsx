import React, { useState } from "react";
import styled from "styled-components";
import { SlAnchor } from "react-icons/sl";
import { TfiClose } from "react-icons/tfi";

import { H3, H6 } from "../common/UI/Headings";
import Input from "../common/UI/InputBox";
import FlexBox from "../common/UI/FlexBox";
import { Button } from "../common/UI/Buttons";
import Modal from "../common/UI/Modal";
import { PRIMARY_900 } from "../common/UI/colors";

const Wrapper = styled(FlexBox)`
  width: 100%;
  padding: 1rem;
  position: relative;
  align-items: center;
  justify-content: center;
`;

const Close = styled(FlexBox)`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 0.8rem 0.8rem 0rem 0rem;
`;

const Upload = styled(FlexBox)`
  border: 1px dashed ${PRIMARY_900};
  width: 100%;
  justify-content: center;
  height: 8rem;
  align-items: center;
`;

const CatogoryModal = ({ openModal, closeModal }) => {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = event => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    if (name == "") setNameError("name field cannot be empty");
    if (selectedFile) {
      console.log("Selected file:", selectedFile);
    }
    closeModal();
    console.log(name);
  };

  return (
    <Modal togglePopup={openModal} M2 height="35vh" width="30vh">
      <Wrapper column rowGap="10px">
        <H3 textAlign="center">Add a Category</H3>
        <Close onClick={closeModal}>
          <TfiClose size={20} />
        </Close>
        <Input placeholder="Name" onChange={e => setName(e.target.value)} />
        <Upload column>
          <label htmlFor="fileInput">
            <FlexBox column align="center">
              <SlAnchor size="50px" />
              <H6>Upload a Photo</H6>
            </FlexBox>
          </label>

          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {selectedFile && <div>Selected File: {selectedFile.name}</div>}
        </Upload>

        <FlexBox justify="center">
          <Button width="100%" onClick={handleSubmit}>
            Submit
          </Button>
        </FlexBox>
      </Wrapper>
    </Modal>
  );
};

export default CatogoryModal;
