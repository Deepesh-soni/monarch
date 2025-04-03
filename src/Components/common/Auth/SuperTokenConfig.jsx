import EmailPasswordReact from 'supertokens-auth-react/recipe/emailpassword'
import SessionReact from 'supertokens-auth-react/recipe/session'
import Router from 'next/router'

const appInfo = {
    // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
    appName: "StockApp",
    apiDomain: "https://api-test-monarq.pamprazzi.in",
    websiteDomain: "https://api-test-monarq2.pamprazzi.in",
    apiBasePath: "/auth",
    websiteBasePath: "/auth"
}

export const frontendConfig = () => {
    return {
        appInfo,
        recipeList: [
            EmailPasswordReact.init(),
            SessionReact.init(),
        ],
        style: `
            [data-supertokens~=container] {
                font-family: "Montserrat", sans-serif;
            }
            [data-supertokens~=input] {
                font-family: "Montserrat", sans-serif;
            }
            [data-supertokens~=link] {
                font-family: "Montserrat", sans-serif;
            }
            [data-supertokens~=button] {
                font-family: "Montserrat", sans-serif;
                background-color: #0033a0;
                border: 0px;
                margin: 0 auto;
            }
            [data-supertokens~=superTokensBranding] {
                display: none;
            }
        `,
        windowHandler: (oI) => {
            return {
                ...oI,
                location: {
                    ...oI.location,
                    setHref: (href) => {
                        Router.push(href)
                    },
                },
            }
        },
    }
}