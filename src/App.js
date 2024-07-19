import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS của react-toastify
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage.js";
import Login from "./components/LoginForm.js";
import UserProfile from "./pages/user/UserProfile.js";
import BookingBed from "./pages/user/BookingBed.js";
import ManagePendingBooking from "./pages/ManagePendingBooking.js";
import ListRoom from "./pages/user/ListRoom.js";
import DormitoryDetail from './pages/user/DormitoryDetail.js';
import ManagerRoom from "./pages/ManagerRoom.js";
import Register from "./components/Register.js";
import NotFoundPage from "./pages/error-404/Error.js";


import EditRoom from "./pages/EditRoom.js";
import StudentGuide from "./pages/user/StudentGuide.js";
import FAQ from "./pages/user/FAQ.js";
import FUDormitoryRegulations from "./pages/user/FUDormitoryRegulations.js";
import BookingRequests from "./pages/user/BookingRequests.js";
import ChangePassword from "./pages/user/ChangePassword.js";
import AboutUs from "./pages/AboutUs.js";

import ManagerUser from "./pages/ManagerUser.js";
import News from "./components/News.js";
import ManageNewsAdmin from "./components/ManageNewsAdmin.js";
import NewsDetail from "./components/NewDetail.js";
import ResidentHistory from "./pages/user/ResidentHistory.js";
import ManageResident from "./pages/admin/ManageResident.js";
import PrivateRoute from './components/PrivateRoute'; // import PrivateRoute component
import StudentRoute from './components/StudentRoute'; // import StudentRoute component
import CreateDormitory from "./pages/CreateDomitory.js";
import ParkingTicket from "./pages/user/ParkingTicket.js";
import ViewParking from "./pages/user/ViewParking.js";
import MangeParking from "./pages/ManageParking.js";
import MangeParkingCost from "./pages/MangeParkingCost.js";

import AdminRegulations from "./pages/AdminRegulations.js";
import CDFChangeHistory from "./pages/admin/CDFChangeHistory.js";
import CDFBonusPage from "./pages/admin/cdf-change/CDFBonusPage.js";
import CDFMinusPage from "./pages/admin/cdf-change/CDFMinusPage.js";
import UserNotification from "./pages/user/UserNotification.js";
import NotificationDetail from "./components/NotificationDetail.js";

import FeedBackUser from "./pages/user/FeedBackUser.js";
import FeedBackHistory from "./pages/user/FeedBackHistory.js";
import ManageFeedBack from "./pages/ManageFeedback.js";
import Payment from "./pages/user/Payment.js";
import PaymentHistory from "./pages/user/PaymentHistory.js";
import PaymentRequests from "./pages/PaymentRequest.js";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/changepass" element={<ChangePassword />} />       
          <Route path="/*" element={<NotFoundPage />} />
       

          {/* Student routes */}
          <Route element={<StudentRoute />}>
            <Route path="/user" element={<UserProfile />} />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="/listroom" element={<ListRoom />} />
            <Route path="/dormitory/:dormitoryId" element={<DormitoryDetail />} />
            <Route path="/booking-bed" element={<BookingBed />} />
            <Route path="/guide" element={<StudentGuide />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/regulation" element={<FUDormitoryRegulations />} />
            <Route path="/booking-requests" element={<BookingRequests />} />
            <Route path="/viewnews" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/resident-history" element={<ResidentHistory />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/booking-parking" element={<ParkingTicket />} />
            <Route path="/parking-history" element={<ViewParking />} />
            <Route path="/notification" element={<UserNotification />} />
            <Route path="/notification/detail/:nid" element={<NotificationDetail />} />


            <Route path="/payment" element={<Payment />} />
            <Route path="/payment/history" element={<PaymentHistory/>} />

            <Route path="/feedback" element={<FeedBackUser />} />
            <Route path="/feedback-history" element={<FeedBackHistory />} />
          </Route>

          {/* Admin routes */}
          <Route element={<PrivateRoute role="admin" />}>
            <Route path="/manage/room" element={<ManagerRoom />} />
            <Route path="/edit/room/:id" element={<EditRoom />} /> 
            <Route path="/create/dormitory" element={<CreateDormitory />} />  
            <Route path="/manage/user" element={<ManagerUser />} />
            <Route path="/manage/news" element={<ManageNewsAdmin />} />
            <Route path="/manage/booking" element={<ManagePendingBooking />} />
            <Route path="/manage/regulation" element={<AdminRegulations />} />
            <Route path="/manage-resident" element={<ManageResident />} />
            <Route path="/manage/parking" element={<MangeParking />} />
            <Route path="/manage/parkingCost" element={<MangeParkingCost />} />
           

            <Route path="/manage/cdf/history" element={<CDFChangeHistory />} />
            <Route path="/manage/cdf/bonus/:sid" element={<CDFBonusPage />} />
            <Route path="/manage/cdf/minus/:sid" element={<CDFMinusPage />} />
            <Route path="/manage/feedback" element={<ManageFeedBack />} />
            <Route path="/manage/paymentRequests" element={<PaymentRequests/> } />
          </Route>

          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
