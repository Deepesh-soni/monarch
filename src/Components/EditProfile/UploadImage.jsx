import { useState, useCallback } from "react";
import styled from "styled-components";
import { TfiClose } from "react-icons/tfi";
import { useSelector } from "react-redux";

import { TAB_COLOR, ACCENT_0, PRIMARY_800, ERROR } from "@common/UI/colors";
import FlexBox from "@common/UI/FlexBox";
import { uploadImage, deleteImage } from "@utils/helper";
import Spinner from "@common/UI/Spinner";
import { device } from "@common/UI/Responsive";

const UploadArea = styled(FlexBox)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
`;

const Img = styled.img`
  height: 100%;
  width: 100%;
`;

const Preview = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const AvatarWrapper = styled(FlexBox)`
  height: 7rem;
  aspect-ratio: 1;
  border-radius: 50%;
  position: relative;
  background-color: ${TAB_COLOR};
  align-items: center;
  justify-content: center;

  @media ${device.laptop} {
    height: 12.5rem;
  }
`;

const DeleteButton = styled(FlexBox)`
  position: absolute;
  background-color: ${ERROR};
  top: 0.5rem;
  right: 0rem;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;

  @media ${device.laptop} {
    top: 0.875rem;
    right: 1rem;
  }
`;

const Upload = styled(FlexBox)`
  position: absolute;
  right: 0;
  bottom: 0.5rem;
  justify-content: center;
  background-color: ${PRIMARY_800};
  border-radius: 50%;
  padding: 0.25rem;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;

  @media ${device.laptop} {
    bottom: 0.875rem;
    right: 1rem;
  }
`;

const UploadImage = ({ formData, setFormData }) => {
  const storeId = useSelector(state => state.auth.storeId);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = useCallback(
    async event => {
      const file = event.target.files[0];
      if (file) {
        setIsUploading(true);
        try {
          const imgUrl = await uploadImage(file, storeId);
          setFormData(prevData => ({ ...prevData, avatar: imgUrl }));
        } finally {
          setIsUploading(false);
        }
      }
    },
    [setFormData, storeId]
  );

  const handleImageClick = useCallback(() => {
    document.getElementById("fileInput").click();
  }, []);

  const handleDeleteFile = useCallback(() => {
    deleteImage(formData?.avatar);
    setFormData(prevData => ({ ...prevData, avatar: "" }));
  }, [formData?.avatar, setFormData]);

  return (
    <>
      {isUploading ? (
        <AvatarWrapper>
          <Spinner />
        </AvatarWrapper>
      ) : !formData?.avatar ? (
        <AvatarWrapper cursor="pointer" onClick={handleImageClick}>
          <input
            hidden
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          <UploadArea htmlFor="fileInput">
            <Img src="/assets/upload.svg" alt="avatar" />
          </UploadArea>
          <Upload>
            <img
              height="16px"
              width="16px"
              src="/assets/images/camera-plus.webp"
              alt="camera icon"
            />
          </Upload>
        </AvatarWrapper>
      ) : (
        <AvatarWrapper>
          <Preview src={formData?.avatar} alt="avatar" />
          <DeleteButton onClick={handleDeleteFile}>
            <TfiClose color={ACCENT_0} />
          </DeleteButton>
        </AvatarWrapper>
      )}
    </>
  );
};

export default UploadImage;
