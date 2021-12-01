/*eslint-disable*/
import React, { useEffect } from "react";
import { Country, State, City } from "country-state-city";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import { toast } from "react-toastify";
import { Field, getFormValues, reduxForm } from "redux-form";
// @material-ui/icons
import InfoIcon from "@material-ui/icons/Info";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import Favorite from "@material-ui/icons/Favorite";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcCallIcon from "@material-ui/icons/AddIcCall";
// core components
import Header from "../components/Header/Header.js";
import CardHeader from "../components/Card/CardHeader.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import Footer from "../components/Footer/Footer.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Button from "../components/CustomButtons/Button.js";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import Compress from "compress.js";
import CustomInput from "../components/CustomInput/CustomInput.js";
import AssignmentIcon from "@material-ui/icons/Assignment";
import SubjectIcon from "@material-ui/icons/Subject";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import signupPageStyle from "../styles/jss/nextjs-material-kit-pro/pages/signupPageStyle.js";
import { FormControl, TextField, Tooltip } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import addthumbnail from "../Documentation/assets/img/add-thumbnail.webp";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { changeRegisterUser } from "../redux/action/registerUserAction.js";
import {
  AddInspectorDetails,
  checkInspector,
  checkInspectorId,
  uploadimage,
} from "../redux/action/action.js";
import Router from "next/router";
import UpperHeader from "../components/Header/UpperHeader.js";

const useStyles = makeStyles(signupPageStyle);

