import Layout from "../layout/HomePageLayout";
import News from "@Components/News";
import Meta from "@layout/Meta";

const NewsPage = () => {
  return (
    <>
      <Meta title="News" />
      <Layout>
        <News />
      </Layout>
    </>
  );
};

export default NewsPage;
