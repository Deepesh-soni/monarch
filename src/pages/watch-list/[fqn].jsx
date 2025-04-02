import Layout from "../../layout/HomePageLayout";
import Table from "../../Components/WatchList/Table";
import Meta from "@layout/Meta";

const WatchListPage = () => {
  return (
    <>
      <Meta title="Stock Watchlist" />
      <Layout>
        <Table />
      </Layout>
    </>
  );
};

export default WatchListPage;
