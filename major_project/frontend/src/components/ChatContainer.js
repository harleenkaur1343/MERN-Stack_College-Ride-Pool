import { React, useContext } from "react";
import Singlechat from "./Singlechat";
import { useAuthContest } from "../hooks/useAuthContext";

const ChatContainer = ({ fetchAgain, setFetchAgain, setShowChatList, showChatList }) => {
  const { selectedChat } = useAuthContest();
  return (
    <div className="chatContainer"
    style={{
      display:  "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "5px",
      backgroundColor: "white",
      width: "100%",
      height:"100%",
      border: "1px solid lightgrey",
      borderRadius: "12px",
    }}
  >
    <Singlechat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} showChatList={showChatList} setShowChatList={setShowChatList} />
  </div>
  );
};

export default ChatContainer;
