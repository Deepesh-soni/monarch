import styled from "styled-components";
import FlexBox from "@common/UI/FlexBox";
import { Body1, Support } from "@common/UI/Headings";
import { device } from "@common/UI/Responsive";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { Modal } from "antd"; // for delete confirmation
import { toast } from "react-toastify";
import { H5 } from "../../Components/common/Typography";
import { Medium, Small, Large } from "../../Components/common/Paragraph";

import { client } from "@axiosClient";
import NewUpdatePopup from "../common/NewUpdatePopup";

import { useRouter } from "next/router";

const Wrapper = styled(FlexBox)`
  flex-direction: column;
  padding: 0 1rem;
  align-items: center;
  gap: 0.5rem;
  min-height: 100vh; /* Full screen minimum height */

  @media ${device.laptop} {
    margin: auto;
    gap: 2.5rem;
    width: 86.67%;
    max-width: 75rem;
    padding: 2rem;
  }
`;

const Card = styled(FlexBox)`
  flex-direction: column;
  width: 100%;
  background: #ffffff;
  border: 1px solid #ebf0f4;
  box-shadow: 0px 3px 3px 0px #00000040;
  padding: 1.5rem;
  border-radius: 12px;
  cursor: pointer;
`;

const WatchList = () => {
  const [watchlists, setWatchlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // For edit mode
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const router = useRouter();

  const fetchWatchlists = async () => {
    setLoading(true);
    try {
      const response = await client.get("/watchlist");
      setWatchlists(response.data || []);
    } catch (error) {
      console.error("Failed to fetch watchlists", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWatchlists();
  }, []);

  const handleDelete = (fqn, name) => {
    Modal.confirm({
      title: `Delete ${name}?`,
      content: `Are you sure you want to delete "${name}"?`,
      onOk: async () => {
        try {
          await client.delete(`/watchlist/${fqn}`);
          toast.success(`${name} deleted successfully!`);
          fetchWatchlists();
        } catch (error) {
          toast.error(`Failed to delete "${name}".`);
        }
      },
    });
  };

  const handleEdit = watchlist => {
    setEditingItem(watchlist);
    setIsEditModalOpen(true);
  };

  return (
    <SessionAuth>
      <Wrapper>
        {/* Modal for creating new watchlist */}
        <NewUpdatePopup
          visible={isNewModalOpen}
          toggleModal={() => setIsNewModalOpen(false)}
          itemType="watchlist"
          mode="new"
          onConfirm={fetchWatchlists}
        />

        {/* Modal for updating existing watchlist */}
        <NewUpdatePopup
          visible={isEditModalOpen}
          toggleModal={() => setIsEditModalOpen(false)}
          itemType="watchlist"
          mode="update"
          initialValues={{
            name: editingItem?.name,
            description: editingItem?.description,
            fqn: editingItem?.fqn,
          }}
          onConfirm={() => {
            fetchWatchlists();
            setIsEditModalOpen(false);
          }}
        />

        <FlexBox width="100%" column rowGap="2rem">
          {/* Header */}
          <FlexBox align="center" justify="space-between">
            <FlexBox column>
              <H5 bold>My Watchlists</H5>
              <Medium color="#687792">
                Track and manage your favorite stocks
              </Medium>
            </FlexBox>
            <FlexBox
              border="1.5px solid #142C8E"
              align="center"
              padding="0.5rem"
              columnGap="0.5rem"
              borderRadius="0.8rem"
              onClick={() => setIsNewModalOpen(true)}
              cursor="pointer"
            >
              <IoMdAdd color="#142C8E" />
              <Small color="#142C8E">New Watchlist</Small>
            </FlexBox>
          </FlexBox>

          {/* Cards */}
          {loading ? (
            <Support color="#687792">Loading watchlists...</Support>
          ) : watchlists.length > 0 ? (
            watchlists.map(watchlist => (
              <Card
                key={watchlist.id}
                onClick={() => router.push(`/watch-list/${watchlist?.fqn}`)}
              >
                <FlexBox align="center" justify="space-between">
                  <FlexBox column rowGap="0.25rem">
                    <H5 bold>{watchlist.name}</H5>
                    <Large color="#687792">
                      {watchlist.stocks?.length || 0} Stocks
                    </Large>
                    <Medium color="#687792">{watchlist.description}</Medium>
                  </FlexBox>

                  {/* Edit & Delete icons */}
                  <FlexBox columnGap="1rem">
                    <AiOutlineEdit
                      size={20}
                      style={{ cursor: "pointer" }}
                      onClick={e => {
                        e.stopPropagation();
                        handleEdit(watchlist);
                      }}
                    />
                    <AiOutlineDelete
                      size={20}
                      style={{ cursor: "pointer" }}
                      onClick={e => {
                        e.stopPropagation();
                        handleDelete(watchlist.fqn, watchlist.name);
                      }}
                    />
                  </FlexBox>
                </FlexBox>
              </Card>
            ))
          ) : (
            // If no watchlists, show a "Create New" prompt
            <FlexBox
              border="1.5px solid #142C8E"
              align="center"
              padding="1rem"
              borderRadius="0.4rem"
              onClick={() => setIsNewModalOpen(true)}
              style={{ cursor: "pointer" }}
            >
              <IoMdAdd color="#142C8E" />
              <Support color="#142C8E">Create New Watchlist</Support>
            </FlexBox>
          )}
        </FlexBox>
      </Wrapper>
    </SessionAuth>
  );
};

export default WatchList;
