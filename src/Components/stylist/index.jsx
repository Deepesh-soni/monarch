import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { IoIosAddCircleOutline } from "react-icons/io";
import { client } from "@axiosClient";
import Bugsnag from "@bugsnag/js";
import { Button } from "@common/UI/Buttons";
import { URL } from "@constants/urls";
import SectionContainer from "@common/SectionContainer";
import StylistLineItem from "./StylistLineItem";
import StylistModal from "./StylistModal";
import useIsDesktop from "../../hooks/useIsDesktop";

const Container = styled.div`
  width: 100%;
  overflow-x: auto;
  background-color: #ffffff;

  @media (max-width: 768px) {
    width: 25rem;
    overflow-x: scroll;
    white-space: nowrap;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 768px) {
    height: 100%;
    display: block;
    overflow-x: scroll;
    white-space: nowrap;
  }
`;

const Th = styled.th`
  text-align: ${({ align }) => align || "left"};
  padding: 0.875rem 1.5rem;
  font-size: 0.9rem;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.7rem;
  }
`;

const Stylist = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [getStylistsData, setGetStylistsData] = useState(null);
  const [options, setOptions] = useState([]);
  const storeId = useSelector(state => state.auth.storeId);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await client.get(URL.getAllCategory);
        const categoryOptions = res?.data?.map(category => {
          return {
            key: category?.categoryId?.toString(), // it is getting saved as string in backend
            value: category?.title,
          };
        });
        setOptions(categoryOptions);
      } catch (error) {
        toast.error("Failed to fetch list of expertise");
        Bugsnag.notify(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    getStylistsDetails();
  }, [storeId]);

  const getStylistsDetails = async () => {
    try {
      const response = await client.get(`${URL.getAllStaff}/${storeId}`);
      setGetStylistsData(response?.data.data);
    } catch (error) {
      toast.error("Unable to fetch Data");
      Bugsnag.notify(error);
    }
  };

  const deleteItem = async id => {
    if (!id) return;
    try {
      await client.post(`${URL.deleteStylists}/${storeId}/${id}`);
      toast.success("Stylist removed successfully");
    } catch (error) {
      toast.error("Failed to delete stylist");
      Bugsnag.notify(error);
    } finally {
      getStylistsDetails();
    }
  };

  return (
    <SectionContainer
      noPadding
      title="Staff Management"
      showMenu={<IoIosAddCircleOutline />}
      onMenuClick={() => setModalOpen(true)}
      cta={<Button onClick={openModal}>Add More</Button>}
    >
      {isModalOpen && (
        <StylistModal
          closeModal={closeModal}
          refreshList={getStylistsDetails}
          options={options}
        />
      )}

      <Container>
        <Table>
          <thead>
            <tr>
              <Th align="start">Stylist Details</Th>
              <Th align="start">Joining Date</Th>
              <Th align="start">Role</Th>
              <Th align="start">Expertise</Th>
              <Th align="start">Total Booking</Th>
              <Th align="start">Overall Rating</Th>
              <Th align="center">Action</Th>
            </tr>
          </thead>
          <tbody>
            {getStylistsData?.map((data, index) => (
              <StylistLineItem
                key={index}
                deleteItem={deleteItem}
                data={data}
                options={options}
                refreshList={getStylistsDetails}
              />
            ))}
          </tbody>
        </Table>
      </Container>
    </SectionContainer>
  );
};

export default Stylist;
