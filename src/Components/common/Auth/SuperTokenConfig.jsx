import EmailPasswordReact from 'supertokens-auth-react/recipe/emailpassword'
import SessionReact from 'supertokens-auth-react/recipe/session'
import Router from 'next/router'

const appInfo = {
    // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
    appName: "StockApp",
    apiDomain: "https://api-test-monarq.pamprazzi.in",
    websiteDomain: "http://fw0og84ok0wc40kg8cw8sk4k.188.165.196.11.sslip.io",
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