import styled from "styled-components";
import { Card, Typography } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
`;

const ReportsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

export default function AnnualReportsSection({ newsData }) {
  return (
    <FlexBox id="news">
      <Typography.Title level={1} strong>
        Annual Reports
      </Typography.Title>

      <ReportsGrid>
        {newsData &&
          newsData.map((data, index) => (
            <Card
              key={index}
              hoverable
              onClick={() => window.open(data.link, "_blank")}
              style={{ cursor: "pointer" }}
            >
              <FilePdfOutlined
                style={{ fontSize: "100px", color: "#d32029" }}
              />
              <Typography.Paragraph style={{ marginTop: "8px" }}>
                {data.year}
              </Typography.Paragraph>
            </Card>
          ))}
      </ReportsGrid>
    </FlexBox>
  );
}
