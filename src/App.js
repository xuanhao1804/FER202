import { ToastContainer } from "react-toastify";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage.js";
import LoginForm from "./components/LoginForm.js";
import UserProfile from "./components/UserProfile.js";
import BookingBed from "./pages/BookingBed.js";
import ManagePendingBooking from "./pages/ManagePendingBooking.js";
import TemplateUser from "./layout/LayoutUser.js";
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
          <Route path="/user/:id" element={<Home />} />             {/*profile user*/}     
          <Route path="/user/edit/:id" element={<Home />} />           {/*   edit profile student     */}
          <Route path="/manage/account" element={<Home />} />         {/*   admin manage account     */}
          <Route path="/user/:id" element={<Home />} />            {/*    view profile    */}
          <Route path="/manage/room" element={<Home />} />              {/*     manage rooma dmin   */}
          <Route path="/manage/room/edit/r:roomid" element={<Home />} />  {/* edit info room dorm*/}
          <Route path="/listroom" element={<ListRoom />} />                {/*   view list room in dom     */}
          <Route path="/manage/room/add" element={<Home />} />              {/*    add room admin    */}
          <Route path="/manage/noti" element={<Home />} />             {/*   manage notidication    */}
          <Route path="/booking" element={<BookingBed />} />            {/*   booking bed student     */}
          <Route path="/error404" element={<Home />} />               {/*    web error404  */}
          <Route path="/*" element={<Home />} />                 {/*    default home    */}
          <Route path="/manager/resident" element={<Home />} />         {/*     manage resistent admin   */}
          <Route path="/viewnoti" element={<Home />} />          {/*    view news common   */}
          <Route path="/manage/noti/add" element={<Home />} />           {/*    add news admin   */}
          <Route path="/edit/noti/:id" element={<Home />} />           {/*   edit news admin     */}
          <Route path="/payment" element={<Home />} />           {/*     payment student   */}
          <Route path="/paymenthistory" element={<Home />} />         {/*     history payment student   */}
          <Route path="/manage/payment" element={<Home />} />
          <Route path="/manage/booking" element={<ManagePendingBooking />} />       {/*    check list payment admin    */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
