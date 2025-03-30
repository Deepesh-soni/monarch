import { Text } from "@common/Text";

const Dot = styled.div`
  display: flex;
  justify-content: space-around !important;
  width: 18rem;
  margin: ${props => props.margin && "auto"};
`;

const DotContainer = styled.div`
  max-width: 6rem;
  display: flex;
  align-items: center;
  column-gap: 2px;
`;

const StatusIndicator = styled.div`
  background-color: ${props => props.color};
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.2rem;
  border-radius: 50%;
  border: none;
`;

const StatusIndicators = ({ margin }) => {
  return (
    <Dot margin={margin}>
      {availabileDatesStatus.map(status => (
        <DotContainer key={status.text}>
          <StatusIndicator color={status.color} />
          <Text fontSize="0.8rem" textTransform="capitalize">
            {status.text}
          </Text>
        </DotContainer>
      ))}
    </Dot>
  );
};

export default StatusIndicators;
