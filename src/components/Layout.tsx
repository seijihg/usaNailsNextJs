import { FunctionComponent } from "react";
import Nav from "./Nav";

const Layout: FunctionComponent = ({ children }) => {
  return (
    <div className="layout-top">
      <Nav />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
