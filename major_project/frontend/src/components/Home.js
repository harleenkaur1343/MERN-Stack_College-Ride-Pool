import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";


const Home = () => {
 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
       <SearchBar />
  
    </Container>
  );
};

export default Home;
