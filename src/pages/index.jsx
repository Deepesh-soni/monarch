import Meta from "@layout/Meta";
import Home from "@components/Home";

export default function HomePage() {
  return (
    <>
      <Meta
        title="Home"
        description="Advanced stock screening, real-time analysis, and powerful tools to make informed investment decisions"
        keywords="stock screening, real-time analysis, powerful tools, informed investment decisions"
      />
      <main>
        <Home />
      </main>
    </>
  );
}
