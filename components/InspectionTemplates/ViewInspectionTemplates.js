import { withStyles } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import styles from "../../styles/jss/nextjs-material-kit-pro/pages/ecommerceStyle";
import productStyle from "../../styles/jss/nextjs-material-kit-pro/pages/landingPageSections/productStyle";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import AccordionView from "./AccordionView";

const style = {
  ...styles,
  ...productStyle,
};
const ViewInspectionTemplates = (props) => {
  const { baseInspections, classes } = props;

  return (
    <>
      <div
        className={classNames(classes.main, classes.mainRaised)}
        style={{
          backgroundColor: "#e2f0d9",
          padding: "10px",
        }}
      >
        <div className={classNames(classes.container, classes.pricingDiv)}>
          <div className={classes.innerDiv}>
            {baseInspections.length > 0 ? (
              <>
                <Card>
                  <CardBody>
                    <h2 className={classes.title}>
                      You can use these templates and add it your inspections.
                    </h2>
                    {baseInspections.map((baseInspection, baseIndex) => (
                      <AccordionView
                        key={baseInspection._id}
                        baseInspection={baseInspection}
                        baseIndex={baseIndex}
                      />
                    ))}
                  </CardBody>
                </Card>
              </>
            ) : (
              <Card>
                <CardBody>
                  <h2 className={classes.title}>No inspection found</h2>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  getInspectorDetails: state.userReducer.getInspectorDetails,
});

export default connect(mapStateToProps)(
  withStyles(style)(ViewInspectionTemplates)
);
