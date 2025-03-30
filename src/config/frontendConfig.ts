import EmailPasswordReact from "supertokens-auth-react/recipe/emailpassword";
import SessionReact from "supertokens-auth-react/recipe/session";
// import { appInfo } from "./appInfo";
import Router from "next/router";

export const appInfo = {
  // learn more about this on https://supertokens.com/docs/references/frontend-sdks/reference#sdk-configuration
  appName: "STOCK APP",
  apiDomain:
    "http://supertokens-qggsg8wccwg84gckgk000o0w.188.165.196.11.sslip.io:3567",
  websiteDomain:
    "http://supertokens-qggsg8wccwg84gckgk000o0w.188.165.196.11.sslip.io",
  apiBasePath: "/auth",
  websiteBasePath: "/auth",
};

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [EmailPasswordReact.init(), SessionReact.init()],
    windowHandler: (oI: any) => {
      return {
        ...oI,
        location: {
          ...oI.location,
          setHref: (href: string) => {
            Router.push(href);
          },
        },
      };
    },
  };
};
