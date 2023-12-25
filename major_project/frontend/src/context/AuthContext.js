import { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
export const AuthContext = createContext("");

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };

    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //const [usercon, setUsercon] = useState(null);
  const [chats, setChats] = useState("");
  const [selectedChat, setSelectedChat] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
      setIsAuthenticated(true);
      const fetchChats = async () => {
        try {
          const { data } = await axios.get(
            `${process.env.REACT_APP_URL}/chat`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setChats(data);
        } catch (error) {
          //replaced toast
          console.log("Error in fetching")
          console.log(error);
        }
      };
    }
  }, []);
  console.log("AuthContext State : ", state);
  console.log("AuthContext Chats : ", chats);
  console.log("AuthContext Selected Chat : ", selectedChat);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        dispatch,
        isAuthenticated,
        setIsAuthenticated,
        chats,
        setChats,
        selectedChat,
        setSelectedChat,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
