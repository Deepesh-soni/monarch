import Screen from "../../Components/Screen";
import Layout from "../../layout/HomePageLayout";

import Meta from "@layout/Meta";

const Screener = () => {
    return (
        <>
            <Meta title="Stock Screens" />
            <Layout>
                <Screen />
            </Layout>
        </>
    );
};

export default Screener;
