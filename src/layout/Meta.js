import Head from "next/head";

const Meta = props => {
  const seoTitle = props.title ? `${props.title} | Pamprazzi` : "Monarch";

  return (
    <>
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
      {/* <NextSeo
        title={seoTitle}
        description={seoDescription}
        canonical={props.canonical || router.asPath}
        openGraph={{
          type: pageType,
          title: seoTitle,
          description: seoDescription,
          url: AppConfig.url + router.asPath,
          locale: AppConfig.locale,
          site_name: AppConfig.site_name,
          images: [
            {
              url: seoImage,
            },
          ],
        }}
        additionalMetaTags={[
          {
            name: "theme-color",
            content: "#544A71",
          },
          {
            name: "keywords",
            content: props.keywords,
          },
          {
            name: "title",
            content: props.metaTitle,
          },
        ]}
      /> */}
    </>
  );
};

export default Meta;
