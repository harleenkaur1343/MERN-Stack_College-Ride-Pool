import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getSender } from "../config/chat";
import ScrollableChat from "./ScrollableChat";
import { useAuthContest } from "../hooks/useAuthContext";
import io from "socket.io-client";
import "../components/chatter.css";

let socket, selectedChatCompare;

const SingleChat = ({
  fetchAgain,
  setFetchAgain,
  setShowChatList,
  showChatList,
}) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [timeCon, setTimeCon] = useState(false);

  const { user, selectedChat, setSelectedChat } = useAuthContest();

  const fetchMessages = async () => {
    if (!selectedChat) {
      console.log("no selected chat");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/message?chatId=${selectedChat._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      //console.log("Messages", data);
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
    if (newMessage) {
      socket.emit("stop-typing", selectedChat._id);
      try {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/message`,
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
    // socket = io(`${process.env.REACT_APP_API_BASE_URL}`);
    socket = io.connect(process.env.REACT_APP_API_BASE_URL);
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
    //console.log(e.target.value);
    setNewMessage(e.target.value);

    if (!socketConnected) return; // add error handling here

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

  function onBackClick() {
    setSelectedChat("");
    setShowChatList(true);
  }

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
              onClick={() => onBackClick()}
              style={{
                backgroundColor: "#385A64",
                color: "#fff",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              Back
            </button>
            <div className="chatter">{getSender(user, selectedChat.users)}</div>
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
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  margin: "auto",

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
                  className="chatmsgcont"
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

                  <option value="9:30AM">9:30AM</option>

                  <option value="10:30AM">10:30AM</option>

                  <option value="11:30AM">11:30AM</option>

                  <option value="12:30PM">12:30PM</option>

                  <option value="01:30PM">01:30PM</option>

                  <option value="02:30PM">02:30PM</option>

                  <option value="03:30PM">03:30PM</option>

                  <option value="04:30PM">04:30PM</option>
                </select>
                <button className="sendbtn" onClick={sendMessage}>
                  Send
                </button>
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
