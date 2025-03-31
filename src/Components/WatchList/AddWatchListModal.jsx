import React, { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

import FlexBox from "@common/UI/FlexBox";
import { Body1 } from "@common/UI/Headings";
import { Button } from "@common/UI/Buttons";
import Modal from "@common/UI/Modal";
import Input from "@common/UI/InputBox";
import { client } from "@axiosClient";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
`;

const Container = styled(FlexBox)`
  padding: 1rem;
  gap: 0.5rem;
`;

const ButtonWrapper = styled(FlexBox)`
  justify-content: end;
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
        <FlexBox padding="0.5rem 1rem">
          <Body1 bold>Create New Watchlist</Body1>
        </FlexBox>
        <Container column>
          <Body1 bold color="#687792">
            Watchlist Name
          </Body1>
          <Input
            type="text"
            placeholder="Enter watchlist name"
            maxLength={256}
            value={watchlistName}
            onChange={e => setWatchlistName(e.target.value)}
          />
          <Body1 bold color="#687792">
            Description
          </Body1>
          <textarea
            type="text"
            placeholder="Enter description"
            maxLength={2448}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <ButtonWrapper>
            <Button outline onClick={onCancel} disabled={loading}>
              {cancelButtonText}
            </Button>
            <Button onClick={handleCreateWatchlist} disabled={loading}>
              {loading ? "Creating..." : confirmButtonText}
            </Button>
          </ButtonWrapper>
        </Container>
      </Wrapper>
    </Modal>
  );
};

export default AddWatchListModal;
