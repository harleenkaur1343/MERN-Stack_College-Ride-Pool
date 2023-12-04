import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getSender } from "../config/chat";
import ScrollableChat from "./ScrollableChat";
import { useAuthContest } from "../hooks/useAuthContext";
//import sendIcon from "./send.svg";
//import UpdateGroupChatModel from "./UpdateGroupChatModel";
import io from "socket.io-client";
/*import emojiIcon from "./smileyEmoji.svg";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import suprsend from "@suprsend/web-sdk";*/

let socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { user, selectedChat, setSelectedChat } = useAuthContest();

  const fetchMessages = async () => {
    if (!selectedChat) {
      console.log("no selected chat");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/message?chatId=${selectedChat._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log("Messages", data);
      setMessages(data);
      setLoading(false);
      socket.emit("join-chat", selectedChat._id);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const sendMessageButton = async (e) => {
    sendMessage();
  };
  const sendMessage = async () => {
    console.log(newMessage);
    if (newMessage) {
      socket.emit("stop-typing", selectedChat._id);
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_URL}/message`,
          {
            message: newMessage,
            chatId: selectedChat,
          },
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setNewMessage("");

        socket.emit("new-message", data);
        setMessages([...messages, data]);
      } catch (error) {
        toast.error(error);
      }
    }
  };

  useEffect(() => {
    // socket = io(`${process.env.REACT_APP_URL}`);
    socket = io.connect("http://localhost:4000");
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop-typing", () => setIsTyping(false));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
    // eslint-disable-next-line
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message-received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // for implementing notifications: suprsend.track("NEW_MSG");
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const typingHandler = (e) => {
    console.log(e.target.value);
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop-typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat !== "" ? (
        <>
          <div
            style={{
              fontSize: "20px",
              padding: "10px 15px",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => setSelectedChat("")}
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Back
            </button>
            <div style={{ fontSize: "25px", marginRight: "10px" }}>
              {getSender(user, selectedChat.users)}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "15px",
              backgroundColor: "#E8E8E8",
              width: "100%",
              height: "100%",
              borderRadius: "10px",
              overflowY: "hidden",
            }}
          >
            {loading ? (
              <div
                style={{
                  alignSelf: "center",
                  margin: "auto",
                }}
              >
                Loading...
              </div>
            ) : (
              <div
                className="message"
                style={{ maxHeight: "90%", overflowY: "auto" }}
              >
                <ScrollableChat messages={messages} />
              </div>
            )}
            <div
              style={{
                height: "10%",
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {isTyping ? <div>Typing ...</div> : <></>}
              <div
                style={{
                  width: "63%",
                  margin: "auto",
                  position: "fixed",
                  bottom: "30px",
                  border: "1px solid white",
                  border: "none",
                  backgroundColor: "white",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#E0E0E0",
                  padding: "16px 0",
                }}
              >
                <select
                  name="messageOptions"
                  style={{
                    width: "80%",
                    backgroundColor: "#f5f5f5",
                    border: "1px solid #4d4d4d",
                    borderRadius: "5px",
                    outline: "none",
                    padding: "10px",
                    fontSize: "16px",
                  }}
                  onChange={typingHandler}
                >
                  <option selected defaultValue disabled>
                    Select a message..
                  </option>
                  <option value="Hi, I'm looking for a ride pool option. Are you available for it?">
                    Hi, I'm looking for a ride pool option. Are you available
                    for it?
                  </option>
                  <option value="Yes, I'm available">Yes, I'm available</option>
                  <option value="No, not available">No, not available</option>
                  <option value="Can we have a conversation outside Auditorium?">
                    Can we have a conversation outside Auditorium?
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="You can select a time for meeting">
                    You can select a time for meeting
                  </option>
                </select>
                <button
                  style={{
                    width: "10%",
                    marginLeft: "12px",
                    backgroundColor: "#007bff",
                    color: "white",
                    textAlign: "center",
                    padding: "10px 12px",
                    borderRadius: "5px",
                  }}
                  onClick={sendMessage}
                >
                  Send
                </button>
                {/*<input
                  style={{
                    width: "95%",
                    backgroundColor: "crimson",
                    border: "none",
                    borderRadius: "5px",
                    outline: "none",
                    padding: "10px",
                    fontSize: "16px",
                  }}
                  placeholder="Select a message.."
                  value={newMessage}
                  onKeyDown={sendMessage}
                  onChange={typingHandler}
                />*/}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <p
            style={{
              fontSize: "30px",
              paddingBottom: "15px",
            }}
          >
            Click On A User to Start Conversation
          </p>
        </div>
      )}
    </>
  );
};

export default SingleChat;
