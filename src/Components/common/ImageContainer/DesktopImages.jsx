import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import styled from "styled-components";
import { toast } from "react-toastify";
import Bugsnag from "@bugsnag/js";

import { deleteImage, uploadImage } from "@utils/helper";
import FlexBox from "@common/UI/FlexBox";
import { ACCENT_0, RATE_BACKGROUND, ACCENT_800 } from "@common/UI/colors";
import ConfirmModal from "@common/UI/ConfirmModal";
import { Body2 } from "@common/UI/Headings";
import Spinner from "@common/UI/Spinner";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 55vh;
  flex-direction: row;
  column-gap: 0.5rem;
  align-self: center;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  position: relative;
  margin-bottom: 110px;
`;

const SmallContainer = styled(FlexBox)`
  width: 50%;
  height: 100%;
  flex-wrap: wrap;
  gap: 0.5rem;
  overflow: hidden;
`;

const BigContainer = styled(FlexBox)`
  flex: 1;
  width: 50%;
  height: 100%;
  border-radius: 0.75rem;
  overflow: hidden;
  border: 1px dashed ${ACCENT_800};
  position: relative;
`;

const BigImages = styled(FlexBox)`
  width: 100%;
  height: 100%;
  position: relative;
  opacity: ${({ loading }) => (loading ? 0.5 : 1)};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BigImgEmptyBox = styled(FlexBox)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SmallImgEmptyBox = styled(FlexBox)`
  width: calc(50% - 0.25rem);
  height: calc(50% - 0.25rem);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 1px dashed ${ACCENT_800};
  border-radius: 0.75rem;
  flex-wrap: wrap;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${({ loading }) => (loading ? 0.5 : 1)};
`;

const UploadArea = styled(FlexBox)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const DeleteBox = styled.div`
  position: absolute;
  top: 3%;
  right: 3%;
  width: 2rem;
  height: 2rem;
  padding: 0.25rem;
  border-radius: 50%;
  color: ${ACCENT_0};
  background-color: ${RATE_BACKGROUND};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinnerContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 200;
`;

const DesktopImages = ({ storeImages, setStoreImages, storeId }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState();

  const bigImage = storeImages[0];

  const handleImageUpload = async index => {
    const fileInput = document.getElementById("fileInput");
    if (fileInput) {
      fileInput.click();
      fileInput.onchange = e => {
        const file = e.target.files[0];
        if (file) {
          const fileSize = file.size / 1024 / 1024; // in MB
          if (fileSize > 10) {
            toast.error("File size should be less than 10 MB");
          } else {
            handleImages(file, index);
          }
        }
      };
    }
  };

  const handleDeleteImage = index => {
    try {
      const images = [...storeImages];
      const imageUrl = images[index]?.imageUrl;
      images[index] = {
        imageUrl: null,
        sort: index + 1,
        isThumbnail: index === 0,
      };
      setDeleteModalOpen(false);
      const boolUpdateValue = true;
      setStoreImages(images);
      deleteImage(imageUrl, images, boolUpdateValue, setStoreImages);
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  const toggleDeleteModal = index => {
    setDeletingIndex(index);
    setDeleteModalOpen(prev => !prev);
  };

  const handleConfirmDelete = () => {
    if (deletingIndex !== null) {
      handleDeleteImage(deletingIndex);
    }
  };

  const handleUploadedImages = async (uploadedImageUrl, index) => {
    setStoreImages(prev => {
      const images = [...prev];
      images[index] = {
        imageUrl: uploadedImageUrl,
        sort: index + 1,
        isThumbnail: index === 0,
      };
      return images;
    });
  };

  const handleImages = async (file, index) => {
    try {
      const reader = new FileReader();
      reader.onload = () => {
        setStoreImages(prev => {
          const images = [...prev];
          images[index] = {
            imageUrl: reader.result,
            sort: index + 1,
            isThumbnail: index === 0,
            loading: true,
          };
          return images;
        });
      };
      reader.readAsDataURL(file);

      const uploadedImageUrl = await uploadImage(file, storeId);
      handleUploadedImages(uploadedImageUrl, index);
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  return (
    <Container>
      {isDeleteModalOpen && (
        <ConfirmModal
          toggleModal={toggleDeleteModal}
          onCancel={toggleDeleteModal}
          onConfirm={handleConfirmDelete}
          title="Delete Image"
          confirmationText="Are you sure you want to delete this image?"
          cancelButtonText="No"
          confirmButtonText="Yes"
        />
      )}
      <Wrapper>
        <BigContainer>
          {bigImage?.imageUrl ? (
            <BigImages>
              {bigImage?.loading && (
                <SpinnerContainer>
                  <Spinner />
                </SpinnerContainer>
              )}
              <Img
                src={bigImage?.imageUrl}
                alt="Uploaded image"
                loading={bigImage?.loading}
              />
              <DeleteBox onClick={() => toggleDeleteModal(0)}>
                <AiOutlineDelete size="1rem" />
              </DeleteBox>
            </BigImages>
          ) : (
            <BigImgEmptyBox onClick={() => handleImageUpload(0)}>
              <UploadArea htmlFor="fileInput">
                <img
                  src="/assets/images/upload.webp"
                  alt="upload"
                  width="50px"
                  height="50px"
                />
                <Body2>Upload Image</Body2>
              </UploadArea>
            </BigImgEmptyBox>
          )}
        </BigContainer>
        <SmallContainer>
          {storeImages.map((image, index) => {
            if (index === 0) return;
            return (
              <>
                {image?.imageUrl ? (
                  <SmallImgEmptyBox key={index}>
                    {image?.loading && (
                      <SpinnerContainer>
                        <Spinner />
                      </SpinnerContainer>
                    )}
                    <Img
                      src={image?.imageUrl}
                      alt="Uploaded image"
                      loading={image?.loading}
                    />
                    <DeleteBox onClick={() => toggleDeleteModal(index)}>
                      <AiOutlineDelete size="1rem" />
                    </DeleteBox>
                  </SmallImgEmptyBox>
                ) : (
                  <SmallImgEmptyBox
                    key={index}
                    onClick={() => handleImageUpload(index)}
                  >
                    <UploadArea htmlFor="fileInput">
                      <img
                        src="/assets/images/upload.webp"
                        alt="upload"
                        width="40px"
                        height="40px"
                      />
                      <Body2>Upload Image</Body2>
                    </UploadArea>
                  </SmallImgEmptyBox>
                )}
              </>
            );
          })}
        </SmallContainer>
      </Wrapper>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
      />
    </Container>
  );
};

export default DesktopImages;
