import Slide from "@material-ui/core/Slide";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import Image from "next/image";
import Router from "next/router";
import React, { Component } from "react";
import { connect } from "react-redux";
import Compress from "compress.js";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import addthumbnail from "../../../Documentation/assets/img/add-thumbnail.webp";
import InfoIcon from "@material-ui/icons/Info";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import EditIcon from "@material-ui/icons/Edit";
import noImage from "../../../public/img/no-image.webp";
import styles from "../../../styles/jss/nextjs-material-kit-pro/pages/ecommerceStyle";
import productStyle from "../../../styles/jss/nextjs-material-kit-pro/pages/landingPageSections/productStyle";
import Card from "../../../components/Card/Card";
import CardBody from "../../../components/Card/CardBody";
import Button from "../../../components/CustomButtons/Button";
import FooterLow from "../../../components/Footer/FooterLow";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import UpperHeader from "../../../components/Header/UpperHeader";
import Parallax from "../../../components/Parallax/Parallax";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CustomDialog from "../../../components/CustomDialog/CustomDialog";
import HelpIcon from "@material-ui/icons/Help";
import moment from "moment";
import StarsRating from "stars-rating";
import { loaderHide, loaderShow } from "../../../lib/loaderHideShow";
// import connection from '../../../lib/axiosInstance';
import { toast } from "react-toastify";
// import { loaderHide, loaderShow } from '../../../lib/loaderHideShow';
import middleware from "../../../middleware/middleware";
import {
  increaseViewsCollection,
  getParticularAreaData,
  uploadimage,
  saveItem,
  editparticularitem,
  removeItem,
  addMultimediaItem,
  updateMultimediaItem,
  changeWorkItemStatus,
} from "../../../redux/action/action";
import {
  Tooltip,
  TextareaAutosize,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import "../../../Documentation/assets/css/react_toggle.css";
import { Clear, Search } from "@material-ui/icons";
import FilterListIcon from "@material-ui/icons/FilterList";
import Swal from "sweetalert2";
import { getItemArray } from "../../../lib/getInspection";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

// let RLDD;
// if (typeof window !== 'undefined') {
//   RLDD = require('react-list-drag-and-drop/lib/RLDD').default;
// }
const style = {
  ...styles,
  ...productStyle,
};
// const useStyles = makeStyles(styles);
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export async function getServerSideProps(context) {
  try {
    await middleware.apply(context.req, context.res);
    const p = await getItemArray(context.req, context);
    var itemArray = [];
    var areaArray = [{ ...p[0] }];
    if (!p) context.res.statusCode = 404;
    else {
      if (p[0].ItemArray && p ? p.length : 0 > 0) {
        p[0]?.ItemArray &&
          p[0]?.ItemArray.forEach((element, index) => {
            element.id = index;
          });
        p[0]?.ItemArray &&
          p[0]?.ItemArray.sort(function (a, b) {
            return a.sortId - b.sortId;
          });
        itemArray = p[0]?.ItemArray ? p[0]?.ItemArray : [];
      }
      return {
        props: {
          CollectionData: JSON.stringify(p),
          itemArray: JSON.stringify(itemArray),
          areaArray: JSON.stringify(areaArray),
        }, // will be passed to the page component as props
      };
    }
  } catch (err) {
    console.log(err);
  }
}

// const groupOptions = [
//   {
//     displayName: "NI",
//     value: "NI",
//   },
//   {
//     displayName: "IP",
//     value: "IP",
//   },
//   {
//     displayName: "IC",
//     value: "IC",
//   },
// ];

class InspectionItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      random: false,
      CollectionData: JSON.parse(props.CollectionData)
        ? JSON.parse(props.CollectionData)
        : [],
      itemNames: JSON.parse(props.itemArray) ? JSON.parse(props.itemArray) : [],
      areaArray: JSON.parse(props.areaArray) ? JSON.parse(props.areaArray) : [],
      addModal: false,
      editModal: false,
      viewModal: false,
      openMultimediaModal: false,
      filterModal: false,
      // ratingValue: 0,
      SearchData: "",
      statechecked: false,
      securityIssue: "",
      itemId: "",
      item: "",
      priority: "",
      groupSize: 1,
      status: "",
      potentialAnswer: "",
      allPotentialAnswers: [],
      MultimediaItemArray: [],
      answer: "",
      answerImg: "",
      description: "",
      suggestion: "",
      observation: "",
    };
    this.isChange = false;
    this.filterDataName = "";
    this.filterDataValue = "";
    this.filter = {
      limit: 1000,
      pageNumber: 1,
      isSearching: false,
      searchingData: "",
      status: "",
    };
  }
  onGroupSizeSelect = async (value, questionData) => {
    console.log(value, questionData);
    loaderShow();
    if (
      !questionData.workStatus ||
      (questionData.workStatus && value !== null)
    ) {
      const data = {
        workStatus: value,
        editId: Router.router.query.id,
        areaId: Router.router.query.areaId,
        itemId: questionData.itemId,
      };
      // this.setState({ groupSize: value });
      const result = await this.props.dispatch(changeWorkItemStatus(data));
      if (result) {
        await this.getParticularAreaData();
        toast.success("Work Status changed to " + value);
      } else {
        console.log(error);
      }
    } else {
      toast.warn("Work Status is already set to " + questionData.workStatus);
    }
    loaderHide();
  };

  componentDidMount() {
    setTimeout(() => {
      this.getParticularAreaData();
    }, 1000);
  }

  ratingChanged = () => {};
  handleFilter = async (e) => {
    this.isChange = e.target.name !== this.filterDataName;
    this.filterDataValue = e.target.value;
    this.filter.searchingData = e.target.value;
    this.filter.isSearching = this.filter.searchingData ? true : false;
    this.getParticularAreaData();
    this.setState({
      filterModal: false,
    });
  };

  handleSort = async (e) => {
    // this.isChange = e.target.name !== this.filterDataName;
    // this.filterDataValue = e.target.value;
    if (e.target.value == "H_L") {
      this.setState({
        itemNames: this.state?.itemNames?.sort(
          (a, b) => b.priorityNo - a.priorityNo
        ),
        filterModal: false,
      });
    } else if (e.target.value == "L_H") {
      this.setState({
        itemNames: this.state?.itemNames?.sort(
          (a, b) => a.priorityNo - b.priorityNo
        ),
        filterModal: false,
      });
    } else {
      this.getParticularAreaData();
    }
  };

  openFilterModal = () => {
    this.setState({
      filterModal: true,
    });
  };

  updateImageData = async () => {
    loaderShow();
    var data = {
      lastModifiedBy: `${this.props.getInspectorDetails.firstName} ${this.props.getInspectorDetails.lastName}`,
      editId: Router.router.query.id,
      areaId: Router.router.query.areaId,
      itemId: this.state.itemId,
      answer: this.state.answer,
      fileId: this.state.setLicenseImage.fileId,
    };

    let result = await this.props.dispatch(
      updateMultimediaItem(data, this.props.history)
    );
    console.log(result);
    if (result) {
      this.getParticularAreaData();
      toast.success("Answer updated successfully.");
      this.setState({
        setLicenseImage: undefined,
        openMultimediaModal: false,
        answerImg: "",
        answer: "",
      });
    }
    loaderHide();
  };

  uploadImageData = async () => {
    loaderShow();
    if (this.state.setLicenseImage.resumeDetails) {
      if (this.state.setLicenseImage.fileType[0] !== "video") {
        const compress = new Compress();
        const resizedImage = await compress.compress(
          [this.state.setLicenseImage.resumeDetails],
          {
            size: 1, // the max size in MB, defaults to 2MB
            quality: 0.75, // the quality of the image, max is 1,
          }
        );
        const img = resizedImage[0];
        const base64str = img.data;
        const imgExt = img.ext;
        this.resizedFiile = Compress.convertBase64ToFile(base64str, imgExt);
      }
      let val = await this.props.dispatch(
        uploadimage(
          this.state.setLicenseImage.fileType == "video"
            ? this.state.setLicenseImage.resumeDetails
            : this.resizedFiile,
          this.props.history
        )
      );
      if (val.data && val.data.result && val.data.result.name) {
        this.setState({
          answerImg: `https://${process.env.azureAccountName}.blob.core.windows.net/${process.env.AZURE_CONTAINER}/${val.data.result.name}`,
        });
      }

      var data = {
        lastModifiedBy: `${this.props.getInspectorDetails.firstName} ${this.props.getInspectorDetails.lastName}`,
        editId: Router.router.query.id,
        areaId: Router.router.query.areaId,
        itemId: this.state.itemId,
        multimedia: this.state.answerImg,
        answer: this.state.answer,
        type1: this.state.setLicenseImage.fileType,
      };

      let result = await this.props.dispatch(
        addMultimediaItem(data, this.props.history)
      );
      if (result) {
        this.getParticularAreaData();
        toast.success("Multimedia uploaded successfully.");
        this.setState({
          setLicenseImage: undefined,
          openMultimediaModal: false,
          answerImg: "",
          answer: "",
        });
      }
    }
    loaderHide();
  };

  removeThumbnail = (e) => {
    this.setState({
      setLicenseImage: undefined,
    });
  };

  uploadThumbnail = (e) => {
    if (e.target.files[0]) {
      this.setState({
        setLicenseImage: {
          resumeName: e.target.files[0].name,
          resumeDetails: e.target.files[0],
          fileurl: URL.createObjectURL(e.target.files[0]),
          fileType: e.target.files[0].type.split("/")[0],
        },
      });
    }
  };

  handleDelete = async (id) => {
    this.setState({
      editModal: false,
    });
    Swal.fire({
      title: "Delete",
      text: `Are you sure you want to delete ${this.state.item}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteItem(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.setState({
          editModal: true,
        });
      }
    });
  };

  deleteItem = async (id) => {
    loaderShow();
    const data = {
      deleteId: Router.router.query.id,
      areaId: Router.router.query.areaId,
      itemId: id,
    };
    const result = await this.props.dispatch(removeItem(data));
    if (result.data) {
      this.getParticularAreaData();
      Swal.fire(
        "Deleted!",
        `${this.state.item} delete successfully`,
        "success"
      );
      this.setState({
        item: "",
        priority: "",
        observation: "",
        statechecked: false,
        securityIssue: "",
        description: "",
        MultimediaItemArray: "",
        suggestion: "",
        status: "",
        addModal: false,
        editModal: false,
      });
    } else {
      console.log(error);
    }
    loaderHide();
  };
  openMultimediaModal = (data) => {
    if (data.fileId) {
      this.setState({
        openMultimediaModal: true,
        itemId: data.itemId,
        answer: data.answer ? data.answer : "",
        setLicenseImage: {
          editData: true,
          fileId: data.fileId,
          fileType: data.type,
          fileurl: data.multimedia,
        },
      });
    } else {
      this.setState({
        openMultimediaModal: true,
        itemId: data.itemId,
        answer: "",
      });
    }
  };
  openViewModal = (data) => {
    this.setState({
      viewModal: true,
      itemId: data.itemId,
      item: data.item,
      priority: data.priority,
      status: data.status,
      securityIssue: data.securityIssue,
      potentialAnswer: data.potentialAnswer,
      observation: data.observation,
      MultimediaItemArray: data.MultimediaItemArray,
      description: data.description,
      suggestion: data.suggestion,
      updatedAt: data.updatedAt,
      lastModifiedBy: data.lastModifiedBy,
    });
  };
  openAddModal = () => {
    this.setState({
      addModal: true,
      itemId: "",
      item: "",
      priority: "",
      observation: "",
      statechecked: false,
      securityIssue: "",
      status: "",
      MultimediaItemArray: "",
      description: "",
      suggestion: "",
      updatedAt: "",
      allPotentialAnswers: [],
    });
  };
  openEditModal = (data) => {
    this.setState({
      editModal: true,
      editId: Router.router.query.id,
      areaId: Router.router.query.areaId,
      itemId: data.itemId,
      item: data.item,
      priority: data.priority,
      status: data.status,
      securityIssue: data.securityIssue,
      statechecked: data.securityIssue && data.securityIssue.length > 0,
      potentialAnswer: data.potentialAnswer,
      allPotentialAnswers: data.allPotentialAnswers,
      description: data.description,
      suggestion: data.suggestion,
      observation: data.observation,
    });
  };
  editParticularInspectionItem = async () => {
    var data = {
      lastModifiedBy: `${this.props.getInspectorDetails.firstName} ${this.props.getInspectorDetails.lastName}`,
      editorId: this.props.getInspectorDetails._id,
      areaId: this.state.areaId,
      editId: this.state.editId,
      itemId: this.state.itemId,
      item: this.state.item,
      priority: this.state.priority,
      priorityNo:
        this.state.priority == "High"
          ? 3
          : this.state.priority == "Medium"
          ? 2
          : this.state.priority == "Low"
          ? 1
          : 0,
      status: this.state.status,
      securityIssue: this.state.statechecked
        ? this.state.securityIssue
        : undefined,
      description: this.state.description,
      potentialAnswer: this.state.potentialAnswer,
      observation: this.state.observation,
      suggestion: this.state.suggestion,
    };
    let result = await this.props.dispatch(
      editparticularitem(data, this.props.history)
    );
    if (result) {
      toast.success(`${this.state.item} successfully updated`);
      this.getParticularAreaData();
      this.setState({
        item: "",
        priority: "",
        description: "",
        observation: "",
        statechecked: false,
        securityIssue: "",
        status: "",
        potentialAnswer: "",
        allPotentialAnswers: [],
        suggestion: "",
        lastModifiedBy: "",
        MultimediaItemArray: "",
        addModal: false,
        editModal: false,
      });
    } else {
      console.log("error is");
    }
  };

  addParticularInspectionItem = async () => {
    var sortIdValue = 0;
    if (this.state?.itemNames?.length > 0) {
      const lastItem = this.state.itemNames
        ? this.state.itemNames[this.state.itemNames.length - 1]
        : [];
      sortIdValue = lastItem.sortId + 1;
    }
    var data = {
      item: this.state.item,
      inspectionObjectId: Router.router.query.id,
      areaId: Router.router.query.areaId,
      priority: this.state.priority,
      allPotentialAnswers: [
        ...this.state.allPotentialAnswers,
        this.state.potentialAnswer,
      ],
      potentialAnswer: this.state.potentialAnswer,
      priorityNo:
        this.state.priority == "High"
          ? 3
          : this.state.priority == "Medium"
          ? 2
          : this.state.priority == "Low"
          ? 1
          : 0,
      status: this.state.status,
      securityIssue: this.state.statechecked
        ? this.state.securityIssue
        : undefined,
      createdBy: ["inspector"],
      lastModifiedBy: `${this.props.getInspectorDetails.firstName} ${this.props.getInspectorDetails.lastName}`,
      editorId: this.props.getInspectorDetails._id,
      description: this.state.description,
      observation: this.state.observation,
      suggestion: this.state.suggestion,
      sortId: sortIdValue ? sortIdValue : 0,
    };
    let result = await this.props.dispatch(saveItem(data, this.props.history));
    if (result) {
      this.getParticularAreaData();
      toast.success(`${this.state.item} added successfully`);
      this.setState({
        item: "",
        priority: "",
        description: "",
        observation: "",
        statechecked: false,
        securityIssue: "",
        potentialAnswer: "",
        securityIssue: "",
        allPotentialAnswers: [],
        MultimediaItemArray: [],
        status: "",
        suggestion: "",
        lastModifiedBy: "",
        addModal: false,
      });
    } else {
      toast.error(`${this.state.item} is already exists`);
      console.log("error is"); //change
    }
  };

  timeSince(date) {
    if (!date) {
      date = new Date();
    } else {
      date = new Date(date);
    }
    var seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + " minutes";
    }
    return " seconds";
  }

  increaseViewsCollection = async () => {
    if (this.state.itemNames && this.state.itemNames.length > 0) {
      var data = {
        inspectionId: Router.router.query.id,
        outerViews:
          1 +
          (this.state.CollectionData && this.state.CollectionData.length > 0
            ? this.state.CollectionData[0].outerViews
            : 0),
      };
      // loaderShow();
      await this.props.dispatch(increaseViewsCollection(data));
    }
  };
  clearData = async (e) => {
    this.setState({ SearchData: "" });
    this.filter.searchingData = "";
    this.getParticularAreaData();
  };

  getParticularAreaData = async () => {
    loaderShow();
    let data = {
      inspectionObjectId: Router.router.query.id,
      areaId: Router.router.query.areaId,
      filter: this.filter,
    };
    let result = await this.props.dispatch(getParticularAreaData(data));
    if (result) {
      this.itemNames = [];
      // if (this.filter.searchingData && false) {
      //   result.data &&
      //     result.data.forEach((data) => {
      //       this.itemNames.push(data.ItemArray);
      //     });
      //   if (this.itemNames ? this.itemNames : 0 > 0) {
      //     this.itemNames.sort(function (a, b) {
      //       return a.sortId - b.sortId;
      //     });
      //   }
      //   console.log(this.itemNames);
      //   this.setState({
      //     itemNames: this.itemNames,
      //     random: !this.state.random,
      //   });
      // } else {
      if (
        result.data && result.data[0]?.ItemArray
          ? result.data[0].ItemArray?.length
          : 0 > 0
      ) {
        result.data[0].ItemArray.sort(function (a, b) {
          return a.sortId - b.sortId;
        });
        result.data[0].ItemArray.forEach((element, index) => {
          element.id = index;
        });
      }
      this.itemNames = result.data ? result.data[0]?.ItemArray : [];
      this.setState({
        itemNames: this.itemNames,
      });
    } else {
      console.log("error is ");
    }
    loaderHide();
  };

  handleSearch = (e) => {
    this.filter.searchingData = this.state.SearchData;
    this.filter.isSearching = this.filter.searchingData ? true : false;
    this.getParticularAreaData();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <UpperHeader />
        <Parallax
          image={require("public/img/examples/clark-street-merc.webp")}
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
                          placeholder={"Search for Item..."}
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
                            endAdornment:
                              this.state.SearchData.length > 0 ? (
                                <InputAdornment position="end">
                                  <Tooltip
                                    id="tooltip-down"
                                    title="clear"
                                    placement="bottom-end"
                                  >
                                    <IconButton onClick={this.clearData}>
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
                              ) : (
                                <InputAdornment position="end">
                                  <Tooltip
                                    id="tooltip-down"
                                    title="filter"
                                    placement="bottom-end"
                                  >
                                    <IconButton onClick={this.openFilterModal}>
                                      <FilterListIcon />
                                    </IconButton>
                                  </Tooltip>
                                </InputAdornment>
                              ),
                            onChange: (e) => {
                              this.setState({
                                SearchData: e.target.value.trimStart(),
                              });
                            },
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
          style={{ backgroundColor: "#edf6e8", padding: "10px" }}
        >
          <div className={classNames(classes.container, classes.pricingDiv)}>
            <div className="upperdiv">
              <a href="/inspectionCenter" className="upper">
                All Inspection
              </a>
              {` > `}
              <a
                style={{ cursor: "pointer" }}
                className="upper"
                onClick={() =>
                  Router.push(`/inspectionCenter/${Router.router.query.id}`)
                }
              >
                {this.state.CollectionData[1].inspectionObject
                  .charAt(0)
                  .toUpperCase() +
                  this.state.CollectionData[1].inspectionObject.slice(1)}
              </a>
              {" > "}
              <a href="#" className="upper">
                {this.state.CollectionData[0].area}
              </a>
            </div>
            <div
              className={classes.innerDiv}
              style={{ backgroundColor: "#e2f0d9" }}
            >
              {/* <Button onClick={this.openAddModal} color="success">Add Question</Button> */}
              {this.state.areaArray.length > 0 ? (
                <>
                  {this.state.areaArray.map((data, index) => {
                    return (
                      <>
                        <GridContainer justify="center" key={index}>
                          {/* <GridItem md={1} sm={12}>
                                                </GridItem> */}
                          <GridItem md={3} sm={12}>
                            <div className={classes.imageSectionOne}>
                              <Image
                                src={
                                  data.MultimediaAreaArray &&
                                  data.MultimediaAreaArray.length > 0
                                    ? data.MultimediaAreaArray[0].multimedia
                                    : noImage
                                }
                                alt=""
                                width={150}
                                height={100}
                              />
                            </div>
                          </GridItem>
                          <GridItem md={5} sm={12}>
                            <div className={classes.helpCenterClass}>
                              <h3 className="first-lc">{data.area}</h3>
                              <h4 className="first-lc">
                                {data.priority}- Priority
                              </h4>
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
                                  {data.ItemArray ? data.ItemArray.length : 0}{" "}
                                  Items in this collection
                                </span>
                                <br />
                                <span
                                  className={
                                    (classes.title, classes.titleInner)
                                  }
                                  style={{ fontSize: "12px" }}
                                >
                                  Prepared for: -{" "}
                                  {this.state.CollectionData[1].createdBy}
                                </span>
                              </div>
                            </div>
                          </GridItem>
                          <GridItem md={4} sm={12}>
                            <Button
                              color="warning"
                              className="float-md-right"
                              onClick={this.openAddModal}
                            >
                              Add Custom Item
                            </Button>
                          </GridItem>
                        </GridContainer>
                        {this.state.itemNames &&
                        this.state.itemNames.length > 0 ? (
                          <>
                            {this.state.itemNames &&
                              this.state.itemNames.map((questionData, i) => {
                                return (
                                  <Card
                                    key={i}
                                    style={
                                      questionData?.securityIssue == "Safety"
                                        ? {
                                            boxShadow:
                                              "4px 4px 8px 4px rgba(255,0,0,0.2)",
                                          }
                                        : questionData?.securityIssue ==
                                          "Environmental"
                                        ? {
                                            boxShadow:
                                              "4px 4px 8px 4px rgba(255,255,0,0.2)",
                                          }
                                        : questionData?.status?.includes(
                                            "Satisfactory"
                                          )
                                        ? {
                                            boxShadow:
                                              "4px 4px 8px 4px rgba(0,255,0,0.2)",
                                          }
                                        : {}
                                    }
                                  >
                                    <CardBody>
                                      <GridContainer>
                                        <GridItem sm={12}>
                                          <div className="row">
                                            <div className="col-md-8 col-sm-12">
                                              <h3
                                                className="first-lc"
                                                style={
                                                  questionData.createdBy &&
                                                  questionData.createdBy.includes(
                                                    "inspector"
                                                  ) && { color: "#ff66a3" }
                                                }
                                              >
                                                {questionData.item}{" "}
                                              </h3>
                                              <h5 className="innerTitile">
                                                {`${questionData.priority}-Priority`}
                                              </h5>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                              <div className="d-md-flex flex-row-reverse">
                                                <div className="pt-2">
                                                  <ToggleButtonGroup
                                                    value={
                                                      questionData.workStatus
                                                        ? questionData.workStatus
                                                        : "NI"
                                                    }
                                                    exclusive
                                                    onChange={(e, value) =>
                                                      this.onGroupSizeSelect(
                                                        value,
                                                        questionData
                                                      )
                                                    }
                                                    aria-label="text alignment"
                                                  >
                                                    <Tooltip
                                                      id="tooltip-top"
                                                      title="Not Inspected"
                                                      placement="top"
                                                    >
                                                      <ToggleButton
                                                        value="NI"
                                                        aria-label="left aligned"
                                                        className={
                                                          questionData.workStatus ===
                                                            "NI" ||
                                                          !questionData.workStatus
                                                            ? "bg-danger text-white px-3"
                                                            : "px-3"
                                                        }
                                                      >
                                                        NI
                                                      </ToggleButton>
                                                    </Tooltip>
                                                    <Tooltip
                                                      id="tooltip-top"
                                                      title="In Progress"
                                                      placement="top"
                                                    >
                                                      <ToggleButton
                                                        value="IP"
                                                        aria-label="centered"
                                                        className={
                                                          questionData.workStatus &&
                                                          questionData.workStatus ===
                                                            "IP"
                                                            ? "bg-warning text-white px-3"
                                                            : "px-3"
                                                        }
                                                      >
                                                        IP
                                                      </ToggleButton>
                                                    </Tooltip>
                                                    <Tooltip
                                                      id="tooltip-top"
                                                      title="Inspection Completed"
                                                      placement="top"
                                                    >
                                                      <ToggleButton
                                                        value="IC"
                                                        aria-label="right aligned"
                                                        className={
                                                          questionData.workStatus &&
                                                          questionData.workStatus ===
                                                            "IC"
                                                            ? "bg-success text-white px-3"
                                                            : "px-3"
                                                        }
                                                        // style={questionData.workStatus && questionData.workStatus==="IC" ? }
                                                      >
                                                        IC
                                                      </ToggleButton>
                                                    </Tooltip>
                                                  </ToggleButtonGroup>
                                                  {/* <MultiToggle
                                                    options={groupOptions}
                                                    selectedOption={
                                                      questionData.workStatus
                                                        ? questionData.workStatus
                                                        : "NI"
                                                    }
                                                    onSelectOption={(value) =>
                                                      this.onGroupSizeSelect(
                                                        value,
                                                        questionData
                                                      )
                                                    }
                                                    // label="Select Group Size"
                                                  /> */}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          {questionData.suggestion && (
                                            <p
                                              className={
                                                classes.innertitlesection
                                              }
                                            >
                                              {questionData.suggestion}
                                            </p>
                                          )}
                                          {questionData.observation && (
                                            <p>{questionData.observation}</p>
                                          )}
                                          <div className="row">
                                            {questionData.MultimediaItemArray &&
                                              questionData.MultimediaItemArray.map(
                                                (filedata, index) => (
                                                  <>
                                                    {filedata.type &&
                                                    filedata.type ===
                                                      "image" ? (
                                                      <div
                                                        className="thumb-preview-forDescription col-md-4 col-12"
                                                        key={filedata.fileId}
                                                        onClick={() =>
                                                          this.openMultimediaModal(
                                                            {
                                                              ...questionData,
                                                              ...filedata,
                                                            }
                                                          )
                                                        }
                                                      >
                                                        <Image
                                                          src={
                                                            filedata.multimedia
                                                          }
                                                          alt=""
                                                          width={1000}
                                                          height={500}
                                                        />
                                                        <div className="overlay"></div>
                                                      </div>
                                                    ) : (
                                                      <div
                                                        className="thumb-preview-forDescription col-md-4 col-12"
                                                        key={filedata.fileId}
                                                        onClick={() =>
                                                          this.openMultimediaModal(
                                                            {
                                                              ...questionData,
                                                              ...filedata,
                                                            }
                                                          )
                                                        }
                                                      >
                                                        <video
                                                          muted
                                                          autoPlay
                                                          loop
                                                          playsInline
                                                          style={{
                                                            width: "100%",
                                                          }}
                                                        >
                                                          <source
                                                            src={
                                                              filedata.multimedia
                                                            }
                                                            type="video/mp4"
                                                          />
                                                          <source
                                                            src={
                                                              filedata.multimedia
                                                            }
                                                            type="video/ogg"
                                                          />
                                                        </video>
                                                        <div className="overlay"></div>
                                                      </div>
                                                    )}
                                                  </>
                                                )
                                              )}
                                          </div>
                                          <div className="row align-items-center">
                                            <div className="col-md-8 col-sm-12">
                                              <span
                                                className={
                                                  (classes.title,
                                                  classes.titleInner)
                                                }
                                                style={{
                                                  fontSize: "12px",
                                                }}
                                              >
                                                Updated By{" "}
                                                {questionData.lastModifiedBy
                                                  ? questionData.lastModifiedBy
                                                  : data.lastModifiedBy
                                                  ? data.lastModifiedBy
                                                  : " admin admin"}{" "}
                                                on{" "}
                                                {questionData.lastModifiedBy
                                                  ? moment(
                                                      questionData.updatedAt
                                                    ).format("lll")
                                                  : moment(
                                                      data.updatedAt
                                                    ).format("lll")}
                                              </span>
                                            </div>
                                            <div className="col-md-4 col-sm-12">
                                              <div className="d-md-flex flex-row-reverse">
                                                <Tooltip
                                                  id="tooltip-top"
                                                  title="Add Multimedia"
                                                  placement="top"
                                                  className="float-md-right mx-md-2"
                                                  // classes={{ tooltip: classes.tooltip }}
                                                >
                                                  <Button
                                                    color="success"
                                                    justIcon
                                                    round
                                                    onClick={() =>
                                                      this.openMultimediaModal(
                                                        questionData
                                                      )
                                                    }
                                                  >
                                                    <AddAPhotoIcon />
                                                  </Button>
                                                </Tooltip>

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
                                                    onClick={() =>
                                                      this.openEditModal(
                                                        questionData
                                                      )
                                                    }
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
                                                    onClick={() =>
                                                      this.openViewModal(
                                                        questionData
                                                      )
                                                    }
                                                  >
                                                    <InfoIcon />
                                                  </Button>
                                                </Tooltip>
                                              </div>
                                            </div>
                                          </div>
                                          {/* <Card className={classes.ratingClass}>
                                            <CardBody>
                                              <GridContainer
                                                style={{ textAlign: "center" }}
                                              >
                                                <GridItem
                                                  md={12}
                                                  sm={12}
                                                  style={{
                                                    textAlign: "center",
                                                  }}
                                                >
                                                  <h3 className={classes.title}>
                                                    Status?
                                                  </h3>
                                                  <div
                                                    style={{
                                                      display: "flex",
                                                      justifyContent: "center",
                                                    }}
                                                  >
                                                    <div
                                                      className={
                                                        classes.desktopViewClass
                                                      }
                                                    >
                                                      <StarsRating
                                                        count={5}
                                                        onChange={
                                                          this.ratingChanged
                                                        }
                                                        size={40}
                                                        value={
                                                          this.state.ratingValue
                                                        }
                                                        color2={"#0C9479"}
                                                      />
                                                    </div>
                                                    <div
                                                      className={
                                                        classes.mobileClasss
                                                      }
                                                    >
                                                      <StarsRating
                                                        count={5}
                                                        onChange={
                                                          this.ratingChanged
                                                        }
                                                        size={25}
                                                        value={
                                                          this.state.ratingValue
                                                        }
                                                        color2={"#0C9479"}
                                                      />
                                                    </div>
                                                  </div>
                                                </GridItem>
                                              </GridContainer>
                                            </CardBody>
                                          </Card> */}
                                        </GridItem>
                                      </GridContainer>
                                    </CardBody>
                                  </Card>
                                );
                              })}
                          </>
                        ) : (
                          <Card>
                            <CardBody>
                              <h3 className={classes.title}>No Area Found.</h3>
                            </CardBody>
                          </Card>
                        )}
                      </>
                    );
                  })}
                </>
              ) : (
                <Card>
                  <CardBody>
                    <h3 className={classes.title}>No Content Found.</h3>
                  </CardBody>
                </Card>
              )}
            </div>
          </div>
        </div>

        <br />
        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.paper2,
          }}
          fullWidth={true}
          open={this.state.addModal || this.state.editModal}
          onClose={() =>
            this.setState({
              itemId: "",
              item: "",
              priority: "",
              observation: "",
              statechecked: false,
              securityIssue: "",
              status: "",
              potentialAnswer: "",
              allPotentialAnswers: [],
              MultimediaItemArray: [],
              description: "",
              suggestion: "",
              addModal: false,
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
            disabled={
              this.state.item == "" ||
              this.state.priority == "" ||
              this.state.description == "" ||
              this.state.suggestion == ""
            }
            close={() => {
              this.setState({
                itemId: "",
                item: "",
                priority: "",
                observation: "",
                statechecked: false,
                securityIssue: "",
                MultimediaItemArray: [],
                potentialAnswer: "",
                allPotentialAnswers: [],
                description: "",
                suggestion: "",
                addModal: false,
                editModal: false,
                viewModal: false,
              });
            }}
          >
            <h3 className={classes.textTransform}>
              {this.state.addModal ? "Add Item" : `${this.state.item} Details`}
            </h3>
          </CustomDialog>

          <DialogContent
            id="classic-modal-slide-description"
            className={classes.modalBody}
          >
            <GridContainer>
              <Card plain className={classes.cardClasses}>
                <CardBody formHorizontal plain>
                  <GridContainer>
                    <GridItem xs={0} sm={9} md={9}></GridItem>
                    <GridItem
                      xs={12}
                      sm={3}
                      md={3}
                      className={classes.alignItemsCenter}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            checked={this.state.statechecked}
                            onChange={() =>
                              this.setState({
                                statechecked: !this.state.statechecked,
                              })
                            }
                          />
                        }
                        label="Security Issues?"
                        labelPlacement="end"
                      />
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4}>
                      <h5>
                        <strong>Item</strong>
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
                        label={"Item Name"}
                        placeholder={"Item Name"}
                        variant="outlined"
                        fullWidth
                        inputProps={{
                          value: this.state.item,
                          onChange: (e) => {
                            this.setState({
                              item: e.target.value,
                            });
                          },
                        }}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={4} md={4}>
                      <h5>
                        <strong>
                          Priority<sup className="required">*</sup>
                        </strong>
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
                        select
                        aria-label="minimum height"
                        placeholder={"--Select--"}
                        variant="outlined"
                        fullWidth
                        value={this.state.priority}
                        SelectProps={{
                          native: true,
                        }}
                        onChange={(e) => {
                          this.setState({
                            priority: e.target.value,
                          });
                        }}
                      >
                        <option>--Select--</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </TextField>
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4}>
                      <h5>
                        <strong>
                          Potential Answers<sup className="required">*</sup>
                        </strong>
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
                        select
                        aria-label="minimum height"
                        placeholder={"--Select--"}
                        variant="outlined"
                        fullWidth
                        value={this.state.potentialAnswer}
                        SelectProps={{
                          native: true,
                        }}
                        onChange={(e) => {
                          this.setState({
                            potentialAnswer: e.target.value,
                          });
                        }}
                      >
                        <option>--Select--</option>
                        {this.state.allPotentialAnswers.length > 0 ? (
                          this.state.allPotentialAnswers.map((data, index) => (
                            <option value={data}>{data}</option>
                          ))
                        ) : (
                          <option value="others">Others</option>
                        )}
                      </TextField>
                    </GridItem>
                    {this.state.statechecked && (
                      <>
                        <GridItem xs={12} sm={4} md={4}>
                          <h5>
                            <strong>
                              Security Issue <sup className="required">*</sup>{" "}
                            </strong>
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
                            select
                            // label={"Status"}
                            aria-label="minimum height"
                            placeholder={"--Select--"}
                            variant="outlined"
                            fullWidth
                            value={
                              this.state.securityIssue
                                ? this.state.securityIssue
                                : ""
                            }
                            SelectProps={{
                              native: true,
                            }}
                            onChange={(e) => {
                              this.setState({
                                securityIssue: e.target.value,
                              });
                            }}
                          >
                            <option>--Select--</option>
                            <option value="Safety">Safety</option>
                            <option value="Environmental">Environmental</option>
                            {/* <option value="Repair">Others</option> */}
                          </TextField>
                        </GridItem>
                      </>
                    )}
                    <GridItem xs={12} sm={4} md={4}>
                      <h5>
                        <strong>Status </strong>
                        {this.state.status !== "" &&
                          this.state.status !== "--Select--" && (
                            <Tooltip
                              id="tooltip-down"
                              title={
                                <div style={{ fontSize: "13px" }}>
                                  {this.state.status == "Satisfactory"
                                    ? "At the time of inspection the component is functional without observed signs of a substantial defect"
                                    : this.state.status == "Marginal"
                                    ? "At the time of inspection the component is functioning but is estimated to be nearing end of useful life. Operational maintenance recommended."
                                    : this.state.status == "Repair or Replace"
                                    ? "At the time of inspection the component does not function as intended or presents a Safety Hazard. Repair or replacement is recommended."
                                    : this.state.status == "Evaluation"
                                    ? " The component requires further technical or invasive evaluation by qualified professional tradesman or service technician to determine the nature of any potential defect, the corrective action and any associated cost."
                                    : "none"}
                                </div>
                              }
                              placement="bottom-end"
                            >
                              <HelpIcon />
                            </Tooltip>
                          )}
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
                        select
                        // label={"Status"}
                        aria-label="minimum height"
                        placeholder={"--Select--"}
                        variant="outlined"
                        fullWidth
                        value={this.state.status ? this.state.status : ""}
                        SelectProps={{
                          native: true,
                        }}
                        onChange={(e) => {
                          this.setState({
                            status: e.target.value,
                          });
                        }}
                      >
                        <option>--Select--</option>
                        <option value="Satisfactory">Satisfactory</option>
                        <option value="Marginal">Marginal</option>
                        <option value="Repair">Repair or Replace</option>
                        <option value="Evaluation">Further Evaluation</option>
                      </TextField>
                    </GridItem>

                    <GridItem xs={12} sm={4} md={4}>
                      <h5>
                        <strong>Suggestion</strong>{" "}
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
                        label={"Suggestion"}
                        aria-label="minimum height"
                        placeholder={"Suggestion"}
                        variant="outlined"
                        fullWidth
                        value={this.state.suggestion}
                        onChange={(e) => {
                          this.setState({
                            suggestion: e.target.value,
                          });
                        }}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={4} md={4}>
                      <h5>
                        <strong>Description</strong>{" "}
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
                        label={"Description"}
                        aria-label="minimum height"
                        placeholder={
                          this.state.description &&
                          this.state.description.length > 0
                            ? this.state.description
                            : "Not provided yet"
                        }
                        variant="outlined"
                        fullWidth
                        value={
                          this.state.description &&
                          this.state.description.length > 0
                            ? this.state.description
                            : ""
                        }
                        onChange={(e) => {
                          this.setState({
                            description: e.target.value,
                          });
                        }}
                      />
                    </GridItem>

                    <GridItem xs={12} sm={4} md={4}>
                      <h5>
                        <strong>Observation</strong>{" "}
                      </h5>
                    </GridItem>
                    <GridItem
                      xs={12}
                      sm={8}
                      md={8}
                      className={classes.alignItemsCenter}
                    >
                      <TextareaAutosize
                        style={{ margin: "10px 0px", borderRadius: "6px" }}
                        label={"Observation"}
                        aria-label="minimum height"
                        rowsMin={5}
                        className="description-text pl-2 py-2"
                        placeholder={"Observation"}
                        variant="outlined"
                        fullWidth
                        value={this.state.observation}
                        onChange={(e) => {
                          this.setState({
                            observation: e.target.value,
                          });
                        }}
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
              onClick={
                this.state.addModal
                  ? this.addParticularInspectionItem
                  : this.editParticularInspectionItem
              }
              disabled={
                this.state.item == "" ||
                this.state.priority == "" ||
                this.state.priority == "--Select--" ||
                this.state.potentialAnswer == "" ||
                this.state.potentialAnswer == "--Select--" ||
                this.state.status == "" ||
                this.state.status == "--Select--" ||
                (this.state.statechecked &&
                  this.state.securityIssue == "--Select--")
              }
            >
              {this.state.addModal ? "Add" : "Update"}
            </Button>
            {this.state.editModal && (
              <Button
                color="danger"
                onClick={() => this.handleDelete(this.state.itemId)}
              >
                Delete
              </Button>
            )}
          </DialogActions>
        </Dialog>
        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.paper2,
          }}
          fullWidth={true}
          open={this.state.viewModal}
          onClose={() => {
            this.setState({
              itemId: "",
              item: "",
              priority: "",
              observation: "",
              statechecked: false,
              securityIssue: "",
              MultimediaItemArray: [],
              description: "",
              suggestion: "",
              addModal: false,
              editModal: false,
              viewModal: false,
            });
          }}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <CustomDialog
            color="success"
            close={() => {
              this.setState({ viewModal: false });
            }}
          >
            <h3 className={classes.textTransform}>{this.state.item} Details</h3>
          </CustomDialog>

          <DialogContent
            id="classic-modal-slide-description"
            className={classes.modalBody}
          >
            <GridContainer>
              <Card plain className={classes.cardClasses}>
                <CardBody formHorizontal plain>
                  <div className="table-responsive">
                    <table className="table">
                      <tbody>
                        <tr>
                          <th scope="row">Item</th>
                          <td>{this.state.item}</td>
                        </tr>
                        <tr>
                          <th scope="row">Priority</th>
                          <td>{this.state.priority}</td>
                        </tr>
                        {this.state.potentialAnswer &&
                          this.state.potentialAnswer.length > 0 && (
                            <tr>
                              <th scope="row">Potential Answer</th>
                              <td>{this.state.potentialAnswer}</td>
                            </tr>
                          )}

                        {this.state.securityIssue &&
                          this.state.securityIssue.length > 0 && (
                            <tr
                              className={
                                this.state.securityIssue == "Environmental"
                                  ? "table-warning"
                                  : this.state.securityIssue == "Safety"
                                  ? "table-danger"
                                  : ""
                              }
                            >
                              <th scope="row">Security Issue</th>
                              <td>{this.state.securityIssue}</td>
                            </tr>
                          )}

                        <tr>
                          <th scope="row">status</th>
                          <td>
                            {this.state.status
                              ? this.state.status
                              : "Not provided yet"}
                          </td>
                        </tr>
                        {this.state.suggestion &&
                          this.state.suggestion.length > 0 && (
                            <tr>
                              <th scope="row">Suggestion</th>
                              <td>{this.state.suggestion}</td>
                            </tr>
                          )}
                        {this.state.description &&
                          this.state.description.length > 0 && (
                            <tr>
                              <th scope="row">Description</th>
                              <td>{this.state.description}</td>
                            </tr>
                          )}
                        {this.state.observation &&
                          this.state.observation.length > 0 && (
                            <tr>
                              <th scope="row">Observation</th>
                              <td>{this.state.observation}</td>
                            </tr>
                          )}

                        <tr>
                          <th scope="row">Updated At</th>
                          <td>
                            {" "}
                            {this.state.updatedAt && (
                              <span>
                                Updated By{" "}
                                {this.state.lastModifiedBy
                                  ? this.state.lastModifiedBy
                                  : "admin admin"}{" "}
                                on {moment(this.state.updatedAt).format("lll")}
                              </span>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Multimedia</th>
                          <td>
                            {this.state.MultimediaItemArray &&
                            this.state.MultimediaItemArray.length > 0 ? (
                              <div className="row">
                                {this.state.MultimediaItemArray.map(
                                  (filedata, index) => (
                                    <>
                                      {filedata.type &&
                                      filedata.type === "image" ? (
                                        <div
                                          className="thumb-preview-forDescription col-12"
                                          key={filedata.fileId}
                                        >
                                          <div className="row border rounded p-2">
                                            <div className="col-md-6 col-12">
                                              <Image
                                                src={filedata.multimedia}
                                                alt=""
                                                width={1000}
                                                height={500}
                                              />
                                            </div>
                                            <div className="col-md-6 col-12">
                                              {filedata.answer
                                                ? filedata.answer
                                                : "Not answered yet"}
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <div
                                          className="thumb-preview-forDescription col-12"
                                          key={filedata.fileId}
                                        >
                                          <div className="row border rounded p-2">
                                            <div className="col-md-6 col-12">
                                              <video
                                                muted
                                                autoPlay
                                                loop
                                                playsInline
                                                style={{
                                                  width: "100%",
                                                }}
                                              >
                                                <source
                                                  src={filedata.multimedia}
                                                  type="video/mp4"
                                                />
                                                <source
                                                  src={filedata.multimedia}
                                                  type="video/ogg"
                                                />
                                              </video>
                                            </div>
                                            <div className="col-md-6 col-12">
                                              {filedata.answer
                                                ? filedata.answer
                                                : "Not answered yet"}
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </>
                                  )
                                )}
                              </div>
                            ) : (
                              "No multimedia added yet"
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardBody>
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
          open={this.state.openMultimediaModal}
          onClose={() => {
            this.setState({
              openMultimediaModal: false,
              itemId: "",
              setLicenseImage: undefined,
              answer: "",
            });
          }}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <CustomDialog
            color="success"
            close={() => {
              this.setState({
                openMultimediaModal: false,
                itemId: "",
                setLicenseImage: undefined,
                answer: "",
              });
            }}
          >
            <h3 className={classes.textTransform}>
              {this.state?.setLicenseImage?.editData
                ? "Edit Multimedia"
                : "Add Multimedia"}
            </h3>
          </CustomDialog>

          <DialogContent
            id="classic-modal-slide-description"
            className={classes.modalBody}
          >
            <GridContainer>
              <Card plain className={classes.cardClasses}>
                <CardBody formHorizontal plain>
                  <GridItem sm={12}>
                    <label>
                      <strong style={{ fontSize: "25px" }}>
                        Upload multimedia with its label
                      </strong>
                      <br />
                      {/* {!this.state?.setLicenseImage?.editData && (
                        <span className="text-danger">
                          **Add Image carefully, it can't be edited**
                        </span>
                      )} */}
                    </label>
                  </GridItem>

                  <GridItem sm={12}>
                    <div className="row">
                      <div className="col-12 col-md-6">
                        {this.state.setLicenseImage ? (
                          <div
                            className="thumb-preview text-center"
                            style={{ height: "auto" }}
                          >
                            {this.state?.setLicenseImage?.fileType ==
                            "image" ? (
                              <>
                                {" "}
                                <img
                                  src={this.state.setLicenseImage?.fileurl}
                                  alt=""
                                  style={{
                                    height: "auto",
                                    width: "50%",
                                  }}
                                />
                              </>
                            ) : (
                              <video
                                controls
                                controlsList="nodownload"
                                style={{
                                  height: "auto",
                                  width: "50%",
                                }}
                              >
                                <source
                                  src={this.state.setLicenseImage?.fileurl}
                                  type="video/mp4"
                                />
                                <source
                                  src={this.state.setLicenseImage?.fileurl}
                                  type="video/ogg"
                                />
                                <source
                                  src={this.state.setLicenseImage?.fileurl}
                                  type="video/webm"
                                />
                              </video>
                            )}
                            {!this.state?.setLicenseImage?.editData && (
                              <button
                                className="btn-reset"
                                type="button"
                                onClick={this.removeThumbnail}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            )}
                          </div>
                        ) : (
                          <div className="input-thumb">
                            <label htmlFor="thumb-file">
                              <img
                                src={addthumbnail}
                                alt=""
                                style={{
                                  width: "-webkit-fill-available",
                                }}
                              />
                            </label>
                            <input
                              type="file"
                              className="d-none"
                              id="thumb-file"
                              autoComplete="false"
                              accept={["video/*", "image/*"]}
                              onChangeCapture={this.uploadThumbnail}
                            />
                          </div>
                        )}
                      </div>
                      <div className="col-12 col-md-6">
                        <TextareaAutosize
                          style={{ borderRadius: "6px" }}
                          label={"answer"}
                          aria-label="minimum height"
                          rowsMin={5}
                          className="description-text pl-2 py-2"
                          placeholder={"answer"}
                          // variant="outlined"
                          fullWidth
                          value={this.state.answer}
                          onChange={(e) => {
                            this.setState({
                              answer: e.target.value,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </GridItem>
                </CardBody>
              </Card>
            </GridContainer>
          </DialogContent>
          <DialogActions>
            <>
              <Button
                color="success"
                disabled={
                  this.state?.answer?.length == 0 ||
                  this.state.setLicenseImage == undefined
                }
                onClick={
                  this.state?.setLicenseImage?.editData
                    ? this.updateImageData
                    : this.uploadImageData
                }
              >
                {this.state?.setLicenseImage?.editData ? "Update" : "Upload"}
              </Button>
            </>
          </DialogActions>
        </Dialog>
        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.paper2,
          }}
          fullWidth={true}
          open={this.state.filterModal}
          onClose={() => {
            this.setState({
              filterModal: false,
            });
          }}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="classic-modal-slide-title"
          aria-describedby="classic-modal-slide-description"
        >
          <CustomDialog
            color="success"
            close={() => {
              this.setState({
                filterModal: false,
              });
            }}
          >
            <h3 className={classes.textTransform}>Filter Data</h3>
          </CustomDialog>

          <DialogContent
            id="classic-modal-slide-description"
            className={classes.modalBody}
          >
            <GridContainer>
              <Card plain className={classes.cardClasses}>
                <CardBody formHorizontal plain>
                  <GridContainer>
                    <GridItem xs={12}>
                      <label className="text-danger">
                        <b>*** You can apply only one filter at a time ***</b>
                      </label>
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4}>
                      <h5>
                        <strong>Status</strong>{" "}
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
                        select
                        name="statusFilter"
                        value={this.isChange && this.filterDataValue}
                        aria-label="minimum height"
                        placeholder={"--Select--"}
                        variant="outlined"
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        onChange={this.handleFilter}
                      >
                        <option value="">--Select--</option>
                        <option value="">All Area</option>
                        <option value="Satisfactory">Satisfactory</option>
                        <option value="Marginal">Marginal</option>
                        <option value="Repair">Repair or Replacement</option>
                        <option value="Evaluation">Evaluation</option>
                      </TextField>
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4}>
                      <h5>
                        <strong>Security</strong>{" "}
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
                        select
                        name="securityFilter"
                        value={this.isChange && this.filterDataValue}
                        aria-label="minimum height"
                        placeholder={"--Select--"}
                        variant="outlined"
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        onChange={this.handleFilter}
                      >
                        <option value="">--Select--</option>
                        <option value="Safety">Safety</option>
                        <option value="Environmental">Environmental</option>
                      </TextField>
                    </GridItem>

                    <GridItem xs={12} sm={4} md={4}>
                      <h5>
                        <strong>Priority</strong>{" "}
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
                        select
                        aria-label="minimum height"
                        placeholder={"--Select--"}
                        variant="outlined"
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        onChange={this.handleSort}
                      >
                        <option value="">--Select--</option>
                        <option value="H_L">High to Low</option>
                        <option value="L_H">Low to High</option>
                      </TextField>
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridContainer>
          </DialogContent>
          <DialogActions></DialogActions>
        </Dialog>
        <FooterLow />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getInspectorDetails: state.userReducer.getInspectorDetails,
});
export default connect(mapStateToProps)(withStyles(style)(InspectionItem));
