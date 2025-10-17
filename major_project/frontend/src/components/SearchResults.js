import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { useAuthContest } from "../hooks/useAuthContext";


const SearchResults = ({ person }) => {
  const { selectedChat, setSelectedChat } = useAuthContest();

  //console.log("Person: ", person);
 

  const infoBoxContent = person.map((per) => (
    <div key={per.urn} 
      className="row d-flex justify-content-between search_result_cont"
      style={{
        padding: "16px",
        borderRadius: "16px",
        color: "#4d4d4d",
        width: "580px",
        margin: "20px 0px",
        boxShadow: "0px 2px 8px 0px #cfcfcf",
      }}
    >
      <div className="col-sm-6">
        <p
          style={{
            marginBottom: "3px",
            fontSize: "20px",
            fontFamily: "Varela Round",
            color: "#2f3ab6",
          }}
        >
          {per.name}
        </p>
        <p
          style={{
            fontSize: "16px",
            margin: "0px",
          }}
        >
          {per.location}
        </p>
        <p
          style={{
            fontSize: "16px",
          }}
        >
          {per.branch} <br></br> {per.year} Year
        </p>
      </div>
      <div className="col-sm-4 d-flex flex-row justify-content-center align-items-end">
        <Link to={"/profile"} state={{urn:per.urn}} className="viewProfileBtn">
          View Profile
        </Link>
        <Link to="/chatpage" className="chatBtn">
          Chat
        </Link>
      </div>
    </div>
  ));

  return (
    <div>
      {(person.length > 0 && person[0].name!="") && infoBoxContent}
      {((person.length==0) || (person.length == 1 && person[0].urn===0)) && (
        <div className="no-results">
          <img
            src="https://img.freepik.com/premium-vector/gps-navigation-concept-tiny-people-search-location-online-map-we-have-moved-city-landscape_501813-163.jpg?w=360"
            style={{ width: "330px", marginBottom: "20px", marginTop: "20px" }}
          />
          <p
            style={{
              textAlign: "center",
              color: "#2F3AB6",
              fontSize: "20px",
              fontFamily: "Tilt Neon",
              backgroundColor: "white",
            }}
          >
            No Search Results
          </p>
        </div>
      )}
    </div>
  );
};
export default SearchResults;

