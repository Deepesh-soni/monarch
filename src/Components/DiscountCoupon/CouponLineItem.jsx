import React, { useState, useMemo } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";
import Bugsnag from "@bugsnag/js";
import { client } from "@axiosClient";
import { URL } from "@constants/urls";

import CustomToggle from "@common/UI/Toggle";
import CuratedCouponModal from "./CuratedCouponModal";
import FlexBox from "@common/UI/FlexBox";
import { H5 } from "@common/UI/Headings";
import { ERROR } from "@common/UI/colors";
import { toast } from "react-toastify";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

const Td = styled.td`
  text-align: ${({ align }) => align || "left"};
  padding: 1.5rem;
`;

const Chip = styled(FlexBox)`
  padding: 0.25rem;
  justify-content: center;
  border-radius: 4rem;
  border: 1px solid ${({ active }) => (active ? "#008000" : ERROR)};
  background: ${({ active }) =>
    active ? "rgba(0, 255, 0, 0.3)" : "rgba(255, 0, 0, 0.3)"};
`;

const CouponLineItem = ({ data,getCouponsData }) => {
  const [openModal, setOpenModal] = useState(false);

  const deactivateCoupon = async () => {
    try {
      await client.patch(`${URL.updateCoupon}/${data?._id}`, {
        active: false,
      });
      toast.success("Coupon is deactivated now");
    } catch (error) {
      toast.error("Failed to update");
      Bugsnag.notify(error);
    }
  };

  const handleToggleChange = async() => {
    if (data?.active && runtimeInHours > 12) {
      await deactivateCoupon();
      await getCouponsData();
    } else {
      setOpenModal(true);
    }
  };

  const { runtimeString, runtimeInHours } = useMemo(() => {
    const startDate = dayjs(data?.startedFrom).tz("Asia/Kolkata");
    const now = dayjs().tz("Asia/Kolkata");

    if (startDate?.isAfter(now)) {
      return { runtimeString: "0 Hr 0 Min", runtimeInHours: 0 };
    }

    let endDate;
    if (!data?.active) {
      endDate = dayjs(data?.expiredAt).tz("Asia/Kolkata");
    } else {
      endDate = now;
    }

    const duration = dayjs.duration(Math.abs(endDate.diff(startDate)));
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    return {
      runtimeString: `${hours} Hr ${" "} ${minutes} Min`,
      runtimeInHours: hours,
    };
  }, [data?.startedFrom, data?.active, data?.expiredAt]);

  return (
    <tr>
      {openModal && (
        <CuratedCouponModal setModalOpen={setOpenModal} item={data} getCouponsData={getCouponsData}/>
      )}
      <Td align="center">{data?.couponCode}</Td>
      <Td align="center">{dayjs(data?.startedFrom).utc().format("DD-MM-YY")}</Td>
      <Td align="center">{dayjs(data?.expiredAt).utc().format("DD-MM-YY")}</Td>
      <Td align="center">{runtimeString}</Td>
      <Td align="center">{data?.clickThrough}</Td>
      <Td align="center">{data?.conversion}</Td>
      <Td align="center">
        <Chip active={data?.active}>
          <H5 bold color={data?.active ? "#008000" : ERROR}>
            {data?.active ? "Active" : "Inactive"}
          </H5>
        </Chip>
      </Td>
      <Td align="center">
        <CustomToggle
          checked={data?.active}
          onChange={handleToggleChange}
          small={true}
          disabled={runtimeInHours < 12}
        />
      </Td>
    </tr>
  );
};

export default CouponLineItem;
