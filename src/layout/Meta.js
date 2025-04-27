import Head from "next/head";

const Meta = props => {
  const seoTitle = props.title ? `${props.title} | FinEase` : "FinEase";

  return (
    <Head>
      <title>{seoTitle}</title>
      <meta charSet="UTF-8" key="charset" />
      <meta
        name="viewport"
        content="width=device-width,height=device-height,initial-scale=1.0,maximum-scale=1.0,user-scalable=no,user-scalable=0"
        key="viewport"
      />
      {props.children}
    </Head>
  );
};

export default Meta;
