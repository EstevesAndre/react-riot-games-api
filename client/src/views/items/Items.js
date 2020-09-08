import React from "react";
import BaseNavbar from "../../components/navbar";
import Footer from "../../components/footer";

const Items = (props) => {
  return (
    <div>
      <BaseNavbar {...props} page="items" />
      <div className="one-page-plus-minus-nav-minus-footer">
        <h1 className="text-white pt-5"> ITEMS </h1>
        <h5 className="text-white"> TODO </h5>
      </div>
      <Footer {...props} page={"items"} />
    </div>
  );
};

export default Items;
