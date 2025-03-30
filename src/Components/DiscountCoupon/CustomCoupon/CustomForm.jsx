import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { FiRepeat } from "react-icons/fi";

import FlexBox from "@common/UI/FlexBox";
import { Body1, Body2, Support, Caption } from "@common/UI/Headings";
import { Button } from "@common/UI/Buttons";
import Radio from "@common/UI/Radio";
import CheckBox from "@common/UI/CheckBox";
import InputBox from "@common/UI/InputBox";
import { SECONDARY_200, ACCENT_800, PRIMARY_900 } from "@common/UI/colors";
import { device } from "@common/UI/Responsive";
import CustomConfirmModal from "./CustomConfirmModal";
import SelectBoxComp from "./selectBoxComp";
import { randomCustomCoupons } from "@utils/helper";
import { customCouponsData } from "@metadata/customCoupons";
import { Field } from "./Field";

const Wrapper = styled(FlexBox)`
  width: 100%;
  flex-direction: column;
  gap: 1rem;
`;

const Section = styled(FlexBox)`
  background: #fff;
  padding: 1rem;
  border-radius: 0.75rem;
  flex-direction: column;
  gap: 1rem;

  @media ${device.laptop} {
    padding: 1rem 1.5rem;
  }
`;

const Body = styled(FlexBox)`
  gap: 1rem;
  @media ${device.laptop} {
    width: 70%;
  }
`;

const Title = styled(FlexBox)`
  flex-direction: column;
  font-weight: bold;
  width: 100%;
  max-width: 14vw;
  text-align: right;
  align-items: end;
`;

const InputWrapper = styled(FlexBox)`
  max-width: 23.1875rem;
`;

const CustomerSection = styled(FlexBox)`
  flex-direction: row;
  @media ${device.laptop} {
    flex-direction: column;
  }
`;

const Container = styled(FlexBox)`
  flex-direction: column;
  @media ${device.laptop} {
    flex-direction: row;
  }
`;

const Box = styled(FlexBox)`
  flex-direction: column;
  gap: 0.5rem;

  @media ${device.laptop} {
    align-items: center;
    flex-direction: row;
  }
`;

const initialState = {
  couponCode: "",
  couponName: "",
  couponOptions: null,
  discountAmount: "",
  minPurchase: "",
  maxPurchase: "",
  minDiscount: "",
  customerGroups: null,
  lastVisitDays: null,
  ageGroups: [],
  pamprazziTags: [],
  gender: [],
  startDate: "",
  endDate: "",
  couponBudget: "",
  noOfTimeCanUsePerUser: null,
  merchantUsageLimitDefine: false,
  totalUsageLimit: null,
  serviceIds: [],
  serviceCategoryId: [],
  exemptServices: [],
};

const theme = {
  input: {
    padding: "0.25rem 0.75rem",
    border: SECONDARY_200,
    requiredColor: "red",
    IconColor: ACCENT_800,
    crossIconColor: ACCENT_800,
  },
};

const CustomForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [openModal, setOpenModal] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [exemptServices, setExemptServices] = useState([]);

  const router = useRouter();

  const handleRedirect = () => router.push("/coupons/custom");

  const storeName = useSelector(
    state => state?.activeStore?.storeDetails?.storeName
  );

  const handleModal = () => setOpenModal(true);

  const handleDropChange = serviceList => {
    const serviceIds = serviceList.map(service => service.serviceId);
    setSelectedServices(serviceIds);

    setFormData(prevFormData => ({
      ...prevFormData,
      serviceIds: serviceIds,
    }));
  };

  const handleCategoryChange = serviceList => {
    const serviceIds = serviceList.map(service => service.categoryId);
    setSelectedCategory(serviceIds);
    setFormData(prevFormData => ({
      ...prevFormData,
      serviceCategoryId: serviceIds,
    }));
  };

  const handleExemptChange = serviceList => {
    const serviceIds = serviceList.map(service => service.serviceId);
    setExemptServices(serviceIds);

    setFormData(prevFormData => ({
      ...prevFormData,
      exemptServices: serviceIds,
    }));
  };

  const handleInputChange = (key, value) => {
    setFormData(prevState => ({ ...prevState, [key]: value }));
  };

  const handleRadioChange = (key, value) => {
    setFormData(prevState => ({ ...prevState, [key]: value }));
  };

  const handleCheckboxChange = (key, value, allValues) => {
    setFormData(prevState => {
      let updatedArray;
      if (value === null) {
        updatedArray = prevState[key].includes(null) ? [] : "null";
      } else {
        updatedArray = prevState[key].includes(value)
          ? prevState[key].filter(item => item !== value)
          : [...prevState[key], value];

        if (updatedArray.length > 0 && updatedArray.includes(null)) {
          updatedArray = updatedArray.filter(item => item !== null);
        }
      }

      return { ...prevState, [key]: updatedArray };
    });
  };

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    handleModal();
  };

  const renderCouponOptions = () => {
    switch (formData.couponOptions) {
      case 1:
        return (
          <>
            <Field title="Discount Amount" infoIcon>
              <InputWrapper>
                <InputBox
                  theme={theme}
                  value={formData.discountAmount}
                  onChange={e =>
                    handleInputChange("discountAmount", e.target.value)
                  }
                />
              </InputWrapper>
              <Body2>Off on Cart Total</Body2>
            </Field>

            <Field title="Minimum Purchase" infoIcon optional>
              <InputWrapper>
                <InputBox
                  theme={theme}
                  value={formData.minPurchase}
                  onChange={e =>
                    handleInputChange("minPurchase", e.target.value)
                  }
                />
              </InputWrapper>
            </Field>
          </>
        );

      case 2:
        return (
          <>
            <Field title="Discount Amount" infoIcon>
              <InputWrapper>
                <InputBox
                  theme={theme}
                  value={formData.discountAmount}
                  onChange={e =>
                    handleInputChange("discountAmount", e.target.value)
                  }
                />
              </InputWrapper>
              <Body2>Off on each product</Body2>
            </Field>

            <Field title="Product Names" align="start" infoIcon optional>
              <SelectBoxComp
                serviceDropDown={selectedServices}
                handleServiceDropChange={handleDropChange}
                identifier="productName"
                runService={false}
              />
            </Field>
          </>
        );

      case 3:
        return (
          <>
            <Field title="Discount Amount" infoIcon>
              <InputWrapper>
                <InputBox
                  theme={theme}
                  value={formData.discountAmount}
                  onChange={e =>
                    handleInputChange("discountAmount", e.target.value)
                  }
                />
              </InputWrapper>
              <Body2>Off on Cart Total</Body2>
            </Field>

            <Field title="Max Discount" infoIcon optional>
              <InputWrapper>
                <InputBox
                  theme={theme}
                  value={formData.maxDiscount}
                  onChange={e =>
                    handleInputChange("maxDiscount", e.target.value)
                  }
                />
              </InputWrapper>
            </Field>

            <Field title="Minimum Purchase" infoIcon optional>
              <InputWrapper>
                <InputBox
                  theme={theme}
                  value={formData.minDiscount}
                  onChange={e =>
                    handleInputChange("minPurchase", e.target.value)
                  }
                />
              </InputWrapper>
            </Field>
          </>
        );

      case 4:
        return (
          <>
            <Field title="Discount Amount" infoIcon>
              <InputWrapper>
                <InputBox
                  theme={theme}
                  value={formData.discountAmount}
                  onChange={e =>
                    handleInputChange("discountAmount", e.target.value)
                  }
                />
              </InputWrapper>
              <Body2>Off on each service selected</Body2>
            </Field>

            <Field title="Service Names" align="start" infoIcon optional>
              <SelectBoxComp
                serviceDropDown={selectedCategory}
                handleServiceDropChange={handleCategoryChange}
                identifier="serviceName"
                runService={true}
              />
            </Field>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Wrapper>
      {openModal && (
        <CustomConfirmModal setModalOpen={setOpenModal} formData={formData} setFormData={setFormData} />
      )}
      <Section>
        <Body1 bold>Design Your Custom Coupon</Body1>
        <Body2>
          Craft unique promotions tailored to your business. Set personalized
          discounts, create targeted offers, and enhance customer engagement.
          Start building your custom coupon now to boost sales and attract new
          customers!
        </Body2>
      </Section>
      <Section>
        <Body2 bold>Coupon Details</Body2>
        <Field title="Coupon Code" infoIcon tooltipText="Hello">
          <InputWrapper>
            <InputBox
              theme={theme}
              value={formData.couponCode}
              onChange={e => handleInputChange("couponCode", e.target.value)}
            />
          </InputWrapper>
          <FlexBox
            align="center"
            justify="center"
            padding="0.5rem"
            cursor="pointer"
            onClick={() =>
              handleInputChange("couponCode", randomCustomCoupons(storeName))
            }
          >
            <FiRepeat size={20} />
          </FlexBox>
        </Field>

        <Field title="Coupon Name">
          <InputWrapper>
            <InputBox
              theme={theme}
              value={formData.couponName}
              onChange={e => handleInputChange("couponName", e.target.value)}
            />
          </InputWrapper>
        </Field>
        <Body>
          <Title>
            <Body2 bold>Coupon Options:</Body2>
          </Title>
          <FlexBox column>
            {customCouponsData.couponOptions.map(option => (
              <FlexBox
                align="center"
                key={option.id}
                onClick={() => handleRadioChange("couponOptions", option.id)}
                cursor="pointer"
              >
                <Radio active={formData.couponOptions === option.id} />
                <Body2>{option.label}</Body2>
              </FlexBox>
            ))}
          </FlexBox>
        </Body>

        {renderCouponOptions()}

        <Body>
          <Title>
            <Body2 bold>Usage Limit :</Body2>
          </Title>
          <FlexBox column>
            {customCouponsData.noOfTimeCanUsePerUser.map(limit => (
              <FlexBox
                key={limit.id}
                align="center"
                cursor="pointer"
                onClick={() => {
                  if (limit.id === 1 || limit.id === 3) {
                    handleRadioChange("noOfTimeCanUsePerUser", limit.value);
                  } else if (limit.id === 2) {
                    handleRadioChange("noOfTimeCanUsePerUser", "custom");
                  }
                }}
              >
                <Radio
                  active={
                    limit.id === 1 || limit.id === 3
                      ? formData.noOfTimeCanUsePerUser === limit.value
                      : limit.id === 2 &&
                        formData.noOfTimeCanUsePerUser === "custom"
                  }
                />
                <Body2>{limit.label}</Body2>

                {limit.id === 2 &&
                  formData.noOfTimeCanUsePerUser === "custom" && (
                    <InputBox
                      theme={theme}
                      placeholder="Enter limit"
                      value={formData.noOfTimeCanUsePerUserValue || ""}
                      onChange={e =>
                        handleInputChange(
                          "noOfTimeCanUsePerUserValue",
                          e.target.value
                        )
                      }
                    />
                  )}
              </FlexBox>
            ))}
          </FlexBox>
        </Body>

        <CustomerSection>
          <Field title="Customer Selection" align="" infoIcon optional>
            <Container columnGap="2rem" rowGap="1rem">
              <FlexBox column rowGap="0.25rem">
                <Body2 bold>1. Gender :</Body2>
                <FlexBox
                  align="center"
                  columnGap="0.25rem"
                  cursor="pointer"
                  onClick={() =>
                    handleCheckboxChange(
                      "gender",
                      null,
                      customCouponsData.genderOptions.map(
                        gender => gender.value
                      )
                    )
                  }
                >
                  <CheckBox check={formData.gender.includes(null)} />
                  <Body1>All</Body1>
                </FlexBox>

                {customCouponsData.genderOptions.map(gender => (
                  <FlexBox align="center" columnGap="0.25rem" key={gender.id}>
                    <CheckBox
                      check={
                        formData.gender.includes(null) ||
                        formData.gender.includes(gender.value)
                      }
                      onClick={() =>
                        handleCheckboxChange(
                          "gender",
                          gender.value,
                          customCouponsData.genderOptions.map(
                            gender => gender.value
                          )
                        )
                      }
                    />
                    <Body1>{gender.label}</Body1>
                  </FlexBox>
                ))}
              </FlexBox>

              <FlexBox column rowGap="0.25rem">
                <Body2 bold>2. Customer Groups</Body2>

                {customCouponsData.customerGroups.map(group => (
                  <FlexBox
                    align="center"
                    columnGap="0.25rem"
                    key={group.id}
                    onClick={() =>
                      handleRadioChange("customerGroups", group.id)
                    }
                    cursor="pointer"
                  >
                    <Radio active={formData.customerGroups === group.id} />
                    <FlexBox column>
                      <Body2>{group.value}</Body2>
                      <Caption>
                        Customer that has not visited your salon
                      </Caption>
                    </FlexBox>
                  </FlexBox>
                ))}
              </FlexBox>

              <FlexBox column rowGap="0.25rem">
                <Body2 bold>3. Last Visited</Body2>

                {customCouponsData.lastVisitDays.map(visitTime => (
                  <FlexBox
                    align="center"
                    columnGap="0.25rem"
                    key={visitTime.id}
                    onClick={() =>
                      handleRadioChange("lastVisitDays", visitTime.value)
                    }
                    cursor="pointer"
                  >
                    <Radio
                      active={formData.lastVisitDays === visitTime.value}
                    />
                    <Body1>{visitTime.label}</Body1>
                  </FlexBox>
                ))}
              </FlexBox>

              <FlexBox column rowGap="0.25rem">
                <Body2 bold>4. Age Groups</Body2>
                <FlexBox
                  align="center"
                  cursor="pointer"
                  columnGap="0.25rem"
                  onClick={() =>
                    handleCheckboxChange(
                      "ageGroups",
                      null,
                      customCouponsData.ageGroups.map(item => item.value)
                    )
                  }
                >
                  <CheckBox check={formData.ageGroups.includes(null)} />
                  <Body1>All Age Groups</Body1>
                </FlexBox>

                {customCouponsData.ageGroups.map(item => (
                  <FlexBox
                    align="center"
                    cursor="pointer"
                    columnGap="0.25rem"
                    key={item.id}
                    onClick={() =>
                      handleCheckboxChange(
                        "ageGroups",
                        item.value,
                        customCouponsData.ageGroups.map(item => item.value)
                      )
                    }
                  >
                    <CheckBox
                      check={
                        formData.ageGroups.includes(null) ||
                        formData.ageGroups.includes(item.value)
                      }
                    />
                    <Body1>{item.label}</Body1>
                  </FlexBox>
                ))}
              </FlexBox>

              <FlexBox column rowGap="0.25rem">
                <Body2 bold>5. Pamprazzi Tags</Body2>

                {customCouponsData.pamprazziTags.map(tag => (
                  <FlexBox
                    align="center"
                    cursor="pointer"
                    columnGap="0.25rem"
                    key={tag.id}
                    onClick={() =>
                      handleCheckboxChange("pamprazziTags", tag.value)
                    }
                  >
                    <CheckBox
                      check={formData.pamprazziTags.includes(tag.value)}
                    />
                    <Body1>{tag.label}</Body1>
                  </FlexBox>
                ))}
              </FlexBox>
            </Container>
          </Field>
        </CustomerSection>
        <Field title="Start Date" infoIcon>
          <InputWrapper>
            <InputBox
              theme={theme}
              type="date"
              value={formData.startDate}
              onChange={e => handleInputChange("startDate", e.target.value)}
            />
          </InputWrapper>
        </Field>

        <Field title="End Date" infoIcon>
          <InputWrapper>
            <InputBox
              theme={theme}
              type="date"
              value={formData.endDate}
              onChange={e => handleInputChange("endDate", e.target.value)}
            />
          </InputWrapper>
        </Field>
      </Section>

      <Section>
        <Body2 bold>Coupon Limit.</Body2>
        <Field title="Set Coupon Budget" infoIcon>
          <Box>
            <InputWrapper>
              <InputBox
                theme={theme}
                value={formData.couponBudget}
                onChange={e =>
                  handleInputChange("couponBudget", e.target.value)
                }
              />
            </InputWrapper>
            <Support>
              Coupon auto terminates when Coupon budget limit is crossed
            </Support>
          </Box>
        </Field>

        <Field title="Set Usage Limit">
          <FlexBox column rowGap="0.75rem">
            <FlexBox
              align="center"
              cursor="pointer"
              columnGap="0.5rem"
              onClick={() =>
                handleInputChange(
                  "merchantUsageLimitDefine",
                  !formData.merchantUsageLimitDefine
                )
              }
            >
              <CheckBox check={formData.merchantUsageLimitDefine} />
              <Body2>Apply usage limit to your coupons</Body2>
            </FlexBox>
            <FlexBox>
              {formData.merchantUsageLimitDefine && (
                <Box>
                  <InputWrapper>
                    <InputBox
                      theme={theme}
                      value={formData.totalUsageLimit}
                      onChange={e =>
                        handleInputChange("totalUsageLimit", e.target.value)
                      }
                    />
                  </InputWrapper>
                  <Support>Times the coupon can be used in total</Support>
                </Box>
              )}
            </FlexBox>
          </FlexBox>
        </Field>

        <Field title="Exempt Services" infoIcon>
          <SelectBoxComp
            serviceDropDown={exemptServices}
            handleServiceDropChange={handleExemptChange}
            identifier="exemptService"
            runService={false}
          />
        </Field>

        <FlexBox justify="end" columnGap="1rem">
          <Button outline onClick={handleRedirect}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} primary color={PRIMARY_900}>
            Save
          </Button>
        </FlexBox>
      </Section>
    </Wrapper>
  );
};

export default CustomForm;
