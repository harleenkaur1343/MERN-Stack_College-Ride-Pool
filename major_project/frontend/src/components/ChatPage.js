import ChatContainer from "./ChatContainer";
import MyChat from "./MyChat";
import SideBar from "./Sidebar";
import { useAuthContest } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Row,Col} from 'react-bootstrap';

const Chatpage = () => {
  const [showChatList, setShowChatList] = useState(true);
  const isMobile = window.innerWidth < 768;

  const navigate = useNavigate();
  const { user } = useAuthContest();
  const [fetchAgain, setFetchAgain] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFetchAgain(true);
    } else {
      setFetchAgain(false);
      navigate("/session-timed-out");
    }
    //console.log("Fetch again",fetchAgain)
  }, []);
  return (
    <div style={{ width: "100%" }}>
      {/*user && <SideBar />*/}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "92.5vh",
          padding: "10px",
          marginTop: "85px",
        }}
      >
        <Row classname="d-flex flex-md-row" style={{width:"100%"}}>
          {(showChatList || !isMobile) && (
            <Col xs={12} md={4} classname={`${isMobile ? "" : "border-end"}`}>
              {isMobile && (
                <button
                  color="btn btn-primary-mb-2"
                  onClick={() => setShowChatList(false)}
                >
                  Open Chat
                </button>
              )}
              {user && <MyChat fetchAgain={fetchAgain} showChatList = {showChatList}
                  setShowChatList = {setShowChatList}></MyChat>}
            </Col>
          )}

          {/* Chat Container */}

          {(!showChatList || !isMobile) && (
            <Col xs={12} md={8}>
              {isMobile && (
                <button
                  onClick={() => setShowChatList(true)}
                  className="btn btn-second"
                >
                  Back
                </button>
              )}
              {user && <ChatContainer
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
              />}
            </Col>
          )}
        </Row>
        {/* {user && <MyChat fetchAgain={fetchAgain} />}
        {user && <ChatContainer fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />} */}
      </div>
    </div>
  );
};

export default Chatpage;
