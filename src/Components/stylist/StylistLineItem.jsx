import { useState, useMemo } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

import Avatar from "@common/UI/Avatar";
import FlexBox from "@common/UI/FlexBox";
import ConfirmModal from "@common/UI/ConfirmModal";
import { EditAndDelete } from "@common/EditAndDelete";
import { roleLookUp } from "@metaData/lookUps";
import { Body1 } from "@common/UI/Headings";
import StylistModal from "./StylistModal";

const Image = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  gap: 0.25rem;
`;

const Name = styled.span`
  text-transform: capitalize;
`;

const AvatarImage = styled.img`
  object-fit: cover;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
`;

const Td = styled.td`
  text-align: ${({ align }) => align || "left"};
  padding: 1.5rem;
  border-top: 1px solid #dddddd;
  font-size: 0.8rem;
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.7rem;
  }
`;

const StylistLineItem = ({ data, deleteItem, refreshList, options }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState(data);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const toggleDeleteModal = () => setDeleteModalOpen(prev => !prev);

  const truncateExpertise = (expertise, maxLength) => {
    if (expertise.length > maxLength) {
      return expertise.substring(0, maxLength - 3) + "...";
    }
    return expertise;
  };

  const expertise = useMemo(() => {
    let expertiseValues = [];
    for (let expertiseKey of data?.expertise) {
      for (let option of options) {
        // avoid type comparison
        if (option.key == expertiseKey) {
          expertiseValues.push(option.value);
          break;
        }
      }
    }
    return expertiseValues;
  }, [data, options]);

  return (
    <>
      {isModalOpen && (
        <StylistModal
          closeModal={closeModal}
          data={data}
          isUpdate={true}
          refreshList={refreshList}
          options={options}
          formData={formData}
          setFormData={setFormData}
        />
      )}
      {isDeleteModalOpen && (
        <ConfirmModal
          toggleModal={toggleDeleteModal}
          onCancel={toggleDeleteModal}
          onConfirm={() => {
            deleteItem(data._id);
            toggleDeleteModal();
          }}
          title="Delete Stylist Info"
          confirmationText="Deleting this information will lose all the data about the stylist. Are you sure?"
          cancelButtonText="No"
          confirmButtonText="Yes"
        />
      )}
      <tr>
        <Td>
          <FlexBox columnGap="0.5rem" align="center">
            {data?.avatar ? (
              <AvatarImage src={data?.avatar} alt="Avatar" />
            ) : (
              <Avatar firstname={data?.name} />
            )}
            <Name>{data?.name}</Name>
          </FlexBox>
        </Td>
        <Td>{dayjs(data?.joiningDate).format("D MMM, YYYY")}</Td>
        <Td>{roleLookUp[data?.userType]}</Td>
        <Td>{truncateExpertise(expertise.join(", "), 20)}</Td>
        <Td align="center">{data?.totalBooking ? data.totalBooking : "-"}</Td>
        <Td align="center">
          {data?.overallRating ? (
            <FlexBox columnGap="0.5rem" justify="center" align="center">
              <Image src="/assets/star.webp" />
              <Body1>{data?.overallRating}</Body1>
            </FlexBox>
          ) : (
            "-"
          )}
        </Td>
        <Td align="center">
          <EditAndDelete
            handleDeleteClick={() => setDeleteModalOpen(true)}
            handleEditClick={openModal}
          />
        </Td>
      </tr>
    </>
  );
};

export default StylistLineItem;
