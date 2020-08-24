import React, { useState, useEffect } from "react";
import logo from "./logo.svg";

import api from "../../api";

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

  useEffect(() => {
    console.log("HERE");
    async function fetchData() {
      const response = await api.getAllUsers();
      console.log(response);
    }
    fetchData();

  }, []);

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
