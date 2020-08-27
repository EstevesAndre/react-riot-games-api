import React from "react";
import BaseNavbar from "../../components/navbar";

const Summoner = (props) => {
  return (
    <div>
      <BaseNavbar {...props} page="summoner" />
      <div className="one-page">
        <h1 className=""> SUMMONER </h1>
      </div>
    </div>
  );
};

export default Summoner;
