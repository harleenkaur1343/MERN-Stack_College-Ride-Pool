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
          <Row>
            <Col
              md="6"
              className="header_content d-flex flex-column justify-content-center align-content-center"
            >
              <h1>College Ride Pool</h1>
              <p>Connecting Campuses, Sharing Rides, and Reducing Emissions.</p>
            </Col>
            <Col md="6" className="d-flex justify-content-center header-img">
              <img src={ride} alt="React" className="" />
            </Col>
          </Row>
        </Container>

        <Container fluid className="signup_ops">
          <Row className="d-flex justify-content-center align-items-center signup_ops_row">
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
          </Row>
        </Container>
      </div>
    </>
  );
};

export default getStarted;
