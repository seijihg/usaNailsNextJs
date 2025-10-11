import { FunctionComponent, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

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
  const iOS = typeof window !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const [smallScreen, setSmallScreen] = useState<boolean>(false);
  const [nav, setNav] = useState<boolean>(false);

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
        <Link href="/">HOME</Link>
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
    </ul>
  );

  return (
    <>
      <div className="nav-main">
        <Link href="/">
          <img
            className="index-logo"
            src="/assets/img/usanails_logo_ver2.png"
            alt="usa nails logo"
          />
        </Link>
        {smallScreen && drawer}

        {!smallScreen && menuList}
      </div>
    </>
  );
};
export default Nav;
