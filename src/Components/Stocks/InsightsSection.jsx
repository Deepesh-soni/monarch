import styled from "styled-components";
import { Skeleton, Typography, List } from "antd";
import FlexBox from "@common/UI/FlexBox";
import { device } from "@common/UI/Responsive";

const { Title, Paragraph } = Typography;

const BusinessSectionRight = styled(FlexBox)`
  border: 1px solid #3c3c3c;
  width: 100%;
  border-radius: 12px;
  padding: 0.5rem;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  @media ${device.laptop} {
    width: 40%;
  }
`;

export default function InsightsSection({ insightsData }) {
  return (
    <BusinessSectionRight id="insights">
      <Typography.Text strong>APART Insights</Typography.Text>

      {insightsData ? (
        <>
          <Title level={4}>Outlook</Title>
          <Paragraph>{insightsData.outlook}</Paragraph>

          <Title level={4}>Pros</Title>
          <List
            dataSource={insightsData.pros}
            renderItem={item => (
              <List.Item>
                <Typography.Text>✓ {item}</Typography.Text>
              </List.Item>
            )}
          />

          <Title level={4}>Cons</Title>
          <List
            dataSource={insightsData.cons}
            renderItem={item => (
              <List.Item>
                <Typography.Text>✗ {item}</Typography.Text>
              </List.Item>
            )}
          />
        </>
      ) : (
        <>
          <Skeleton active paragraph={{ rows: 2 }} />
          <Skeleton active title={{ width: 100 }} paragraph={{ rows: 3 }} />
          <Skeleton active title={{ width: 100 }} paragraph={{ rows: 3 }} />
        </>
      )}
    </BusinessSectionRight>
  );
}
