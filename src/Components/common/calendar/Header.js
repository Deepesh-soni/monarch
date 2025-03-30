import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import dayjs from "dayjs";

import { Text } from "@common/Text";
import { ACCENT_100, SECONDARY_700 } from "../UI/colors";
import FlexBox from "../UI/FlexBox";

const Container = styled(FlexBox)`
  justify-content: space-around;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid RGBA(24, 42, 136, 8%);
`;

const CalendarNavigationButton = styled(FlexBox)`
  justify-content: center;
  align-items: center;
  background-color: ${SECONDARY_700};
  border-radius: 1rem;
  height: 1.5rem;
  width: 1.5rem;
  overflow: hidden;
  opacity: ${props => props.disabled && "0.6"};
  pointer-events: ${props => props.disabled && "none"};
  cursor: pointer;
`;

const CustomHeader = ({
  monthDate,
  increaseMonth,
  decreaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}) => (
  <Container>
    <CalendarNavigationButton
      onClick={decreaseMonth}
      disabled={prevMonthButtonDisabled}
    >
      <FiChevronLeft color={ACCENT_100} />
    </CalendarNavigationButton>

    <Text fontSize="1rem" opacity="0.6" bold>
      {dayjs(monthDate).format("MMMM")}, {dayjs(monthDate).format("YYYY")}
    </Text>

    <CalendarNavigationButton
      onClick={increaseMonth}
      disabled={nextMonthButtonDisabled}
    >
      <FiChevronRight color={ACCENT_100} />
    </CalendarNavigationButton>
  </Container>
);

export default CustomHeader;
