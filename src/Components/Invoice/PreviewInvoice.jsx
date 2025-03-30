import React, { useRef, useState } from "react";
import styled from "styled-components";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useSelector } from "react-redux";
import { TfiClose } from "react-icons/tfi";
import { FiDownload, FiShare } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

import { H5, Body1, H6 } from "@common/UI/Headings";
import FlexBox from "@common/UI/FlexBox";
import Modal from "@common/UI/Modal";
import {
  SECONDARY_901,
  SECONDARY_200,
  SUCCESS,
  GREEN_WHATSAPP,
} from "@common/UI/colors";
import { boxShadowDs1 } from "@common/UI/styles";
import { numberToWords } from "@constants";
import { SALON_URL } from "@constants/urls";
import { device } from "@common/UI/Responsive";

const CompanyName = styled(H5)`
  font-weight: bold;
  font-size: 1.5rem;
  margin: 0;
  color: #823d6f;
`;

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  position: relative;
  height: 100%;
`;

const InvoiceContainer = styled(FlexBox)`
  background-color: #fff;
  width: 100%;
  height: 100%;
  overflow: scroll;
  max-width: 100%;
  padding: 1rem;
  justify-content: space-between;
  flex-direction: column;
`;

const Header = styled(FlexBox)`
  justify-content: space-between;
  align-items: center;
`;

const InvoiceTitle = styled(FlexBox)`
  text-align: right;
  flex-direction: column;

  p {
    font-size: 0.7rem;
    color: #555;
    margin-top: -0.2rem;
  }
`;

const Section = styled(FlexBox)`
  margin-bottom: 0.425rem;
  flex-direction: column;
  line-height: 0.5;
  text-align: left;
`;

const Title = styled(H6)`
  font-weight: bold;
  font-size: 0.9rem;
  margin-bottom: 0.425rem;
`;

const DetailsContainer = styled(FlexBox)`
  flex-direction: column;
  gap: 0.5rem;
`;

const DetailItem = styled.p`
  margin: 0.2rem 0;
  font-size: 0.7rem;
  text-align: left;
  strong {
    font-weight: bold;
  }
`;

const RightAlignedFooterCell = styled.td`
  text-align: right;
  padding: 0.25rem 0.5rem;
  border: 0.0625rem solid gray;
`;

const RegularCell = styled.td`
  padding: 0.25rem 0.5rem;
  text-align: right;
`;

const TableContainer = styled(FlexBox)`
  margin-top: 0.625rem;
  table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    font-size: 0.7rem;

    th {
      background-color: #bcbcbc;
      padding: 0.45rem 0.8rem;
      color: white;
    }

    td {
      border: none;
    }

    tfoot td {
      font-weight: bold;
    }
  }
`;

const CloseIconWrapper = styled(FlexBox)`
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${SECONDARY_901};
  justify-self: end;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
`;

const HeadBox = styled(FlexBox)`
  width: 100%;
  position: sticky;
  top: 0;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid ${SECONDARY_200};
  background-color: white;
  z-index: 5;
`;

const FloatingCtaContainer = styled(FlexBox)`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  gap: 1rem;
`;

const FloatingCTA = styled(FlexBox)`
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 50%;
  ${boxShadowDs1}

  @media ${device.laptop} {
    padding: 1rem;
  }
`;

const FooterText = styled(Body1)`
  font-size: 0.7rem;
  margin-top: 1rem;
  text-align: right;
  color: #999;
  cursor: pointer;
`;

const Tr = styled.tr`
  border-top: 1px solid gray;
`;

const Logo = styled.img`
  width: 4rem;
  cursor: pointer;
  margin-bottom: 2rem;
`;

const RowSpaceBetween = styled(FlexBox)`
  justify-content: space-between;
`;

const FooterTotalPayable = styled(Body1)`
  font-size: 0.7rem;
  margin-top: 1rem;
  text-transform: capitalize;
`;

const RowHighlighted = styled.tr`
  font-size: 0.8rem;
  background-color: #eaeaea;
