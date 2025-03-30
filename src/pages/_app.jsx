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

function App({ Component, pageProps }) {
  const user = useSelector(state => state.auth.user);

  console.log("userApp", user);

  useEffect(() => {
    if (user) MixpanelTracker.getInstance().identify(user?.userId);
  }, [user]);

  useEffect(() => {
    (function (c, l, a, r, i, t, y) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r);
      t.async = 1;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y.parentNode.insertBefore(t, y);
    })(
      window,
      document,
      "clarity",
      "script",
      process.env.NEXT_PUBLIC_MICROSOFT_CLARITY
    );
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
