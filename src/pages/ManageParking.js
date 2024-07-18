import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import LayoutAdmin from "../layout/LayoutAdmin";
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const MangeParking = () => {
    const [Parking, setParking] = useState([]);
    const [typeCar, setTypeCar] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:9999/ParkingTicket`)
            .then(response => response.json())
            .then(data => setParking(data))
            .catch(error => console.error('Error fetching booking requests:', error));
        fetch(`http://localhost:9999/TypeVehicle`)
            .then(response => response.json())
            .then(data => setTypeCar(data))
            .catch(error => console.error('Error fetching booking requests:', error));
    }, []);
    function handleNewsClick(){
        navigate("/manage/parkingCost")
    }

    return (
        <LayoutAdmin>
            <div className="container-fluid">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-primary">Manage Parking Ticket</h2>
                    <button onClick={() => handleNewsClick()} className="btn btn-primary">Edit</button>
                </div>
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
            </div>
        </LayoutAdmin>
    );
};

export default MangeParking;