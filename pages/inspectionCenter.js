import React, { Component } from "react";
/*eslint-disable*/
// nodejs library that concatenates classes
import classNames from "classnames";
import publicIp from "public-ip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Slide from "@material-ui/core/Slide";
// core components
import Parallax from "../components/Parallax/Parallax.js";
import FooterLow from "../components/Footer/FooterLow";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Button from "../components/CustomButtons/Button.js";
import addthumbnail from "../Documentation/assets/img/add-thumbnail.webp";

import { connect } from "react-redux";
import { toast } from "react-toastify";
// sections for this page
// import presentationStyle from "styles/jss/nextjs-material-kit-pro/pages/presentationStyle.js";
import { withStyles } from "@material-ui/core/styles";
import UpperHeader from "../components/Header/UpperHeader";
import TextField from "@material-ui/core/TextField";
import noImage from "../public/img/no-image.webp";
import Image from "next/image";
import Card from "../components/Card/Card";
import CardBody from "../components/Card/CardBody";
import CustomDialog from "../components/CustomDialog/CustomDialog";
import styles from "../styles/jss/nextjs-material-kit-pro/pages/ecommerceStyle";
import productStyle from "../styles/jss/nextjs-material-kit-pro/pages/landingPageSections/productStyle";
import {
  editInspectionObservation,
  getInspectioncenter,
  uploadimage,
} from "../redux/action/action";
import Compress from "compress.js";
import {
  IconButton,
  InputAdornment,
  TextareaAutosize,
} from "@material-ui/core";
import { Clear, Search } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import { loaderHide, loaderShow } from "../lib/loaderHideShow.js";
import InfoIcon from "@material-ui/icons/Info";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
const style = {
  ...styles,
  ...productStyle,
};
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
// const useStyles = makeStyles(presentationStyle);
// export async function getServerSideProps(context) {
//   try {
//     await middleware.apply(context.req, context.res);
//     const p = await getAllInspectionCollection(context.req);
//     if (!p) context.res.statusCode = 404;
//     else {
//       if (p ? p.length : 0 > 0) {
//         p.sort(function (a, b) {
//           return a.outersortId - b.outersortId;
//         });
//         p.forEach((element, index) => {
//           element.id = index;
//         });
//       }
//       return {
//         props: {
//           CollectionData: JSON.stringify(p) ? JSON.stringify(p) : {},
//         },
//       };
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }

class InspectionCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      // inspectionCollection: JSON.parse(props.CollectionData)
      //   ? JSON.parse(props.CollectionData)
      //   : [],
      inspectionCollection: undefined,
      loading: true,
      SearchData: "",
      editModal: false,
      inspectionId: "",
      inspectionObject: "",
      inspectionType: "",
      description: "",
      suggestion: "",
      questionImage: "",
      selectedDateFrom: "",
      selectedDateTo: "",
      inspectionObjectAge: "",
      weather: "",
      createdfor: "",
      observation: "",
      scope: "",
    };
    this.filter = {
      limit: 1000,
      pageNumber: 1,
      isSearching: false,
      searchingData: "",
      status: "",
    };
  }
  // validateNumber = (str) => {
  //   const re = /[0-9]+/;
  //   console.log(re.test(String(str)));
  //   return re.test(String(str));
  // };
  static getDerivedStateFromProps(props, state) {
    if (props.getInspectorDetails) {
      return {
        inspectorDetails: props.getInspectorDetails,
      };
    }
  }

  componentDidMount() {
    if (
      this.state.inspectionCollection == undefined &&
      this.state.inspectorDetails
    ) {
      this.filter.inspectorId = this.state.inspectorDetails._id;
      this.getInspectionCenterQuestion();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.inspectionCollection === undefined &&
      this.state.inspectorDetails
    ) {
      this.filter.inspectorId = this.state.inspectorDetails._id;
      this.getInspectionCenterQuestion();
      !this.state.inspectorDetails.activate &&
        (this.state.inspectorDetails.licenseImg
          ? toast.info("It can take upto 72 hrs to verify your details")
          : toast.info(
              "Your application is in review. Please add the licnese Image"
            ));
    }
  }

  removeThumbnail = (e) => {
    this.setState({
      setQuestionImage: undefined,
    });
  };

  uploadThumbnail = (e) => {
    if (e.target.files[0]) {
      this.setState({
        setQuestionImage: {
          resumeName: e.target.files[0].name,
          resumeDetails: e.target.files[0],
          fileurl: URL.createObjectURL(e.target.files[0]),
          fileType: e.target.files[0].type.split("/")[0],
        },
      });
    }
  };

  editObservation = async (e) => {
    if (
      this.state.setQuestionImage &&
      this.state.setQuestionImage.resumeDetails
    ) {
      const compress = new Compress();
      const resizedImage = await compress.compress(
        [this.state.setQuestionImage.resumeDetails],
        {
          size: 1, // the max size in MB, defaults to 2MB
          quality: 0.75, // the quality of the image, max is 1,
        }
      );
      const img = resizedImage[0];
      const base64str = img.data;
      const imgExt = img.ext;
      this.resizedFiile = Compress.convertBase64ToFile(base64str, imgExt);
      let val = await this.props.dispatch(
        uploadimage(this.resizedFiile, this.props.history)
      );
      if (val.data && val.data.result && val.data.result.name) {
        this.setState({
          questionImage: `https://${process.env.azureAccountName}.blob.core.windows.net/${process.env.AZURE_CONTAINER}/${val.data.result.name}`,
        });
      }
    }
    const data = {
      _id: this.state.inspectionId,
      selectedDateFrom: this.state.selectedDateFrom,
      selectedDateTo: this.state.selectedDateTo,
      inspectionObjectAge: this.state.inspectionObjectAge,
      questionImage: this.state.questionImage,
      weather: this.state.weather,
      observation: this.state.observation,
      scope: this.state.scope,
    };
    const res = await this.props.dispatch(editInspectionObservation(data));
    if (res) {
      this.setState({
        inspectionId: "",
        inspectionObject: "",
        questionImage: "",
        observation: "",
        inspectionObjectAge: "",
        selectedDateFrom: "",
        selectedDateTo: "",
        weather: "",
        scope: "",
        editModal: false,
      });
      toast.success("Successfully updated");
      this.getInspectionCenterQuestion();
    } else {
      console.log("err");
    }
  };

  handleSearch = (e) => {
    this.filter.searchingData = this.state.SearchData;
    this.filter.isSearching = this.filter.searchingData ? true : false;
    this.getInspectionCenterQuestion();
  };

  clearData = async (e) => {
    this.setState({ SearchData: "" });
    this.filter.searchingData = "";
    this.getInspectionCenterQuestion();
  };

  getInspectionCenterQuestion = async () => {
    loaderShow();
    var data = {
      filter: this.filter,
    };
    let result = await this.props.dispatch(getInspectioncenter(data));
    if (result) {
      if (result.data ? result.data.length : 0 > 0) {
        result.data.sort(function (a, b) {
          return a.outersortId - b.outersortId;
        });
      }
      result.data.forEach((element, index) => {
        element.id = index + 1;
      });
      this.ordertemparray = result.data;
      this.setState({
        inspectionCollection: this.ordertemparray ? this.ordertemparray : [],
      });
    }
    loaderHide();
  };

  openEditModal = (data) => {
    this.setState({
      inspectionId: data._id,
      inspectionObject: data.inspectionObject,
      questionImage: data.questionImage ? data.questionImage : "",
      weather: data.weather ? data.weather : "",
      inspectionObjectAge: data.inspectionObjectAge
        ? data.inspectionObjectAge
        : "",
      scope: data.scope ? data.scope : "",
      observation: data.observation ? data.observation : "",
      selectedDateFrom: data.selectedDateFrom ? data.selectedDateFrom : "",
      selectedDateTo: data.selectedDateTo ? data.selectedDateTo : "",
      editModal: true,
    });
  };

  openViewModal = (data) => {
    this.setState({
      inspectionId: data._id,
      inspectionObject: data.inspectionObject,
      inspectionType: data.inspectionType,
      description: data.description,
      questionImage: data.questionImage,
      suggestion: data.suggestion,
      createdfor: data.createdBy,
      observation: data.observation,
      scope: data.scope ? data.scope : "",
      showModal: true,
    });
  };

  // disableInUse = () => {
  //   console.log(" publicIp.v4()", publicIp.v4());
  // };

  render() {
    // const classes = useStyles();
    const { classes } = this.props;

    return (
      <div>
        <UpperHeader />
        <Parallax
          image={require("../public/img/examples/clark-street-merc.webp")}
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
                  <h1 className={classes.title}>Inspection Center</h1>
                  <GridContainer justify="center">
                    <GridItem md={1} sm={1}></GridItem>
                    <GridItem md={10} sm={10}>
                      <div style={{ display: "flex" }}>
                        <TextField
                          placeholder={"Search for inspections..."}
                          style={{ backgroundColor: "white" }}
                          variant="outlined"
                          fullWidth
                          InputProps={{
                            value: this.state.SearchData,
                            onKeyPress: (e) => {
                              if (e.key === "Enter") {
                                this.handleSearch();
                              }
                            },
                            onChange: (e) => {
                              this.setState({
                                SearchData: e.target.value.trimStart(),
                              });
                            },

                            endAdornment: this.state.SearchData.length > 0 && (
                              <InputAdornment position="end">
                                <Tooltip
                                  id="tooltip-down"
                                  title="clear"
                                  placement="bottom-end"
                                >
                                  <IconButton
                                    onClick={this.clearData}
                                    // {() =>
                                    //   this.setState({ SearchData: "" })
                                    // }
                                  >
                                    <Clear />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip
                                  id="tooltip-down"
                                  title="search"
                                  placement="bottom-end"
                                >
                                  <IconButton onClick={this.handleSearch}>
                                    <Search />
                                  </IconButton>
                                </Tooltip>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    </GridItem>
                    <GridItem md={1} sm={1}></GridItem>
                  </GridContainer>

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
              {this.state.inspectionCollection &&
              this.state.inspectionCollection.length > 0 ? (
                <>
                  {this.state.inspectionCollection.map((data, i) => {
                    return (
                      <Card key={i}>
                        <CardBody>
                          <GridContainer>
                            <GridItem md={3} sm={12}>
                              <a href={`/inspectionCenter/${data._id}`}>
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
                              </a>
                            </GridItem>
                            <GridItem md={5} sm={12}>
                              <a href={`/inspectionCenter/${data._id}`}>
                                {/* {data.isCritical ? (
                                  <h3
                                    className="first-lc"
                                    style={{ color: "#FF5733" }}
                                  >
                                    {data.heading}
                                  </h3>
                                ) : (
                                  <h3 className="first-lc">{data.heading}</h3>
                                )} */}
                                <h3 className="first-lc">
                                  {data.inspectionObject}
                                </h3>

                                <h5 className="innerTitile">
                                  {data.inspectionType}
                                </h5>
                                {data.description && (
                                  <p className={classes.innertitlesection}>
                                    {data.description}
                                  </p>
                                )}
                                {data.suggestion && (
                                  <p className={classes.innertitlesection}>
                                    {data.suggestion}
                                  </p>
                                )}
                                <div>
                                  <span
                                    className={
                                      (classes.title, classes.noMarginOne)
                                    }
                                  >
                                    {data.AreaArray ? data.AreaArray.length : 0}{" "}
                                    areas in this inspection
                                  </span>
                                  <br />
                                  <span
                                    className={
                                      (classes.title, classes.titleInner)
                                    }
                                    style={{ fontSize: "12px" }}
                                  >
                                    Prepared for: - {data.createdBy}
                                  </span>
                                </div>
                              </a>
                            </GridItem>
                            <GridItem md={4} sm={12}>
                              <Tooltip
                                id="tooltip-top"
                                title="Answer"
                                placement="top"
                                className="float-md-right mx-md-2 ml-2"

                                // classes={{ tooltip: classes.tooltip }}
                              >
                                <Button
                                  color="success"
                                  justIcon
                                  round
                                  onClick={() => this.openEditModal(data)}
                                >
                                  <QuestionAnswerIcon />
                                </Button>
                              </Tooltip>
                              <Tooltip
                                id="tooltip-top"
                                title="Info"
                                placement="top"
                                className="float-md-right mx-md-2 ml-2"
                                // classes={{ tooltip: classes.tooltip }}
                              >
                                <Button
                                  color="success"
                                  justIcon
                                  round
                                  onClick={() => this.openViewModal(data)}
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
                    <h2 className={classes.title}>No inspection found</h2>
                  </CardBody>
                </Card>
              )}
            </div>
          </div>
        </div>
        {/* modal for edit */}
        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.paper2,
          }}
          fullWidth={true}
          open={this.state.showModal}
          onClose={() =>
            this.setState({
              inspectionId: "",
              inspectionObject: "",
              inspectionType: "",
              description: "",
              questionImage: "",
              suggestion: "",
              createdfor: "",
              observation: "",
              scope: "",
              showModal: false,
            })
          }
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <CustomDialog
            color="success"
            close={() => {
              this.setState({
                inspectionId: "",
                inspectionObject: "",
                inspectionType: "",
                description: "",
                questionImage: "",
                suggestion: "",
                createdfor: "",
                observation: "",
                scope: "",
                showModal: false,
              });
            }}
          >
            <h3 className={classes.textTransform}>Inspection Details</h3>
          </CustomDialog>

          <DialogContent
            id="classic-modal-slide-description"
            className={classes.modalBody}
          >
            <GridContainer>
              <Card plain className={classes.cardClasses}>
                {this.state.inspectionObject && (
                  <CardBody formHorizontal plain>
                    <GridContainer>
                      <GridItem xs={12} sm={4} md={4}>
                        <h5>
                          <strong>Inspection Object</strong>{" "}
                        </h5>
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={8}
                        md={8}
                        className={classes.alignItemsCenter}
                      >
                        <label style={{ margin: "10px 0px" }}>
                          {this.state.inspectionObject}
                        </label>
                      </GridItem>

                      <GridItem xs={12} sm={4} md={4}>
                        <h5>
                          <strong>Inspection Type</strong>{" "}
                        </h5>
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={8}
                        md={8}
                        className={classes.alignItemsCenter}
                      >
                        <label style={{ margin: "10px 0px" }}>
                          {this.state.inspectionType}
                        </label>
                      </GridItem>
                      <GridItem xs={12} sm={4} md={4}>
                        <h5>
                          <strong>Inspection Location</strong>{" "}
                        </h5>
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={8}
                        md={8}
                        className={classes.alignItemsCenter}
                      >
                        <label style={{ margin: "10px 0px" }}>
                          {this.state.description}
                        </label>
                      </GridItem>

                      <GridItem xs={12} sm={4} md={4}>
                        <h5>
                          <strong>Any suggestion</strong>{" "}
                        </h5>
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={8}
                        md={8}
                        className={classes.alignItemsCenter}
                      >
                        <label style={{ margin: "10px 0px" }}>
                          {this.state.suggestion &&
                          this.state.suggestion.length > 0
                            ? this.state.suggestion
                            : "No suggestion made"}
                        </label>
                      </GridItem>

                      <GridItem xs={12} sm={4} md={4}>
                        <h5>
                          <strong>Created For</strong>{" "}
                        </h5>
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={8}
                        md={8}
                        className={classes.alignItemsCenter}
                      >
                        <label style={{ margin: "10px 0px" }}>
                          {this.state.createdfor}
                        </label>
                      </GridItem>
                      <GridItem xs={12} sm={4} md={4}>
                        <h5>
                          <strong>Scope</strong>{" "}
                        </h5>
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={8}
                        md={8}
                        className={classes.alignItemsCenter}
                      >
                        <textarea
                          style={{
                            margin: "10px 0px",
                            borderRadius: "6px",
                            width: "100%",
                          }}
                          rows="5"
                          // label={"Scope of Survey"}
                          // aria-label="minimum height"
                          // rowsMin={5}
                          // className="description-text pl-2 py-2"
                          placeholder={"Scope of Survey"}
                          value={this.state?.scope ? this.state.scope : ""}
                          onChange={(e) => {
                            this.setState({
                              scope: e.target.value,
                            });
                          }}
                          // onChange={(e) => {
                          //   this.setState({
                          //     answer: e.target.value,
                          //   });
                          // }}
                        />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                )}
              </Card>
            </GridContainer>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.paper2,
          }}
          fullWidth={true}
          open={this.state.editModal}
          onClose={() =>
            this.setState({
              inspectionObject: "",
              questionImage: "",
              observation: "",
              scope: "",
              selectedDateFrom: "",
              inspectionObjectAge: "",
              selectedDateTo: "",
              weather: "",
              editModal: false,
            })
          }
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <CustomDialog
            color="success"
            close={() => {
              this.setState({
                inspectionObject: "",
                questionImage: "",
                observation: "",
                selectedDateFrom: "",
                selectedDateTo: "",
                weather: "",
                inspectionObjectAge: "",
                scope: "",
                editModal: false,
              });
            }}
          >
            <h3 className={classes.textTransform}>
              {this.state.inspectionObject} Details
            </h3>
          </CustomDialog>

          <DialogContent
            id="classic-modal-slide-description"
            className={classes.modalBody}
          >
            <GridContainer>
              <Card plain className={classes.cardClasses}>
                {this.state.inspectionObject && (
                  <CardBody formHorizontal plain>
                    <GridContainer>
                      <GridItem xs={12} sm={4} md={4}>
                        <h5>
                          <strong>
                            {this.props.getInspectorDetails
                              ? `${this.props.getInspectorDetails.inspectionSpecialities} Image`
                              : "Image"}
                          </strong>
                          <sup className="required" style={{ color: "red" }}>
                            *
                          </sup>
                        </h5>
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={8}
                        md={8}
                        className={classes.alignItemsCenter}
                      >
                        <div className="col-12 col-md-6">
                          {this.state.questionImage.length > 0 ||
                          this.state.setQuestionImage ? (
                            <div
                              className="thumb-preview text-center"
                              style={{ height: "auto" }}
                            >
                              <>
                                {" "}
                                <img
                                  src={
                                    this.state.questionImage.length > 0
                                      ? this.state.questionImage
                                      : this.state.setQuestionImage?.fileurl
                                  }
                                  alt=""
                                  style={{
                                    height: "auto",
                                    width: "100%",
                                  }}
                                />
                              </>
                              <button
                                className="btn-reset"
                                type="button"
                                onClick={this.removeThumbnail}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          ) : (
                            <div className="input-thumb">
                              <label htmlFor="thumb-file">
                                <img
                                  src={addthumbnail}
                                  alt=""
                                  style={{
                                    width: "100px",
                                  }}
                                />
                              </label>
                              <input
                                type="file"
                                className="d-none"
                                id="thumb-file"
                                autoComplete="false"
                                accept={["image/*"]}
                                onChangeCapture={this.uploadThumbnail}
                              />
                            </div>
                          )}
                        </div>
                      </GridItem>
                      <GridItem xs={12} sm={4} md={4}>
                        <h5>
                          <strong>Duration</strong>
                          <sup className="required" style={{ color: "red" }}>
                            *
                          </sup>
                        </h5>
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={8}
                        md={8}
                        className={classes.alignItemsCenter}
                      >
                        <GridContainer>
                          <GridItem sm={6}>
                            <TextField
                              style={{ margin: "10px 0px" }}
                              id="date"
                              label="From"
                              type="date"
                              value={this.state.selectedDateFrom}
                              error={this.state.selectedDateFrom == ""}
                              helperText={
                                this.state.selectedDateFrom == ""
                                  ? "Required"
                                  : ""
                              }
                              onChange={(e) =>
                                this.setState({
                                  selectedDateFrom: e.target.value,
                                })
                              }
                              className={classes.textField}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </GridItem>
                          <GridItem sm={6}>
                            <TextField
                              style={{ margin: "10px 0px" }}
                              id="date"
                              label="To"
                              type="date"
                              value={this.state.selectedDateTo}
                              error={this.state.selectedDateTo == ""}
                              helperText={
                                this.state.selectedDateTo == ""
                                  ? "Required"
                                  : ""
                              }
                              onChange={(e) =>
                                this.setState({
                                  selectedDateTo: e.target.value,
                                })
                              }
                              className={classes.textField}
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </GridItem>
                        </GridContainer>
                      </GridItem>
                      <GridItem xs={12} sm={4} md={4}>
                        <h5>
                          <strong>
                            {this.props.getInspectorDetails
                              ? `${this.props.getInspectorDetails.inspectionSpecialities}`
                              : ""}{" "}
                            Age
                          </strong>
                          <sup className="required" style={{ color: "red" }}>
                            *
                          </sup>
                          <sub>(in years)</sub>
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
                          label={"Inspection Object Age"}
                          placeholder={"Inspection Object Age (in years)"}
                          variant="outlined"
                          error={
                            this.state.inspectionObjectAge == ""
                              ? true
                              : isNaN(this.state.inspectionObjectAge)
                              ? true
                              : false
                          }
                          helperText={
                            this.state.inspectionObjectAge == ""
                              ? "Required"
                              : isNaN(this.state.inspectionObjectAge)
                              ? "Required"
                              : ""
                          }
                          fullWidth
                          value={this.state.inspectionObjectAge}
                          inputProps={{
                            onChange: (e) => {
                              this.setState({
                                inspectionObjectAge: e.target.value,
                              });
                            },
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={4} md={4}>
                        <h5>
                          <strong>Weather</strong>
                          <sup className="required" style={{ color: "red" }}>
                            *
                          </sup>
                          <sub>(with unit)</sub>{" "}
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
                          label={"Weather"}
                          placeholder={"Temperature with unit"}
                          variant="outlined"
                          error={
                            this.state.weather == ""
                              ? true
                              : this.state.weather.length > 5
                          }
                          helperText={
                            this.state.weather == ""
                              ? "Required"
                              : this.state.weather.length > 5
                              ? "Required"
                              : ""
                          }
                          fullWidth
                          value={this.state.weather}
                          inputProps={{
                            onChange: (e) => {
                              this.setState({
                                weather: e.target.value,
                              });
                            },
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={4} md={4}>
                        <h5>
                          <strong>Scope</strong>{" "}
                        </h5>
                      </GridItem>
                      <GridItem
                        xs={12}
                        sm={8}
                        md={8}
                        className={classes.alignItemsCenter}
                      >
                        <textarea
                          style={{
                            margin: "10px 0px",
                            borderRadius: "6px",
                            width: "100%",
                          }}
                          rows="5"
                          placeholder={"Scope of Survey"}
                          value={this.state?.scope ? this.state.scope : ""}
                          onChange={(e) => {
                            this.setState({
                              scope: e.target.value,
                            });
                          }}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={4} md={4}>
                        <h5>
                          <strong>Conclusion</strong>{" "}
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
                          label={"Conclusion"}
                          aria-label="minimum height"
                          rowsMin={5}
                          className="description-text pl-2 py-2"
                          placeholder={"Conclusion"}
                          variant="outlined"
                          value={this.state.observation}
                          onChange={(e) => {
                            this.setState({
                              observation: e.target.value,
                            });
                          }}
                          // onChange={(e) => {
                          //   this.setState({
                          //     answer: e.target.value,
                          //   });
                          // }}
                        />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                )}
              </Card>
            </GridContainer>
          </DialogContent>
          <DialogActions>
            <Button
              color="success"
              onClick={this.editObservation}
              disabled={
                this.state.selectedDateFrom == "" ||
                this.state.selectedDateTo == "" ||
                this.state.weather == "" ||
                this.state.weather.length > 5 ||
                this.state.inspectionObjectAge == "" ||
                isNaN(this.state.inspectionObjectAge)
              }
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
        <FooterLow />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getInspectorDetails: state.userReducer.getInspectorDetails,
});
export default connect(mapStateToProps)(withStyles(style)(InspectionCenter));
