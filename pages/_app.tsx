import React, { useState, useMemo, useEffect } from "react";
import { ApolloProvider } from "react-apollo";
import "src/styles/main.scss";
import cookie from "cookie";
import Layout from "src/components/Layout";
import { NextPageContext, NextPage } from "next";
import { UserContext } from "src/lib/UserContext";
import { getMe } from "src/lib/api";
import { useApollo } from "src/lib/apolloClient";
import "react-datepicker/dist/react-datepicker.css";
import theme from "../src/styles/theme";
import { ThemeProvider } from "@material-ui/core/styles";

interface CookiesPageContext extends NextPageContext {
  ctx: NextPageContext;
}

const MyApp: NextPage<any> = ({ Component, pageProps, loggedUser }) => {
  const apolloClient = useApollo(pageProps?.initialApolloState);
  const [user, setUser] = useState(null);
  const [quickLogin, setQuickLogin] = useState<boolean>(false);

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }

    loggedUser ? setUser(loggedUser) : setUser(null);
  }, [loggedUser]);

  // useMemo cached values if user or setUser don't change
  const memoUser = useMemo(
    () => ({ user, setUser, quickLogin, setQuickLogin }),
    [user, setUser, quickLogin, setQuickLogin]
  );

  return (
    <ApolloProvider client={apolloClient}>
      <UserContext.Provider value={memoUser}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </UserContext.Provider>
    </ApolloProvider>
  );
};

MyApp.getInitialProps = async (appCtx: CookiesPageContext) => {
  const request = appCtx.ctx.req;
  const cookies = cookie.parse(
    request ? request.headers.cookie || "" : document.cookie
  );

  if (Object.keys(cookies).length === 0 || cookies.token === "undefined") {
    return {};
  }

  const loggedUser = await getMe(cookies.token, request?.headers.host as any);

  if (loggedUser.error) {
    console.log(loggedUser);
    return {};
  }

  return { loggedUser };
};

export default MyApp;
