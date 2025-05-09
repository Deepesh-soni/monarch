import React from "react";
import Layout from "../../../layout/HomePageLayout";
import Meta from "@layout/Meta";
import StockCompare from "../../../Components/Stocks/Compare";

const StockComparePage = () => (
    <>
        <Meta title="Compare Stock" />
        <Layout>
            <StockCompare />
        </Layout>
    </>
);

export default StockComparePage;
