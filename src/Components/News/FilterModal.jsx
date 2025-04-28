import React from "react";
import styled from "styled-components";
import { Modal, DatePicker, Checkbox, Button, Space, Typography } from "antd";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
`;

export default function FilterModal({
  isOpen,
  onClose,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
  selectedNewsTypes,
  setSelectedNewsTypes,
  onApply,
  onReset,
}) {
  return (
    <Modal
      title="Filter News"
      visible={isOpen}
      onCancel={onClose}
      footer={null}
      width={400}
      centered
    >
      <Title level={5}>Date Range</Title>
      <DatePicker.RangePicker
        value={
          fromDate && toDate
            ? [dayjs(fromDate, "YYYY-MM-DD"), dayjs(toDate, "YYYY-MM-DD")]
            : []
        }
        onChange={(_, [start, end]) => {
          setFromDate(start || null);
          setToDate(end || null);
        }}
        style={{ width: "100%", marginBottom: 16 }}
      />

      <Title level={5}>News Type</Title>
      <Checkbox.Group
        options={["Corporate News"]}
        value={selectedNewsTypes}
        onChange={setSelectedNewsTypes}
        style={{ marginBottom: 16 }}
      />

      <Footer>
        <Button onClick={onReset}>Reset All</Button>
        <Button type="primary" onClick={onApply}>
          Apply
        </Button>
      </Footer>
    </Modal>
  );
}
