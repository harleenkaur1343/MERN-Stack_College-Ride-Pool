import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useLogout } from "../hooks/useLogout";
import { useAuthContest } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContest();

  const handleOnClick = () => {
    logout();
  };
  return (
    <>
      <div className="navbar_cont">
        <ul className="navbar d-flex justify-content-end">
          {user && (
            <div>
              <li style={{ color: "white", fontFamily: "Montserrat" }}>
                Welcome {user.name}!
              </li>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <div className="dropdown" style={{ display: "inline" }}>
                <li>
                  <img
                    className="dropbtn"
                    style={{ width: "30px", height: "30px" }}
                    src="https://cdn1.iconfinder.com/data/icons/main-ui-elements-with-colour-bg/512/male_avatar-512.png"
                    alt="usericon"
                  />
                </li>
                <div className="dropdown-content" id="drop-content">
                  <Link to="/profile" state={{ urn: user.urn, name: user.name }}>
                    Profile
                  </Link>
                  <Link to="/chatpage">My Chats</Link>
                  <button
                    className="logoutBtn"
                    onClick={handleOnClick}
                    style={{
                      padding: "8px 12px",
                      border: "none",
                      backgroundColor: "#f1f1f1",
                      minWidth: "160px",
                      textAlign: "left",
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
          {!user && (
            <div>
              <li>
                <Link to="/login">Sign In</Link>
              </li>
              <li>
                <Link to="/">Get Started</Link>
              </li>
            </div>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
