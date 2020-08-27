import React from "react";
import BaseNavbar from "../../components/navbar";

const Statistics = (props) => {
  return (
    <div>
      <BaseNavbar {...props} page="statistics" />
      <div className="one-page">
        <h1 className=""> STATISTICS </h1>
      </div>
    </div>
  );
};

export default Statistics;
