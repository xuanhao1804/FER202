import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
export default function ManagePendingBooking() {
    const [bookingRequests, setBookingRequests] = useState([]);
    const [users, setUser] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:9999/bookingRequests`)
            .then(res => res.json())
            .then(result => {
                setBookingRequests(result)
            })
            .catch();
        fetch(`http://localhost:9999/users`)
            .then(res => res.json())
            .then(result => {
                setUser(result)
            })
            .catch();
    }, [])

    const handleOnAprove = (orderId) => {
        const currentReq = bookingRequests.find(t => t.id == orderId);

        fetch(`http://localhost:9999/bookingRequests/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...currentReq, status: "approved" })
        })
            .then(res => {
                setBookingRequests(bookingRequests.map(t =>
                    t.id == orderId ? { ...t, status: "approved" } : t
                ));
                alert("Change success")
            })
            .catch();
    };

    const handleOnReject = (orderId) => {
        const currentReq = bookingRequests.find(t => t.id == orderId);

        fetch(`http://localhost:9999/bookingRequests/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...currentReq, status: "reject" })
        })
            .then(res => {
                setBookingRequests(bookingRequests.map(t =>
                    t.id == orderId ? { ...t, status: "reject" } : t
                ));
                alert("Change success")
            })
            .catch();
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-center row">
                <div className="col-md-10">
                    <div className="rounded">
                        <div className="table-responsive table-borderless table-striped">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>BookingID</th>
                                        <th>Name Student</th>
                                        <th>Dom</th>
                                        <th>Floor</th>
                                        <th>Room</th>
                                        <th>Bed</th>
                                        <th>Semester</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    {bookingRequests?.map((request) => {

                                        const student = users?.find(user => user.id == request.studentid);

                                        const statusClass = request.status === 'approved' ? 'success' : request.status === 'pending' ? 'info' : 'danger';
                                        return (
                                            <tr key={request.id} className="cell-1">
                                                <td>{request.id}</td>
                                                <td>{student.fullName}</td>
                                                {/* <td>{student.fullName}</td> */}
                                                <td>{request.dormitory}</td>
                                                <td>{request.floor}</td>
                                                <td>{request.room}</td>
                                                <td>{request.bed}</td>
                                                <td>{request.semester}</td>
                                                <td><span className={`badge badge-${statusClass}`}>{request.status}</span></td>
                                                <td>
                                                    {request.status === 'pending' ? (
                                                        <>
                                                            <Link onClick={() => handleOnAprove(request.id)}>
                                                                <i className="confirmed">&#10004;</i>
                                                            </Link>
                                                            <Link onClick={() => handleOnReject(request.id)}>
                                                                <i className="cancelled">&#10008;</i>
                                                            </Link>
                                                        </>
                                                    ) : (
                                                        <i className="block">&#128683;</i>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
