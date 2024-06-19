
import { ToastContainer } from "react-toastify";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage.js";
import LoginForm from "./components/LoginForm.js";
import UserProfile from "./components/UserProfile.js";
import ManageNewsAdmin from "./components/ManageNewsAdmin.js";
import News from "./components/News.js";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/news2" element={<ManageNewsAdmin />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/user/:id" element={<Home />} />             {/*profile user*/}     
          <Route path="/user/edit/:id" element={<Home />} />           {/*   edit profile student     */}
          <Route path="/manage/account" element={<Home />} />         {/*   admin manage account     */}
          <Route path="/user/:id" element={<Home />} />            {/*    view profile    */}
          <Route path="/manage/room" element={<Home />} />              {/*     manage rooma dmin   */}
          <Route path="/manage/room/edit/r:roomid" element={<Home />} />  {/* edit info room dorm*/}
          <Route path="/listroom" element={<Home />} />                {/*   view list room in dom     */}
          <Route path="/manage/room/add" element={<Home />} />              {/*    add room admin    */}
          <Route path="/manage/noti" element={<Home />} />             {/*   manage notidication    */}
          <Route path="/booking" element={<Home />} />            {/*   booking bed student     */}
          <Route path="/error404" element={<Home />} />               {/*    web error404  */}
          <Route path="/*" element={<Home />} />                 {/*    default home    */}
          <Route path="/manager/resident" element={<Home />} />         {/*     manage resistent admin   */}
          <Route path="/viewnoti" element={<Home />} />          {/*    view news common   */}
          <Route path="/manage/noti/add" element={<Home />} />           {/*    add news admin   */}
          <Route path="/edit/noti/:id" element={<Home />} />           {/*   edit news admin     */}
          <Route path="/payment" element={<Home />} />           {/*     payment student   */}
          <Route path="/paymenthistory" element={<Home />} />         {/*     history payment student   */}
          <Route path="/manage/payment" element={<Home />} />      {/*    check list payment admin    */}
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;