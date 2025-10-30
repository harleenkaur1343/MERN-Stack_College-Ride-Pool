import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContest } from "../hooks/useAuthContext";

const SideBar = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { setSelectedChat, user, chats, setChats } = useAuthContest();
  const logoutHandler = () => {
    localStorage.removeItem("user");
    navigate("/register");
  };
  //functioning fine
  const handleSearch = async () => {
    if (!search) {
      toast.error("Please Provide username");
      return;
    }

    try {
      setLoading(true);
      //console.log("Searched val : ", search);
      const { data } = await axios.get(
        //change auth to user
        `${process.env.REACT_APP_API_BASE_URL}/user/users?search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      //console.log("Sidebar - Chat users search results from backend ", data);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
      //toast.error(error);
    }
  };

  const accessChat = async (chatuser) => {
    try {
      setLoadingChat(true);
      // console.log(
      //   "Selected chat user sender id ",
      //   chatuser._id,
      //   " ",
      //   chatuser.name
      // );
      let userId = chatuser._id;
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/chat`,
        {
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      //console.log("Chats of chatuser and loggedin user ", data);
      if (chats == "" || !chats.find((c) => c._id === data._id))
        setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0px 15px",
          alignItems: "center",
          color: "#fff",
        }}
      >
        <button
          onClick={() => setOpen(!open)}
          style={{
            backgroundColor: "#008CBA",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Search User
        </button>
        {/*<h2>Chat app</h2>*/}
      </div>
      {open && (
        <div
          style={{
            position: "fixed",
            left: "20px",
            top: "165px",
            backgroundColor: "#030303c2",
            borderRadius: "12px",
            color: "white",
            height: "70vh",
            width: "29%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // justifyContent:'center',
            padding: "10px",
          }}
        >
          {/* <div> */}
          <div
            className="row align-self-start"
            style={{ margin: "20px 0px", width: "100%" }}
          >
            <div className="col-10" style={{ padding: "0" }}>
              <input
                className="input"
                style={{
                  float: "left",
                  width: "96%",
                  height: "50px",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0px 16px",
                  fontSize: "16px",
                  marginRight: "4px",
                }}
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="col-2" style={{ margin: "0px", padding: "0" }}>
              <span
                className="btn"
                onClick={handleSearch}
                style={{
                  padding: "12px 16px",
                  color: "white",
                  backgroundColor: "#2F3AB6",
                  heignt: "50px",
                }}
              >
                Go
              </span>
            </div>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            searchResult?.map((user) => (
              <div
                key={user._id}
                style={{
                  cursor: "pointer",
                  width: "100%",
                  backgroundColor: "white",
                  border: "1px solid black",
                  borderRadius: "12px",
                  textAlign: "center",
                  padding: "10px",
                  fontSize: "16px",
                  fontWeight: "500",
                  fontFamily: "Varela Round",
                  color: "black",
                }}
                onClick={() => accessChat(user)}
              >
                {user.name}
              </div>
            ))
          )}
          {loadingChat && <div>Loading Chat...</div>}
        </div>
      )}
    </>
  );
};

export default SideBar;
