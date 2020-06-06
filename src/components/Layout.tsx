import { FC } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import Head from "next/head";

const Layout: FC = ({ children }) => {
  return (
    <div className="layout-top">
      <Head>
        <title>USA Nails Berkhamsted est. 2007</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Nav />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
