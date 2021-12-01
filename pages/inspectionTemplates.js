import { withStyles } from "@material-ui/core";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import GridContainer from "../components/Grid/GridContainer";
import GridItem from "../components/Grid/GridItem";
import UpperHeader from "../components/Header/UpperHeader";
import Parallax from "../components/Parallax/Parallax";
import { getAllBaseInspections } from "../redux/action/action";
import styles from "../styles/jss/nextjs-material-kit-pro/pages/ecommerceStyle";
import productStyle from "../styles/jss/nextjs-material-kit-pro/pages/landingPageSections/productStyle";
import { loaderHide, loaderShow } from "../lib/loaderHideShow";
import ViewInspectionTemplates from "../components/InspectionTemplates/ViewInspectionTemplates";
const style = {
  ...styles,
  ...productStyle,
};
const InspectionTemplates = (props) => {
  const { classes } = props;
  const [baseInspections, setBaseInspections] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    loaderShow();
    if (props.getInspectorDetails && props.getInspectorDetails._id) {
      const data = {
        inspectorDomain: props.getInspectorDetails.inspectionSpecialities,
      };
      const fetchData = async () => {
        const result = await dispatch(getAllBaseInspections(data));
        setBaseInspections(result.data);
      };
      fetchData();
    }
    loaderHide();
  }, [props.getInspectorDetails]);
  return (
    <>
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
                <h1 className={classes.title}>Inspection Templates</h1>

                <GridContainer></GridContainer>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <ViewInspectionTemplates baseInspections={baseInspections} />
    </>
  );
};
const mapStateToProps = (state) => ({
  getInspectorDetails: state.userReducer.getInspectorDetails,
});
export default connect(mapStateToProps)(withStyles(style)(InspectionTemplates));
