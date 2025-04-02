import Layout from "../../layout/HomePageLayout";
import Table from "../../Components/WatchList/Table";
import Meta from "@layout/Meta";

const WatchListPage = () => {
  return (
    <>
      <Meta title="My Watch List" />
      <Layout>
        <Table />
      </Layout>
    </>
  );
};

export default WatchListPage;
