import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LayoutUser from "../../layout/LayoutUser";

const API_URL = 'http://localhost:9999';

function getCurrentSemester() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    
    if (month >= 8 && month <= 12) {
        return `Fall ${year}`;
    } else if (month >= 1 && month <= 5) {
        return `Spring ${year}`;
    } else {
        return `Summer ${year}`;
    }
}

export default function CreateSwapRequest() {
    const [requestedStudentId, setRequestedStudentId] = useState('');
    const [requestedStudentInfo, setRequestedStudentInfo] = useState(null);
    const [userBooking, setUserBooking] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        const fetchUserBooking = async () => {
            try {
                const response = await axios.get(`${API_URL}/bookingRequests?studentId=${user.studentID}&status=approved&isExpired=false&_sort=createdAt&_order=desc&_limit=1`);
                if (response.data.length > 0) {
                    setUserBooking(response.data[0]);
                } else {
                    setError('No active booking found for your account.');
                }
            } catch (error) {
                console.error('Error fetching user booking:', error);
                setError('Failed to fetch your booking information. Please try again.');
            }
        };

        fetchUserBooking();
    }, [user.studentID]);

    const fetchRequestedStudentInfo = async () => {
        try {
            const bookingResponse = await axios.get(`${API_URL}/bookingRequests?studentId=${requestedStudentId}&status=approved&isExpired=false&_sort=createdAt&_order=desc&_limit=1`);
            
            if (bookingResponse.data.length > 0) {
                const bookingInfo = bookingResponse.data[0];
                setRequestedStudentInfo(bookingInfo);
                setError('');
            } else {
                setRequestedStudentInfo(null);
                setError('No approved booking found for this student ID.');
            }
        } catch (error) {
            console.error('Error fetching student info:', error);
            setError('Failed to fetch student information. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!requestedStudentInfo) {
            setError('Please fetch and confirm the requested student information first.');
            return;
        }
        
        if (!userBooking) {
            setError('You do not have an active booking. Please book a bed before creating a swap request.');
            return;
        }

        try {
            const requestingBed = `${userBooking.dormitory}/${userBooking.floor}/${userBooking.room}/${userBooking.bed}`;
            const requestedBed = `${requestedStudentInfo.dormitory}/${requestedStudentInfo.floor}/${requestedStudentInfo.room}/${requestedStudentInfo.bed}`;

            const response = await axios.post(`${API_URL}/swapRequests`, {
                requestingStudentId: user.studentID,
                requestingStudentName: user.fullName,
                requestedStudentId: requestedStudentInfo.studentId,
                requestedStudentName: requestedStudentInfo.fullName,
                currentDormitory: userBooking.dormitory,
                currentFloor: userBooking.floor,
                currentRoom: userBooking.room,
                currentBed: userBooking.bed,
                requestedDormitory: requestedStudentInfo.dormitory,
                requestedFloor: requestedStudentInfo.floor,
                requestedRoom: requestedStudentInfo.room,
                requestedBed: requestedStudentInfo.bed,
                requestingBed: requestingBed,
                requestedBed: requestedBed,
                semester: getCurrentSemester(),
                status: 'pending',
                createdAt: new Date().toISOString()
            });
            
            if (response.status === 201) {
                alert('Swap request created successfully!');
                navigate('/swap-bed-history');
            }
        } catch (error) {
            console.error('Error creating swap request:', error);
            setError('Failed to create swap request. Please try again.');
        }
    };

    return (
        <LayoutUser>
            <Container>
                <h2>Create Swap Bed Request</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Requested Student ID</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={requestedStudentId} 
                            onChange={(e) => setRequestedStudentId(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="secondary" onClick={fetchRequestedStudentInfo} className="mb-3">
                        Fetch Student Info
                    </Button>
                    {requestedStudentInfo && (
                        <div className="mb-3">
                            <h4>Requested Student Information:</h4>
                            <p>Student ID: {requestedStudentInfo.studentId}</p>
                            <p>Dormitory: {requestedStudentInfo.dormitory}</p>
                            <p>Floor: {requestedStudentInfo.floor}</p>
                            <p>Room: {requestedStudentInfo.room}</p>
                            <p>Bed: {requestedStudentInfo.bed}</p>
                        </div>
                    )}
                    {userBooking && (
                        <div className="mb-3">
                            <h4>Your Current Booking:</h4>
                            <p>Dormitory: {userBooking.dormitory}</p>
                            <p>Floor: {userBooking.floor}</p>
                            <p>Room: {userBooking.room}</p>
                            <p>Bed: {userBooking.bed}</p>
                        </div>
                    )}
                    <Button variant="primary" type="submit" disabled={!requestedStudentInfo || !userBooking}>
                        Submit Swap Request
                    </Button>
                </Form>
            </Container>
        </LayoutUser>
    );
}