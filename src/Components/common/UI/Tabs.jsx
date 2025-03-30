import React, { useState } from "react";
import styled from "styled-components";
import { ACCENT_0, ACCENT_800 } from "./colors";
import { Body1 } from "./Headings";

const Tablist = styled.ul`
  width: ${props => props.tabWidth || "100%"};
  justify-content: ${props => props.tabJustify || "space-around"};
  margin: auto;
  align-items: center;
  height: 4rem;
  display: flex;
  list-style: none;
  column-gap: 2rem;
  cursor: pointer;
  padding: 0;
`;

const List = styled.li`
  background-color: ${props => (props.active ? ACCENT_800 : "inherit")};
  /* width: ${props => props.tabWidth || "10rem"}; */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.4rem;
  flex: 1;
  border-radius: 0.25rem;
  transition: background-color 0.3s ease;
`;

const TabContent = styled.div`
  transition: opacity 0.3s ease;
`;

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = index => {
    setActiveTab(index);
  };

  return (
    <div>
      <Tablist tabJustify="space-around">
        {React.Children.map(children, (child, index) => (
          <List
            key={index}
            active={activeTab === index}
            onClick={() => handleTabClick(index)}
          >
            <Body1 bold color={activeTab === index ? ACCENT_0 : ACCENT_800}>
              {child.props.title}
            </Body1>
          </List>
        ))}
      </Tablist>

      {React.Children.map(children, (child, index) => {
        if (activeTab !== index) return null;
        return <TabContent key={index}>{child.props.children}</TabContent>;
      })}
    </div>
  );
};

export default Tabs;
