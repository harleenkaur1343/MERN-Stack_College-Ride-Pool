import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import GetStarted from './components/GetStarted'
import SignupOfferer from './components/SignupOfferer';
import SignupRider from './components/SignupRider';
import Login from './components/Login'
import Navbar from './components/Navbar'
import Home from './components/Home';
import MyChat from './components/MyChat';
import Chatpage from './components/ChatPage';
import { useAuthContest } from "./hooks/useAuthContext"; 
import Singlechat from './components/Singlechat';
import ChatContainer from './components/ChatContainer';
import SideBar from './components/Sidebar';


/* to whole refresh .env file was added after reintalling the npm package */

//routes - component wraps all the individuall routes
// route - list the individual routes
function App() {
  const { user } = useAuthContest();
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
         <div className='pages' style={{marginTop:"80px"}}>
          <Routes>
            <Route
              path="/"
              element={!user?<GetStarted/>:<Navigate to="/home"/>}
            />
            <Route
              path="/signup"
              element={!user?<SignupRider/>:<Navigate to="/home"/>}
            />
            <Route
              path="/signup_offerer"
              element={!user?<SignupOfferer/>:<Navigate to="/home"/>}
            />
            <Route
              path="/login"
              element={!user?<Login/>:<Navigate to="/home"/>}
            />
            <Route
              path="/home"
              element={user?<Home/>:<Navigate to="/login"/>}
            />
             <Route
              path="/chat"
              element={<MyChat/>}
            />
            <Route
              path="/chatpage"
              element={<Chatpage/>}
            />
             <Route
              path="/singlechat"
              element={<Singlechat/>}
            />
            <Route
              path="/sidebar"
              element={<SideBar/>}
            />
          </Routes>
         </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
