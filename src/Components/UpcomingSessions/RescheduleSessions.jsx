import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import URL from "../../../urls";
import axiosInstance from "../../../axiosInstance";
import {
  cancellationReasonsProviders,
  cancellationReasonsUsers,
} from "../../../metaData/CancellationReasons";
import dayjs from "dayjs";
import Bugsnag from "@bugsnag/js";
import advancedFormat from "dayjs/plugin/advancedFormat";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { FiX } from "react-icons/fi";
import { Button } from "@components/common/UI/Buttons";
import { Body2, H3, Support } from "@components/common/UI/Headings";
import FlexBox from "@common/UI/FlexBox";
import {
  ACCENT_400,
  ACCENT_600,
  ACCENT_800,
} from "@components/common/UI/colors";
import {
  SessionReschedule,
  sessionCount,
} from "../../../Store/Actions/providerActions";
import Radio from "@components/common/UI/Radio";
import InputBox from "@components/common/UI/InputBox";
import { Modal } from "@components/common/UI/Modal";
import Dropdown from "@components/common/UI/Dropdown";
import { formatSlotTime } from "../../../utils/helper";
import CheckAvailableSlots from "../common/Availability/CheckAvailableSlots";
import SessionIcon from "../common/SessionIcon";
import { toast } from "react-toastify";

dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);

const ModalHeader = styled(FlexBox)`
  padding: 1rem 1rem 1rem 1.5rem;
  justify-content: space-between;
  border-bottom: 1px solid ${ACCENT_400};
`;

const CloseIconWrapper = styled(FlexBox)`
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ModalBody = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex: 1;
`;

const ModalFooter = styled(FlexBox)`
  width: 100%;
  align-items: center;
  justify-content: end;
  align-self: flex-end;
  padding: 1rem 1.5rem 1.5rem;
  border-top: 1px solid ${ACCENT_400};
  box-sizing: border-box;

  ${Body2} {
    flex: 1;
  }
`;

const Left = styled(FlexBox)`
  padding: 1.5rem;
  flex: 1;
  max-width: 18rem;
  border-right: 1px solid ${ACCENT_400};
`;

const ClientInfo = styled(FlexBox)`
  padding: 1rem;
  width: 100%;
  flex-direction: column;
  gap: 0.25rem;
  border-radius: 0.5rem;
  border: 1px solid ${ACCENT_400};
`;

const Right = styled(FlexBox)`
  width: 100%;
  max-width: 27rem;
  padding: 1.5rem;
  flex: 1;
`;

const TextArea = styled.textarea`
  height: 7.5rem;
  padding: 0.75rem;
  gap: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid ${ACCENT_600};

  font-family: "Quicksand";
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.5rem;
  color: ${ACCENT_800};

  ::placeholder {
    color: ${ACCENT_600};
  }
`;

