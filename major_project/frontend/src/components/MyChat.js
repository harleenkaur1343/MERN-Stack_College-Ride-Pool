import React, { useState, useEffect, useContext } from "react";
import { useAuthContest } from "../hooks/useAuthContext";
import { getSender } from "../config/chat";
import axios from "axios";
//import GroupChatModal from "./GroupChatModal";
//import { getSender } from "../config/chat";
import { toast } from "react-toastify";
import SideBar from "./Sidebar";
import { useLogout } from "../hooks/useLogout";

const MyChat = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, chats, setChats, selectedChat, setSelectedChat } =
    useAuthContest();
  const { logout } = useLogout();


  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("user")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);
  //

  const fetchChats = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/chat`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setChats(data);
    } catch (Error) {
      //replaced toast
      if (Error.response) {
        let errmsg = Error.response.data.error;
        alert(errmsg);

        if (errmsg.includes("jwt")) {
          logout();
        }
      } else if (Error.request) {
        alert(Error.request.status);
      } else {
        alert(Error.message);
      }
      console.log(Error);
    }
  };

  return (
    <div
      style={{
        border: "1px solid lightgrey",
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "3px",
        width: "31%",
        backgroundColor: "white",
        paddingTop: "10px",
      }}
    >
      <div
        style={{
          fontSize: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "5px",
          alignContent: "center",
        }}
      >
        <p style={{ marginLeft: "10px", fontWeight: "500" }}>My Chats</p>
        <span>
          <SideBar></SideBar>
        </span>
      </div>
      <br></br>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F8F8F8",
          height: "100%",
          width: "100%",
          borderRadius: "12px",
          overflowY: "hidden",
          padding: "3px",
        }}
      >
        {chats ? (
          chats.map((chat) => (
            <div
              onClick={() => setSelectedChat(chat)}
              style={{
                cursor: "pointer",
                backgroundColor:
                  selectedChat === chat ? "#FFC802": "#E8E8E8",
                color: selectedChat === chat ? "#000" : "black",
                paddingLeft: "2em",
                margin: "10px",
                paddingRight: "2em",
                paddingTop: "1em",
                paddingBottom: "1em",
                borderRadius: "1em",
              }}
              key={chat?._id}
            >
              {chat.users[1].name ? chat.users[1].name : <p>none</p>}
            </div>
          ))
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            Loading Chats...
          </div>
        )}
      </div>
    </div>
  );
};
export default MyChat;
