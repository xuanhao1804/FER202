import { ToastContainer } from "react-toastify";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage.js";
import Login from "./components/LoginForm.js";
import UserProfile from "./pages/user/UserProfile.js";
import BookingBed from "./pages/user/BookingBed.js";
import ManagePendingBooking from "./pages/ManagePendingBooking.js";
// import TemplateUser from "./layout/LayoutUser.js";
import ListRoom from "./pages/user/ListRoom.js";
import DormitoryDetail from './pages/user/DormitoryDetail.js';
import ManagerRoom from "./pages/ManagerRoom.js";
import Register from "./components/Register.js";
import NotFoundPage from "./pages/error-404/Error.js";
import StudentGuide from "./pages/user/StudentGuide.js";
import FAQ from "./pages/user/FAQ.js";
import FUDormitoryRegulations from "./pages/user/FUDormitoryRegulations.js";
import DormitorySelector from "./pages/user/BookingBed2.js";
import BookingRequests from "./pages/user/BookingRequests.js";
import ChangePassword from "./pages/user/ChangePassword.js";
import AboutUs from "./pages/AboutUs.js";
import AdminRegulations from "./pages/AdminRegulations.js";


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/user/:id" element={<UserProfile />} />            
          <Route path="/user/:id" element={<Home />} />          
          <Route path="/manage/room" element={<ManagerRoom />} />            
          <Route path="/listroom" element={<ListRoom />} />
          <Route path="/dormitory/:dormitoryId" element={<DormitoryDetail />} />                
          <Route path="/booking" element={<BookingBed />} />            
          <Route path="/guide" element={<StudentGuide />} />       
          <Route path="/faq" element={<FAQ />} />         
          <Route path="/regulation" element={<FUDormitoryRegulations />} />         
          <Route path="/manage/booking" element={<ManagePendingBooking />} />      
          <Route path="/*" element={<NotFoundPage />} />      
          <Route path="/booking2" element={<DormitorySelector />} />  
          <Route path="/booking-requests" element={<BookingRequests />} />    
          <Route path="/changepass" element={<ChangePassword />} />    

        
          <Route path="/manage/regulation" element={<AdminRegulations />} />       
          <Route path="/about" element={<AboutUs />}/>      

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
