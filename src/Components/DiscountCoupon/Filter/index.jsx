import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { GiSettingsKnobs } from "react-icons/gi";
import { TfiClose } from "react-icons/tfi";
import dynamic from "next/dynamic";

import FlexBox from "@common/UI/FlexBox";
import { Body2 } from "@common/UI/Headings";
import { PRIMARY_800, SECONDARY_901 } from "@common/UI/colors";
import { filterMeta, filterMetaDiscount } from "../../../metaData/filterMeta";

const FilterModal = dynamic(() => import("./FilterModal"));

const SingleFilterBox = styled(FlexBox)`
  padding: 0.25rem 1rem;
  width: fit-content;
  align-items: center;
  border-radius: 1.5rem;
  column-gap: 0.25rem;
  cursor: pointer;
  background-color: ${SECONDARY_901};
`;

const Filter = ({ filterData, setFilterData, initialState, showDistinct }) => {
  const [filters, setFilters] = useState(filterData);
  const [filterModal, setFilterModal] = useState(false);

  useEffect(() => {
    setFilterData(filters);
  }, [filters, setFilterData]);

  const removeFilter = (filterName, optionSlug) => {
    setFilters(prevFilters => {
      if (Array.isArray(prevFilters[filterName])) {
        return {
          ...prevFilters,
          [filterName]: prevFilters[filterName].filter(
            slug => slug !== optionSlug
          ),
        };
      }
      return { ...prevFilters, [filterName]: "" };
    });
  };

  const openFilterModal = () => setFilterModal(true);
  const closeFilterModal = () => setFilterModal(false);

  const renderFilterChips = () => {
    return (showDistinct ? filterMetaDiscount : filterMeta).map(filter => {
      if (filter.type === "radio") {
        const selectedOption = filter.options.find(
          option => option.slug === filters[filter?.slug]
        );
        if (selectedOption) {
          return (
            <SingleFilterBox
              key={filter.slug}
              onClick={() => removeFilter(filter.slug)}
            >
              <Body2 color={PRIMARY_800}>{selectedOption.label}</Body2>
              <TfiClose size={12} color={PRIMARY_800} />
            </SingleFilterBox>
          );
        }
      } else if (filter.type === "checkbox" && filters[filter.slug]?.length) {
        return filters[filter.slug].map(optionSlug => {
          const selectedOption = filter.options.find(
            option => option.slug === optionSlug
          );
          return (
            <SingleFilterBox
              key={optionSlug}
              onClick={() => removeFilter(filter.slug, optionSlug)}
            >
              <Body2 color={PRIMARY_800}>{selectedOption.label}</Body2>
              <TfiClose size={12} color={PRIMARY_800} />
            </SingleFilterBox>
          );
        });
      }
      return null;
    });
  };

  return (
    <>
      {filterModal && (
        <FilterModal
          closeModal={closeFilterModal}
          filters={filters}
          setFilters={setFilters}
          initialState={initialState}
          showDistinct={showDistinct}
        />
      )}
      <FlexBox columnGap="0.5rem" align="center" cursor="pointer">
        {renderFilterChips()}

        <FlexBox columnGap="0.5rem" align="center" onClick={openFilterModal}>
          <GiSettingsKnobs />
          <Body2>Filters</Body2>
        </FlexBox>
      </FlexBox>
    </>
  );
};

export default Filter;
