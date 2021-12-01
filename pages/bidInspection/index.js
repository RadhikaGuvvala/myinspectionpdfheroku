import React from "react";
import Image from "next/image";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import FooterLow from "../../components/Footer/FooterLow";
import UpperHeader from "../../components/Header/UpperHeader";
import Parallax from "../../components/Parallax/Parallax.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import Button from "../../components/CustomButtons/Button.js";
import noImage from "../../public/img/no-image.webp";
import styles from "../../styles/jss/nextjs-material-kit-pro/pages/ecommerceStyle";
import productStyle from "../../styles/jss/nextjs-material-kit-pro/pages/landingPageSections/productStyle";
import {
  getAllBidInspections,
  getAllRequestedInspection,
  saveBidInspection,
} from "../../redux/action/action";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";
import { loaderHide, loaderShow } from "../../lib/loaderHideShow";
const style = {
  ...styles,
  ...productStyle,
};
const BidInspection = (props) => {
  const [bidInspection, setBidInspection] = useState([]);
  const { classes } = props;
  const dispatch = useDispatch();

  const getParticularBidInspections = async () => {
    loaderShow();
    setBidInspection([]);
    const resultOne = await dispatch(getAllRequestedInspection());
    const resultTwo = await dispatch(getAllBidInspections());
    if (props.getInspectorDetails) {
      const inspectorId = props.getInspectorDetails._id
        ? props.getInspectorDetails._id
        : props.getInspectorReducer._id;
      const pushArray = [];
      resultOne.data.map((dataOne, indexOne, arrOne) => {
        const tempD = resultTwo.data.filter(
          (dataTwo) =>
            dataOne._id === dataTwo.projectId &&
            inspectorId === dataTwo.inspectorId
        );
        tempD.length > 0 ? pushArray.push({ ...dataOne, ...tempD[0] }) : null;
        return "";
      });
      setBidInspection(pushArray);
    }
    loaderHide();
  };

  useEffect(() => {
    getParticularBidInspections();
  }, [props.getInspectorDetails]);

  return (
    <>
      <UpperHeader />
      <Parallax
        image={require("../../public/img/examples/clark-street-merc.webp")}
        filter="dark"
        small
        style={{ minHeight: "400px" }}
      >
        <div className={classes.container}>
          <GridContainer>
            <GridItem
              md={12}
              sm={12}
              className={classNames(
                classes.mlAuto,
                classes.mrAuto,
                classes.textCenter
              )}
            >
              <div className={classes.brand}>
                <h1 className={classes.title}> Bid Inspections</h1>
                <GridContainer></GridContainer>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div
        className={classNames(classes.main, classes.mainRaised)}
        style={{
          backgroundColor: "#e2f0d9",
          padding: "10px",
        }}
      >
        <div className={classNames(classes.container, classes.pricingDiv)}>
          <div className={classes.innerDiv}>
            {bidInspection.length > 0 ? (
              <>
                {bidInspection.map((data, i) => {
                  return (
                    <Card key={i}>
                      <CardBody>
                        <GridContainer>
                          <GridItem md={3} sm={12}>
                            <div className={classes.imageSectionOne}>
                              <Image
                                src={
                                  data.questionImage
                                    ? data.questionImage
                                    : noImage
                                }
                                alt=""
                                width={100}
                                height={75}
                              />
                            </div>
                          </GridItem>
                          <GridItem md={9} sm={12}>
                            <div className="row">
                              <div className="col-md-6 col-sm-12">
                                <h3 className="first-lc">
                                  {data.inspectionObject}
                                </h3>

                                <h5 className="innerTitile">
                                  {data.inspectionType}
                                </h5>
                              </div>
                              <div className="col-md-6 col-sm-12">
                                <div className="d-md-flex flex-row-reverse">
                                  <h5 className="innerTitile">
                                    Bid Amount : ${" "}
                                    {parseInt(
                                      data.bidAmount,
                                      10
                                    ).toLocaleString()}
                                  </h5>
                                </div>
                              </div>
                            </div>

                            {data.attributes && (
                              <p className={classes.innertitlesection}>
                                {data.attributes &&
                                  (data.inspectionType == "Boat" ? (
                                    <div className="row">
                                      <div className="col-md-4 col-sm-6">
                                        <b>Length : </b>
                                        {data.attributes.length}
                                      </div>

                                      <div className="col-md-4 col-sm-6">
                                        <b>Fuel Type : </b>
                                        {data.attributes.fuel_type}
                                      </div>
                                      <div className="col-md-4 col-sm-6">
                                        <b>Hull Material : </b>
                                        {data.attributes.hull_material}
                                      </div>
                                      <div className="col-md-4 col-sm-6">
                                        <b>Model : </b>
                                        {data.attributes.model}
                                      </div>
                                      <div className="col-md-4 col-sm-6">
                                        <b>Class : </b>
                                        {data.attributes.class}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="row">
                                      <div className="col-md-4 col-sm-6">
                                        <b>BedRooms : </b>
                                        {data.attributes.bedrooms}
                                      </div>

                                      <div className="col-md-4 col-sm-6">
                                        <b>BathRooms : </b>
                                        {data.attributes.bathrooms}
                                      </div>
                                      <div className="col-md-4 col-sm-6">
                                        <b>Square Footage : </b>
                                        {data.attributes.square_footage}
                                      </div>
                                    </div>
                                  ))}
                              </p>
                            )}
                            {data.description && (
                              <p className={classes.innertitlesection}>
                                {data.description}
                              </p>
                            )}
                            <div>
                              {/* {data.ownerDetails && (
                                <>
                                  <span
                                    className={
                                      (classes.title, classes.noMarginOne)
                                    }
                                  >
                                    Owner Details:- {data.ownerDetails.ownerName},{data.ownerDetails.ownerEmail},{data.ownerDetails.ownerPhone}
                                  </span>
                                  <br />
                                </>
                              )} */}
                              <span
                                className={(classes.title, classes.titleInner)}
                                style={{ fontSize: "12px" }}
                              >
                                Prepared for: - {data.createdBy}
                              </span>
                            </div>
                          </GridItem>
                        </GridContainer>
                      </CardBody>
                    </Card>
                  );
                })}
                {/* </>
                  )} */}
              </>
            ) : (
              <Card>
                <CardBody>
                  <h2 className={classes.title}>No bid inspection found</h2>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>
      <FooterLow />
    </>
  );
};
const mapStateToProps = (state) => ({
  getInspectorDetails: state.userReducer.getInspectorDetails,
  getInspectorReducer: state.getInspectorReducer.getInspector,
});
export default connect(mapStateToProps)(withStyles(style)(BidInspection));
