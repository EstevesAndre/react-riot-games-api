import React from "react";
import BaseNavbar from "../../components/navbar";

const Items = (props) => {
  return (
    <div>
      <BaseNavbar {...props} page="items" />
      <div className="one-page">
        <h1 className=""> ITEMS </h1>
      </div>
    </div>
  );
};

export default Items;
