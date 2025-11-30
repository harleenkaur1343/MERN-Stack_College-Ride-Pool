import ChatContainer from "./ChatContainer";
import MyChat from "./MyChat";
import SideBar from "./Sidebar";
import { useAuthContest } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Chatpage = () => {
  const [showChatList, setShowChatList] = useState(true);
  const isMobile = window.innerWidth < 768;

  const navigate = useNavigate();
  const location = useLocation();
  const { user, selectedChat, setSelectedChat } = useAuthContest();
  const [fetchAgain, setFetchAgain] = useState(false);
  // const [preselectuser, setPreSelectUser] = useState(
  // );

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFetchAgain(true);
      //get the chat of the user
      //set the selected chat to this
      if (location.state.chat_user_locsearch) {
        preselectchat();
      }
    } else {
      setFetchAgain(false);
      navigate("/session-timed-out");
    }
    
  }, []);

  async function preselectchat() {
    try {
      const preselectuser = location.state.chat_user_locsearch;
      console.log("Pre selected user", preselectuser);
      console.log("LOgged in user", user);
      const preselchat = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/chat`,
        {
          userId: preselectuser._id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (preselectchat !== "" || preselectchat.length !== 0) {
        //throw new Error ("Chat cannot be selected")
        console.log("Pre select chat", preselchat.data);
        setSelectedChat(preselchat.data);
        console.log(selectedChat);
      }
    } catch (error) {
      console.log("Pre select error ", error);
    }
  }
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "92.5vh",
          padding: "10px",
          marginTop: "85px",
        }}
      >
        <Row classname="d-flex flex-md-row" style={{ width: "100%" }}>
          {(showChatList || !isMobile) && (
            <Col xs={12} md={4} classname={`${isMobile ? "" : "border-end"}`}>
              {/* {isMobile && (
                <button
                  color="btn btn-primary-mb-2"
                  onClick={() => setShowChatList(false)}
                >
                  Open Chat
                </button>
              )} */}
              {user && (
                <MyChat
                  fetchAgain={fetchAgain}
                  showChatList={showChatList}
                  setShowChatList={setShowChatList}
                ></MyChat>
              )}
            </Col>
          )}

          {/* Chat Container */}

          {(!showChatList || !isMobile) && (
            <Col xs={12} md={8}>
              {/* {isMobile && (
                <button
                  onClick={() => setShowChatList(true)}
                  className="btn btn-second"
                >
                  Back
                </button>
              )} */}
              {user && (
                <ChatContainer
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  showChatList={showChatList}
                  setShowChatList={setShowChatList}
                />
              )}
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
};

export default Chatpage;
