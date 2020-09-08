import React from "react";
import BaseNavbar from "../../components/navbar";
import Footer from "../../components/footer";

const Statistics = (props) => {
  return (
    <div>
      <BaseNavbar {...props} page="statistics" />
      <div className="one-page-plus-minus-nav-minus-footer">
        <h1 className="text-white pt-5"> STATISTICS </h1>
        <h5 className="text-white"> TODO </h5>
      </div>
      <Footer {...props} page={"statistics"} />
    </div>
  );
};

export default Statistics;
