import { FunctionComponent } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

const Layout: FunctionComponent = ({ children }) => {
  return (
    <div className="layout-top">
      <Nav />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
