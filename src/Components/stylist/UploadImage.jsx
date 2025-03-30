import { useState } from "react";
import styled from "styled-components";
import { TfiClose } from "react-icons/tfi";
import { useSelector } from "react-redux";

import { TAB_COLOR, ACCENT_0 } from "@common/UI/colors";
import FlexBox from "@common/UI/FlexBox";
import { uploadImage, deleteImage } from "@utils/helper";
import Spinner from "@common/UI/Spinner";

const Container = styled(FlexBox)`
  position: relative;
  background-color: ${TAB_COLOR};
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const ImageContainer = styled(FlexBox)`
  position: relative;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
`;

const UploadArea = styled(FlexBox)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  gap: 1rem;
  cursor: pointer;
`;

const Image = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

const Preview = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const DeleteButton = styled(FlexBox)`
  position: absolute;
  background-color: red;
  top: 0;
  right: 0;
  width: 1.5rem;
  height: 1.5rem;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border-radius: 50%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
  z-index: 10;
`;

const UploadImage = ({ formData, setFormData }) => {
  const storeId = useSelector(state => state.auth.storeId);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async event => {
    const file = event.target.files[0];
    setIsUploading(true);
    const imgUrl = await uploadImage(file, storeId);
    setIsUploading(false);
    setFormData({ ...formData, avatar: imgUrl });
  };

  const handleDeleteFile = () => {
    deleteImage(formData?.avatar);
    setFormData({ ...formData, avatar: "" });
  };

  return (
    <>
      {!formData?.avatar ? (
        <Container onChange={handleFileChange}>
          {isUploading ? (
            <Spinner />
          ) : (
            <>
              <HiddenInput type="file" accept="image/*" />
              <UploadArea htmlFor="fileInput">
                <Image src="/assets/upload.svg" alt="avatar" />
              </UploadArea>
            </>
          )}
        </Container>
      ) : (
        <ImageContainer>
          <Preview src={formData?.avatar} alt="avatar" />
          <DeleteButton onClick={handleDeleteFile}>
            <TfiClose color={ACCENT_0} size={16} />
          </DeleteButton>
        </ImageContainer>
      )}
    </>
  );
};

export default UploadImage;