function SignUpPage({ ...rest }) {
  const [loading, setloading] = React.useState(false);
  const [alreadyEmail, setAlreadyEmail] = React.useState(false);
  const [showPassword, setshowPassword] = React.useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = React.useState(false);
  const [request, setRequest] = React.useState(false);
  const [loadingInspectorId, setLoadingInspectorId] = React.useState(false);
  const [alreadyInspectorId, setAlreadyInspectorId] = React.useState(false);
  const [licenseImage, setLicenseImage] = React.useState({
    resumeName: "",
    resumeDetails: undefined,
    fileurl: "",
    editImage: true,
  });
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);
  const [country, setCountry] = React.useState([]);
  const [states, setStates] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [addressData, setAddress] = React.useState({
    address1: "",
    address2: "",
    country: "",
    city: "",
    state: "",
    zip: "",
  });

  // const handleToggle = () => {
  //   this.setState({ checked: !this.state.checked });
  // };
  useEffect(() => {
    const USCountry = Country.getAllCountries().filter(
      (country) => country.name === "United States"
    )[0];
    setCountry(USCountry);
    // console.log(USCountry);
    // console.log(State.getStatesOfCountry(USCountry.isoCode));
  }, []);
  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])[A-Za-z\d `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]{8,}$/;
    return re.test(String(password));
  };
  const validateSpecial = (name) => {
    const re = /^[a-zA-Z0-9 _]*$/;
    return re.test(String(name));
  };
  const validatenameLength = (str) => {
    return str.length <= 15;
  };
  const validateInspectionLength = (str) => {
    return str.length <= 50;
  };
  const validateLength = (str) => {
    return str.length > 7;
  };
  const validateLower = (str) => {
    const re = /[a-z]+/;
    return re.test(String(str));
  };
  const validateUpper = (str) => {
    const re = /[A-Z]+/;
    return re.test(String(str));
  };
  const validateNumber = (str) => {
    const re = /[0-9]+/;
    return re.test(String(str));
  };
  const validatePhoneNumber = (str) => {
    const re = /^\d*\.?\d*$/;
    return re.test(String(str));
  };
  const validateSpecialChar = (str) => {
    const re = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return re.test(String(str));
  };

  const handleDebounce = _.debounce(() => {
    if (userData.email) checkEmail();
  }, 500);
  const handleDebounceTwo = _.debounce(() => {
    if (userData.licenseId && userData.licenseId.length > 4)
      inspectorId(userData.licenseId);
  }, 500);

  const inspectorId = async (inspectorId) => {
    setLoadingInspectorId(true);
    const result = await dispatch(checkInspectorId({ licenseId: inspectorId }));
    if (result) {
      if (inspectorId == userData.licenseId) {
        // this.setSendResetAgain(false);
        if (result.data.length) {
          setAlreadyInspectorId(true);
          toast.error("License Id already exist");
          console.log("license already");
          // toast.error("email already exist");
        } else {
          setAlreadyInspectorId(false);
        }
      }
      setTimeout(() => {
        setLoadingInspectorId(false);
      }, 100);
    } else {
      toast.error("Internal server error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRequest(true);
    let data = {};
    // console.log(addressData);
    userData.Address = addressData;
    if (licenseImage.resumeDetails) {
      const compress = new Compress();
      const resizedImage = await compress.compress(
        [licenseImage.resumeDetails],
        {
          size: 1, // the max size in MB, defaults to 2MB
          quality: 0.75, // the quality of the image, max is 1,
        }
      );

      const img = resizedImage[0];
      const base64str = img.data;
      const imgExt = img.ext;
      const resizedFiile = Compress.convertBase64ToFile(base64str, imgExt);
      // return resizedFiile;
      let val = await dispatch(uploadimage(resizedFiile));
      // let val = await connection.post('/Azure', formData);
      if (val.data && val.data.result && val.data.result.name) {
        data = {
          ...data,
          licenseImg: `https://${process.env.azureAccountName}.blob.core.windows.net/${process.env.AZURE_CONTAINER}/${val.data.result.name}`,
        };
      }
    }
    data = { ...userData, ...data };
    let result = await dispatch(AddInspectorDetails(data));
    if (result.data.length > 0) {
      toast.success(
        "Successuly Registered. Check on your registered mail for further updates"
      );
      setRequest(false);
      Router.push("/login");
    }
  };

  const uploadThumbnail = (e) => {
    if (e.target.files[0]) {
      setLicenseImage({
        resumeName: e.target.files[0].name,
        resumeDetails: e.target.files[0],
        fileurl: URL.createObjectURL(e.target.files[0]),
        editImage: true,
      });
    }
  };

  const removeThumbnail = (e) => {
    setLicenseImage({
      resumeName: "",
      resumeDetails: "",
      fileurl: "",
      editImage: true,
    });
  };

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setshowConfirmPassword(!showConfirmPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const checkEmail = async () => {
    let usedEmail = userData.email;
    setloading(true);
    const result = await dispatch(checkInspector(usedEmail));
    if (result) {
      if (usedEmail == userData.email) {
        // this.setSendResetAgain(false);
        if (result.data.length) {
          setAlreadyEmail(true);
          console.log("email already");
          // toast.error("email already exist");
        } else {
          setAlreadyEmail(false);
        }
      }
      setTimeout(() => {
        setloading(false);
      }, 100);
    } else {
      toast.error("Internal server error");
    }
  };

  const handleAddress = (e, t) => {
    setAddress({
      ...addressData,
      [t]: e.target.value,
    });
    if (t === "country") {
      setStates(State.getStatesOfCountry(country.isoCode));
    }
    if (t === "state") {
      const stateTemp = states.filter(
        (state) => state.name === e.target.value
      )[0];
      // console.log(stateTemp);
      // console.log(City.getCitiesOfState(country.isoCode, stateTemp.isoCode));
      setCities(City.getCitiesOfState(country.isoCode, stateTemp.isoCode));
    }
  };

  const handleChange = (e, t) => {
    dispatch(changeRegisterUser(t, e.target.value));
    if (t == "email" && validateEmail(e.target.value)) {
      handleDebounce();
    }
    if (t == "licenseId") {
      handleDebounceTwo();
    }
  };

  // const handleToggle = (value) => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];
  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }
  //   setChecked(newChecked);
  // };
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      Router.push("/inspectionCenter");
    }
  });
  // React.useEffect(() => {
  //   window.scrollTo(0, 0);
  //   document.body.scrollTop = 0;
  // });
  const classes = useStyles();
  return (
    <div>
      <UpperHeader />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url('/img/bg7.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={10} md={10}>
              <Card className={classes.cardSignup}>
                <form className={classes.form}>
                  <CardHeader
                    color="success"
                    signup
                    className={classes.cardHeader}
                  >
                    <h2 className={classes.cardTitle}>
                      Inspector Registration
                    </h2>
                  </CardHeader>
                  <CardBody signup>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={6} md={6}>
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses,
                          }}
                          error={
                            (userData.firstName &&
                              !validatenameLength(userData.firstName)) ||
                            (userData.firstName &&
                              !validateSpecial(userData.firstName))
                          }
                          success={userData.firstName}
                          inputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Face className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            placeholder: "First Name *...",
                            value: userData.firstName,
                            type: "text",
                            onChange: (e) => {
                              handleChange(e, "firstName");
                            },
                          }}
                        />
                        {userData.firstName && (
                          <>
                            {userData.firstName &&
                              !validateSpecial(userData.firstName) && (
                                <p
                                  style={{
                                    color: "red",
                                    paddingLeft: "10px",
                                    fontSize: "14px",
                                  }}
                                >
                                  Special Characters are not allowed
                                </p>
                              )}
                            {userData.firstName &&
                              !validatenameLength(userData.firstName) && (
                                <p
                                  style={{
                                    color: "red",
                                    paddingLeft: "10px",
                                    fontSize: "14px",
                                  }}
                                >
                                  Name should not be more than 15 characters
                                </p>
                              )}
                          </>
                        )}
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6}>
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses,
                          }}
                          error={
                            (userData.lastName &&
                              !validatenameLength(userData.lastName)) ||
                            (userData.lastName &&
                              !validateSpecial(userData.lastName))
                          }
                          success={userData.lastName}
                          inputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Face className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            placeholder: "Last Name *...",
                            value: userData.lastName,
                            type: "text",
                            onChange: (e) => {
                              handleChange(e, "lastName");
                            },
                          }}
                        />
                        {userData.lastName && (
                          <>
                            {userData.lastName &&
                              !validateSpecial(userData.lastName) && (
                                <p
                                  style={{
                                    color: "red",
                                    paddingLeft: "10px",
                                    fontSize: "14px",
                                  }}
                                >
                                  Special Characters are not allowed
                                </p>
                              )}
                            {userData.lastName &&
                              !validatenameLength(userData.lastName) && (
                                <p
                                  style={{
                                    color: "red",
                                    paddingLeft: "10px",
                                    fontSize: "14px",
                                  }}
                                >
                                  Name should not be more than 15 characters
                                </p>
                              )}
                          </>
                        )}
                      </GridItem>

                      <GridItem xs={12} sm={6} md={6}>
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses,
                          }}
                          success={
                            !loadingInspectorId &&
                            userData.licenseId &&
                            !alreadyInspectorId
                          }
                          error={
                            (userData.licenseId &&
                              userData.licenseId.length >= 4 &&
                              !loadingInspectorId &&
                              alreadyInspectorId) ||
                            (userData.licenseId &&
                              !validatenameLength(userData.licenseId))
                          }
                          inputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <AssignmentIcon
                                  className={classes.inputAdornmentIcon}
                                />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <div>
                                {loadingInspectorId && (
                                  <InputAdornment position="end">
                                    <CircularProgress size={25} />
                                  </InputAdornment>
                                )}
                              </div>
                            ),
                            placeholder: "License Id *...",
                            value: userData.licenseId,
                            type: "text",
                            onChange: (e) => {
                              handleChange(e, "licenseId");
                            },
                          }}
                        />
                        {userData.licenseId &&
                          !validatenameLength(userData.licenseId) && (
                            <ul
                              style={{
                                color: "red",
                                paddingLeft: "10px",
                                fontSize: "14px",
                              }}
                            >
                              <li>Maximum Length is 15</li>
                            </ul>
                          )}
                      </GridItem>

                      <GridItem xs={12} sm={6} md={6}>
                        <FormControl
                          style={{ width: "100%", marginTop: "3px" }}
                        >
                          <TextField
                            select
                            fullWidth
                            value={userData.inspectionSpecialities}
                            SelectProps={{
                              native: true,
                            }}
                            onChange={(e) =>
                              handleChange(e, "inspectionSpecialities")
                            }
                            className="mt-sm-4 mt-3"
                            style={{ marginBottom: "17px" }}
                          >
                            <option value="">Select Domain</option>
                            <option value="Home">Home</option>
                            <option value="Boat">Boat</option>
                          </TextField>
                        </FormControl>
                        {/* <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses,
                          }}
                          error={
                            userData.inspectionSpecialities &&
                            !validateInspectionLength(
                              userData.inspectionSpecialities
                            )
                          }
                          success={userData.inspectionSpecialities}
                          inputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <SubjectIcon
                                  className={classes.inputAdornmentIcon}
                                />
                              </InputAdornment>
                            ),
                            placeholder: "Inspection Specialities *...",
                            value: userData.inspectionSpecialities,
                            type: "text",
                            onChange: (e) => {
                              handleChange(e, "inspectionSpecialities");
                            },
                          }}
                        /> */}
                        {userData.inspectionSpecialities &&
                          !validateInspectionLength(
                            userData.inspectionSpecialities
                          ) && (
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

                      <GridItem xs={12} sm={6} md={6}>
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses,
                          }}
                          success={addressData.address1}
                          inputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <DoneAllIcon
                                  className={classes.inputAdornmentIcon}
                                />
                              </InputAdornment>
                            ),
                            placeholder: "Address Line 1*...",
                            value: addressData.address1,

                            type: "text",
                            onChange: (e) => {
                              handleAddress(e, "address1");
                            },
                          }}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={6} md={6}>
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses,
                          }}
                          success={addressData.address2}
                          inputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <DoneAllIcon
                                  className={classes.inputAdornmentIcon}
                                />
                              </InputAdornment>
                            ),
                            placeholder: "Address Line 2 ...",
                            value: addressData.address2,
                            type: "text",
                            onChange: (e) => {
                              handleAddress(e, "address2");
                            },
                          }}
                        />
                      </GridItem>

                      <GridItem xs={12} sm={6} md={6}>
                        <FormControl
                          style={{ width: "100%", marginTop: "3px" }}
                        >
                          <TextField
                            id="standard-select-country"
                            select
                            fullWidth
                            value={addressData.country}
                            SelectProps={{
                              native: true,
                            }}
                            onChange={(e) => handleAddress(e, "country")}
                            className="mt-sm-4 mt-3"
                            style={{ marginBottom: "17px" }}
                          >
                            <option value="">Select Country</option>
                            {country && country.name && (
                              <option value={country.name}>
                                {country.name}
                              </option>
                            )}
                          </TextField>
                        </FormControl>
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6}>
                        <FormControl
                          style={{ width: "100%", marginTop: "3px" }}
                        >
                          <TextField
                            id="standard-select-state"
                            select
                            fullWidth
                            value={addressData.state}
                            SelectProps={{
                              native: true,
                            }}
                            onChange={(e) => handleAddress(e, "state")}
                            className="mt-sm-4 mt-3"
                            style={{ marginBottom: "17px" }}
                          >
                            <option value="">Select States</option>
                            {states &&
                              states.length > 0 &&
                              states.map((state) => (
                                <option value={state.name}>{state.name}</option>
                              ))}
                          </TextField>
                        </FormControl>
                        {/* <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses,
                          }}
                          success={addressData.state}
                          inputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <DoneAllIcon
                                  className={classes.inputAdornmentIcon}
                                />
                              </InputAdornment>
                            ),
                            placeholder: "State *",
                            value: addressData.state,
                            options: {},
                            type: "text",
                            onChange: (e) => {
                              handleAddress(e, "state");
                            },
                          }}
                        /> */}
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6}>
                        <FormControl
                          style={{ width: "100%", marginTop: "3px" }}
                        >
                          <TextField
                            id="standard-select-city"
                            select
                            fullWidth
                            value={addressData.city}
                            SelectProps={{
                              native: true,
                            }}
                            onChange={(e) => handleAddress(e, "city")}
                            className="mt-sm-4 mt-3"
                            style={{ marginBottom: "17px" }}
                          >
                            <option value="">Select City</option>
                            {cities &&
                              cities.length > 0 &&
                              cities.map((city) => (
                                <option value={city.name}>{city.name}</option>
                              ))}
                          </TextField>
                        </FormControl>
                        {/* <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses,
                          }}
                          success={addressData.city}
                          inputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <DoneAllIcon
                                  className={classes.inputAdornmentIcon}
                                />
                              </InputAdornment>
                            ),
                            placeholder: "City *",
                            value: addressData.city,
                            options: {},
                            type: "text",
                            onChange: (e) => {
                              handleAddress(e, "city");
                            },
                          }}
                        /> */}
                      </GridItem>

                      <GridItem xs={12} sm={6} md={6}>
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses,
                          }}
                          error={
                            addressData.zip &&
                            !validatePhoneNumber(addressData.zip)
                          }
                          success={
                            addressData.zip &&
                            validatePhoneNumber(addressData.zip)
                          }
                          options={["data", "gjg"]}
                          inputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <DoneAllIcon
                                  className={classes.inputAdornmentIcon}
                                />
                              </InputAdornment>
                            ),
                            placeholder: "Zip *",
                            value: addressData.zip,
                            options: {},
                            type: "text",
                            onChange: (e) => {
                              handleAddress(e, "zip");
                            },
                          }}
                        />
                        {addressData.zip && (
                          <>
                            {addressData.zip &&
                              !validatePhoneNumber(addressData.zip) && (
                                <p
                                  style={{
                                    color: "red",
                                    paddingLeft: "10px",
                                    fontSize: "14px",
                                  }}
                                >
                                  Only Numbers are allowed
                                </p>
                              )}
                          </>
                        )}
                      </GridItem>
                      {/* <GridItem xs={12} sm={6} md={6}>
                        <FormControl className={classes.formControl}>
                          <Select
                            labelId="demo-mutiple-chip-label"
                            id="demo-mutiple-chip"
                            multiple
                            value={["Home Inspection"]}
                            // value={personName}
                            // onChange={handleChange}
                            input={<Input id="select-multiple-chip" />}
                            // renderValue={(selected) => (
                            //   <div className={classes.chips}>
                            //     {selected.map((value) => (
                            //       <Chip
                            //         key={value}
                            //         label={value}
                            //         className={classes.chip}
                            //       />
                            //     ))}
                            //   </div>
                            // )}
                            // MenuProps={MenuProps}
                          >
                            <MenuItem>Home Inspection</MenuItem>
                            <MenuItem>Boat Inspection</MenuItem>
                          </Select>
                        </FormControl>
                      </GridItem> */}

                      <GridItem xs={12} sm={6} md={6}>
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses,
                          }}
                          error={
                            (userData.phone &&
                              !validatePhoneNumber(userData.phone)) ||
                            (userData.phone &&
                              !validatenameLength(userData.phone))
                          }
                          success={
                            userData.phone &&
                            validatePhoneNumber(userData.phone)
                          }
                          inputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <AddIcCallIcon
                                  className={classes.inputAdornmentIcon}
                                />
                              </InputAdornment>
                            ),
                            placeholder: "Phone No *...",
                            value: userData.phone,
                            type: "string",
                            onChange: (e) => {
                              handleChange(e, "phone");
                            },
                          }}
                        />
                        {userData.phone && (
                          <>
                            {userData.phone &&
                              !validatePhoneNumber(userData.phone) && (
                                <p
                                  style={{
                                    color: "red",
                                    paddingLeft: "10px",
                                    fontSize: "14px",
                                  }}
                                >
                                  Only Numbers are allowed
                                </p>
                              )}
                            {userData.phone &&
                              !validatenameLength(userData.phone) && (
                                <p
                                  style={{
                                    color: "red",
                                    paddingLeft: "10px",
                                    fontSize: "14px",
                                  }}
                                >
                                  Maximum Length is 15
                                </p>
                              )}
                          </>
                        )}
                      </GridItem>

                      <GridItem xs={12} sm={6} md={6}>
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses,
                          }}
                          error={
                            !loading &&
                            userData.email &&
                            (!validateEmail(userData.email) || alreadyEmail)
                          }
                          success={
                            !loading &&
                            userData.email &&
                            (validateEmail(userData.email) || !alreadyEmail)
                          }
                          inputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Email className={classes.inputAdornmentIcon} />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <div>
                                {loading && (
                                  <InputAdornment position="end">
                                    <CircularProgress size={25} />
                                  </InputAdornment>
                                )}
                              </div>
                            ),
                            placeholder: "Email *...",
                            value: userData.email,

                            type: "text",
                            onChange: (e) => {
                              handleChange(e, "email");
                              dispatch(changeRegisterUser("verified", false));
                            },
                          }}
                        />
                        {userData.email && (
                          <>
                            {userData.email && !validateEmail(userData.email) && (
                              <p
                                style={{
                                  color: "red",
                                  paddingLeft: "10px",
                                  fontSize: "14px",
                                }}
                              >
                                Email is not valid
                              </p>
                            )}
                            {!loading &&
                              userData.email &&
                              validateEmail(userData.email) &&
                              alreadyEmail && (
                                <p
                                  style={{
                                    color: "red",
                                    paddingLeft: "10px",
                                    fontSize: "14px",
                                  }}
                                >
                                  User with that email already exists in the
                                  system..
                                </p>
                              )}
                          </>
                        )}
                      </GridItem>

                      <GridItem xs={12} sm={6} md={6}>
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses,
                          }}
                          error={
                            userData.password &&
                            !validatePassword(userData.password)
                          }
                          success={
                            userData.password &&
                            validatePassword(userData.password)
                          }
                          inputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Icon
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? (
                                    <Visibility
                                      className={classes.inputAdornmentIcon}
                                    />
                                  ) : (
                                    <VisibilityOff
                                      className={classes.inputAdornmentIcon}
                                    />
                                  )}
                                </Icon>
                              </InputAdornment>
                            ),
                            endAdornment: !userData.password && (
                              <Tooltip
                                id="tooltip-right"
                                title={
                                  <ul
                                    style={{
                                      color: "white",
                                      paddingLeft: "10px",
                                      fontSize: "12px",
                                    }}
                                  >
                                    <li>
                                      <strong>
                                        The password must be 8 digits in length.
                                      </strong>
                                    </li>
                                    <li>
                                      <strong>
                                        The password must have a lowercase
                                        character.
                                      </strong>
                                    </li>
                                    <li>
                                      <strong>
                                        The password must have a uppercase
                                        character.
                                      </strong>
                                    </li>
                                    <li>
                                      <strong>
                                        The password must have a number.
                                      </strong>
                                    </li>
                                    <li>
                                      <strong>
                                        The password must have a special
                                        character.
                                      </strong>
                                    </li>
                                  </ul>
                                }
                                placement="right"
                                classes={{ tooltip: classes.tooltip }}
                              >
                                <InfoIcon />
                              </Tooltip>
                            ),
                            placeholder: "Password *...",
                            type: showPassword ? "text" : "password",
                            onChange: (e) => {
                              handleChange(e, "password");
                            },
                          }}
                        />
                        {userData.password &&
                          !validatePassword(userData.password) && (
                            <ul
                              style={{
                                color: "red",
                                paddingLeft: "10px",
                                fontSize: "14px",
                              }}
                            >
                              {!validateLength(userData.password) && (
                                <li>
                                  The password must be 8 digits in length.
                                </li>
                              )}
                              {!validateLower(userData.password) && (
                                <li>
                                  The password must have a lowercase character.
                                </li>
                              )}
                              {!validateUpper(userData.password) && (
                                <li>
                                  The password must have a uppercase character.
                                </li>
                              )}
                              {!validateNumber(userData.password) && (
                                <li>The password must have a number.</li>
                              )}
                              {!validateSpecialChar(userData.password) && (
                                <li>
                                  The password must have a special character.
                                </li>
                              )}
                            </ul>
                          )}
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6}>
                        <CustomInput
                          formControlProps={{
                            fullWidth: true,
                            className: classes.customFormControlClasses,
                          }}
                          error={
                            userData.confirmpassword &&
                            userData.confirmpassword != userData.password
                          }
                          success={
                            userData.confirmpassword &&
                            userData.confirmpassword == userData.password
                          }
                          inputProps={{
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.inputAdornment}
                              >
                                <Icon
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowConfirmPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showConfirmPassword ? (
                                    <Visibility
                                      className={classes.inputAdornmentIcon}
                                    />
                                  ) : (
                                    <VisibilityOff
                                      className={classes.inputAdornmentIcon}
                                    />
                                  )}
                                </Icon>
                              </InputAdornment>
                            ),
                            placeholder: "Confirm Password *...",
                            type: showConfirmPassword ? "text" : "password",
                            onChange: (e) => {
                              handleChange(e, "confirmpassword");
                            },
                          }}
                        />
                        {userData.confirmpassword &&
                          userData.confirmpassword != userData.password && (
                            <ul
                              style={{
                                color: "red",
                                paddingLeft: "10px",
                                fontSize: "14px",
                              }}
                            >
                              <li>The passwords must match.</li>
                            </ul>
                          )}
                      </GridItem>
                      <GridItem md={12}>
                        <label>License Image*</label>
                        <p style={{ color: "red", fontWeight: "600" }}>
                          <strong>
                            Upload an image of License for the verification.
                          </strong>
                        </p>
                        <div className="row mt-4">
                          {!licenseImage.fileurl &&
                          !licenseImage.fileurl.length > 0 ? (
                            <div className="col-6 col-md-3">
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
                                  accept="image/*"
                                  onChangeCapture={uploadThumbnail}
                                />
                              </div>
                            </div>
                          ) : null}
                          {licenseImage.fileurl &&
                          licenseImage.fileurl.length > 0 ? (
                            <div className="col-6 col-md-3">
                              <div className="thumb-preview">
                                <img src={licenseImage.fileurl} alt="" />
                                <div className="overlay"></div>
                                <button
                                  className="btn-reset"
                                  type="button"
                                  onClickCapture={removeThumbnail}
                                >
                                  <i className="fas fa-trash"></i>
                                </button>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </GridItem>

                      {/* <FormControlLabel
                        classes={{
                          label: classes.label,
                        }}
                        control={
                          <Checkbox
                            tabIndex={-1}
                            onClick={() => handleToggle(1)}
                            checkedIcon={
                              <Check className={classes.checkedIcon} />
                            }
                            icon={<Check className={classes.uncheckedIcon} />}
                            classes={{
                              checked: classes.checked,
                              root: classes.checkRoot,
                            }} 
                            checked={checked.indexOf(1) !== -1 ? true : false}
                          />
                        }
                        label={
                          <span>
                            I agree to the{" "}
                            <a href="#pablo">terms and conditions</a>.
                          </span>
                        }
                      /> */}
                      <GridItem xs={12} sm={12} md={12}>
                        <div className={classes.textCenter}>
                          <Button
                            disabled={
                              request ||
                              !userData.firstName ||
                              !(
                                userData.firstName &&
                                validatenameLength(userData.firstName)
                              ) ||
                              !(
                                userData.firstName &&
                                validateSpecial(userData.firstName)
                              ) ||
                              !userData.lastName ||
                              !(
                                userData.lastName &&
                                validatenameLength(userData.lastName)
                              ) ||
                              !(
                                userData.lastName &&
                                validateSpecial(userData.lastName)
                              ) ||
                              !userData.licenseId ||
                              !(
                                userData.licenseId &&
                                validatenameLength(userData.licenseId)
                              ) ||
                              !userData.inspectionSpecialities ||
                              userData.inspectionSpecialities === "" ||
                              !(
                                userData.inspectionSpecialities &&
                                validateInspectionLength(
                                  userData.inspectionSpecialities
                                )
                              ) ||
                              !userData.phone ||
                              !(
                                userData.phone &&
                                validatenameLength(userData.phone)
                              ) ||
                              !(
                                userData.phone &&
                                validatePhoneNumber(userData.phone)
                              ) ||
                              !userData.email ||
                              !(
                                userData.email && validateEmail(userData.email)
                              ) ||
                              !addressData.address1 ||
                              !addressData.country ||
                              !addressData.state ||
                              !addressData.city ||
                              !addressData.zip ||
                              !userData.password ||
                              !(
                                userData.password &&
                                validatePassword(userData.password)
                              ) ||
                              !userData.confirmpassword ||
                              !(
                                userData.confirmpassword &&
                                userData.confirmpassword == userData.password
                              ) ||
                              licenseImage.fileurl.length <= 0 ||
                              alreadyEmail ||
                              alreadyInspectorId
                            }
                            round
                            color="success"
                            onClick={handleSubmit}
                          >
                            Register
                          </Button>
                          <br />
                          <label>
                            Have a Inspector Account? <a href="/login">Login</a>
                          </label>
                        </div>
                      </GridItem>
                      {/* <GridItem xs={12} sm={6} md={6}>
                        <div
                          style={{
                            backgroundColor: "#148F77",
                            padding: "45px",
                            color: "white",
                          }}
                        >
                          <h4>
                            <strong>New Inspector account?</strong>
                          </h4>
                          <h5>
                            Create an account with us and you'll be able to:
                          </h5>
                          <ul>
                            <li>Create fast inspection templates.</li>
                            <li>Answer the templates questions.</li>
                            <li>Add Multimedia to templates.</li>
                            <li>Easy to create.</li>
                            <li>Check out faster.</li>
                          </ul>
                        </div>
                      </GridItem>
                    */}
                    </GridContainer>
                  </CardBody>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer
          content={
            <div>
              <div className={classes.left}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/?ref=njsmkp-signup"
                      target="_blank"
                      className={classes.block}
                    >
                      Creative Tim
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/presentation?ref=njsmkp-signup"
                      target="_blank"
                      className={classes.block}
                    >
                      About us
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="http://blog.creative-tim.com/?ref=njsmkp-signup"
                      className={classes.block}
                    >
                      Blog
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/license?ref=njsmkp-signup"
                      target="_blank"
                      className={classes.block}
                    >
                      Licenses
                    </a>
                  </ListItem>
                </List>
              </div>
              <div className={classes.right}>
                &copy; {1900 + new Date().getYear()} , made with{" "}
                <Favorite className={classes.icon} /> by{" "}
                <a
                  href="https://www.creative-tim.com?ref=njsmkp-signup"
                  target="_blank"
                >
                  Regi
                </a>{" "}
                for a better web.
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default SignUpPage;
