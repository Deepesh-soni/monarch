import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import Bugsnag from "@bugsnag/js";
import { client } from "@axiosClient";
import { DARKGREY } from "@common/UI/colors";
import SectionContainer from "@common/SectionContainer";
import StylistLineItem from "./LineItem";
import Loader from "@common/Loader";
import { URL } from "@constants/urls";

const Container = styled.div`
  width: 92vw;
  background-color: #ffffff;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableContainer = styled.div`
  width: 100%;
  max-height: 77vh;
  overflow-y: auto;
`;

const Th = styled.th`
  text-align: ${({ align }) => align || "left"};
  padding: 1rem 0.8rem;
  font-size: 1rem;
  position: sticky;
  top: 0;
  background-color: #ffffff;
  z-index: 1;
`;

const NullState = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex: 1;
  padding: 2rem;
  color: ${DARKGREY};
`;

const Transactions = () => {
  const [transactionsData, setTransactionsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const storeId = useSelector(state => state.auth.storeId);

  useEffect(() => {
    if (!storeId) return;

    const fetchTransactions = async () => {
      try {
        const response = await client.get(
          `${URL.storeTransactions}/${storeId}`
        );
        setTransactionsData(response?.data?.data || []);
      } catch (error) {
        Bugsnag.notify(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [storeId]);

  return (
    <SectionContainer noPadding title="Transactions">
      {loading ? (
        <Loader fitContent />
      ) : (
        <Container>
          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <Th align="center">Booking ID</Th>
                  <Th align="center">Booking Date</Th>
                  <Th align="center">Booking Time</Th>
                  <Th align="center">Total Cost</Th>
                  <Th align="center">Discounts</Th>
                  <Th align="center">Coupon Applied</Th>
                  <Th align="center">Total Payable</Th>
                  <Th align="center">Payment Mode</Th>
                </tr>
              </thead>
              <tbody>
                {transactionsData.length > 0 ? (
                  transactionsData.map((data, index) => (
                    <StylistLineItem
                      key={data._id || index}
                      data={data}
                      index={index}
                    />
                  ))
                ) : (
                  <NullState>
                    <img
                      src="/assets/Coupons/no-task.webp"
                      alt="No Transactions"
                    />
                    <p>No Transactions Available</p>
                  </NullState>
                )}
              </tbody>
            </Table>
          </TableContainer>
        </Container>
      )}
    </SectionContainer>
  );
};

export default Transactions;
