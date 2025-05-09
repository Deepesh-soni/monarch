import StockQueryBuilderIndex from "../../../Components/Screener";
import Layout from "../../../layout/HomePageLayout";

import Meta from "@layout/Meta";

const Screener = () => {
    return (
        <>
            <Meta title="Stock Screens - Query Builder" />
            <Layout>
                <StockQueryBuilderIndex />
            </Layout>
        </>
    );
};

export default Screener;
