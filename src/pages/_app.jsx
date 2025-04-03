import React from "react";
import { QueryParamProvider } from "use-query-params";
import { NextAdapter } from "next-query-params";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, wrapper } from "@redux/stores";
import CustomToastContainer from "@common/CustomToastContainer";
import StyledComponentsRegistry from "../lib/registry";
import ErrorBoundary from "@components/ErrorBoundary";
import "@styles/globals.css";

import RouteLoader from "../Components/common/UI/RouterLoader";
import SuperTokensReact, { SuperTokensWrapper } from "supertokens-auth-react";
import { frontendConfig } from "../Components/common/Auth/SuperTokenConfig";

if (typeof window !== "undefined") {
  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'
  SuperTokensReact.init(frontendConfig());
}

function App({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <SuperTokensWrapper>
        <PersistGate loading={null} persistor={persistor}>
          <QueryParamProvider adapter={NextAdapter}>
            <CustomToastContainer />
            <StyledComponentsRegistry>
              <RouteLoader />
              <Component {...pageProps} />
            </StyledComponentsRegistry>
          </QueryParamProvider>
        </PersistGate>
      </SuperTokensWrapper>
    </ErrorBoundary>
  );
}

export default wrapper?.withRedux(App);
