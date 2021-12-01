import React, { Component } from "react";
import Router from "next/router";
class Index extends Component {
  componentDidMount = () => {
    Router.push("/login");
  };

  render() {
    return <div />;
  }
}
export default Index;
