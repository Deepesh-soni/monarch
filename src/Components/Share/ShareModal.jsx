import React, { useState, useEffect } from "react";

import FlexBox from "@common/UI/FlexBox";
import Modal from "@common/UI/Modal";
import ShareComponent from "./ShareComponent";

export const ShareModal = props => {
  const [isMobile, setIsMobile] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const handleWindowResize = () => {
      const mobileWidthThreshold = 1024;
      setIsMobile(window.innerWidth < mobileWidthThreshold);
    };

    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleShareFallback = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("URL copied to clipboard");
      })
      .catch(error => {
        console.error("Failed to copy URL to clipboard:", error);
      });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Gigis Salon",
          text: "Check out Gigis Salon!",
          // url: window.location.href,
          url: "this is ",
        });
      } catch (error) {
        console.error("Error sharing:", error);
        handleShareFallback();
      }
    } else {
      console.log("Native sharing not supported.");
      handleShareFallback();
    }
  };

  return (
    <>
      <FlexBox
        // borderRadius="0.25rem"
        // padding="0.25rem"
        // border={`1px solid ${ACCENT_0}`}
        align="start"
        // justify="center"
        columnGap="1rem"
        cursor="pointer"
        onClick={() => {
          if (!isMobile) {
            setOpenModal(!openModal);
          } else {
            handleShare();
          }
        }}
      >
        <img src="/assets/DashboardIcons/Icons/share.svg" />
      </FlexBox>

      {openModal && (
        <Modal
          XS
          height="fit-content"
          togglePopup={openModal}
          borderRadius="0.5rem"
        >
          <ShareComponent setOpenModal={setOpenModal} />
        </Modal>
      )}
    </>
  );
};
