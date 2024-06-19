import { ToastContainer } from "react-toastify";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage.js";
import LoginForm from "./components/LoginForm.js";
import UserProfile from "./components/UserProfile.js";
import ListRoom from "./pages/ListRoom.js";
import Register from "./components/Register.jsx";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/user/:id" element={<Home />} />                  
          <Route path="/user/edit/:id" element={<Home />} />           
          <Route path="/manage/account" element={<Home />} />       
          <Route path="/user/:id" element={<Home />} />        
          <Route path="/manage/room" element={<Home />} />             
          <Route path="/manage/room/edit/r:roomid" element={<Home />} />  
          <Route path="/listroom" element={<ListRoom />} />               
          <Route path="/manage/room/add" element={<Home />} />             
          <Route path="/manage/noti" element={<Home />} />          
          <Route path="/booking" element={<Home />} />           
          <Route path="/error404" element={<Home />} />           
          <Route path="/*" element={<Home />} />             
          <Route path="/manager/resident" element={<Home />} />      
          <Route path="/viewnoti" element={<Home />} />         
          <Route path="/manage/noti/add" element={<Home />} />         
          <Route path="/edit/noti/:id" element={<Home />} />          
          <Route path="/payment" element={<Home />} />          
          <Route path="/paymenthistory" element={<Home />} />         
          <Route path="/manage/payment" element={<Home />} />     
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
