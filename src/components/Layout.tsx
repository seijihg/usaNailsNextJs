import { FC, useContext, useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import Head from "next/head";
import Login from "./auth/Login";
import { UserContext } from "src/lib/UserContext";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";

const Layout: FC = ({ children }) => {
  const { quickLogin } = useContext<any>(UserContext);
  const [logOrSign, setLogOrSign] = useState<string>("login");
  return (
    <div className="layout-top">
      <Head>
        <title>USA Nails Berkhamsted est. 2007</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Nav />
      {quickLogin &&
        ((logOrSign === "login" && (
          <Login logOrSign={logOrSign} setLogOrSign={setLogOrSign} />
        )) ||
          (logOrSign === "signup" && (
            <Signup logOrSign={logOrSign} setLogOrSign={setLogOrSign} />
          )) ||
          (logOrSign === "password" && (
            <ForgotPassword logOrSign={logOrSign} setLogOrSign={setLogOrSign} />
          )))}
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
