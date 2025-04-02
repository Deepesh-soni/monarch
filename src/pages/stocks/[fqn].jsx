import React from "react";
import _ from "lodash";
import Stock from "@Components/Stocks";
import Layout from "../../layout/HomePageLayout";
import Meta from "@layout/Meta";

const StockPage = () => {
  return (
    <>
      <Meta title="Stock Details" />
      <Layout>
        <Stock />
      </Layout>
    </>
  );
};

export default StockPage;