const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  position: relative;
`;

const RescheduleSession = ({
  bookingDetails,
  bookingId,
  handleCloseSessionOption,
  toggleModal,
  reloadSessionList,
}) => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const { userName, userUUID, userType } = useSelector(state => ({
    userName: `${state.auth.user.firstname} ${
      !!state.auth.user.lastname && state.auth.user.lastname
    }`,
    userId: state.auth.user.id,
    userUUID: state.auth.user.uuid,
    userType: state.auth.user.usertype,
  }));

  const { therapistID } = useSelector(state => ({
    therapistID: state.auth.user.id,
    cancelledSession: state.provider.cancelledSession,
    scheduledSession: state.provider.scheduledSession,
  }));

  const initialReason = {
    value: "--not selected--",
    label: "--Not Selected--",
  };

  const [schedules, setSchedules] = useState(null);
  const [cancellationReasonText, setCancellationReasonText] = useState(null);
  const [isUserCancelling, setIsUserCancelling] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [reasonValue, setReasonValue] = useState(initialReason);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [fetchingSchedules, setFetchingSchedules] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [timeSlotsForDate, setTimeSlotsForDate] = useState(null);
  const [fetchingTimeSlots, setFetchingTimeSlots] = useState(false);

  useEffect(() => {
    fetchSchedulesForDuration();
  }, []);

  useEffect(() => {
    if (!!selectedDate) {
      setSelectedTimeSlot(null);
      fetchTimeSlotsForDate();
    }
  }, [selectedDate]);

  const options = reasons =>
    reasons.map(o => ({ value: o.toLowerCase(), label: o }));

  const fetchSchedulesForDuration = async () => {
    try {
      setFetchingSchedules(true);
      let month = parseInt(dayjs(selectedDate).format("M"));
      let year = parseInt(dayjs(selectedDate).format("YYYY"));
      const payload = {
        customer_id: bookingDetails?.clientId,
        duration: bookingDetails?.duration?.toString(),
        month,
        year,
        ih_clinic_id: bookingDetails?.clinicId,
        online_slot: !(bookingDetails?.mode === "offline"),
      };

      const res = await axiosInstance.post(`${URL.newScheduleCount}`, payload);
      const schedules = res.data?.data;

      if (!selectedDate) {
        let latestAvailableDate = new Date();
        const latestAvailableSchedule = schedules?.find(
          schedule => schedule.available_slots > 0
        );

        if (!!latestAvailableSchedule) {
          const latestScheduleTime = latestAvailableSchedule.epoch_time;
          latestAvailableDate = new Date(latestScheduleTime);
        }

        setSelectedDate(latestAvailableDate);
      }

      setSchedules(schedules || []);
    } catch (error) {
      Bugsnag.notify(err);
      toast.error(err.message);
    } finally {
      setFetchingSchedules(false);
    }
  };

  const fetchTimeSlotsForDate = async () => {
    if (!selectedDate) return;

    try {
      setFetchingTimeSlots(true);
      const payload = {
        duration: bookingDetails?.duration?.toString(),
        customer_id: bookingDetails.clientId,
        ih_clinic_id: bookingDetails?.clinicId
          ? bookingDetails?.clinicId
          : null,
        date: dayjs(selectedDate).format("YYYY-MM-DD"),
      };

      const res = await axiosInstance.post(
        `${URL.newGetActiveSchedulesForDate}`,
        payload
      );

      const timeSlots = res?.data?.data?.slots;
      setTimeSlotsForDate(timeSlots || []);
    } catch (error) {
      Bugsnag.notify(err);
      toast.error(err.message);
    } finally {
      setFetchingTimeSlots(false);
    }
  };

  useEffect(() => {
    let sessionCountPayload = {
      user_id: bookingDetails?.clientId,
      provider_id: therapistID,
    };
    dispatch(sessionCount(sessionCountPayload));
    return handleCloseSessionOption;
  }, [bookingDetails?.clientId, therapistID, handleCloseSessionOption]);

  const handleRescheduleSession = () => {
    const payload = {
      date: dayjs(selectedDate).format("YYYY-MM-DD"),
      slot: selectedTimeSlot,
    };

    dispatch(
      SessionReschedule({
        bookingId: bookingId,
        payload,
        analyticPayload: {
          event: "session_reschedule_success",
          payload: {
            [`${userType}_name`]: userName,
            [`${userType}_uuid`]: userUUID,
          },
        },
      })
    );
    setTimeout(() => {
      reloadSessionList();
    }, 1000);

    toggleModal?.();
  };

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const isCTADisabled = !(
    selectedDate &&
    selectedTimeSlot &&
    reasonValue?.value !== initialReason?.value
  );

  return (
    <Modal
      M1
      borderRadius="1rem"
      height="fit-content"
      togglePopup={toggleModal}
    >
      <ModalHeader>
        <H3 bold>Reschedule Session</H3>
        <CloseIconWrapper onClick={toggleModal}>
          <FiX />
        </CloseIconWrapper>
      </ModalHeader>
      <ModalBody>
        <Left column rowGap="1.5rem">
          <ClientInfo>
            <FlexBox align="center" columnGap="0.5rem">
              <SessionIcon type={bookingDetails?.mode} color={ACCENT_800} />
              <Body2 bold>{bookingDetails?.clientName}</Body2>
            </FlexBox>
            <Support>
              {dayjs(bookingDetails?.dateTime).format("DD MMM YYYY, hh:mm A")} |{" "}
              {bookingDetails?.duration / 60} MIN
            </Support>
          </ClientInfo>
          <FlexBox column rowGap="0.5rem">
            <Body2 fontSize="1rem" bold>
              Who needs these changes?
            </Body2>
            <FlexBox columnGap="1.5rem">
              <FlexBox
                align="center"
                columnGap="0.25rem"
                onClick={() => {
                  setIsUserCancelling(false);
                  setReasonValue(initialReason);
                }}
              >
                <Radio active={!isUserCancelling} />
                <Body2 fontSize="1rem" bold>
                  ME
                </Body2>
              </FlexBox>
              <FlexBox
                align="center"
                columnGap="0.25rem"
                onClick={() => {
                  setIsUserCancelling(true);
                  setReasonValue(initialReason);
                }}
              >
                <Radio active={isUserCancelling} />
                <Body2 fontSize="1rem" bold>
                  USER
                </Body2>
              </FlexBox>
            </FlexBox>
          </FlexBox>
          <FlexBox column rowGap="0.5rem" width="100%">
            <Body2 bold>Reason for changes*</Body2>
            <SelectWrapper ref={dropdownRef} onClick={toggleDropdown}>
              <InputBox value={reasonValue?.value} />
              {showDropdown && (
                <Dropdown
                  isSingleSelect
                  applyOption={value => setReasonValue(value)}
                  options={
                    isUserCancelling
                      ? options(cancellationReasonsUsers)
                      : options(cancellationReasonsProviders)
                  }
                  closeDropdown={toggleDropdown}
                  parentRef={dropdownRef}
                  isOpen={showDropdown}
                  setIsOpen={toggleDropdown}
                  selectedOption={reasonValue}
                  size="large"
                  width="100%"
                  top="3.5rem"
                  maxHeight="15rem"
                />
              )}
            </SelectWrapper>
          </FlexBox>
          <TextArea
            placeholder="Help us understand (optional)"
            value={cancellationReasonText}
            onChange={e => setCancellationReasonText(e.target.value)}
          />
        </Left>
        <Right column rowGap="1.5rem">
          <CheckAvailableSlots
            sectionTitle="Reschedule to"
            schedules={schedules}
            selectedDate={selectedDate}
            commonAnalyticsPayload={null}
            setSelectedDate={setSelectedDate}
            selectedTimeSlot={selectedTimeSlot}
            timeSlotsForDate={timeSlotsForDate}
            fetchingSchedules={fetchingSchedules}
            fetchingTimeSlots={fetchingTimeSlots}
            setSelectedTimeSlot={setSelectedTimeSlot}
          />
        </Right>
      </ModalBody>
      <ModalFooter>
        {selectedTimeSlot && (
          <Body2 bold>
            Reschedule to {dayjs(selectedDate).format("DD MMM YYYY")},{" "}
            {formatSlotTime(selectedTimeSlot)}
          </Body2>
        )}
        <Button
          primary
          onClick={handleRescheduleSession}
          disabled={isCTADisabled}
        >
          CONFIRM CHANGES
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default RescheduleSession;
