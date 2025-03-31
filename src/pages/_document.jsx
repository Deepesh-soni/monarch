import Document, { Html, Head, Main, NextScript } from "next/document";

/**
 * Reference: https://nextjs.org/docs/basic-features/font-optimization
 */
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          />

          <meta name="pwa-demo" content="pwa-demo" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="pwa-demo" />
          <meta name="description" content="pwa-demo" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />

          <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
            rel="stylesheet"
          />
          <link
            rel="icon"
            type="image/svg+xml"
            href="/assets/images/favicon.svg"
          />
          <link rel="icon" type="image/png" href="/assets/images/favicon.png" />
        </Head>
        <body>
          <Main />
          <div id="modalPortal"></div>
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
