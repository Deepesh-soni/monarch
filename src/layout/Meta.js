import { NextSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";

import AppConfig from "@utils/AppConfig";

const Meta = props => {
  const router = useRouter();

  const seoTitle = props.title
    ? `${props.title} | Pamprazzi`
    : "Partner with Pamprazzi! Access Tools & Support for Salon Owners";
  const seoDescription =
    props.description ||
    "List your salon, effortlessly attract clients, and access powerful tools for managing your salon, marketing, and enhancing client interactions. Sign up for free today!";
  const seoImage = props.image || AppConfig.image;
  const pageType = props.type || "website";

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
        {/* <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="https://cdn.theinnerhour.com/assets/images/favicon/apple-touch-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="https://cdn.theinnerhour.com/assets/images/favicon/apple-touch-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="https://cdn.theinnerhour.com/assets/images/favicon/apple-touch-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="https://cdn.theinnerhour.com/assets/images/favicon/apple-touch-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="https://cdn.theinnerhour.com/assets/images/favicon/apple-touch-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="https://cdn.theinnerhour.com/assets/images/favicon/apple-touch-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="https://cdn.theinnerhour.com/assets/images/favicon/apple-touch-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="https://cdn.theinnerhour.com/assets/images/favicon/apple-touch-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://cdn.theinnerhour.com/assets/images/favicon/apple-touch-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="https://cdn.theinnerhour.com/assets/images/favicon/favicon-32x32.png"
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href="https://cdn.theinnerhour.com/assets/images/favicon/android-chrome-192x192.png"
          sizes="192x192"
        />
        <link
          rel="icon"
          type="image/png"
          href="https://cdn.theinnerhour.com/assets/images/favicon/favicon-16x16.png"
          sizes="16x16"
        />
        <link
          rel="shortcut icon"
          href="https://cdn.theinnerhour.com/assets/images/favicon/favicon.ico"
        />
        <meta
          name="facebook-domain-verification"
          content="ryq4ssmuq01xijlf538gvdbhkxlux3"
        /> */}
        {props.children}
      </Head>
      <NextSeo
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
        // twitter={{
        //   cardType: "summary",
        //   handle: "@amaha_health",
        //   site: "@amaha_health",
        // }}
        // facebook={{
        //   appId: "756733961430857",
        // }}
      />
    </>
  );
};

export default Meta;