`;

const PreviewInvoice = ({ data, toggleModal }) => {
  const { storeName, storeSlug } = useSelector(
    state => state?.activeStore?.storeDetails
  );

  const invoiceRef = useRef();
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDownloadInvoice = async () => {
    setIsGenerating(true);
    setErrorMessage("");

    try {
      const invoiceElement = invoiceRef.current;

      // Ensure fonts are loaded
      await document.fonts.ready;

      // Short delay to ensure everything is rendered
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(invoiceElement, {
        scale: 2, // Increase scale for higher quality
        useCORS: true,
        allowTaint: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 page width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("invoice.pdf");
    } catch (error) {
      setErrorMessage(
        "There was an issue generating the PDF. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShareInvoice = async () => {
    if (navigator.share) {
      try {
        setIsGenerating(true);
        const invoiceElement = invoiceRef.current;

        // Ensure fonts are loaded
        await document.fonts.ready;
        await new Promise(resolve => setTimeout(resolve, 500));

        const canvas = await html2canvas(invoiceElement, {
          scale: 2,
          useCORS: true,
          allowTaint: false,
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        const pdfBlob = pdf.output("blob");

        const file = new File([pdfBlob], "invoice.pdf", {
          type: "application/pdf",
        });
        await navigator.share({
          title: "Invoice 📃",
          text: `Hey! Your invoice for the recent appointment is ready. Take a look and relive those pampering moments! 💆‍♀️✨ \n\nDive into more services and offers from this salon: ${SALON_URL}/salon/${storeSlug}`,
          files: [file],
        });
      } catch (error) {
        setErrorMessage(
          "There was an issue sharing the PDF. Please try again."
        );
      } finally {
        setIsGenerating(false);
      }
    } else {
      setErrorMessage("Sharing is not supported on this device.");
    }
  };

  const handleWhatsappShare = () => {
    const encodedMessage = encodeURIComponent(
      `Hello! Your invoice for the recent appointment is ready.\n\nTo rebook or explore more services: ${SALON_URL}/salon/${storeSlug}.\n\nLogin to view your invoice: ${SALON_URL}.`
    );

    window.open(
      `https://wa.me/${data?.userPhone}?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <Modal M2 onClose={toggleModal}>
      <Wrapper>
        <HeadBox>
          <Body1 bold>Invoice</Body1>
          <CloseIconWrapper onClick={toggleModal}>
            <TfiClose size="0.75rem" />
          </CloseIconWrapper>
        </HeadBox>

        <div ref={invoiceRef}>
          <InvoiceContainer>
            <Header>
              <Logo src="/icon-384x384.png" />
              <InvoiceTitle>
                <Title>Tax Invoice</Title>
                <p>ORIGINAL For Recipient</p>
              </InvoiceTitle>
            </Header>

            <RowSpaceBetween>
              <Section>
                <DetailsContainer>
                  <CompanyName>{storeName || "Salon"}</CompanyName>
                  <DetailItem>
                    <strong>Invoice No.</strong>: {data?.bookingId}
                  </DetailItem>
                  <DetailItem>
                    <strong>Invoice Date</strong>:{" "}
                    {new Date(data?.bookedFor).toLocaleDateString()}
                  </DetailItem>
                  <DetailItem>
                    <strong>Booking ID</strong>: {data?.bookingId}
                  </DetailItem>
                </DetailsContainer>
              </Section>

              <Section>
                <Title> Billed To </Title>
                <DetailsContainer>
                  <DetailItem>
                    <strong>Customer Name</strong>: {data?.name}
                  </DetailItem>
                  <DetailItem>
                    <strong>Gender</strong>: {data?.gender}
                  </DetailItem>
                  <DetailItem>
                    <strong>Payment Mode</strong>: {data?.paymentMode || "Cash"}
                  </DetailItem>
                </DetailsContainer>
              </Section>
            </RowSpaceBetween>

            <TableContainer>
              <table>
                <thead>
                  <tr>
                    <th colSpan="2" style={{ textAlign: "left" }}>
                      Service Name
                    </th>
                    <th style={{ textAlign: "right" }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.servicesChoosen?.map((service, index) => (
                    <tr key={index}>
                      <RegularCell colSpan="2" style={{ textAlign: "left" }}>
                        {service?.serviceName}
                      </RegularCell>
                      <RegularCell>₹ {service.servicePrice}</RegularCell>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <Tr>
                    <RightAlignedFooterCell colSpan="2">
                      Total
                    </RightAlignedFooterCell>
                    <RegularCell>₹ {data?.totalMrp}</RegularCell>
                  </Tr>
                  {data?.discounts > 0 && (
                    <tr style={{ color: SUCCESS }}>
                      <RightAlignedFooterCell colSpan="2">
                        Discount{" "}
                        {data?.couponCode ? `(${data?.couponCode})` : "Applied"}
                      </RightAlignedFooterCell>
                      <RegularCell>- ₹ {data?.discounts}</RegularCell>
                    </tr>
                  )}
                  <RowHighlighted>
                    <RightAlignedFooterCell colSpan="2">
                      <strong>Total Payable</strong>
                    </RightAlignedFooterCell>
                    <RegularCell>₹ {data?.totalPayable}</RegularCell>
                  </RowHighlighted>
                </tfoot>
              </table>
            </TableContainer>

            <Section>
              <FooterTotalPayable>
                <strong>Total Payable (in words)</strong>: Rupees{" "}
                {numberToWords(data?.totalPayable)} Only
              </FooterTotalPayable>
            </Section>

            <FooterText
              onClick={() => window.open("https://pamprazzi.com/", "_blank")}
            >
              Powered by Pamprazzi
            </FooterText>
          </InvoiceContainer>
        </div>

        <FloatingCtaContainer>
          {data?.userPhone && (
            <FloatingCTA onClick={handleWhatsappShare} disabled={isGenerating}>
              <FaWhatsapp size={20} color={GREEN_WHATSAPP} />
            </FloatingCTA>
          )}
          <FloatingCTA onClick={handleShareInvoice} disabled={isGenerating}>
            <FiShare size={20} />
          </FloatingCTA>

          <FloatingCTA onClick={handleDownloadInvoice} disabled={isGenerating}>
            <FiDownload size={20} />
          </FloatingCTA>
        </FloatingCtaContainer>
      </Wrapper>
    </Modal>
  );
};

export default PreviewInvoice;
