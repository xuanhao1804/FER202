import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TemplateAdmin from "../layout/LayoutAdmin";
import axios from 'axios';
export default function ManagePendingBooking() {
    const [bookingRequests, setBookingRequests] = useState([]);
    const [users, setUser] = useState([]);
    const [dormitories, setDormitories] = useState([]);
    const [log, setLog] = useState(JSON.parse(localStorage.getItem("user")));


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
        fetch(`http://localhost:9999/dormitories`)
            .then(res => res.json())
            .then(result => {
                setDormitories(result)
            })
            .catch();
    }, [])

    const handleOnAprove = (id, studentid, dormitory, floors, rooms, beds) => {
        const currentReq = bookingRequests.find(t => t.id == id);
        try {

            fetch(`http://localhost:9999/bookingRequests/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...currentReq, status: "approved" })
            })

                .then(res => {
                    setBookingRequests(bookingRequests.map(t =>
                        t.id == id ? { ...t, status: "approved" } : t
                    ));
                    alert("Change success")
                })
                .catch();
            const dorm = dormitories?.find(dorm => dorm.id == dormitory)
            const floor = dorm.floors?.find(fl => fl.id.toString() === floors.toString());
            const room = floor.rooms.find(rm => rm.id.toString() === rooms.toString());
            const bed = room.beds.find(bd => bd.id.toString() === beds.toString());
            bed.student = studentid;
            bed.status = "occupied";
            axios.put(`http://localhost:9999/dormitories/${dormitory}`, dorm, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (room.roomType == '4 bed') {
                const updatedLog = { ...log, balance: log.balance - 850000 };
                axios.put(`http://localhost:9999/users/${log.id}`, updatedLog, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                localStorage.setItem("user", JSON.stringify(updatedLog));
            } else {
                const updatedLog = { ...log, balance: log.balance - 1050000 };
                axios.put(`http://localhost:9999/users/${log.id}`, updatedLog, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                localStorage.setItem("user", JSON.stringify(updatedLog));
            }

        } catch (error) {
            console.error('Error updating studentId for room:', error);
        }
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
        <TemplateAdmin>
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

                                            const student = users?.find(user => user.studentID == request.studentid);
                                            const dorm = dormitories?.find(dorm => dorm.id == request.dormitory)
                                            const floor = dorm.floors.find(fl => fl.id.toString() === request.floor.toString());
                                            const room = floor.rooms.find(rm => rm.id.toString() === request.room.toString());
                                            const bed = room.beds.find(bd => bd.id.toString() === request.bed.toString());
                                            const statusClass = request.status === 'approved' ? 'success' : request.status === 'pending' ? 'info' : 'danger';
                                            return (
                                                <tr key={request.id} className="cell-1">
                                                    <td>{request.id}</td>
                                                    <td>{student?.fullName}</td>
                                                    <td>{dormitories?.find(dorm => dorm.id == request.dormitory).name}</td>
                                                    <td>{floor.floorNumber}</td>
                                                    <td>{room.roomNumber}</td>
                                                    <td>{bed.name}</td>
                                                    <td>{request.semester}</td>
                                                    <td><span className={`badge badge-${statusClass}`}>{request.status}</span></td>
                                                    <td>
                                                        {request.status === 'pending' ? (
                                                            <>
                                                                <Link onClick={() => handleOnAprove(request.id, request.studentid, request.dormitory, request.floor, request.room, request.bed)}>
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
        </TemplateAdmin>
    );
}
