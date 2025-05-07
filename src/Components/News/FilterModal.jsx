import React, { useMemo } from "react";
import styled from "styled-components";
import { Modal, DatePicker, Checkbox, Button, Typography } from "antd";
import dayjs from "dayjs";

const { Title } = Typography;

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
  const rangeValue = useMemo(
    () =>
      fromDate && toDate
        ? [dayjs(fromDate), dayjs(toDate)]
        : [],
    [fromDate, toDate]
  );

  const handleRangeChange = (_, dateStrings) => {
    const [start, end] = dateStrings;
    setFromDate(start || null);
    setToDate(end || null);
  };

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
        value={rangeValue}
        onChange={handleRangeChange}
        allowEmpty={[true, true]}
        style={{ width: "100%", marginBottom: 16 }}
        getPopupContainer={() => document.body}
        placement="bottomLeft"
        popupStyle={{
          width: "90vw",
          maxWidth: 400,
          zIndex: 9999,
        }}
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
