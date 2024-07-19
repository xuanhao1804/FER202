import React, { useState, useEffect } from "react";
import "../style/SidebarUser.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SideBarUser() {
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role) {
      setUserRole(user.role);
    }
  }, []);

  const checkAccess = (path) => {
    if (userRole !== "student") {
      toast.error("Forbidden: Access denied");
      return;
    }
    navigate(path);
  };
  const id = sessionStorage.getItem("id");

  const [style, setStyle] = useState(
    "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
  );

  const changeStyle = () => {
    if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
  };
  const changeStyle1 = () => {
    if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled1");
    } else {
      setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
    }
  };

  return (
    <>
      {/*  <!-- Page Wrapper --> */}
      <div id="wrapper">
        {/*  <!-- Sidebar --> */}
        <ul className={style} id="accordionSidebar" style={{ width: "95%" }}>
          {/*  <!-- Sidebar - Brand --> */}
          <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink"></i>
            </div>
            <div className="sidebar-brand-text mx-3"></div>
            <div className="text-center d-none d-md-inline">
              <button
                className="rounded-circle border-0"
                id="sidebarToggle"
                onClick={changeStyle}
              ></button>
            </div>
          </a>

          <hr className="sidebar-divider my-0" />


          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              <i className="fas fa-fw fa-cog"></i>
              <span>View</span>
            </a>
            <div
              id="collapseTwo"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">View Option:</h6>

                <Link className="collapse-item" to={`/listroom`}>
                  List Room
                </Link>
                <Link className="collapse-item" to={`/viewnews`}>
                  New{" "}
                </Link>
              </div>
            </div>
          </li>

          {/*  <!-- Nav Item - Pages Collapse Menu --> */}
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapsePages"
              aria-expanded="true"
              aria-controls="collapsePages"
            >
              <i className="fas fa-fw fa-folder"></i>
              <span>Setting</span>
            </a>
            <div
              id="collapsePages"
              className="collapse"
              aria-labelledby="headingPages"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Page Setting:</h6>
                <Link className="collapse-item" to={`/user/${id}`}>
                  Profile
                </Link>
                <Link className="collapse-item" to={"/changepass"}>
                  Change Password
                </Link>
                {/* <div className="collapse-divider"></div>
                                    <h6 className="collapse-header">Other Pages:</h6>
                                    <a className="collapse-item" href="404.html">404 Page</a>
                                    <a className="collapse-item" href="blank.html">Blank Page</a> */}
              </div>
            </div>
          </li>

          {/* <!-- Nav Item - Booking Collapse Menu --> */}
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapseBooking"
              aria-expanded="true"
              aria-controls="collapseBooking"
            >
              <i className="fas fa-fw fa-calendar-check"></i>
              <span>Booking</span>
            </a>
            <div
              id="collapseBooking"
              className="collapse"
              aria-labelledby="headingBooking"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Booking Options:</h6>
                <Link className="collapse-item" to={"/booking-bed"}>
                  Booking Bed
                </Link>
                <Link className="collapse-item" to={"/booking-parking"}>
                  Booking Parking Cards
                </Link>
              </div>
            </div>
          </li>

          {/* <!-- Divider --> */}

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapseHistory"
              aria-expanded="true"
              aria-controls="collapseHistory"
            >
              <i className="fas fa-fw fa-history"></i>
              <span>History</span>
            </a>
            <div
              id="collapseHistory"
              className="collapse"
              aria-labelledby="headingHistory"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">History Options:</h6>
                <Link className="collapse-item" to={"/payment/history"}>
                  Payment History
                </Link>
                <Link className="collapse-item" to={"/booking-requests"}>
                  Request History
                </Link>
                <Link className="collapse-item" to={"/resident-history"}>
                  Resident History
                </Link>
                <Link className="collapse-item" to={"/parking-history"}>
                  Parking Ticket History
                  </Link>
                <Link className="collapse-item" to={"/feedback-history"}>
                  FeedBack History
                </Link>
              </div>
            </div>
          </li>
          <hr className="sidebar-divider d-none d-md-block" />
          <li className="nav-item active">
            <Link className="nav-link" to={"/swap-bed-history"}>
              <span> Swaped history </span>
            </Link>
          </li>
          <hr className="sidebar-divider d-none d-md-block" />
          <li className="nav-item active">
            <Link className="nav-link" to={"/notification"}>
              <span> Notifications </span>
            </Link>
          </li>
          <hr className="sidebar-divider d-none d-md-block" />
          <li className="nav-item active">
            <Link className="nav-link" to={"/guide"}>
              <span> User guide </span>
            </Link>
          </li>

          <hr className="sidebar-divider d-none d-md-block" />
          <li className="nav-item active">
            <Link className="nav-link" to={"/regulation"}>
              <span> Dormitory Regulations </span>
            </Link>
          </li>
          <hr className="sidebar-divider d-none d-md-block" />
          <li className="nav-item active">
            <Link className="nav-link" to={"/payment"}>
              <span> Payment </span>
            </Link>
          </li>


          <hr className="sidebar-divider d-none d-md-block" />
          <li className="nav-item active">
            <Link className="nav-link" to={"/faq"}>
              <span> FAQ </span>
            </Link>
          </li>
          <hr className="sidebar-divider d-none d-md-block" />
          <li className="nav-item active">
            <Link className="nav-link" to={"/feedback"}>
              <span> FeedBack </span>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SideBarUser;
