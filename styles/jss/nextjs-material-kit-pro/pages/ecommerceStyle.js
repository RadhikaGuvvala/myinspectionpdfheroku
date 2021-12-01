import {
  blackColor,
  container,
  description,
  grayColor,
  hexToRgb,
  main,
  mainRaised,
  mlAuto,
  mrAuto,
  title,
  whiteColor,
} from "../../../../styles/jss/nextjs-material-kit-pro";
import imagesStyles from "../../../../styles/jss/nextjs-material-kit-pro/imagesStyles";

const styles = {
  ...imagesStyles,
  title,
  main,
  mainRaised,
  mrAuto,
  mlAuto,
  description,
  textCenter: {
    textAlign: "center !important",
  },
  container: {
    ...container,
    zIndex: "2",
  },
  brand: {
    "& h1, & h4": {
      color: whiteColor,
    },
  },
  wishclass: {
    width: "350px",
    backgroundColor: "#148F77",
    color: "white",
  },
  mainRaisedOne: {
    ...mainRaised,
    margin: "43px 30px 0px",
  },
  roundCard: {
    borderRadius: "100px !important",
    padding: "50px !important",
    backgroundColor: "#e2f0d9",
  },
  roundCardwthOutColor: {
    borderRadius: "100px !important",
    padding: "50px !important",
  },
  roundCardwthOutColorOne: {
    borderRadius: "100px !important",
    padding: "50px !important",
  },
  "@media (max-width: 992px)": {
    wishclass: {
      width: "240px",
      fontSize: "18px",
    },
    roundCard: {
      borderRadius: "100px !important",
    },
    mobileView: {
      display: "block",
    },
    desktopView: {
      display: "none",
    },
    title: {
      fontSize: "18px",
    },
    buttonLength: {
      fontSize: "10px",
    },
  },
  "@media (min-width: 992px)": {
    mobileView: {
      display: "none",
    },
    desktopView: {
      display: "block",
    },
  },
  card: {},
  subscribeButton: {},
  cardBody: {
    padding: "15px",
    "& form": {
      marginBottom: "0",
    },
  },
  cardForm: {
    margin: "0 0 0 14px",
    padding: 0,
    top: 10,
  },
  subscribeLine: {
    padding: "1.875rem 0px",
    "& $card": {
      marginTop: "30px",
    },
    "& form": { margin: "0px" },
    "&$subscribeLineImage:after": {
      position: "absolute",
      zIndex: 1,
      width: "100%",
      height: "100%",
      display: "block",
      left: 0,
      top: 0,
      content: '""',
      backgroundColor: "rgba(" + hexToRgb(blackColor) + ",0.66)",
    },
  },
  subscribeLineImage: {
    position: "relative",
    backgroundPosition: "top center",
    backgroundSize: "cover",
    "& $container": {
      zIndex: 2,
      position: "relative",
    },
    "& $title": {
      color: whiteColor,
    },
    "& $description": {
      color: grayColor[0],
    },
  },
  socialFeed: {
    "& p": {
      display: "table-cell",
      verticalAlign: "top",
      overflow: "hidden",
      paddingBottom: "10px",
      maxWidth: 300,
    },
    "& i": {
      fontSize: "20px",
      display: "table-cell",
      paddingRight: "10px",
    },
  },
  img: {
    width: "20%",
    marginRight: "5%",
    marginBottom: "5%",
    float: "left",
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0",
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto",
  },
  left: {
    float: "left!important",
    display: "block",
  },
  right: {
    padding: "15px 0",
    margin: "0",
    float: "right",
  },
  aClass: {
    textDecoration: "none",
    backgroundColor: "transparent",
  },
  block: {
    color: "inherit",
    padding: "0.9375rem",
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block",
  },
  textTransform: {
    textTransform: "capitalize !important",
    fontSize: "25px",
  },
  listContent: {
    fontSize: "1.875rem",
  },
  createButton: {
    position: "absolute",
    right: 10,
    color: "white",
  },
  barColor: {
    backgroundColor: "#148F77",
    margin: 0,
    color: "white",
  },
  commonColor: {
    color: "white",
    backgroundColor: "#148F77",
  },
  colorPages: {
    height: "100%",
    boxShadow:
      "rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, rgba(0, 0, 0, 0.12) 0px 6px 30px 5px, rgba(0, 0, 0, 0.2) 0px 8px 10px -5px",
  },
  roundClass: {
    borderRadius: "50px",
  },
  footerhead: {
    fontWeight: "bold",
    fontSize: "24px",
    color: "white",
    textAlign: "center",
  },
  footerLink: {
    fontSize: "20px",
    color: "#3C4858",
    fontWeight: "500",
    lineHeight: "24px",
  },
  footerLink1: {
    fontSize: "17px",
    color: "#3C4858",
    lineHeight: "24px",
  },
  cardHeader1: {
    width: "auto",
    textAlign: "center",
  },
  allcolor: {
    backgroundColor: "#0C9479",
  },
  "@media (max-width: 960px)": {
    testClasss: {
      padding: "0px",
      marginTop: "80px",
    },
  },
  parallaxVideo: {
    position: "relative",
    textAlign: "center",
    color: "white",
  },

  // parallaxvideo: { position: 'relative' },
  parallaxvideo: {
    video: {
      position: "relative",
      zIndex: 0,
    },
  },
  overlayClass: {
    position: "absolute",
    top: "230px",
    left: "50px",
    zIndex: 1,
  },
  buttonText: {
    margin: "0px",
    display: "inline-flex",
    position: "relative",
    fontSize: "18px",
    fontWeight: 400,
    lineHeight: "20px",
    textDecoration: "none",
    textTransform: "none !important",
  },
  bannerText: {
    fontSize: "1.6rem",
    lineHeight: "1.55em",
    fontWeight: 400,
    color: "white",
  },
  businessHeading: {
    color: whiteColor,
    fontWeight: 600,
    marginTop: "30px",
    minHeight: "32px",
    fontFamily: "Roboto Slab",
    marginBottom: "25px",
    textDecoration: "none",
  },
  section: {
    padding: "50px 0",
  },
  "@media (min-width: 1200px)": {
    pricingDiv: {
      maxWidth: "1250px",
    },
  },
  orderHeader: {
    backgroundColor: "#e2f0d9",
    marginLeft: 0,
    marginTop: 0,
    marginRight: 0,
    padding: 0,
  },
  headerText: {
    padding: "5px",
  },
  headerLeftText: {
    padding: "5px",
  },
  titlesection: {
    ...title,
    marginBottom: 0,
    marginTop: 0,
    textTransform: "capitalize",

    fontSize: "18px",
    textDecoration: "none",
  },
  innertitlesection: {
    ...title,
    marginBottom: 0,
    marginTop: 0,
    textTransform: "capitalize",
    fontSize: "15px",
    textDecoration: "none",
  },
  paddingClass: {
    padding: "15px",
  },
  createIcon: {
    color: "#148F77",
    fontSize: "80px",
    margin: "12px",
  },
  imageSection: {
    padding: "70px",
  },
  imageSectionOne: {
    padding: "40px",
  },
  innerDiv: {
    padding: "30px",
  },
  noMargin: {
    ...title,
    marginBottom: 0,
    minHeight: "1.53em",
    fontSize: "17px",
    color: "#565867 !important",
    textTransform: "capitalize",
    fontWeight: 300,
  },
  noMarginOne: {
    ...title,
    marginBottom: 0,
    color: "#565867 !important",
    textTransform: "capitalize",
  },
  centerTextSection: {
    padding: "50px",
  },
  titleInner: {
    ...title,
    textTransform: "capitalize",
    color: "#8f919d !important",
  },
  paper2: {
    maxWidth: "900px",
    overflow: "visible",
  },
  paper3: {
    width: "100%",
    overflow: "visible",
    maxWidth: "1200px",
    maxHeight: "550px",
  },
  paper4: {
    overflow: "visible",
    maxWidth: "500px",
    maxHeight: "500px",
  },
  textAreaClass: {
    width: "100%",
  },
  helpCenterClass: {
    marginTop: "30px",
  },
  addQuestionButton: {
    top: "30px",
  },
  "@media (max-width: 800px)": {
    addQuestionButton: {
      top: "0px",
    },
    imageSectionOne: {
      padding: "0px",
    },
    imageSection: {
      padding: "0px",
    },
    innerDiv: {
      padding: "10px",
    },
  },
  "@media (max-width: 567px)": {
    mobileInnerPadding: {
      padding: "0px",
    },
    section: {
      padding: "6px",
    },
    roundCardwthOutColorOne: {
      borderRadius: "100px !important",
      padding: "0px !important",
    },
    buttonText: {
      width: "180px",
      fontSize: "15px",
    },
    noResults: {
      width: "200px",
    },
  },
  ratingClass: {
    padding: "30px",
    backgroundColor: "#e2f0d9",
  },
  "@media (max-width: 450px)": {
    centerTextSection: {
      padding: "1px",
    },
    ratingClass: {
      padding: "1px",
    },
    mobileClasss: {
      display: "block",
    },
    desktopViewClass: {
      display: "none",
    },
    wishclass: {
      width: "180px",
      fontSize: "16px",
    },
  },
  "@media (min-width: 450px)": {
    mobileClasss: {
      display: "none",
    },
    desktopViewClass: {
      display: "block",
    },
  },
  "@media (max-width: 768px)": {
    noResults: {
      width: "300px",
    },
    wishclass: {
      width: "200px",
      fontSize: "16px",
    },
  },
};

export default styles;
