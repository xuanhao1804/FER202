import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import LayoutUser from "../../layout/LayoutUser";

const ViewParking = () => {
    const [Parking, setParking] = useState([]);
    const [typeCar, setTypeCar] = useState([])
    const userId = JSON.parse(localStorage.getItem("user")).studentID;

    useEffect(() => {
        fetch(`http://localhost:9999/ParkingTicket?studentID=${userId}`)
            .then(response => response.json())
            .then(data => setParking(data))
            .catch(error => console.error('Error fetching booking requests:', error));
        fetch(`http://localhost:9999/TypeVehicle`)
            .then(response => response.json())
            .then(data => setTypeCar(data))
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
                <h2 className="text-primary mb-4">Your Parking Ticket</h2>
                {Parking.length === 0 ? (
                    <p className="text-muted">You have no Parking Ticket.</p>
                ) : (
                    <div className="row">
                        {Parking.map((request) => {
                            const today = new Date();
                            const endDate = new Date(request.EndDate);
                            const isExpired = today > endDate;

                            return (
                                <div key={request.id} className="col-md-6 mb-4">
                                    <div className={`card shadow-sm h-100 ${isExpired ? 'bg-danger-light' : 'bg-success-light'}`}>
                                        <div className="card-body">
                                            <h5 className="card-title text-primary">
                                                Type: {typeCar.find(t => t.id == request.type)?.name || 'Unknown Type'}
                                            </h5>
                                            <p className="card-text">
                                                <strong>Manufature:</strong> {request.Manufature}<br />
                                                <strong>Name:</strong> {request.Name}<br />
                                                <strong>Color:</strong> {request.Color}<br />
                                                <strong>Owner:</strong> {request?.Owner || `None`}<br />
                                                <strong>NumberPlate:</strong> {request.NumberPlate}<br />
                                                <strong>startDate:</strong> {request.startDate}<br />
                                                <strong>EndDate:</strong> {request.EndDate}<br />
                                            </p>
                                            <div className={`status ${isExpired ? 'text-danger' : 'text-success'}`}>
                                                {isExpired ? 'Expired' : 'Valid'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </LayoutUser>
    );
};

export default ViewParking;