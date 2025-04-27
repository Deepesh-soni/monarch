import styled from "styled-components";
import { Card, Typography } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import { device } from "@common/UI/Responsive";

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ReportsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); 
  gap: 16px;
  margin-top: 16px;

  @media ${device.laptop} {
    flex-direction: row;
  }
`;
const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 140px;
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
              style={{ cursor: "pointer", borderRadius:"1rem"}}
            >
              <CardContent>
                <FilePdfOutlined
                  style={{ fontSize: "100px", color: "#d32029" }}
                />
                <Typography.Paragraph style={{ marginTop: "8px", marginBottom: 0 }}>
                  {data.year}
                </Typography.Paragraph>
              </CardContent>
            </Card>
          ))}
      </ReportsGrid>
    </FlexBox>
  );
}
