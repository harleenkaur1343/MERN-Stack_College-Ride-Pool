import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ride from "../assets/images/ride_sharing_1.png";
import "./GetStarted.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlassLocation,
  faCarSide,
} from "@fortawesome/free-solid-svg-icons";
import offerer_sideimg from "../assets/images/offerer_sideimg.png";
import rider_sideimg from "../assets/images/rider_sideimg.png";
import { Link } from "react-router-dom";

const getStarted = () => {
  //rendering part
  return (
    <>
      <div className="getstarted">
        <Container fluid className="header">
          <div className="header-image"></div>
          <div className="header-banner">
            <h1>College Ride Pool</h1>
            <p>Connecting Campuses, Sharing Rides, and Reducing Emissions</p>
          </div>
        </Container>
        <br></br>
        <Container fluid className="signup_ops">
          <Row className="d-flex">
            <Col md="5" className="d-flex flex-column ">
              <h2>Wanna offer a ride?</h2>
              <p>
                Share your ride — good for your wallet, great for the planet.
              </p>

              <Link to="/signup" className="signup_btns offer_btn">
                Offer a ride
              </Link>

              <p style={{ fontSize: "15px" }}>
                Already a member?{" "}
                <span className="text-primary">
                  <Link to="/login" style={{ color: "#C19700" }}>
                    Login
                  </Link>
                </span>
              </p>
            </Col>
            <Col md="7" className="offerer_img_cont">
              <img src={offerer_sideimg}></img>
            </Col>
          </Row>
          <br></br>
          <br></br>
          <br></br>
          <Row className="d-flex ">
            <Col md="7" className="rider_img_cont">
              <img src={rider_sideimg}></img>
            </Col>
            <Col md="5" className="d-flex flex-column ">
              <h2>Find a ride, get started here</h2>
              <p>Get easy rides at affordable prices</p>

              <Link to="/signup" className="signup_btns offer_btn">
                Rider Signup
              </Link>

              <p style={{ fontSize: "15px" }}>
                Already a member?{" "}
                <span className="text-primary">
                  <Link to="/login" style={{ color: "#d6a801ff" }}>
                    Login
                  </Link>
                </span>
              </p>
            </Col>
          </Row>
          {/* <Row className="d-flex justify-content-center align-items-center signup_ops_row">
            <Col
              md="auto"
              className="signup_ride d-flex flex-column justify-content-center align-content-center align-items-center"
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlassLocation}
                style={{
                  color: "#ffffff",
                  fontSize: "80px",
                  marginBottom: "24px",
                }}
              />
              <h4>Looking for a Ride?</h4>
              <Link to="/signup" className="signup_btns ride_btn">
                Start Searching
              </Link>
            </Col>
            <Col
              md="auto"
              className="signup_offer d-flex flex-column justify-content-center align-content-center align-items-center"
            >
              <FontAwesomeIcon
                icon={faCarSide}
                style={{
                  color: "#ffffff",
                  fontSize: "80px",
                  marginBottom: "24px",
                }}
              />
              <h4>Want to offer a Ride?</h4>
              <Link to="/signup_offerer" className="signup_btns offer_btn">
                Setup your Profile
              </Link>
            </Col>
          </Row> */}
        </Container>
      </div>
    </>
  );
};

export default getStarted;
