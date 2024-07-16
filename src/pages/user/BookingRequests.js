import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import LayoutUser from "../../layout/LayoutUser";

const BookingRequests = () => {
  const [bookingRequests, setBookingRequests] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user")).studentID;

  useEffect(() => {
    fetch(`http://localhost:9999/bookingRequests?studentid=${userId}`)
      .then(response => response.json())
      .then(data => setBookingRequests(data))
      .catch(error => console.error('Error fetching booking requests:', error));
  }, [userId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-warning bg-warning-light';
      case 'approved':
        return 'text-success bg-success-light';
      case 'rejected':
        return 'text-danger bg-danger-light';
      default:
        return 'text-secondary bg-light';
    }
  };

  return (
    <LayoutUser>
      <div className="container-fluid">
        <h2 className="text-primary mb-4">Your Booking Requests</h2>
        {bookingRequests.length === 0 ? (
          <p className="text-muted">You have no booking requests.</p>
        ) : (
          <div className="row">
            {bookingRequests.map((request) => (
              <div key={request.id} className="col-md-6 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title text-primary">
                      Dormitory {request.dormitory}, Floor {request.floor}, Room {request.room}
                    </h5>
                    <p className="card-text">
                      <strong>Bed:</strong> {request.bed}<br />
                      <strong>Semester:</strong> {request.semester}<br />
                      <strong>Requested on:</strong> {format(new Date(request.createdAt || new Date()), 'MMM dd, yyyy')}
                    </p>
                    <div className={`badge ${getStatusColor(request.status)}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </LayoutUser>
  );
};

export default BookingRequests;