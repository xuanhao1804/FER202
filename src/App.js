import { ToastContainer } from "react-toastify";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage.js";
import Login from "./components/LoginForm.js";
import UserProfile from "./components/UserProfile.js";
import BookingBed from "./pages/BookingBed.js";
import ManagePendingBooking from "./pages/ManagePendingBooking.js";
import TemplateUser from "./layout/LayoutUser.js";
import ListRoom from "./pages/ListRoom.js";
import ManagerRoom from "./pages/ManagerRoom.js";
import Register from "./components/Register.jsx";
import NotFoundPage from "./pages/error-404/Error.js";
import StudentGuide from "./pages/StudentGuide.js";
import FAQ from "./pages/FAQ.js";
import FUDormitoryRegulations from "./pages/FUDormitoryRegulations.js";
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

          <Route path="/user/:id" element={<Home />} />             {/*profile user*/}     
          <Route path="/user/edit/:id" element={<Home />} />           {/*   edit profile student     */}
          <Route path="/manage/account" element={<Home />} />         {/*   admin manage account     */}
          <Route path="/user/:id" element={<Home />} />            {/*    view profile    */}
          <Route path="/manage/room" element={<ManagerRoom />} />              {/*     manage rooma dmin   */}
          <Route path="/manage/room/edit/r:roomid" element={<Home />} />  {/* edit info room dorm*/}
          <Route path="/listroom" element={<ListRoom />} />                {/*   view list room in dom     */}


          <Route path="/booking" element={<BookingBed />} />            {/*   booking bed student     */}

          <Route path="/guide" element={<StudentGuide />} />           {/*   guide student     */} 
          <Route path="/faq" element={<FAQ />} />           {/*   FAQ     */}         
          <Route path="/regulation" element={<FUDormitoryRegulations />} />          {/*   regulation     */}
          <Route path="/manage/regulation" element={<AdminRegulations />} />          {/*   admin regulation     */}
          <Route path="/about" element={<AboutUs />}/>         {/*   about us     */}

          <Route path="/manage/booking" element={<ManagePendingBooking />} />       {/*    check list payment admin    */}
          <Route path="/*" element={<NotFoundPage />} />       {/*    check list payment admin    */}
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
