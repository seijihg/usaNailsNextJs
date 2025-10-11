import React, { useEffect } from "react";
import "src/styles/main.scss";
import Layout from "src/components/Layout";
import { AppProps } from "next/app";
import theme from "../src/styles/theme";
import { ThemeProvider } from "@mui/material/styles";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
};

export default MyApp;
