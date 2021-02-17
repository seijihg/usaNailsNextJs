import { FunctionComponent, useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext } from "src/lib/UserContext";
import { ReactSVG } from "react-svg";
import Cookies from "js-cookie";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  list: {
    fontFamily: "Alice",
    textAlign: "right",
    color: "#99525d",
    fontSize: "0.9rem",
    marginLeft: "1.25rem",
  },
});

const Nav: FunctionComponent = () => {
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [smallScreen, setSmallScreen] = useState<boolean>(false);
  const [nav, setNav] = useState<boolean>(false);

  const { user, setUser, quickLogin, setQuickLogin } = useContext<any>(
    UserContext
  );
  const nickName = user?.email?.split("@")[0];

  const router = useRouter();
  const styles = useStyles();

  useEffect(() => {
    setSmallScreen(window.innerWidth < 769 ? true : false);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    setSmallScreen(window.innerWidth < 769 ? true : false);
    setNav(window.innerWidth > 769 ? true : false);
  };

  const goToSection = (index: number): void => {
    const sectionID: any = document.getElementById(`section-${index}`);
    sectionID.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const drawer = (
    <>
      {smallScreen && (
        <img
          onClick={() => setNav(!nav)}
          className="index-menu"
          src="/assets/img/icons/menu_icon.png"
        ></img>
      )}
      <SwipeableDrawer
        className="material_ui_nav"
        anchor="right"
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={nav}
        onClose={() => setNav(false)}
        onOpen={() => setNav(true)}
      >
        <List>
          <Link href="/">
            <ListItem button onClick={() => setNav(false)}>
              <ListItemText
                disableTypography
                className={styles.list}
                primary="HOME"
              />
            </ListItem>
          </Link>
          <Link href="/news">
            <ListItem button onClick={() => setNav(false)}>
              <ListItemText
                disableTypography
                className={styles.list}
                primary="NEWS"
              />
            </ListItem>
          </Link>
          <Link href="/blogs">
            <ListItem button onClick={() => setNav(false)}>
              <ListItemText
                disableTypography
                className={styles.list}
                primary="BLOGS"
              />
            </ListItem>
          </Link>
          {router.pathname === "/" ? (
            <>
              <ListItem
                button
                onClick={() => {
                  setNav(false);
                  goToSection(1);
                }}
              >
                <ListItemText
                  disableTypography
                  className={styles.list}
                  primary="PRICE LIST"
                />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  setNav(false);
                  goToSection(2);
                }}
              >
                <ListItemText
                  disableTypography
                  className={styles.list}
                  primary="ABOUT"
                />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  setNav(false);
                  goToSection(3);
                }}
              >
                <ListItemText
                  disableTypography
                  className={styles.list}
                  primary="CONTACT"
                />
              </ListItem>
              {user ? (
                <>
                  <Link href={"/profile/[user]"} as={`/profile/${nickName}`}>
                    <ListItem button onClick={() => setNav(false)}>
                      <ListItemText
                        disableTypography
                        className={styles.list}
                        primary={user?.email}
                      />
                    </ListItem>
                  </Link>
                  <ListItem
                    button
                    onClick={() => {
                      setNav(false);
                      Cookies.remove("token");
                      setUser(null);
                    }}
                  >
                    <ListItemText
                      disableTypography
                      className={styles.list}
                      primary="LOGOUT"
                    />
                  </ListItem>
                </>
              ) : (
                <ListItem
                  button
                  onClick={() => {
                    setNav(false);
                    setQuickLogin(!quickLogin);
                  }}
                >
                  <ReactSVG
                    className="icon_login"
                    src="/assets/svg/account-circle.svg"
                  />
                </ListItem>
              )}
            </>
          ) : (
            ""
          )}
        </List>
      </SwipeableDrawer>
    </>
  );

  const menuList = (
    <ul className={"nav-bar"}>
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
        <>
          <li className="button">
            <Link href={"/profile/[user]"} as={`/profile/${nickName}`}>
              <a>{user.email}</a>
            </Link>
          </li>
          <li
            className="button"
            onClick={() => {
              Cookies.remove("token");
              setUser(null);
            }}
          >
            LOG OUT
          </li>
        </>
      ) : (
        <ReactSVG
          src="/assets/svg/account-circle.svg"
          onClick={() => setQuickLogin(!quickLogin)}
        />
      )}
    </ul>
  );

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
        {smallScreen && drawer}

        {!smallScreen && menuList}
      </div>
    </>
  );
};
export default Nav;
