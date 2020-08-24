import React, { useState } from "react";
import logo from "./logo.svg";

import BaseNavbar from "../../components/navbar";

const Home = () => {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/api/greeting?name=${encodeURIComponent(name)}`)
      .then((response) => response.json())
      .then((state) => setGreeting(state.greeting));
  };

  return (
    <div>
      <BaseNavbar />
      <div className="one-page">
        <h1 className="mt-5 pt-5">OLA</h1>
      </div>
    </div>
  );
};

export default Home;
