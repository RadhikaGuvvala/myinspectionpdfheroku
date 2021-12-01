import Slide from "@material-ui/core/Slide";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import Image from "next/image";
import Router from "next/router";
import React, { Component } from "react";
import { connect } from "react-redux";
import Compress from "compress.js";
import fuel from "../../public/img/search-icon.webp";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import addthumbnail from "../../Documentation/assets/img/add-thumbnail.webp";
import InfoIcon from "@material-ui/icons/Info";
import EditIcon from "@material-ui/icons/Edit";
import noImage from "../../public/img/no-image.webp";
import styles from "../../styles/jss/nextjs-material-kit-pro/pages/ecommerceStyle";
import productStyle from "../../styles/jss/nextjs-material-kit-pro/pages/landingPageSections/productStyle";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import Button from "../../components/CustomButtons/Button";
import FooterLow from "../../components/Footer/FooterLow";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import UpperHeader from "../../components/Header/UpperHeader";
import Parallax from "../../components/Parallax/Parallax";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import CustomDialog from "../../components/CustomDialog/CustomDialog";
import HelpIcon from "@material-ui/icons/Help";
import moment from "moment";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import "../../Documentation/assets/css/react_toggle.css";
// import connection from '../../lib/axiosInstance';
import { toast } from "react-toastify";
import { getAreaArray } from "../../lib/getInspection";
import { loaderHide, loaderShow } from "../../lib/loaderHideShow";
import middleware from "../../middleware/middleware";
import {
  increaseViewsCollection,
  getParticularInspectionData,
  saveArea,
  removeArea,
  editparticulararea,
  uploadimage,
  addMultimediaArea,
  updateMultimediaArea,
  changeWorkAreaStatus,
  getAllBaseInspections,
  addBaseInspection,
} from "../../redux/action/action";
// import MultiSwitch from "react-multi-switch-toggle";
import {
  IconButton,
  InputAdornment,
  Tooltip,
  TextareaAutosize,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Clear, Search } from "@material-ui/icons";
