import React from "react";
import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import Bugsnag from "@bugsnag/js";

import { ACCENT_0, PRIMARY_800 } from "@common/UI/colors";
import { Body2 } from "@common/UI/Headings";
import FlexBox from "@common/UI/FlexBox";
import { ServiceCard } from "./ServiceCard";
import ServiceModal from "../Services/ServicesModal";
import ServicesBanner from "./ServicesBanner";
import { trackEvent } from "@utils/helper";

const AddMoreBtn = styled(FlexBox)`
  width: fit-content;
  align-self: center;
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;
  background-color: ${PRIMARY_800};
  cursor: pointer;
  margin-top: 1rem;
`;

export const ServicesList = ({
  clicked,
  category,
  services,
  refreshList,
  activeCategory,
}) => {
  const [servicesModal, setServicesModal] = useState(false);

  const addMoreRef = useRef(null);

  const closeServiceModal = () => {
    setServicesModal(false);
  };

  useEffect(() => {
    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const intersectionCallback = entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
        }
      });
    };

    try {
      const observer = new IntersectionObserver(intersectionCallback, options);
      if (addMoreRef?.current) observer.observe(addMoreRef?.current);
    } catch (error) {
      toast.error(err.message);
      Bugsnag.notify(err);
    }
  }, [addMoreRef]);

  //TODO: implement common analytics payload

  return (
    <FlexBox column>
      <div id={category?._id}>
        {servicesModal && (
          <ServiceModal
            closeModal={closeServiceModal}
            openModal={servicesModal}
            heading={category?.categoryName}
            services={services}
            categoryId={category?.categoryId}
            refreshList={refreshList}
            activeCategory={activeCategory}
          />
        )}
        <ServicesBanner data={category?.categoryBanner} />
        {services?.map(item => (
          <ServiceCard
            key={item?._id}
            clicked={clicked}
            item={item}
            refreshList={refreshList}
            activeCategory={activeCategory}
          />
        ))}
      </div>
      <AddMoreBtn
        ref={addMoreRef}
        onClick={() => {
          trackEvent("service_add_new_cta_click", {
            current_page: "services",
            item_type: "cta",
            selected_category: activeCategory,
            selected_option: "Add New service",
          });
          setServicesModal(true);
        }}
      >
        <Body2 color={ACCENT_0} textTransform="uppercase">
          Add New service
        </Body2>
      </AddMoreBtn>
    </FlexBox>
  );
};
