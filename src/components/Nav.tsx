import { FunctionComponent } from "react";

const Nav: FunctionComponent = (props) => {
  return (
    <>
      <div className="nav-main">
        <div className="index-logo">USA Nails</div>
        <ul className="nav-bar">
          <li>HOME</li>
          <li>NEWS</li>
          <li>SERVICES</li>
          <li>ABOUT</li>
          <li>CONTACT</li>
        </ul>
      </div>
    </>
  );
};
export default Nav;
