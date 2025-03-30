import React from "react";
import { useSelector } from "react-redux";
import { QueryParamProvider } from "use-query-params";
import { NextAdapter } from "next-query-params";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, wrapper } from "@redux/stores";
import CustomToastContainer from "@common/CustomToastContainer";
import StyledComponentsRegistry from "../lib/registry";
import ErrorBoundary from "@components/ErrorBoundary";
import "@styles/globals.css";
import { WebSocketProvider } from "../../webSocket";

// import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";

import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";
import { frontendConfig } from "../config/frontendConfig";

if (typeof window !== "undefined") {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig());
}

// SUPERTOKEN_URI=http://supertokens-qggsg8wccwg84gckgk000o0w.188.165.196.11.sslip.io:3567
// SUPERTOKEN_APPNAME=STOCK APP
// SUPERTOKEN_APIDOMAIN=
// SUPERTOKEN_WEBSITEDOMAIN=http://supertokens-qggsg8wccwg84gckgk000o0w.188.165.196.11.sslip.io

function App({ Component, pageProps }) {
  const user = useSelector(state => state.auth.user);

  return (
    <ErrorBoundary>
      <SuperTokensWrapper>
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
      </SuperTokensWrapper>
    </ErrorBoundary>
  );
}

export default wrapper?.withRedux(App);
