import React from "react";
import BaseNavbar from "../../components/navbar";

const Multi = (props) => {
  return (
    <div>
      <BaseNavbar {...props} page="multi" />
      <div className="one-page">
        <h1 className=""> MULTI </h1>
      </div>
    </div>
  );
};

export default Multi;
