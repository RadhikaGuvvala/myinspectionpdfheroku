/*!

=========================================================
* NextJS Material Kit PRO v1.2.0 based on Material Kit PRO - v2.0.2 (Bootstrap 4.0.0 Final Edition) and Material Kit PRO React v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/ct-nextjs-material-kit-pro
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import { connect } from "react-redux";

import PageChange from "../components/PageChange/PageChange";
import { wrapper } from "../redux/store";

import "../styles/scss/nextjs-material-kit-pro.scss?v=1.2.0";

import "../styles/css/react-demo.css";

import "animate.css/animate.min.css";
import moment from "moment";
import { getInspector, getInspectorInfo } from "../redux/action/action";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tagsinput/react-tagsinput.css";

import { loaderShow, loaderHide } from "../lib/loaderHideShow";

Router.events.on("routeChangeStart", (url) => {
  // console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

function tokenDecoder(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

class MyApp extends App {
  componentDidMount() {
    let comment = document.createComment(`

=========================================================
* NextJS Material Kit PRO v1.2.0 based on Material Kit PRO - v2.0.2 (Bootstrap 4.0.0 Final Edition) and Material Kit PRO React v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-kit-pro
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

`);
    document.insertBefore(comment, document.documentElement);
  }
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  async componentDidMount() {
    loaderShow();
    if (localStorage.getItem("token")) {
      await this.sessionCheck();
      let data = {
        token: localStorage.getItem("token"),
      };
      let result = this.props.dispatch(getInspectorInfo(data));
    }
    //  else if (!localStorage.getItem("token")) {
    //   if (localStorage.getItem("email")) {
    //     const result = await this.props.dispatch(
    //       checkUser(localStorage.getItem("email"))
    //     );
    //     if (result) {
    //       if (result.data && result.data.length > 0) {
    //         // Router.push('/auth/lock-screen-page');
    //       } else {
    //         localStorage.removeItem("email");
    //       }
    //     } else {
    //       localStorage.removeItem("email");
    //     }
    //   } else {
    //     localStorage.removeItem("email");
    //   }
    // } else {
    //   localStorage.removeItem("email");
    // }

    axios.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        if (err && err.response && err.response.data == "Unauthorized") {
          // localStorage.removeItem("token");
          // this.props.resetUser();
          this.props.setClientToken("");
          Router.push("login");
          toast.info("Your session has expired, you have been logged out!!!");
        } else if (
          err &&
          err.response &&
          err.response.data == "User Not found"
        ) {
          console.log(err.response);
          // toast.error(err.response);
        } else if (
          err &&
          err.response &&
          err.response.data
          // err.response.data.message
        ) {
          if (err.response.data) toast.error(err.response.data);
          else {
            if (err.response.data.message)
              toast.error(err.response.data.message);
            if (err.response.data.raw.message)
              toast.error(err.response.raw.message);
          }
        } else if (err && err.data) toast.error(err.data.message);
        return Promise.reject(err);
      }
    );
    loaderHide();
  }

  endSession = async () => {
    localStorage.removeItem("token");
    Router.push("/login");
    delete axios.defaults.headers.Authorization;
  };

  sessionCheck = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      let userDetails = tokenDecoder(token);
      let expiryTime = moment.unix(userDetails.exp),
        currentTime = moment(new Date()),
        timeout = expiryTime.diff(currentTime, "seconds");
      if (timeout > 0) {
        // Object.entries(userDetails.user).forEach((v) => {
        //   this.props.changeUser(v[0], v[1]);
        // });
        const setUser = await this.props.dispatch(
          getInspector(userDetails.user)
        );
        axios.defaults.headers.Authorization =
          "Bearer " + localStorage.getItem("token");
        // Router.push('/admin/profile');
        // }
        setTimeout(() => {
          this.endSession();
          toast.info("Your session has expired, you have been logged out!!!");
        }, timeout * 1000);
      } else {
        this.endSession();
      }
    }
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <div id="custom-loader" className={"loader"}>
          <div className={"lds-ring"}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {/* <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script> */}
          <title>Inspection Center</title>
        </Head>
        <ToastContainer position="bottom-right" autoClose={3000} />
        <Component {...pageProps} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({});

export default wrapper.withRedux(
  connect(mapStateToProps)(
    // geolocated({
    //   positionOptions: { enableHighAccuracy: false },
    //   userDecisionTimeout: 5000
    // })
    MyApp
  )
);
