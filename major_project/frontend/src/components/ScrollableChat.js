//import image from "../images/user.svg";
import React, { useRef, useEffect, useContext } from "react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/chat";
import { useAuthContest } from "../hooks/useAuthContext";

const ScrollableChat = ({ messages }) => {
  const { user } = useAuthContest();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <img
                style={{
                  marginTop: "7px",
                  marginRight: "5px",
                  cursor: "pointer",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                }}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKvS4Z3oRCkqh5KgquhTEP7OQtjk_KbVX-FQ&usqp=CAU"
                alt={m.sender.name}
                title={m.sender.name} // used for showing tooltip
              />
            )}
            <div
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 7 : 10,
                borderRadius: "10px",
                padding: "10px 15px",
                maxWidth: "75%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {m.message}
            </div>
          </div>
        ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ScrollableChat;
