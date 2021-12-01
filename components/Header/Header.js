import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import { Close, Menu as Menuicon } from "@material-ui/icons/";
import Drawer from "@material-ui/core/Drawer";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ShopTwoIcon from "@material-ui/icons/ShopTwo";
import StorefrontIcon from "@material-ui/icons/Storefront";
import AccountBox from "@material-ui/icons/AccountBox";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown";

import Toolbar from "@material-ui/core/Toolbar";
import axios from "axios";
import Link from "next/link";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import Image from "next/image";
import Router from "next/router";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import React from "react";
import { connect, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import logo from "../../public/img/logo.webp";
import { logoutInspector } from "../../redux/action/action";
// core components
import styles from "../../styles/jss/nextjs-material-kit-pro/components/headerStyle.js";

const useStyles = makeStyles(styles);

function Header(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [logout, setLogout] = React.useState(false);

  //dropdown content
  const { dropdownHoverColor } = "primary";

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  const dispatch = useDispatch();

  const logoutfunction = async () => {
    const result = await dispatch(logoutInspector());
    if (result === true) {
      localStorage.removeItem("token");
      delete axios.defaults.headers.Authorization;
      toast.success("Logged out successfully!!!");
      Router.push("/login");
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.Authorization;
      toast.success("Logged out successfully!!!");
      Router.push("/login");
      console.log("error");
    }
  };
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      setLogout(true);
    } else {
      setLogout(false);
      console.log(!Router.router.pathname.includes("/signup"));
      if (
        !Router.router.pathname.includes("/signup") &&
        !Router.router.pathname.includes("/forgot-password") &&
        !Router.router.pathname.includes("/update-password")
      ) {
        Router.push("/login");
      }
    }
  }, []);
  React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const headerColorChange = () => {
    const { color, changeColorOnScroll } = props;

    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > 10) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
      if (document.getElementById("buttonid1")) {
        document
          .getElementById("buttonid1")
          .setAttribute("style", "color:black");
      }
      if (document.getElementById("buttonid2")) {
        document
          .getElementById("buttonid2")
          .setAttribute("style", "color:black");
      }
      if (document.getElementById("custom")) {
        document.getElementById("custom").setAttribute("style", "color:black");
      }
      if (document.getElementById("custom1")) {
        document.getElementById("custom1").setAttribute("style", "color:black");
      }
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
      if (document.getElementById("buttonid1")) {
        document
          .getElementById("buttonid1")
          .setAttribute("style", "color:white");
      }
      if (document.getElementById("buttonid2")) {
        document
          .getElementById("buttonid2")
          .setAttribute("style", "color:white");
      }
      if (document.getElementById("custom")) {
        document.getElementById("custom").setAttribute("style", "color:white");
      }
      if (document.getElementById("custom1")) {
        document.getElementById("custom1").setAttribute("style", "color:white");
      }
    }
  };
  const { color, links, brand, fixed, absolute } = props;
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed,
  });
  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container} style={{ maxWidth: "95%" }}>
        <div className={classes.title}>
          {/* <a href="https://go-regi.com"> */}
          <Image src={logo} alt="" id="logo" width={100} height={65} />
          {/* </a> */}
        </div>
        <div className={classes.forDesktop}>
          <div className={classes.collapse}>
            {logout && (
              <>
                {props.getInspectorDetails && (
                  <div className={classes.title}>{links}</div>
                )}
              </>
            )}
          </div>
        </div>
      </Toolbar>
      <div className={classes.forMobile}>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menuicon />
          </IconButton>
        </Hidden>
        <Hidden mdUp implementation="js">
          <Drawer
            variant="temporary"
            anchor={"right"}
            open={mobileOpen}
            classes={{
              paper: classes.drawerPaper,
            }}
            onClose={handleDrawerToggle}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              className={classes.closeButtonDrawer}
            >
              <Close />
            </IconButton>
            <div className={classes.appResponsive}>
              {logout && (
                <>
                  {props.getInspectorDetails && (
                    <div>
                      {/* <div
                        style={{
                          color: "black",
                          fontWeight: "bold",
                        }}
                        className={classes.title + "row "}
                      >
                        Hii {props.getInspectorDetails.firstName}!
                      </div>
                      <div className="m-1 row">
                        <Button
                          className={classes.title}
                          style={{
                            marginLeft: "20px",
                            backgroundColor: "#0C9479",
                            color: "white",
                          }}
                          onClick={logoutfunction}
                        >
                          <a style={{ fontWeight: "800" }}>Logout</a>
                        </Button>
                      </div> */}
                      {/*<List
                        component="nav"
                        subheader={
                          <ListSubheader
                            component="h1"
                            style={{
                              color: "black",
                              // backgroundColor: "#0C9479",
                              fontWeight: "800",
                            }}
                          >
                             Welcome to Inspection Center
                          </ListSubheader>
                        }
                      >
                        <Divider />
                       <ListItem button>
                          <ListItemIcon>
                            <PersonIcon />
                          </ListItemIcon>
                          <ListItemText primary="Profile" />
                        </ListItem>
                        <ListItem button>
                          <ListItemIcon>
                            <AccountCircleIcon />
                          </ListItemIcon>
                          <ListItemText primary="Account" />
                        </ListItem>
                        <ListItem
                          button
                          style={{
                            backgroundColor: "#0C9479",
                            color: "white",
                            borderRadius: "10px",
                          }}
                          onClick={logoutfunction}
                        >
                          <ListItemIcon>
                            <ExitToAppIcon />
                          </ListItemIcon>
                          <ListItemText primary="Log Out" />
                        </ListItem>
                        <Divider />
                        <ListItem button href="/requestedInspection">
                          <ListItemIcon>
                            <PersonIcon />
                          </ListItemIcon>
                          <ListItemText primary="requested Inspection" />
                        </ListItem> 
                      </List>*/}
                      <h3>Hello Welcome</h3>
                      {links}
                    </div>
                  )}
                </>
              )}
            </div>
          </Drawer>
        </Hidden>
      </div>
    </AppBar>
  );
}

Header.defaultProp = {
  color: "white",
};

Header.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark",
  ]),
  links: PropTypes.node,
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark",
    ]).isRequired,
  }),
};

const mapStateToProps = (state) => ({
  getInspectorDetails: state.userReducer.getInspectorDetails,
});

export default connect(mapStateToProps)(Header);
