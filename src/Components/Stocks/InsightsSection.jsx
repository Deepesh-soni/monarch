import React from "react";
import styled from "styled-components";
import { Skeleton, Typography, List, Tooltip, Row, Col, Divider } from "antd";
import FlexBox from "@common/UI/FlexBox";
import { device } from "@common/UI/Responsive";
import { Body1, H1, Body2 } from "@common/UI/Headings";

const { Title, Paragraph, Text } = Typography;

const BusinessSectionRight = styled(FlexBox)`
  border: 1px solid #3c3c3c;
  width: 100%;
  border-radius: 12px;
  padding: 1rem;
  flex-direction: column;
  background-color: white;
  @media ${device.laptop} {
    width: 50%;
  }
`;

const HeaderContainer = styled(FlexBox)`
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const OutlookContainer = styled.div`
  margin-bottom: 16px;
  margin-top: 8px;
`;

const OutlookText = styled(Text)`
  font-weight: bold;
  margin-right: 8px;
`;

const RecommendationBox = styled.div`
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  min-width: 70px;
  text-align: center;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
  
  background-color: ${props => {
    switch(props.recommendation?.toLowerCase()) {
      case 'buy': return '#52c41a';
      case 'sell': return '#f5222d';
      case 'neutral': return '#faad14';
      default: return '#1890ff';
    }
  }};
  color: white;
`;

const StyledList = styled(List)`
  .ant-list-item {
    padding: 8px 0;
    border-bottom: none;
  }
`;

const ProsList = styled(StyledList)`
  .ant-list-item {
    color: #52c41a;
  }
`;

const ConsList = styled(StyledList)`
  .ant-list-item {
    color: #f5222d;
  }
`;

const SectionTitle = styled(Title)`
  margin-bottom: 12px !important;
`;

export default function InsightsSection({ insightsData }) {
  // Get the recommendation text and description
  const getRecommendationInfo = (recommendation) => {
    const rec = recommendation?.toLowerCase() || '';
    if (rec === 'buy') {
      return { text: 'BUY', description: 'Go long. The trend is up.' };
    } else if (rec === 'sell') {
      return { text: 'SELL', description: 'Go short. The trend is down.' };
    } else {
      return { text: 'HOLD', description: 'The trend is undetermined. Consider cash or hedged positions.' };
    }
  };

  const recommendationInfo = insightsData ? getRecommendationInfo(insightsData.buysell) : { text: 'NEUTRAL', description: '' };

  return (
    <BusinessSectionRight id="insights">
      <HeaderContainer>
        <H1 bold>APART Insights</H1>
        
        {/* {insightsData && (
          <Tooltip 
            title={`Apart Insight Score: ${insightsData.buysellscore || 'N/A'}`}
            placement="top"
            color="#1f1f1f"
          >
            <RecommendationBox recommendation={insightsData.buysell}>
              {recommendationInfo.text}
            </RecommendationBox>
          </Tooltip>
        )} */}
      </HeaderContainer>

      {insightsData ? (
        <>
          <OutlookContainer>
            <div>
              <Body1 style={{ display: 'inline' }}><strong>Outlook:</strong> {insightsData.outlook}</Body1>
            </div>
            {/* <Text type="secondary" style={{ marginTop: '8px', display: 'block' }}>
              {recommendationInfo.description}
            </Text> */}
          </OutlookContainer>          
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <SectionTitle level={4}>Pros</SectionTitle>
              <ProsList
                dataSource={insightsData.pros}
                renderItem={item => (
                  <List.Item>
                    <Body2>👍 {item}</Body2>
                  </List.Item>
                )}
              />
            </Col>
            
            <Col xs={24} md={12}>
              <SectionTitle level={4}>Cons</SectionTitle>
              <ConsList
                dataSource={insightsData.cons}
                renderItem={item => (
                  <List.Item>
                    <Body2>👎 {item}</Body2>
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </>
      ) : (
        <>
          <Skeleton active paragraph={{ rows: 2 }} />
          <Skeleton active title={{ width: 100 }} paragraph={{ rows: 3 }} />
          <Skeleton active title={{ width: 100 }} paragraph={{ rows: 3 }} />
          <Skeleton active title={{ width: 100 }} paragraph={{ rows: 3 }} />
          <Skeleton active title={{ width: 100 }} paragraph={{ rows: 3 }} />
        </>
      )}
    </BusinessSectionRight>
  );
}
