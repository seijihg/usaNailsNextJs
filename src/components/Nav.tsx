import { FunctionComponent, useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Login from "./auth/Login";
import { UserContext } from "src/lib/UserContext";

const Nav: FunctionComponent = () => {
  const [smallScreen, setSmallScreen] = useState<boolean>(false);
  const [nav, setNav] = useState<boolean>(false);

  const { user, setUser, quickLogin, setQuickLogin } = useContext<any>(
    UserContext
  );

  const router = useRouter();

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
      block: "center",
    });
  };

  return (
    <>
      <div className="nav-main">
        <Link href="/">
          <a>
            <img
              className="index-logo"
              src="/assets/img/usanails_logo_ver2.png"
              alt="usa nails logo"
            />
          </a>
        </Link>
        {smallScreen && (
          <img
            onClick={() => setNav(!nav)}
            className="index-menu"
            src="/assets/img/icons/menu_icon.png"
          ></img>
        )}
        <ul className={"nav-bar " + (nav ? "nav-bar-anim1" : "nav-bar-anim2")}>
          <li className="button">
            <Link href="/">
              <a>HOME</a>
            </Link>
          </li>
          <li className="button">
            <Link href="/news">
              <a>NEWS</a>
            </Link>
          </li>
          <li className="button">
            <Link href="/blogs">
              <a>BLOGS</a>
            </Link>
          </li>
          {router.pathname === "/" ? (
            <>
              <li className="button" onClick={() => goToSection(1)}>
                PRICE LIST
              </li>
              <li className="button" onClick={() => goToSection(2)}>
                ABOUT
              </li>
              <li className="button" onClick={() => goToSection(3)}>
                CONTACT
              </li>
            </>
          ) : (
            ""
          )}
          {user ? (
            <li className="button">{user.email}</li>
          ) : (
            <li className="button" onClick={() => setQuickLogin(!quickLogin)}>
              LOGIN
            </li>
          )}
        </ul>
      </div>
    </>
  );
};
export default Nav;
