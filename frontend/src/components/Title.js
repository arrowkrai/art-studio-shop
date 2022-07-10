import React from "react";
import { Helmet } from "react-helmet";
const Title = ({ title }) => {
  return (
    <Helmet>
      <title>{title + " - West Studio"}</title>
    </Helmet>
  );
};
Title.defaultProps = {
  title: "West Studio",
};

export default Title;
