import { FC, useContext } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import Head from "next/head";
import Login from "./auth/Login";
import { UserContext } from "src/lib/UserContext";

const Layout: FC = ({ children }) => {
  const { quickLogin } = useContext<any>(UserContext);
  return (
    <div className="layout-top">
      <Head>
        <title>USA Nails Berkhamsted est. 2007</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Nav />
      {quickLogin && <Login />}
      {quickLogin && (
        <style jsx global>
          {`
            body {
              overflow: hidden;
            }
          `}
        </style>
      )}
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
