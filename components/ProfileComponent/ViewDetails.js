import { withStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import profilePageStyle from "../../styles/jss/nextjs-material-kit-pro/pages/profilePageStyle";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import Button from "../CustomButtons/Button";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";

function ViewDetails(props) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);

  const { classes } = props;
  // const [Edit, setEdit] = React.useState(false);

  return (
    <div>
      <Card>
        <CardHeader
          color="success"
          signup
          className={classes.cardHeaderCustomer}
        >
          <h4
            className={classes.cardTitleWhite}
            style={{ textTransform: "capitalize", textAlign: "center" }}
          >
            {props?.getInspectorDetails?.firstName
              ? props?.getInspectorDetails?.firstName
              : ""}{" "}
            {props?.getInspectorDetails?.lastName
              ? props?.getInspectorDetails?.lastName
              : ""}
            &apos;s View Details
          </h4>
        </CardHeader>
        <CardBody>
          <GridContainer>
            {/* <GridItem>
              <Button
                color="success"
                onClick={() => {
                  setEdit(true);
                }}
              >
                Edit Details
              </Button>
            </GridItem>
            <GridItem>
              {Edit && (
                <EditDetails
                  onClose={() => {
                    setEdit(false);
                  }}
                />
              )}
            </GridItem> */}
            <GridItem md={6} sm={12}>
              <GridContainer>
                {props?.getInspectorDetails?.firstName && (
                  <>
                    <GridItem sm={6}>
                      <h4>
                        <strong>First Name</strong>
                      </h4>
                    </GridItem>
                    <GridItem sm={6}>
                      <h4>{props?.getInspectorDetails?.firstName}</h4>
                    </GridItem>
                  </>
                )}
                {props?.getInspectorDetails?.lastName && (
                  <>
                    <GridItem sm={6}>
                      <h4>
                        <strong>Last Name</strong>
                      </h4>
                    </GridItem>
                    <GridItem sm={6}>
                      <h4>{props?.getInspectorDetails?.lastName}</h4>
                    </GridItem>
                  </>
                )}
                {props?.getInspectorDetails?.email && (
                  <>
                    <GridItem sm={6}>
                      <h4>
                        <strong>Email</strong>
                      </h4>
                    </GridItem>
                    <GridItem sm={6}>
                      <h4>{props.getInspectorDetails.email}</h4>
                    </GridItem>
                  </>
                )}
                {props?.getInspectorDetails?.licenseId && (
                  <>
                    <GridItem sm={6}>
                      <h4>
                        <strong>License Id</strong>
                      </h4>
                    </GridItem>
                    <GridItem sm={6}>
                      <h4>{props?.getInspectorDetails?.licenseId}</h4>
                    </GridItem>
                  </>
                )}

                {props?.getInspectorDetails?.inspectionSpecialities && (
                  <>
                    <GridItem sm={6}>
                      <h4>
                        <strong>Inspection Specialities</strong>
                      </h4>
                    </GridItem>
                    <GridItem sm={6}>
                      <h4>
                        {props?.getInspectorDetails?.inspectionSpecialities}
                      </h4>
                    </GridItem>
                  </>
                )}
                {props?.getInspectorDetails?.address && (
                  <>
                    <GridItem sm={6}>
                      <h4>
                        <strong>Address</strong>
                      </h4>
                    </GridItem>
                    <GridItem sm={6}>
                      <h4>{props?.getInspectorDetails?.address}</h4>
                    </GridItem>
                  </>
                )}
                {props?.getInspectorDetails?.phone && (
                  <>
                    <GridItem sm={6}>
                      <h4>
                        <strong>Phone</strong>
                      </h4>
                    </GridItem>
                    <GridItem sm={6}>
                      <h4>{props?.getInspectorDetails?.phone}</h4>
                    </GridItem>
                  </>
                )}
              </GridContainer>
            </GridItem>

            {props.getInspectorDetails.licenseImg && (
              <GridItem md={6} sm={12}>
                <h4>
                  <strong>License Image</strong>
                </h4>
                <img src={props.getInspectorDetails.licenseImg} width="100%" />
              </GridItem>
            )}
          </GridContainer>
        </CardBody>
      </Card>
    </div>
  );
}
const mapStateToProps = (state) => ({
  getInspectorDetails: state.userReducer.getInspectorDetails,
});
export default connect(
  mapStateToProps,
  null
)(withStyles(profilePageStyle)(ViewDetails));
