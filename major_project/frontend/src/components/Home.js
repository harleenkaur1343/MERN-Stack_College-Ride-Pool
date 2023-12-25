import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { Container } from "react-bootstrap";
import cityview from "../assets/images/cityview.png";
import "./Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  /* */
  return (
    <div
      className="wrapper-home"
      style={{
        backgroundImage: `url(${cityview})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "bottom",
        
      }}
    >
      <Container className="d-flex flex-column justify-content-start align-items-center searchCont">
        <SearchBar />
      </Container>
    </div>
  );
};

export default Home;
