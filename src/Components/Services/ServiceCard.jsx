import React, { useState, useCallback } from "react";
import { SlClock } from "react-icons/sl";
import { URL } from "@constants/urls";
import { client } from "@axiosClient";
import styled from "styled-components";
import { toast } from "react-toastify";
import Bugsnag from "@bugsnag/js";
import dynamic from "next/dynamic";

import { Body2 } from "@common/UI/Headings";
import FlexBox from "@common/UI/FlexBox";
import { PRIMARY_800, SECONDARY_800 } from "@common/UI/colors";
import Loader from "@common/Loader";
import { EditAndDelete } from "@common/EditAndDelete";
import { trackEvent } from "@utils/helper";

const ServiceModal = dynamic(() => import("./ServicesModal"), {
  loading: () => <Loader fitContent />,
});

const ConfirmModal = dynamic(() => import("@common/UI/ConfirmModal"), {
  loading: () => <Loader fitContent />,
});

const CardContainer = styled.div`
  border-bottom: 1px solid ${SECONDARY_800};
`;

const BorderBox = styled.div`
  width: 0.5rem;
  height: 6rem;
  background-color: ${PRIMARY_800};
`;

const Card = styled(FlexBox)`
  row-gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
`;

const ServiceDetails = styled(FlexBox)`
  width: 90%;
  flex-direction: column;
`;

const CardContent = styled(FlexBox)`
  width: 100%;
  justify-content: space-between;
  padding: 1rem;
  align-items: center;
  column-gap: 0.5rem;
`;

export const ServiceCard = ({ item, refreshList, activeCategory }) => {
  const [servicesModal, setServicesModal] = useState(false);
  const [confirmModalOpen, setConfirmMOdalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const closeServiceModal = () => {
    setServicesModal(false);
  };

  const toggleConfirmModal = () => {
    setConfirmMOdalOpen(prev => !prev);
  };

  const deleteItem = useCallback(async () => {
    if (selectedIndex == null) return;
    const data = { storeId: item.storeId };
    try {
      await client.delete(`${URL.deleteService}/${selectedIndex}`, { data });
      toast.success("Service deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete service.");
      Bugsnag.notify(error);
    } finally {
      setConfirmMOdalOpen(false);
      refreshList();
    }
  }, [selectedIndex]);

  return (
    <>
      <CardContainer>
        {servicesModal && (
          <ServiceModal
            closeModal={closeServiceModal}
            openModal={servicesModal}
            heading={item?.serviceName}
            data={item}
            categoryId={item?.categoryId}
            refreshList={refreshList}
            isUpdate={true}
            textCta="update"
          />
        )}

        {confirmModalOpen && (
          <ConfirmModal
            toggleModal={toggleConfirmModal}
            title="Delete Service"
            confirmationText="Are you sure you want to proceed with the deletion of this service? "
            onConfirm={deleteItem}
            onCancel={toggleConfirmModal}
          />
        )}

        <Card>
          <BorderBox />
          <CardContent>
            <ServiceDetails column>
              <Body2 bold>{item?.serviceName}</Body2>
              <Body2>{item?.description}</Body2>
              <FlexBox columnGap="1rem" align="center">
                {item?.timeTaken && (
                  <FlexBox columnGap="0.4rem" align="center">
                    <SlClock />
                    <Body2>
                      {Math.ceil(item?.timeTaken / 60)}
                      mins
                    </Body2>
                  </FlexBox>
                )}
              </FlexBox>
              <Body2 bold>₹ {item?.mrp}</Body2>
            </ServiceDetails>
            <EditAndDelete
              handleDeleteClick={() => {
                trackEvent("service_delete_icon_click", {
                  current_page: "services",
                  item_type: "icon",
                  selected_category: activeCategory,
                  selected_option: "thrash icon",
                });
                setSelectedIndex(item._id);
                toggleConfirmModal();
              }}
              handleEditClick={() => {
                trackEvent("service_edit_icon_click", {
                  current_page: "services",
                  item_type: "icon",
                  selected_category: activeCategory,
                  selected_option: "edit icon",
                });
                setServicesModal(true);
              }}
            />
          </CardContent>
        </Card>
      </CardContainer>
    </>
  );
};
