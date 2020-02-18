import { FunctionComponent } from "react";

const Nav: FunctionComponent = (props) => {
  return (
    <>
      <div className="nav-main">
        <img
          className="index-logo"
          src="/assets/img/usanails_logo.png"
          alt="usa nails logo"
        />
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
