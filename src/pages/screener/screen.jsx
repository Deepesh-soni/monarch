import React from "react";
import "react-querybuilder/dist/query-builder.css";

import Layout from "../../layout/HomePageLayout";
import Meta from "@layout/Meta";
import ScreenerDefault from "../../Components/Screener/screen";


const ScreenerDefaultPage = () => (
    <>
        <Meta title="Stock Screener Builder" />
        <Layout>
            <ScreenerDefault />
        </Layout>
    </>
);


export default ScreenerDefaultPage;
