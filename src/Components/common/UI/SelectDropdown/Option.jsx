import { components } from "react-select";
import styled from "styled-components";
import { FiCheck } from "react-icons/fi";
import FlexBox from "../../UI/FlexBox";
import { Body2 } from "../Headings";
import { PRIMARY_900 } from "../../UI/colors";

const Container = styled(FlexBox)`
  padding: 0.75rem;
  column-gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
`;

const Option = (props) => {
  return (
    <components.Option {...props}>
      <Container>
        <Body2>{props.label}</Body2>
        {props.isSelected && <FiCheck size="1.25rem" color={PRIMARY_900} />}
      </Container>
    </components.Option>
  );
};

export default Option;
