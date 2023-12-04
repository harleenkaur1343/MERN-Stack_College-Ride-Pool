import ChatContainer from "./ChatContainer";
import MyChat from "./MyChat";
import SideBar from "./Sidebar";
import { useAuthContest } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Chatpage = () => {
  const navigate = useNavigate();
  const { user } = useAuthContest();
  const [fetchAgain, setFetchAgain] = useState(false);
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user)
    {
      setFetchAgain(true);
    }
    else{
      setFetchAgain(false);
      navigate("/session-timed-out");
    }
    console.log("Fetch again",fetchAgain)
  },[])
  return (
    <div style={{ width: "100%" }}>
      {user && <SideBar />}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "92.5vh",
          padding: "10px",
        }}
      >
        {user && <MyChat fetchAgain={fetchAgain} />}
        {user && <ChatContainer fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
      </div>
    </div>
  );
};

export default Chatpage;
