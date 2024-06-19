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
import Register from "./components/Register.jsx";
import NotFoundPage from "./pages/error-404/Error.js";

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

          <Route path="/listroom" element={<ListRoom />} />                {/*   view list room in dom     */}


          <Route path="/booking" element={<BookingBed />} />            {/*   booking bed student     */}



          <Route path="/manage/booking" element={<ManagePendingBooking />} />       {/*    check list payment admin    */}
          <Route path="/*" element={<NotFoundPage />} />       {/*    check list payment admin    */}
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
