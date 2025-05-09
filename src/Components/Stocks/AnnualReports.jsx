import styled from "styled-components";
import { Card, Typography } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import { device } from "@common/UI/Responsive";
import { H1 } from "@common/UI/Headings";

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
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export default function AnnualReportsSection({ newsData }) {

  if (newsData?.length < 1) {
    return null;
  }

  return (
    <FlexBox id="news">
      <H1 bold>
        Annual Reports
      </H1>

      <ReportsGrid>
        {newsData &&
          newsData.map((data, index) => (
            <Card
              key={index}
              hoverable
              onClick={() => window.open(data.link, "_blank")}
              style={{
                cursor: "pointer",
                borderRadius: "1rem",
              }}
            >
              <CardContent>
                <FilePdfOutlined
                  style={{ fontSize: "50px", color: "#d32029" }}
                />
                <Typography.Paragraph
                  style={{ marginTop: "8px", marginBottom: 0, fontWeight: 700 }}
                >
                  Annual Report {String(data.year).substring(0, 4)}
                </Typography.Paragraph>
              </CardContent>
            </Card>
          ))}
      </ReportsGrid>
    </FlexBox>
  );
}
