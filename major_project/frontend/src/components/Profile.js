import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Profile.css";
import axios from "axios";
import { Link } from "react-router-dom";
import ridetypeCar from "../assets/images/ridetype_car.png";
import { useAuthContest } from "../hooks/useAuthContext";

const Profile = (props) => {
  const { user } = useAuthContest();
  const [userdetails, setUserdetails] = useState({
    name: "",
    email: "",
    branch: "",
    year: "",
    location: "",
    ride: "",
  });

  const { state } = useLocation();
  const urn = state?.urn;
  // const user = localStorage.getItem("user")

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/user/?urn=${urn.toString()}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        const { data } = response;

        setUserdetails(data[0]);
        console.log("Profile", data[0]);
      })
      .catch((err) => {
        console.log("Error profile", err);
      });
  }, []);

  return (
    <div className="wrapper">
      <div className="profileCont d-flex flex-column justify-content-center align-items-center">
        <img
          src="https://www.shareicon.net/data/512x512/2017/01/06/868320_people_512x512.png"
          style={{ width: "200px", height: "200px" }}
          alt="user profile"
        />
        <br></br>

        <h2>{userdetails ? userdetails.name : "Yash"}</h2>
        <p>{userdetails ? userdetails.email : "yash@gmail.com"}</p>

        <div className="userInfoCont">
          <span>
            <img
              style={{ width: "20px", height: "20px" }}
              src="https://icons.veryicon.com/png/o/miscellaneous/internet-related-1/academic-degree-3.png"
            />{" "}
            {userdetails ? userdetails.branch : "Information Technology"}
          </span>
          <span>
            <img
              style={{ width: "18px", height: "18px" }}
              src="https://cdn-icons-png.flaticon.com/512/66/66163.png"
            />{" "}
            {userdetails ? userdetails.year : "2nd"} Year
          </span>
          <span>
            <img
              style={{ width: "19px", height: "19px" }}
              src="https://cdn-icons-png.flaticon.com/512/0/619.png"
            />{" "}
            {userdetails ? userdetails.location : "Haibowal Kalan"}
          </span>
        </div>
        <br></br>
        <br></br>
        <div className="userRideCont d-flex">
          {(userdetails && userdetails.ridetype === "Car") && (
            <div className="rideType">
            <img
              style={{ width: "120px", height: "100px" }}
              src={ridetypeCar}
            />
            Car
          </div>
          )}
          {(userdetails && (userdetails.ridetype === "Activa" || userdetails.ridetype === "Bike")) && (
            <div className="rideType">
            <img
              style={{ width: "120px", height: "100px" }}
              src="https://cdn2.iconfinder.com/data/icons/logistics-delivery-19/64/logistics_delivery-01-512.png"
            />
            Activa/Bike
          </div>
          )}
          <div className="rideType align-self-center" style={{padding:"40px 35px 40px 35px"}}>
            <img
              style={{ width: "70px", height: "60px",marginBottom:"12px"}}
              src="https://icons.veryicon.com/png/o/miscellaneous/common-symbols-color-icons/message-chat-1.png"
              alt="chatting"
            />
            <Link to="/chatpage">Chat Now</Link>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
    </div>
  );
};

export default Profile;


