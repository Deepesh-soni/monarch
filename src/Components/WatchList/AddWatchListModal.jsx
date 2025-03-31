import React, { useState } from "react";
import styled from "styled-components";

import FlexBox from "@common/UI/FlexBox";
import { Body1 } from "@common/UI/Headings";
import { Button } from "@common/UI/Buttons";
import Modal from "@common/UI/Modal";
import { SECONDARY_200 } from "@common/UI/colors";
import Input from "@common/UI/InputBox";
import { client } from "@axiosClient";
import { toast } from "react-toastify";
// import TextArea from "antd/es/input/TextArea";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
`;

const Container = styled(FlexBox)`
  padding: 1rem;
  border-top: 1px solid ${SECONDARY_200};
  row-gap: 1.5rem;
`;

const ButtonWrapper = styled(FlexBox)`
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const AddWatchListModal = ({
  toggleModal,
  cancelButtonText = "Cancel",
  confirmButtonText = "Create Watchlist",
  onConfirm = () => {},
  onCancel = () => {},
}) => {
  const [watchlistName, setWatchlistName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateWatchlist = async () => {
    if (!watchlistName.trim()) {
      toast.error("Watchlist name is required.");
      return;
    }

    setLoading(true);
    try {
      await client.post("/watchlists", {
        name: watchlistName,
        description,
      });
      toast.success("Watchlist created successfully!");
      onConfirm();
      toggleModal();
    } catch (error) {
      toast.error("Failed to create watchlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      XS
      togglePopup={toggleModal}
      height="fit-content"
      mobileHeight="fit-content"
      mobileWidth="90%"
      mobileBorderRadius="0.5rem"
      borderRadius="1rem"
    >
      <Wrapper>
        <Body1 bold>Create New Watchlist</Body1>
        <Container column>
          <Body1 textAlign="center">Watchlist Name</Body1>
          <Input
            type="text"
            placeholder="Enter watchlist name"
            maxLength={256}
            value={watchlistName}
            onChange={e => setWatchlistName(e.target.value)}
          />
          <Body1>Description</Body1>
          {/* <TextArea
            type="text"
            placeholder="Enter description"
            maxLength={2448}
            value={description}
            onChange={e => setDescription(e.target.value)}
          /> */}
          <ButtonWrapper>
            <Button
              width="100%"
              outline
              secondary
              onClick={onCancel}
              disabled={loading}
            >
              {cancelButtonText}
            </Button>
            <Button
              width="100%"
              onClick={handleCreateWatchlist}
              disabled={loading}
            >
              {loading ? "Creating..." : confirmButtonText}
            </Button>
          </ButtonWrapper>
        </Container>
      </Wrapper>
    </Modal>
  );
};

export default AddWatchListModal;
