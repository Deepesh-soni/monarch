// import React from "react";
// import { AutomatedCallService } from "../../../Store/Actions/providerActions";
// import { trackEvent } from "../../../helperFunctions";
// import { useDispatch, useSelector } from "react-redux";
// import FlexBox from "@common/UI/FlexBox";
// import { Body2, H3 } from "@components/common/UI/Headings";
// import { Modal } from "@components/common/UI/Modal";
// import styled from "styled-components";
// import { Button } from "@components/common/UI/Buttons";
// import { TYPE_PSYCHIATRIST } from "../../../variable";

// const ContentWrapper = styled(FlexBox)`
//   flex-direction: column;
//   padding: 1.5rem;
//   gap: 1.5rem;
//   width: 100%;
// `;

// const AutomatedCall = ({ toggleModal, bookingId }) => {
//   const dispatch = useDispatch();

//   const { userName, userUUID, userType } = useSelector(state => ({
//     userName: `${state.auth.user.firstname} ${
//       !!state.auth.user.lastname && state.auth.user.lastname
//     }`,
//     userUUID: state.auth.user.uuid,
//     userType: state.auth.user.usertype,
//   }));

//   const handleConfirm = () => {
//     trackEvent({
//       event: "automated_call_send_confirm",
//       payload:
//         userType === TYPE_PSYCHIATRIST
//           ? {
//               psychiatrist_name: userName,
//               psychiatrist_uuid: userUUID,
//             }
//           : {
//               therapist_name: userName,
//               therapist_uuid: userUUID,
//             },
//     });
//     dispatch(
//       AutomatedCallService({
//         bookingId: bookingId,
//         analyticPayload: {
//           event: "automated_call_sent",
//         },
//       })
//     );
//     toggleModal();
//   };
//   return (
//     <Modal borderRadius="1rem" maxWidth="27rem" togglePopup={toggleModal}>
//       <ContentWrapper>
//         <FlexBox column rowGap="0.5rem">
//           <Body2>Please call the number</Body2>
//           <H3 bold>022 - 489 - 72624</H3>
//           <Body2>and enter the following number.</Body2>
//           <H3 bold>#24680135</H3>
//         </FlexBox>
//         <Body2>Or do you want to make an automated call?</Body2>
//         <FlexBox align="center" justify="space-between">
//           <Button outline secondary onClick={toggleModal}>
//             NO, THANKS
//           </Button>
//           <Button primary onClick={handleConfirm}>
//             YES, INITIATE
//           </Button>
//         </FlexBox>
//       </ContentWrapper>
//     </Modal>
//   );
// };

// export default AutomatedCall;
