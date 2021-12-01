/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Favorite from "@material-ui/icons/Favorite";
import Face from "@material-ui/icons/Face";
import Link from "next/link";
// core components
import Header from "../components/Header/Header.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import Footer from "../components/Footer/Footer.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Button from "../components/CustomButtons/Button.js";
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import CardHeader from "../components/Card/CardHeader.js";
import CustomInput from "../components/CustomInput/CustomInput.js";
import _ from "lodash";
import loginPageStyle from "styles/jss/nextjs-material-kit-pro/pages/loginPageStyle.js";
import Router from "next/router";
import { CircularProgress } from "@material-ui/core";
import {
  checkInspector,
  login,
  socialLoginRegister,
} from "../redux/action/action.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import dynamic from "next/dynamic";
const SocialButton = dynamic(
  () => import("../components/SocialButton/SocialButton"),
  { ssr: false }
);

const useStyles = makeStyles(loginPageStyle);

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [loading, setloading] = React.useState(false);
  const [alreadyEmail, setAlreadyEmail] = React.useState(false);
  const [showPassword, setshowPassword] = React.useState(false);
  const classes = useStyles();
  let emaildata = "";
  const dispatch = useDispatch();

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      Router.push("/inspectionCenter");
    }
    localStorage.removeItem("checkemail");
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

  const handleDebounce = _.debounce(() => {
    checkEmail();
  }, 1000);

  const handleChange = (e, t) => {
    // props.changeLoginUser(t, e.target.value);
    if (t == "email") {
      setEmail(e.target.value);
      emaildata = e.target.value;
      if (t == "email" && validateEmail(e.target.value)) {
        setloading(true);
        handleDebounce();
      }
    } else {
      setpassword(e.target.value);
    }
  };

  const checkEmail = async () => {
    let usedEmail = emaildata;
    setloading(true);
    const result = await dispatch(checkInspector(usedEmail));
    if (result) {
      if (usedEmail == emaildata) {
        // this.setSendResetAgain(false);
        if (result.data.length) {
          setAlreadyEmail(true);
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

  const removeFields = () => {
    setEmail("");
    setpassword("");
    setAlreadyEmail(false);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  const handleSocialLogin = async (user) => {
    console.log("Helllllllll");
    const userToSend = {
      ...user.profile,
      provider: user.provider,
    };
    const result = await dispatch(socialLoginRegister(userToSend));
    if (result) {
      toast.success("Logged in successfully!!!");
      Router.push("/inspectionCenter");
    } else {
      toast.error(result);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var body = {
      email: email,
      keepLoggedIn: true,
      password: password,
    };
    // loaderShow();
    body.email = body.email.trim();
    const result = await dispatch(login(body));
    if (result) {
      toast.success("Logged in successfully!!!");
      Router.push("/inspectionCenter");
    } else {
      toast.error(result);
    }
  };

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="NextJS Material Kit PRO"
        links={<HeaderLinks dropdownHoverColor="info" />}
      />
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
            <GridItem xs={12} sm={8} md={6}>
              <Card>
                <form className={classes.form}>
                  <CardHeader
                    color="success"
                    signup
                    className={classes.cardHeader}
                  >
                    <h4 className={classes.cardTitle}>Login</h4>
                    <div className={classes.socialLine}>
                      <SocialButton
                        provider="facebook"
                        // appId={892672387886235}
                        appId={944281416482258}
                        // appId={process.env.FACEBOOK_APP_ID}
                        onLoginSuccess={handleSocialLogin}
                        onLoginFailure={handleSocialLoginFailure}
                        key={"facebook"}
                      >
                        facebook
                      </SocialButton>
                    </div>
                  </CardHeader>

                  <CardBody>
                    <CustomInput
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        placeholder: "Email...",
                        type: "email",
                        value: email || "",
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email className={classes.inputIconsColor} />
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
                        onChange: (e) => {
                          handleChange(e, "email");
                        },
                      }}
                      error={
                        !loading &&
                        email &&
                        (!validateEmail(email) || !alreadyEmail)
                      }
                      success={
                        !loading &&
                        email &&
                        validateEmail(email) &&
                        alreadyEmail
                      }
                    />
                    {!loading &&
                      email &&
                      validateEmail(email) &&
                      !alreadyEmail && (
                        <>
                          {!alreadyEmail && (
                            // <div>
                            <>
                              <div
                                style={{
                                  color: "red",
                                  paddingLeft: "10px",
                                  fontSize: "14px",
                                }}
                              >
                                User with that email does NOT exist in the
                                system. Please click on signup to create the
                                account.
                              </div>
                            </>
                            // </div>
                          )}
                        </>
                      )}
                    {email && validateEmail(email) && alreadyEmail && (
                      <CustomInput
                        id="pass"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        error={!validatePassword(password)}
                        success={validatePassword(password)}
                        inputProps={{
                          placeholder: "Password",
                          type: showPassword ? "text" : "password",
                          value: password || "",
                          onChange: (e) => handleChange(e, "password"),

                          startAdornment: (
                            <InputAdornment position="start">
                              <Icon
                                // style={{marginLeft:'-10px'}}
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </Icon>
                            </InputAdornment>
                          ),
                          autoComplete: "off",
                        }}
                      />
                    )}
                    {email && validateEmail(email) && alreadyEmail && password && (
                      <div className={classes.textCenter}>
                        <Button
                          disabled={!email || !alreadyEmail || !password}
                          round
                          color="success"
                          onClick={handleSubmit}
                        >
                          Login
                        </Button>
                      </div>
                    )}
                  </CardBody>
                  <div className={classes.textCenter}>
                    {email && validateEmail(email) && alreadyEmail && (
                      <>
                        <Link href="/forgot-password" as="/forgot-password">
                          <Button
                            type="button"
                            simple
                            color="success"
                            size="sm"
                          >
                            <strong>Forgot Password ?</strong>
                          </Button>
                        </Link>

                        <Button
                          type="button"
                          simple
                          color="success"
                          size="sm"
                          onClick={removeFields}
                        >
                          <strong>Clear Fields</strong>
                        </Button>
                      </>
                    )}
                    {email && validateEmail(email) && alreadyEmail && (
                      <Link href="/update-password" as="/update-password">
                        <Button type="button" simple color="success" size="sm">
                          <strong> Update Password</strong>
                        </Button>
                      </Link>
                    )}
                  </div>
                  {!alreadyEmail && (
                    <div className="text-center pb-3">
                      Don't have an Inspector Account? &nbsp;
                      <a href="/signup">SignUp</a>
                    </div>
                  )}
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer
          className={classes.footer}
          content={
            <div>
              <div className={classes.left}>
                <List className={classes.list}>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/?ref=njsmkp-login"
                      target="_blank"
                      className={classes.block}
                    >
                      Creative Tim
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/presentation?ref=njsmkp-login"
                      target="_blank"
                      className={classes.block}
                    >
                      About us
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="http://blog.creative-tim.com/?ref=njsmkp-login"
                      className={classes.block}
                    >
                      Blog
                    </a>
                  </ListItem>
                  <ListItem className={classes.inlineBlock}>
                    <a
                      href="https://www.creative-tim.com/license?ref=njsmkp-login"
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
                  href="https://www.creative-tim.com?ref=njsmkp-login"
                  target="_blank"
                >
                  Regi
                </a>{" "}
                for a better web
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}
