import styled from "styled-components";
import dayjs from "dayjs";

import { SUCCESS } from "@common/UI/colors";
import { Body1 } from "@common/UI/Headings";

const Td = styled.td`
  white-space: nowrap;
  text-align: ${({ align }) => align || "left"};
  padding: 1rem;
  border-top: 1px solid #dddddd;
`;

const StylistLineItem = ({ data, index }) => {
  return (
    <tr key={data._id}>
      <Td align="center"># {data.bookingId || "-"}</Td>
      <Td align="center">
        {data.bookingDate ? dayjs(data.bookingDate).format("DD MMM YY") : "-"}
      </Td>

      <Td align="center">{data.bookingTime || "-"}</Td>

      <Td align="center">₹ {data.totalCost || "00"}</Td>
      <Td align="center">₹ {data.discounts || "00"}</Td>

      <Td align="center">
        <Body1 bold color={SUCCESS}>
          {data.couponCode || "-"}
        </Body1>
      </Td>
      <Td align="center">₹ {data.totalPayable || "00"}</Td>
      <td align="center">
        {data.paymentMode?.toLowerCase() === "cash"
          ? "💸 Cash"
          : data.paymentMode?.toLowerCase() === "upi"
          ? "📲 UPI"
          : data.paymentMode?.toLowerCase() === "card"
          ? "💳 Card"
          : data.paymentMode?.toLowerCase() === "others"
          ? "🔄 Others"
          : "❓ NA"}
      </td>
    </tr>
  );
};

export default StylistLineItem;
