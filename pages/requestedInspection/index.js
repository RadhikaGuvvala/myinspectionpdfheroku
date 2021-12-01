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
import PublishIcon from "@material-ui/icons/Publish";
import InfoIcon from "@material-ui/icons/Info";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Slide,
  TextareaAutosize,
  TextField,
  Tooltip,
} from "@material-ui/core";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";
import { loaderHide, loaderShow } from "../../lib/loaderHideShow";
const style = {
  ...styles,
  ...productStyle,
};
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

const RequestInspection = (props) => {
  const [requestInspection, setRequestInspection] = useState([]);
  const [bidInspectionValues, setBidInspectionValues] = useState({
    bidAmount: "",
    quotation: "",
  });
  const [bidInspectionId, setBidInspectionId] = useState("");
  const [modals, setModals] = useState({ viewModal: false, applyModal: false });
  const [showData, setShowData] = useState({});
  const { classes } = props;
  const dispatch = useDispatch();

  const getParticularRequestedInspections = async () => {
    loaderShow();
    const resultOne = await dispatch(getAllRequestedInspection());
    const resultTwo = await dispatch(getAllBidInspections());
    if (props.getInspectorDetails) {
      const inspectorId = props.getInspectorDetails._id
        ? props.getInspectorDetails._id
        : props.getInspectorReducer._id;
      setRequestInspection(
        resultOne.data.filter(
          (dataOne, indexOne, arrOne) =>
            resultTwo.data.filter(
              (dataTwo) =>
                dataOne._id === dataTwo.projectId &&
                inspectorId === dataTwo.inspectorId
            ).length <= 0
        )
      );
    }
    loaderHide();
  };

  useEffect(() => {
    getParticularRequestedInspections();
  }, [props.getInspectorDetails]);

  const handleSubmit = async () => {
    loaderShow();
    const inspectorDetails = props.getInspectorDetails;
    inspectorDetails.inspectorId1 = inspectorDetails._id
      ? inspectorDetails._id
      : props.getInspectorReducer._id;
    // delete inspectorDetails._id;
    bidInspectionValues.projectId1 = bidInspectionId;
    const result = await dispatch(
      saveBidInspection({ ...inspectorDetails, ...bidInspectionValues })
    );
    if (result) {
      setBidInspectionValues({
        bidAmount: "",
        quotation: "",
      });
      setBidInspectionId("");
      getParticularRequestedInspections();
      setModals({ ...modals, applyModal: false });
      toast.success("Bid placed successfully");
    } else {
      console.log("err");
    }
    loaderHide();
  };

  const handleChange = (event) => {
    setBidInspectionValues({
      ...bidInspectionValues,
      [event.target.name]: event.target.value.trimStart(),
    });
  };

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
                <h1 className={classes.title}> Requested Inspections</h1>
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
            {requestInspection.length > 0 ? (
              <>
                {requestInspection.map((data, i) => {
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
                          <GridItem md={5} sm={12}>
                            <h3 className="first-lc">
                              {data.inspectionObject}
                            </h3>

                            <h5 className="innerTitile">
                              {data.inspectionType}
                            </h5>
                            {data.description && (
                              <h5 className={classes.innertitlesection}>
                                {data.description}
                              </h5>
                            )}
                            {data.suggestion && (
                              <p className={classes.innertitlesection}>
                                {data.suggestion}
                              </p>
                            )}
                            <div>
                              {/* {data.inspectionDescription && (
                                <>
                                  <span
                                    className={
                                      (classes.title, classes.noMarginOne)
                                    }
                                  >
                                    {data.inspectionDescription}
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
                          <GridItem md={4} sm={12}>
                            {props.getInspectorDetails &&
                              props.getInspectorDetails.activate && (
                                <Tooltip
                                  id="tooltip-top"
                                  title="Apply"
                                  placement="top"
                                  className="float-md-right mx-md-2"
                                  // classes={{ tooltip: classes.tooltip }}
                                >
                                  <Button
                                    color="success"
                                    round
                                    justIcon
                                    className="float-md-right mx-md-2"
                                    onClick={() => {
                                      setBidInspectionId(data._id);
                                      setModals({
                                        ...modals,
                                        applyModal: true,
                                      });
                                    }}
                                  >
                                    <PublishIcon />
                                  </Button>
                                </Tooltip>
                              )}

                            <Tooltip
                              id="tooltip-top"
                              title="Info"
                              placement="top"
                              className="float-md-right mx-md-2"
                              // classes={{ tooltip: classes.tooltip }}
                            >
                              <Button
                                color="success"
                                round
                                justIcon
                                className="float-md-right"
                                onClick={() => {
                                  setBidInspectionId(data._id);
                                  setModals({ ...modals, viewModal: true });
                                  setShowData(data);
                                }}
                              >
                                <InfoIcon />
                              </Button>
                            </Tooltip>
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
                  <h2 className={classes.title}>
                    No requested inspection found
                  </h2>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </div>
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.paper2,
        }}
        fullWidth={true}
        open={modals.applyModal}
        onClose={() => (
          <>
            {setBidInspectionValues({
              bidAmount: "",
              quotation: "",
            })}
            {setModals({ ...modals, applyModal: false })}
          </>
        )}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <CustomDialog
          color="success"
          close={() => {
            setBidInspectionValues({
              bidAmount: "",
              quotation: "",
            });
            setModals({ ...modals, applyModal: false });
          }}
        >
          <h3 className={classes.textTransform}>Create Your Catalogue</h3>
        </CustomDialog>

        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <GridContainer>
            <Card plain className={classes.cardClasses}>
              <CardBody formHorizontal plain>
                <GridContainer>
                  <GridItem xs={12} sm={4} md={4}>
                    <h5>
                      <strong>Bid</strong>{" "}
                    </h5>
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={8}
                    md={8}
                    className={classes.alignItemsCenter}
                  >
                    <TextField
                      style={{ margin: "10px 0px" }}
                      label={"Bid Amout"}
                      aria-label="minimum height"
                      error={
                        !bidInspectionValues.bidAmount ||
                        bidInspectionValues.bidAmount.length < 2
                      }
                      name="bidAmount"
                      placeholder="Bid Amount"
                      helperText={
                        !bidInspectionValues.bidAmount ||
                        bidInspectionValues.bidAmount.length < 2
                          ? "Required"
                          : ""
                      }
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        inputComponent: NumberFormatCustom,
                      }}
                      value={bidInspectionValues.bidAmount}
                      onChange={handleChange}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={4} md={4}>
                    <h5>
                      <strong>Quotation</strong>{" "}
                    </h5>
                  </GridItem>
                  <GridItem
                    xs={12}
                    sm={8}
                    md={8}
                    className={classes.alignItemsCenter}
                  >
                    <TextareaAutosize
                      style={{
                        margin: "10px 0px",
                        borderRadius: "6px",
                        width: "100%",
                      }}
                      label={"Quotation"}
                      name="quotation"
                      aria-label="minimum height"
                      rowsMin={5}
                      className="description-text pl-2 py-2"
                      placeholder={"Quotation"}
                      variant="outlined"
                      value={bidInspectionValues.quotation}
                      onChange={handleChange}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridContainer>
        </DialogContent>
        <DialogActions>
          <Button
            color="success"
            onClick={handleSubmit}
            disabled={
              bidInspectionValues.bidAmount == "" ||
              bidInspectionValues.bidAmount.length < 2
            }
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        classes={{
          root: classes.modalRoot,
          paper: classes.paper2,
        }}
        fullWidth={true}
        open={modals.viewModal}
        onClose={() => <>{setModals({ ...modals, viewModal: false })}</>}
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="classic-modal-slide-title"
        aria-describedby="classic-modal-slide-description"
      >
        <CustomDialog
          color="success"
          close={() => {
            setModals({ ...modals, viewModal: false });
          }}
        >
          <h3 className={classes.textTransform}>Info</h3>
        </CustomDialog>

        <DialogContent
          id="classic-modal-slide-description"
          className={classes.modalBody}
        >
          <GridContainer>
            <Card plain className={classes.cardClasses}>
              <CardBody formHorizontal plain>
                {showData && showData.inspectionObject && (
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <th scope="row">Project Name</th>
                          <td>{showData.inspectionObject}</td>
                        </tr>
                        <tr>
                          <th scope="row">Inspection Type</th>
                          <td>{showData.inspectionType}</td>
                        </tr>
                        <tr>
                          {showData.AddressMain &&
                            showData.AddressMain.domain &&
                            (showData.AddressMain.domain === "House" ? (
                              <>
                                <th scope="row">Address</th>
                                <td>
                                  {`${showData.AddressMain.address_line1} ${showData.AddressMain.address_line2} ${showData.AddressMain.city} ${showData.AddressMain.state} ${showData.AddressMain.country} ${showData.AddressMain.zip}`}
                                </td>
                              </>
                            ) : showData.AddressMain.domain == "Boat" ? (
                              <>
                                <th scope="row">Official Details</th>
                                <td>
                                  {`${showData.AddressMain.vessel_name} ${showData.AddressMain.vessel_oficial} ${showData.AddressMain.vessel_hull}`}
                                </td>
                              </>
                            ) : (
                              ""
                            ))}
                        </tr>
                        {showData.attributes &&
                          (showData.inspectionType == "Boat" ? (
                            <tr>
                              <th scope="row">Attributes</th>
                              <td>
                                <div className="row">
                                  <div className="col-md-4 col-sm-6">
                                    <b>Length : </b>
                                    {showData.attributes.length}
                                  </div>

                                  <div className="col-md-4 col-sm-6">
                                    <b>Fuel Type : </b>
                                    {showData.attributes.fuel_type}
                                  </div>
                                  <div className="col-md-4 col-sm-6">
                                    <b>Hull Material : </b>
                                    {showData.attributes.hull_material}
                                  </div>
                                  <div className="col-md-4 col-sm-6">
                                    <b>Model : </b>
                                    {showData.attributes.model}
                                  </div>
                                  <div className="col-md-4 col-sm-6">
                                    <b>Class : </b>
                                    {showData.attributes.class}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ) : (
                            <tr>
                              <th scope="row">Attributes</th>
                              <td>
                                <div className="row">
                                  <div className="col-md-4 col-sm-6">
                                    <b>BedRooms : </b>
                                    {showData.attributes.bedrooms}
                                  </div>

                                  <div className="col-md-4 col-sm-6">
                                    <b>BathRooms : </b>
                                    {showData.attributes.bathrooms}
                                  </div>
                                  <div className="col-md-4 col-sm-6">
                                    <b>Square Footage : </b>
                                    {showData.attributes.square_footage}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}

                        {/* {showData.inspectionDescription && (
                          <tr>
                            <th scope="row">Inspection Description</th>
                            <td>{showData.inspectionDescription}</td>
                          </tr>
                        )} */}
                        {showData.description && (
                          <tr>
                            <th scope="row">Description</th>
                            <td>{showData.description}</td>
                          </tr>
                        )}
                        {showData.suggestion && (
                          <tr>
                            <th scope="row">Suggestion</th>
                            <td>{showData.suggestion}</td>
                          </tr>
                        )}
                        <tr>
                          <th scope="row">Created For</th>
                          <td>
                            {showData.createdBy && (
                              <span>{showData.createdBy}</span>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </CardBody>
            </Card>
          </GridContainer>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <FooterLow />
    </>
  );
};
NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  getInspectorDetails: state.userReducer.getInspectorDetails,
  getInspectorReducer: state.getInspectorReducer.getInspector,
});
export default connect(mapStateToProps)(withStyles(style)(RequestInspection));
