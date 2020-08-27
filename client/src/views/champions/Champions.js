import React from "react";
import BaseNavbar from "../../components/navbar";

const Champions = (props) => {
  return (
    <div>
      <BaseNavbar {...props} page="champions" />
      <div className="one-page">
        <h1 className=""> CHAMPIONS </h1>
      </div>
    </div>
  );
};

export default Champions;
