import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaFileImage } from "react-icons/fa";
import { TfiClose } from "react-icons/tfi";
import Bugsnag from "@bugsnag/js";
import { toast } from "react-toastify";
import { trackEvent } from "@utils/helper";

import Footer from "./Footer";
import { OnboardingLayout } from "./OnboardingLayout";
import { device } from "@common/UI/Responsive";
import FlexBox from "@common/UI/FlexBox";
import { Body2, Body1 } from "@common/UI/Headings";
import { SECONDARY_200, ACCENT_600, PRIMARY_900 } from "@common/UI/colors";
import { uploadImage, deleteImage } from "@utils/helper";
import Spinner from "@common/UI/Spinner";
import ConfirmModal from "@common/UI/ConfirmModal";

const Container = styled(FlexBox)`
  position: relative;
  width: 100%;
  height: 30%;
  border: 2px dashed #ccc;
  border-radius: 1rem;
  justify-content: center;
  align-items: center;

  @media ${device.laptop} {
    width: 70%;
    height: 55%;
  }
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const UploadArea = styled(FlexBox)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  gap: 1rem;
  cursor: pointer;
`;

const FileDetails = styled(FlexBox)`
  margin-top: 2.5rem;
  width: 90vw;
  height: fit-content;
  align-items: center;
  padding: 1rem;
  border: 1px solid ${SECONDARY_200};
  border-radius: 1rem;
  justify-content: space-between;

  @media ${device.laptop} {
    width: 35vw;
  }
`;

const Preview = styled(FlexBox)`
  width: 4.5rem;
  height: 2.5rem;
  justify-content: center;
`;

const DeleteButton = styled(FlexBox)`
  width: 2.5rem;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 50%;
  border: 1px solid ${SECONDARY_200};
  cursor: pointer;
`;

const GovernmentId = ({
  pageNum,
  handleNextPage,
  handlePrevPage,
  slideDirection,
  storeData,
  storeId,
  commonAnalyticsPayload,
}) => {
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [selectedFile, setSelectedFile] = useState(() => {
    return storeData?.governmentId.length > 0 ? storeData.governmentId : [];
  });

  useEffect(() => {
    if (!storeData?.governmentId?.length) return;
    setSelectedFile(storeData.governmentId);
  }, [storeData?.governmentId]);

  const handleConfirmDelete = () => {
    try {
      trackEvent("salon_govt_id_delete_click", commonAnalyticsPayload);
      deleteImage(selectedFile[0]);
    } catch (error) {
      Bugsnag.notify(error);
    }

    setSelectedFile([]);
    setDeleteModalOpen(false);
  };

  const toggleDeleteModal = () => setDeleteModalOpen(prev => !prev);

  const handleFile = async file => {
    try {
      const uploadedFileUrl = await uploadImage(file, storeId, "Government_ID");
      setShowSpinner(false);
      setSelectedFile([uploadedFileUrl]);
    } catch (error) {
      Bugsnag.notify(error);
    }
  };

  const handleFileChange = e => {
    trackEvent("salon_govt_id_upload_click", commonAnalyticsPayload);
    const file = e.target.files[0];

    if (file) {
      const allowedFormats = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
      ];
      const fileSize = file.size / 1024 / 1024; // in MB
      const fileType = file.type;

      if (!allowedFormats?.includes(fileType)) {
        toast.error("Only JPEG, PNG, JPG, and PDF files are allowed");
      } else if (fileSize > 5) {
        toast.error("File size should be less than 5 MB");
      } else {
        setShowSpinner(true);
        handleFile(file);
      }
    }
  };

  const disableNext = !selectedFile?.length;

  return (
    <>
      {isDeleteModalOpen && (
        <ConfirmModal
          toggleModal={toggleDeleteModal}
          onCancel={toggleDeleteModal}
          onConfirm={handleConfirmDelete}
          title="Delete File"
          confirmationText="Are you sure you want to delete this file ?"
          cancelButtonText="No"
          confirmButtonText="Yes"
        />
      )}
      <OnboardingLayout
        slideDirection={slideDirection}
        title="One Last Step"
        subTitle="Please submit your trade license for verification. If unavailable, please provide both sides of your PAN card."
      >
        {!selectedFile[0] ? (
          <Container onChange={handleFileChange}>
            {showSpinner ? (
              <Spinner />
            ) : (
              <>
                <HiddenInput
                  type="file"
                  accept="image/jpeg, image/png, image/jpg, application/pdf"
                />
                <UploadArea>
                  <img
                    src="/assets/images/upload.webp"
                    alt="pamprazzi Logo"
                    width="50px"
                    height="50px"
                  />
                  <Body1 color={ACCENT_600}>Upload Image, PDF, etc.</Body1>
                </UploadArea>
              </>
            )}
          </Container>
        ) : (
          <FileDetails>
            <FlexBox Gap="0.75rem" align="center" justify="center">
              <Preview>
                <FaFileImage size={40} />
              </Preview>
              <FlexBox column align="start">
                <Body2 bold color={PRIMARY_900}>
                  <a href={selectedFile[0]} target="_blank">
                    Government_Id
                  </a>
                </Body2>
              </FlexBox>
            </FlexBox>

            <DeleteButton onClick={toggleDeleteModal}>
              <TfiClose />
            </DeleteButton>
          </FileDetails>
        )}
      </OnboardingLayout>
      <Footer
        handleNext={() => handleNextPage({ governmentId: selectedFile })}
        handleBack={handlePrevPage}
        pageNum={pageNum}
        disableNext={disableNext}
        nextCtaLabel="Next"
      />
    </>
  );
};

export default GovernmentId;
