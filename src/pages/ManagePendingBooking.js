import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export default function ManagePendingBooking() {
    const dormitories = [
        {
            "id": 1,
            "name": "A",
            type: 1,
            floors: [
                {
                    "id": 1,
                    "floorNumber": 1,
                    "totalBeds": 20,
                    "usedBeds": 7,
                    "freeBeds": 13,
                },
                {
                    "id": 2,
                    "floorNumber": 2,
                    "totalBeds": 20,
                    "usedBeds": 10,
                    "freeBeds": 10,
                },
                {
                    "id": 3,
                    "floorNumber": 3,
                    "totalBeds": 20,
                    "usedBeds": 2,
                    "freeBeds": 18,
                }
            ]
        },
        {
            "id": 2,
            "name": "B",
            type: 1,
            floors: [
                {
                    "id": 1,
                    "floorNumber": 1,
                    "totalBeds": 20,
                    "usedBeds": 5,
                    "freeBeds": 15,
                },
                {
                    "id": 2,
                    "floorNumber": 2,
                    "totalBeds": 20,
                    "usedBeds": 10,
                    "freeBeds": 10,
                },
                {
                    "id": 3,
                    "floorNumber": 3,
                    "totalBeds": 20,
                    "usedBeds": 2,
                    "freeBeds": 18,
                },
                {
                    "id": 4,
                    "floorNumber": 4,
                    "totalBeds": 20,
                    "usedBeds": 2,
                    "freeBeds": 18,
                }
            ]
        },
    ]
    const initialBookingRequests = [
        {
            "id": 1,
            "student": 2,
            "dormitory": 1,
            "floor": 1,
            "semester": "Summer 2024",
            "status": "pending"
        },
        {
            "id": 2,
            "student": 1,
            "dormitory": 2,
            "floor": 3,
            "semester": "Summer 2024",
            "status": "pending"
        }
    ]
    const users = [
        {
            "id": 1,
            "username": "admin",
            "password": "admin123",
            "role": "admin",
            "fullName": "John Doe",
            "gender": "male",
            "address": "123 Main St, Anytown USA",
            "phone": "1234567890",
            "avatar": "https://example.com/admin-avatar.jpg"
        },
        {
            "id": 2,
            "username": "student1",
            "password": "student123",
            "role": "student",
            "fullName": "Jane Smith",
            "gender": "female",
            "address": "456 Elm St, Anytown USA",
            "phone": "9876543210",
            "avatar": "https://example.com/student1-avatar.jpg"
        }
    ]
    const [bookingRequests, setBookingRequests] = useState(initialBookingRequests);
    const handleOnAprove = (orderId) => {
        setBookingRequests(prevRequests =>
            prevRequests.map(request =>
                request.id === orderId ? { ...request, status: 'approved' } : request
            )
        );
    };
    const handleOnReject = (orderId) => {
        setBookingRequests(prevRequests =>
            prevRequests.map(request =>
                request.id === orderId ? { ...request, status: 'Reject' } : request
            )
        );
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
                                        <th>Semester</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className="table-body">
                                    {bookingRequests.map((request) => {
                                        const student = users.find(user => user.id === request.student);
                                        const dom = dormitories.find(d => d.id == request.dormitory)
                                        const statusClass = request.status === 'approved' ? 'success' : request.status === 'pending' ? 'info' : 'danger';
                                        return (
                                            <tr key={request.id} className="cell-1">
                                                <td>{request.id}</td>
                                                <td>{student.fullName}</td>
                                                <td>{dom.name}</td>
                                                <td>{request.floor}</td>
                                                <td>{request.semester}</td>
                                                <td><span className={`badge badge-${statusClass}`}>{request.status}</span></td>
                                                <td>
                                                    {request.status === 'pending' ? (
                                                        <>
                                                            <Link onClick={() => handleOnAprove(request.id, 'approved')}>
                                                                <i className="confirmed">&#10004;</i>
                                                            </Link>
                                                            <Link onClick={() => handleOnReject(request.id, 'reject')}>
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
