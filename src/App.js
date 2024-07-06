import { ToastContainer } from "react-toastify";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage.js";
import Login from "./components/LoginForm.js";
import UserProfile from "./pages/UserProfile.js";
import BookingBed from "./pages/BookingBed.js";
import ManagePendingBooking from "./pages/ManagePendingBooking.js";
import TemplateUser from "./layout/LayoutUser.js";
import ListRoom from "./pages/ListRoom.js";
import DormitoryDetail from './pages/DormitoryDetail.js';
import ManagerRoom from "./pages/ManagerRoom.js";
import Register from "./components/Register.js";
import NotFoundPage from "./pages/error-404/Error.js";
import StudentGuide from "./pages/StudentGuide.js";
import FAQ from "./pages/FAQ.js";
import FUDormitoryRegulations from "./pages/FUDormitoryRegulations.js";
import DormitorySelector from "./pages/user/BookingBed2.js";


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
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
