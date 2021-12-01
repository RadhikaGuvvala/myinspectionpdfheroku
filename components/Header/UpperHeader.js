import React from "react";
import Header from "./Header.js";
import HeaderLinks from "./HeaderLinks.js";

export default function UpperHeader() {
  return (
    <>
      <Header
        brand="NextJS Material Kit PRO"
        links={<HeaderLinks dropdownHoverColor="info" />}
        fixed
        color="transparent"
        changeColorOnScroll={{
          height: 250,
          color: "success",
        }}
      />
    </>
  );
}
