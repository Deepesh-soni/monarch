import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { QueryParamProvider } from "use-query-params";
import { NextAdapter } from "next-query-params";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, wrapper } from "@redux/stores";
import CustomToastContainer from "@common/CustomToastContainer";
import StyledComponentsRegistry from "../lib/registry";
import { MixpanelTracker } from "@utils/mixpanelInstance";
import ErrorBoundary from "@components/ErrorBoundary";
import "@styles/globals.css";
import { WebSocketProvider } from "../../webSocket";

import { URL } from "@constants/urls";
import Bugsnag from "@bugsnag/js";
import { client } from "@axiosClient";

function App({ Component, pageProps }) {
  useEffect(() => {
    (async () => {
      try {
        await client.get(URL.topMcap);
      } catch (error) {
        Bugsnag.notify(error);
      }
    })();
  }, []);

  return (
    <ErrorBoundary>
      <PersistGate loading={null} persistor={persistor}>
        <QueryParamProvider adapter={NextAdapter}>
          <CustomToastContainer />
          <StyledComponentsRegistry>
            <WebSocketProvider>
              <Component {...pageProps} />
            </WebSocketProvider>
          </StyledComponentsRegistry>
        </QueryParamProvider>
      </PersistGate>
    </ErrorBoundary>
  );
}

export default wrapper?.withRedux(App);
