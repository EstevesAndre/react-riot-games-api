import React from "react";
import BaseNavbar from "../../components/navbar";

const Leaderboard = (props) => {
  return (
    <div>
      <BaseNavbar {...props} page="leaderboard" />
      <div className="one-page">
        <h1 className=""> LEADERBOARD </h1>
      </div>
    </div>
  );
};

export default Leaderboard;
