import { withStyles } from "@material-ui/core/styles";
import VisibilityIcon from "@material-ui/icons/Visibility";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Clearfix from "../components/Clearfix/Clearfix";
import FooterLow from "../components/Footer/FooterLow";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import UpperHeader from "../components/Header/UpperHeader";
import NavPills from "../components/NavPills/NavPills";
import Parallax from "../components/Parallax/Parallax";
import ViewDetails from "../components/ProfileComponent/ViewDetails";
import profilePageStyle from "../styles/jss/nextjs-material-kit-pro/pages/profilePageStyle";
function UserDetails(props) {
  const [tabs, setTabs] = useState([]);
  const [activeTabs, setActiveTabs] = useState(0);

  const { classes } = props;

  useEffect(() => {
    setTabs([
      {
        tabButton: "View Details",
        tabIcon: VisibilityIcon,
        tabContent: <ViewDetails />,
      },
    ]);
  }, []);
  //   useEffect(() => {
  //     setTabs([
  //       {
  //         tabButton: 'View Details',
  //         tabIcon: VisibilityIcon,
  //         tabContent: <ViewDetails />
  //       },
  //     ]);
  //   }, []);
  return (
    <div>
      <UpperHeader />
      <Parallax
        image={require("public/img/examples/clark-street-merc.webp")}
        filter="dark"
        className={classes.parallax}
      />
      {props?.getInspectorDetails?.verified && (
        <div
          className={classNames(classes.main, classes.mainRaised)}
          style={{
            backgroundColor: "#e2f0d9",
            padding: "10px",
          }}
        >
          <div className={classes.container}>
            <GridContainer>
              {tabs && (
                <GridItem md={12}>
                  <NavPills
                    alignCenter
                    color="success"
                    tabs={tabs}
                    value={0}
                    active={parseInt(activeTabs)}
                    tabChangeHandler={(activeTab, previousTab, setActive) => {
                      setActive(activeTab);
                    }}
                  />
                </GridItem>
              )}
            </GridContainer>
          </div>
          <Clearfix />
        </div>
      )}
      <br />
      <FooterLow />
    </div>
  );
}

const mapStateToProps = (state) => ({
  getInspectorDetails: state.userReducer.getInspectorDetails,
});

export default connect(
  mapStateToProps,
  null
)(withStyles(profilePageStyle)(UserDetails));
