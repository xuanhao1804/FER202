import React, { useState } from 'react';
import '../style/SidebarUser.css';
import { Link } from 'react-router-dom';

function SideBarAdmin() {
    const id = sessionStorage.getItem('id')
    
    const [style, setStyle] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");

    const changeStyle = () => {
        if (style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion") {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled");
        }
        else {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion")
        }
    };

    return (
        <>
            <div id="wrapper">
                <ul className={style} id="accordionSidebar">
                    <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">
                        <div className="sidebar-brand-icon rotate-n-15">
                            <i className="fas fa-laugh-wink"></i>
                        </div>
                        <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
                        <div className="text-center d-none d-md-inline">
                            <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
                        </div>
                    </a>

                    <hr className="sidebar-divider my-0" />

                    <li className="nav-item active">
                        <Link className="nav-link" to={'/'}>
                            <span>Home</span>
                        </Link>
                    </li>

                    <hr className="sidebar-divider" />

                    <div className="sidebar-heading">
                        Interface
                    </div>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                            aria-expanded="true" aria-controls="collapseTwo">
                            <i className="fas fa-fw fa-cog"></i>
                            <span>Manager</span>
                        </a>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Manager Components:</h6>
                                <Link className="collapse-item" to={`/manage/user`}>Manager Users</Link>
                                <Link className="collapse-item" to={`/manage/room`}>Manager Rooms</Link>
                                {/* <Link className="collapse-item" to={`/account`}>Manager Accounts</Link> */}
                                <Link className="collapse-item" to={'/manage-resident'}>Manager Residents</Link>
                                <Link className="collapse-item" to={'/manage/paymentRequests'}>Manager Payments</Link>
                                <Link className="collapse-item" to={'/manage/regulation'}>Manager Regulations</Link>
                                <Link className="collapse-item" to={'/manage/news'}>Manager News</Link>
                                <Link className="collapse-item" to={'/manage/booking'}>Manage Pending Bookings</Link>
                                <Link className="collapse-item" to={'/manage/feedback'}>Manage Pending Feedback</Link>
                            </div>
                        </div>
                    </li>

                    <hr className="sidebar-divider" />

                    <div className="sidebar-heading">
                        Addons
                    </div>

                    <li className="nav-item">
                        <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages"
                            aria-expanded="true" aria-controls="collapsePages">
                            <i className="fas fa-fw fa-folder"></i>
                            <span>Setting</span>
                        </a>
                        <div id="collapsePages" className="collapse" aria-labelledby="headingPages" data-parent="#accordionSidebar">
                            <div className="bg-white py-2 collapse-inner rounded">
                                <h6 className="collapse-header">Setting options:</h6>
                                {/* <Link className="collapse-item" to={`/user/${id}`}>Profile</Link> */}
                                <Link className="collapse-item" to={'/changepass'}>Change Password</Link>
                            </div>
                        </div>
                    </li>

                    <hr className="sidebar-divider d-none d-md-block" />
                </ul>
            </div>
        </>
    )
}

export default SideBarAdmin;