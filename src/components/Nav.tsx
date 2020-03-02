import { FunctionComponent, useState, useEffect } from "react";
import Link from "next/link";

const Nav: FunctionComponent = (props) => {
  const [smallScreen, setSmallScreen] = useState<boolean>(false);
  const [nav, setNav] = useState<boolean>(false);

  useEffect(() => {
    setSmallScreen(window.innerWidth < 576 ? true : false);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    setSmallScreen(window.innerWidth < 576 ? true : false);
    setNav(window.innerWidth > 576 ? true : false);
  };

  const goToSection = (index: number): void => {
    const sectionID: any = document.getElementById(`section-${index}`);
    sectionID.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  };

  return (
    <>
      <div className="nav-main">
        <img
          className="index-logo"
          src="/assets/img/usanails_logo.png"
          alt="usa nails logo"
        />
        {smallScreen && (
          <img
            onClick={() => setNav(!nav)}
            className="index-menu"
            src="assets/img/icons/menu_icon.png"
          ></img>
        )}
        <ul className={"nav-bar " + (nav ? "nav-bar-anim1" : "nav-bar-anim2")}>
          <li className="button">
            <Link href="/">
              <a>HOME</a>
            </Link>
          </li>
          <li className="button">NEWS</li>
          <li className="button">BLOGS</li>
          <li className="button" onClick={() => goToSection(1)}>
            PRICE LIST
          </li>
          <li className="button" onClick={() => goToSection(2)}>
            ABOUT
          </li>
          <li className="button" onClick={() => goToSection(3)}>
            CONTACT
          </li>
        </ul>
      </div>
    </>
  );
};
export default Nav;
