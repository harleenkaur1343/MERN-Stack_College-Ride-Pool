import { React, useContext } from "react";
import Singlechat from "./Singlechat";
import { useAuthContest } from "../hooks/useAuthContext";

const ChatContainer = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = useAuthContest();
  return (
    <div className="chatContainer"
    style={{
      display:  "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "5px",
      backgroundColor: "white",
      width: "66%",
      border: "1px solid lightgrey",
      borderRadius: "12px",
    }}
  >
    <Singlechat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
  </div>
  );
};

export default ChatContainer;
