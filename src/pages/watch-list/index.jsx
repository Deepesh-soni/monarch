import Layout from "../../layout/HomePageLayout";
import WatchList from "../../Components/WatchList";

import Meta from "@layout/Meta";

const WatchListPage = () => {
  return (
    <>
      <Meta title="Stock Watchlist" />
      <Layout>
        <WatchList />
      </Layout>
    </>
  );
};

export default WatchListPage;
