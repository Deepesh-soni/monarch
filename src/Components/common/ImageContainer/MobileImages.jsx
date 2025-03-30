import React, { useState } from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import Bugsnag from "@bugsnag/js";

import FlexBox from "@common/UI/FlexBox";
import { Body2 } from "@common/UI/Headings";
import { RATE_BACKGROUND, ACCENT_800, ACCENT_0 } from "@common/UI/colors";
import { deleteImage, uploadImage } from "@utils/helper";
import Spinner from "@common/UI/Spinner";
import ConfirmModal from "@common/UI/ConfirmModal";

const SmallContainer = styled(FlexBox)`
  gap: 0.5rem;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  align-items: center;
  overflow-y: auto;
`;

const SmallImgEmptyBox = styled(FlexBox)`
  width: 100%;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 1px dashed ${ACCENT_800};
  border-radius: 0.5rem;
  max-width: 400px;
  height: 200px;
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

const MobileImages = ({ storeImages, setStoreImages, storeId }) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState();

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
    <SmallContainer>
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
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
      />
      {storeImages.map((image, index) => (
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
              <DeleteBox onClick={() => handleDeleteImage(index)}>
                <IoClose size="1rem" />
              </DeleteBox>
            </SmallImgEmptyBox>
          ) : (
            <SmallImgEmptyBox
              key={index}
              onClick={() => handleImageUpload(index)}
              loading={image?.loading}
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
      ))}
    </SmallContainer>
  );
};

export default MobileImages;