import Swal from "sweetalert2";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import AccordionView from "../../components/InspectionTemplates/AccordionView";
// let RLDD;
// if (typeof window !== 'undefined') {
//   RLDD = require('react-list-drag-and-drop/lib/RLDD').default;
// }
const style = {
  ...styles,
  ...productStyle,
};
const useStyles = makeStyles(styles);
const validateAreaLength = (str) => {
  return str.length <= 50;
};
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export async function getServerSideProps(context) {
  try {
    await middleware.apply(context.req, context.res);
    const p = await getAreaArray(context.req, context);
    if (!p) context.res.statusCode = 404;
    else {
      if (p ? p.length : 0 > 0) {
        p[0]?.AreaArray &&
          p[0]?.AreaArray.forEach((element, index) => {
            element.id = index;
          });
        p[0]?.AreaArray &&
          p[0]?.AreaArray.sort(function (a, b) {
            return a.sortId - b.sortId;
          });
        var areaArray = p[0]?.AreaArray ? p[0]?.AreaArray : [];
      }
      return {
        props: {
          CollectionData: JSON.stringify(p),
          areaArray: JSON.stringify(areaArray),
        }, // will be passed to the page component as props
      };
    }
  } catch (err) {
    console.log(err);
  }
}
class InspectionCenterOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      random: false,
      CollectionData: JSON.parse(props.CollectionData)
        ? JSON.parse(props.CollectionData)
        : [],
      baseTemplates: [],
      areaNames: JSON.parse(props.areaArray) ? JSON.parse(props.areaArray) : [],
      addModal: false,
      editModal: false,
      viewModal: false,
      openMultimediaModal: false,
      filterModal: false,
      addTemplateModal: false,
      selectedBaseInspection: [],
      SearchData: "",
      areaId: "",
      area: "",
      priority: "",
      status: "",
      groupSize: 1,
      MultimediaAreaArray: [],
      answer: "",
      answerImg: "",
      description: "",
      suggestion: "",
      observation: "",
    };
    this.filter = {
      limit: 1000,
      pageNumber: 1,
      isSearching: false,
      searchingData: "",
      status: "",
    };
    this.areaNames = "";
  }

  onGroupSizeSelect = async (value, questionData) => {
    loaderShow();
    // console.log(value, questionData);
    // console.log(questionData.workStatus, value);
    if (
      !questionData.workStatus ||
      (questionData.workStatus && value !== null)
    ) {
      const data = {
        workStatus: value,
        editId: Router.router.query.id,
        areaId: questionData.areaId,
      };
      // this.setState({ groupSize: value });
      const result = await this.props.dispatch(changeWorkAreaStatus(data));
      if (result) {
        await this.getParticularInspectionData();
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
      this.increaseViewsCollection();
      this.getParticularInspectionData();
    }, 1000);
  }
  handleTemplateSelect = async (e) => {
    this.setState({
      selectedBaseInspection: this.state.baseTemplates.filter(
        (base, index) => base.inspectionObject === e.target.value
      ),
    });
  };
  handleFilter = async (e) => {
    this.filter.searchingData = e.target.value;
    this.filter.isSearching = this.filter.searchingData ? true : false;
    this.getParticularInspectionData();
    this.setState({
      filterModal: false,
    });
  };

  handleSort = async (e) => {
    if (e.target.value == "H_L") {
      this.setState({
        areaNames: this.state?.areaNames?.sort(
          (a, b) => b.priorityNo - a.priorityNo
        ),
        filterModal: false,
      });
    } else if (e.target.value == "L_H") {
      this.setState({
        areaNames: this.state?.areaNames?.sort(
          (a, b) => a.priorityNo - b.priorityNo
        ),
        filterModal: false,
      });
    } else {
      this.getParticularInspectionData();
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
      areaId: this.state.areaId,
      answer: this.state.answer,
      fileId: this.state.setLicenseImage.fileId,
    };

    let result = await this.props.dispatch(
      updateMultimediaArea(data, this.props.history)
    );
    if (result) {
      this.getParticularInspectionData();
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
        areaId: this.state.areaId,
        multimedia: this.state.answerImg,
        answer: this.state.answer,
        type1: this.state.setLicenseImage.fileType,
      };

      let result = await this.props.dispatch(
        addMultimediaArea(data, this.props.history)
      );
      if (result) {
        this.getParticularInspectionData();
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
      text: `Are you sure you want to delete ${this.state.area}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteArea(id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.setState({
          editModal: true,
        });
      }
    });
  };

  deleteArea = async (id) => {
    loaderShow();
    const data = {
      deleteId: Router.router.query.id,
      areaId: id,
    };
    const result = await this.props.dispatch(removeArea(data));
    if (result.data) {
      this.getParticularInspectionData();
      Swal.fire(
        "Deleted!",
        `${this.state.area} delete successfully`,
        "success"
      );
      this.setState({
        area: "",
        priority: "",
        observation: "",
        description: "",
        MultimediaAreaArray: "",
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
        areaId: data.areaId,
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
        areaId: data.areaId,
        answer: "",
      });
    }
  };
  openViewModal = (data) => {
    this.setState({
      viewModal: true,
      areaId: data.areaId,
      area: data.area,
      priority: data.priority,
      status: data.status,
      MultimediaAreaArray: data.MultimediaAreaArray,
      description: data.description,
      observation: data.observation,
      suggestion: data.suggestion,
      updatedAt: data.updatedAt,
      lastModifiedBy: data.lastModifiedBy,
    });
  };
  openAddModal = () => {
    this.setState({
      addModal: true,
      areaId: "",
      area: "",
      priority: "",
      observation: "",
      status: "",
      MultimediaAreaArray: "",
      description: "",
      suggestion: "",
      updatedAt: "",
    });
  };
  openAddTemplateModal = async () => {
    loaderShow();
    const data = {
      inspectorDomain: this.props.getInspectorDetails.inspectionSpecialities,
    };
    const result = await this.props.dispatch(getAllBaseInspections(data));
    if (result) {
      this.setState({
        baseTemplates: result.data,
        addTemplateModal: true,
      });
    } else {
      console.log("err");
    }

    loaderHide();
  };
  openEditModal = (data) => {
    this.setState({
      editModal: true,
      editId: Router.router.query.id,
      areaId: data.areaId,
      area: data.area,
      priority: data.priority,
      status: data.status,
      observation: data.observation,
      MultimediaAreaArray: data.MultimediaAreaArray,
      description: data.description,
      suggestion: data.suggestion,
    });
  };
  handleAddBaseInspection = async () => {
    loaderShow();
    const data = {
      editId: Router.router.query.id,
      AreaArray: this.state.selectedBaseInspection[0].AreaArray,
    };
    const result = await this.props.dispatch(addBaseInspection(data));
    if (result.data) {
      this.getParticularInspectionData();
      this.setState({
        selectedBaseInspection: [],
        editId: "",
        addTemplateModal: false,
      });
      toast.success("Template Successfully Added");
    } else {
      console.log("err");
    }
    loaderHide();
  };
  editParticularInspectionArea = async () => {
    var data = {
      lastModifiedBy: `${this.props.getInspectorDetails.firstName} ${this.props.getInspectorDetails.lastName}`,
      editorId: this.props.getInspectorDetails._id,
      editId: this.state.editId,
      areaId: this.state.areaId,
      area: this.state.area,
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
      description: this.state.description,
      observation: this.state.observation,
      suggestion: this.state.suggestion,
    };
    let result = await this.props.dispatch(
      editparticulararea(data, this.props.history)
    );
    if (result) {
      this.getParticularInspectionData();
      toast.success(`${this.state.area} successfully updated`);
      this.setState({
        area: "",
        priority: "",
        description: "",
        observation: "",
        status: "",
        suggestion: "",
        MultimediaAreaArray: "",
        addModal: false,
        editModal: false,
      });
    } else {
      console.log("error is");
    }
  };

  addParticularInspectionArea = async () => {
    var sortIdValue = 0;
    if (this.state.areaNames && this.state.areaNames.length > 0) {
      const lastItem = this.state.areaNames
        ? this.state.areaNames[this.state.areaNames.length - 1]
        : [];
      sortIdValue = lastItem.sortId + 1;
    }
    var data = {
      area: this.state.area,
      inspectionObjectId: Router.router.query.id,
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
      createdBy: ["inspector"],
      lastModifiedBy: `${this.props.getInspectorDetails.firstName} ${this.props.getInspectorDetails.lastName}`,
      editorId: this.props.getInspectorDetails._id,
      description: this.state.description,
      observation: this.state.observation,
      suggestion: this.state.suggestion,
      sortId: sortIdValue ? sortIdValue : 0,
    };
    let result = await this.props.dispatch(saveArea(data, this.props.history));
    if (result) {
      this.getParticularInspectionData();
      toast.success(`${this.state.area} added successfully`);
      this.setState({
        area: "",
        priority: "",
        description: "",
        observation: "",
        MultimediaAreaArray: "",
        status: "",
        suggestion: "",
        addModal: false,
      });
    } else {
      toast.error(`${this.state.area} is already exists`);
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
    if (this.state.areaNames && this.state.areaNames.length > 0) {
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
    this.getParticularInspectionData();
  };

  getParticularInspectionData = async () => {
    loaderShow();
    let data = {
      inspectionId: Router.router.query.id,
      filter: this.filter,
    };
    let result = await this.props.dispatch(getParticularInspectionData(data));
    if (result) {
      this.areaNames = [];
      if (this.filter.searchingData) {
        result.data &&
          result.data.forEach((data) => {
            this.areaNames.push(data.AreaArray);
          });
        if (this.areaNames ? this.areaNames : 0 > 0) {
          this.areaNames.sort(function (a, b) {
            return a.sortId - b.sortId;
          });
        }
        this.setState({
          areaNames: this.areaNames,
          random: !this.state.random,
        });
      } else {
        if (
          result.data[0].AreaArray ? result.data[0].AreaArray.length : 0 > 0
        ) {
          result.data[0].AreaArray.sort(function (a, b) {
            return a.sortId - b.sortId;
          });
          result.data[0].AreaArray.forEach((element, index) => {
            element.id = index;
          });
        }
        // this.nameofComponet = result.data ? result.data[0].heading : [];
        (this.areaNames = result.data ? result.data[0].AreaArray : []),
          this.setState({
            areaNames: this.areaNames,
            CollectionData: result.data ? result.data : [],
          });
      }
    }
    loaderHide();
  };

  handleSearch = (e) => {
    this.filter.searchingData = this.state.SearchData;
    this.filter.isSearching = this.filter.searchingData ? true : false;
    this.getParticularInspectionData();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <UpperHeader />
        <Parallax
          image={
            // this.state.CollectionData[0].questionImage &&
            // this.state.CollectionData[0].questionImage.length > 0
            //   ? this.state.CollectionData[0].questionImage
            // :
            require("public/img/examples/clark-street-merc.webp")
          }
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
                          placeholder={"Search for Area..."}
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
              {" > "}
              <a href="#" className="upper">
                {this.state.CollectionData[0].inspectionObject
                  .charAt(0)
                  .toUpperCase() +
                  this.state.CollectionData[0].inspectionObject.slice(1)}
              </a>
            </div>
            <div
              className={classes.innerDiv}
              style={{ backgroundColor: "#e2f0d9" }}
            >
              {/* <Button onClick={this.openAddModal} color="success">Add Question</Button> */}
              {this.state.CollectionData.length > 0 ? (
                <>
                  {this.state.CollectionData.map((data, index) => {
                    return (
                      <>
                        <GridContainer justify="center" key={index}>
                          {/* <GridItem md={1} sm={12}>
                                                </GridItem> */}
                          <GridItem md={3} sm={12}>
                            <div className={classes.imageSectionOne}>
                              <Image
                                src={
                                  data.questionImage
                                    ? data.questionImage
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
                              <h3 className="first-lc">
                                {data.inspectionObject}
                              </h3>
                              <h4 className="first-lc">
                                {data.inspectionType}
                              </h4>
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
                                  Areas in this collection
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
                            </div>
                          </GridItem>
                          <GridItem md={4} sm={12}>
                            <div className="float-md-right">
                              <Button
                                color="warning"
                                onClick={this.openAddModal}
                              >
                                Add Custom Area
                              </Button>
                              <br />
                              <Button
                                color="warning"
                                onClick={this.openAddTemplateModal}
                              >
                                Add Templates
                              </Button>
                              <br/>
                              <Button
                                color="warning"
                                
                              ><a 
                              href={`/generate/${data._id}`}
                            >Download PDF</a>
                            </Button>
                            {/* <Button
                                color="warning"
                                
                              >
                                <a href="/api/getApi">Downloadss PDF</a>;
                              </Button> */}
                            </div>
                          </GridItem>
                        </GridContainer>
                        {this.state.areaNames &&
                        this.state.areaNames.length > 0 ? (
                          <>
                            {this.state.areaNames &&
                              this.state.areaNames.map((questionData, i) => {
                                return (
                                  <Card key={i}>
                                    <CardBody>
                                      <GridContainer>
                                        <GridItem sm={12}>
                                          <div className="row">
                                            <div className="col-md-8 col-sm-12">
                                              <a
                                                href={`/inspectionCenter/${data._id}/${questionData.areaId}`}
                                              >
                                                <h3
                                                  className="first-lc"
                                                  style={
                                                    questionData.createdBy &&
                                                    questionData.createdBy.includes(
                                                      "inspector"
                                                    ) && { color: "#ff66a3" }
                                                  }
                                                >
                                                  {questionData.area}{" "}
                                                </h3>

                                                <h5 className="innerTitile">
                                                  {`${questionData.priority}-Priority`}
                                                </h5>
                                              </a>
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
                                            <p className="text-dark">
                                              {questionData.observation}
                                            </p>
                                          )}
                                          <div className="row">
                                            {questionData.MultimediaAreaArray &&
                                              questionData.MultimediaAreaArray.map(
                                                (filedata, index) => (
                                                  <>
                                                    {filedata.type &&
                                                    filedata.type ===
                                                      "image" ? (
                                                      <div
                                                        className="thumb-preview-forDescription col-md-3 col-12"
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
                                                        className="thumb-preview-forDescription col-md-3 col-12"
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

                                          <div className="row">
                                            <div className="col-md-8 col-sm-12">
                                              <span
                                                className={
                                                  (classes.title,
                                                  classes.noMarginOne)
                                                }
                                              >
                                                {questionData.ItemArray
                                                  ? questionData.ItemArray
                                                      .length
                                                  : 0}{" "}
                                                items in this area
                                              </span>
                                              <br />
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
                                                  : "admin admin"}{" "}
                                                on{" "}
                                                {moment(
                                                  questionData.updatedAt
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
                                          {/* <h6 className={(classes.title, classes.noMarginOne)}>Written by: - {questionData.writtenBy}</h6>
                <h6>{this.timeSince(questionData.updatedAt)} ago</h6> */}
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
              areaId: "",
              area: "",
              priority: "",
              observation: "",
              status: "",
              MultimediaAreaArray: [],
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
              this.state.area == "" ||
              this.state.priority == "" ||
              this.state.description == "" ||
              this.state.suggestion == ""
            }
            close={() => {
              this.setState({
                areaId: "",
                area: "",
                priority: "",
                observation: "",
                MultimediaAreaArray: [],
                description: "",
                suggestion: "",
                addModal: false,
                editModal: false,
                viewModal: false,
              });
            }}
          >
            <h3 className={classes.textTransform}>
              {this.state.addModal ? "Add Area" : `${this.state.area} Details`}
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
                    {/* <GridItem xs={0} sm={8} md={8}></GridItem>
                    <GridItem
                      xs={12}
                      sm={4}
                      md={4}
                      className={classes.alignItemsCenter}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="primary"
                            onChange={() => (this.statechecked = true)}
                          />
                        }
                        label="Want to add security issue"
                        labelPlacement="end"
                      />
                    </GridItem> */}
                    <GridItem xs={12} sm={4} md={4}>
                      <h5>
                        <strong>
                          Area
                          <sup className="required" style={{ color: "red" }}>
                            *
                          </sup>
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
                        label={"Area Name"}
                        placeholder={"Area Name"}
                        variant="outlined"
                        fullWidth
                        inputProps={{
                          value: this.state.area,
                          onChange: (e) => {
                            this.setState({
                              area: e.target.value,
                            });
                          },
                        }}
                      />
                      {this.state.area && !validateAreaLength(this.state.area) && (
                        <ul
                          style={{
                            color: "red",
                            paddingLeft: "10px",
                            fontSize: "14px",
                          }}
                        >
                          <li>Maximum Length is 50</li>
                        </ul>
                      )}
                    </GridItem>

                    <GridItem xs={12} sm={4} md={4}>
                      <h5>
                        <strong>
                          Priority
                          <sup className="required" style={{ color: "red" }}>
                            *
                          </sup>
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
                          Status
                          <sup className="required" style={{ color: "red" }}>
                            *
                          </sup>{" "}
                        </strong>
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
                                    : this.state.status == "Repair"
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
                        value={
                          this.state.suggestion ? this.state.suggestion : ""
                        }
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
                        placeholder="Description"
                        variant="outlined"
                        fullWidth
                        value={
                          this.state.description &&
                          this.state.description?.length &&
                          this.state.description?.length > 0
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
                        value={
                          this.state?.observation ? this.state?.observation : ""
                        }
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
                    {/* <GridItem xs={12} sm={4} md={4}>
                      <h5>
                        <strong>Other Observation</strong>{" "}
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
                        label={"Other Observation"}
                        aria-label="minimum height"
                        rowsMin={5}
                        className="description-text pl-2 py-2"
                        placeholder={"Other Observation"}
                        variant="outlined"
                        fullWidth
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
                   */}
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
                  ? this.addParticularInspectionArea
                  : this.editParticularInspectionArea
              }
              disabled={
                this.state.area == "" ||
                this.state.priority == "" ||
                this.state.priority == "--Select--" ||
                this.state.status == "" ||
                this.state.status == "--Select--"
              }
            >
              {this.state.addModal ? "Add" : "Update"}
            </Button>
            {this.state.editModal && (
              <Button
                color="danger"
                onClick={() => this.handleDelete(this.state.areaId)}
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
              areaId: "",
              area: "",
              priority: "",
              observation: "",
              MultimediaAreaArray: [],
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
            <h3 className={classes.textTransform}>{this.state.area} Details</h3>
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
                          <th scope="row">Area</th>
                          <td>{this.state.area}</td>
                        </tr>
                        <tr>
                          <th scope="row">Priority</th>
                          <td>{this.state.priority}</td>
                        </tr>
                        <tr>
                          <th scope="row">status</th>
                          <td>
                            {this.state.status
                              ? this.state.status
                              : "Not provided yet"}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Suggestion</th>
                          <td>
                            {this.state.suggestion &&
                            this.state.suggestion.length > 0
                              ? this.state.suggestion
                              : "Not Provided yet"}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Description</th>
                          <td>
                            {this.state.description &&
                            this.state.description.length > 0
                              ? this.state.description
                              : "Not Provided yet"}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Observation</th>
                          <td>
                            {this.state.observation &&
                            this.state.observation.length > 0
                              ? this.state.observation
                              : "Not Provided yet"}
                          </td>
                        </tr>
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
                            {this.state.MultimediaAreaArray &&
                            this.state.MultimediaAreaArray.length > 0 ? (
                              <div className="row">
                                {this.state.MultimediaAreaArray.map(
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
              areaId: "",
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
                areaId: "",
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
                                style={{
                                  height: "auto",
                                  width: "50%",
                                }}
                                controls
                                controlsList="nodownload"
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
                disabled={this.state.setLicenseImage == undefined}
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
                        aria-label="minimum height"
                        placeholder={"--Select--"}
                        variant="outlined"
                        fullWidth
                        SelectProps={{
                          native: true,
                        }}
                        onChange={this.handleFilter}
                      >
                        <option value="">All Area</option>
                        <option value="Satisfactory">Satisfactory</option>
                        <option value="Marginal">Marginal</option>
                        <option value="Repair">Repair or Replacement</option>
                        <option value="Evaluation">Evaluation</option>
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
        <Dialog
          classes={{
            root: classes.modalRoot,
            paper: classes.paper2,
          }}
          fullWidth={true}
          open={this.state.addTemplateModal}
          onClose={() => {
            this.setState({
              addTemplateModal: false,
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
                addTemplateModal: false,
              });
            }}
          >
            <h3 className={classes.textTransform}>
              Add Inspection Template for{" "}
              {this.state.CollectionData[0].inspectionObject}
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
                    <GridItem xs={12}>
                      <label className="text-danger">
                        <b>
                          You can add these templates directly into your
                          inspection
                        </b>
                      </label>
                    </GridItem>
                    <GridItem xs={12} sm={4} md={4}>
                      <h5>
                        <strong>Template Name</strong>{" "}
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
                        onChange={this.handleTemplateSelect}
                      >
                        <option value={[]}>--Select--</option>
                        {this.state.baseTemplates.length > 0 &&
                          this.state.baseTemplates.map(
                            (baseTemplate, index) => (
                              <option value={baseTemplate.inspectionObject}>
                                {baseTemplate.inspectionObject}
                              </option>
                            )
                          )}
                      </TextField>
                    </GridItem>
                    <GridItem xs={12}>
                      {this.state.selectedBaseInspection &&
                        this.state.selectedBaseInspection.length > 0 &&
                        this.state.selectedBaseInspection.map(
                          (baseInspection, baseIndex) => (
                            <AccordionView
                              key={baseIndex}
                              baseInspection={baseInspection}
                              baseIndex={baseIndex}
                            />
                          )
                        )}
                    </GridItem>
                  </GridContainer>
                </CardBody>
              </Card>
            </GridContainer>
          </DialogContent>
          <DialogActions>
            <>
              <Button
                color="success"
                disabled={this.state.selectedBaseInspection.length === 0}
                onClick={this.handleAddBaseInspection}
              >
                Add
              </Button>
            </>
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
export default connect(mapStateToProps)(withStyles(style)(InspectionCenterOne));
