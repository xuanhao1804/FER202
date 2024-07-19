import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LayoutUser from "../../layout/LayoutUser";

const API_URL = 'http://localhost:9999';

export default function SwapBedHistory() {
    const [swapHistory, setSwapHistory] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        fetchSwapHistory();
        fetchPendingRequests();
    }, []);

    const fetchSwapHistory = async () => {
        try {
            const response = await axios.get(`${API_URL}/swapRequests?requestingStudentId=${user.studentID}&status_ne=pending&_sort=createdAt&_order=desc`);
            setSwapHistory(response.data);
        } catch (error) {
            console.error('Error fetching swap history:', error);
            setError('Failed to fetch swap history. Please try again.');
        }
    };

    const fetchPendingRequests = async () => {
        try {
            const response = await axios.get(`${API_URL}/swapRequests?requestedStudentId=${user.studentID}&status_in=pending,rejected&_sort=createdAt&_order=desc`);
            setPendingRequests(response.data);
        } catch (error) {
            console.error('Error fetching pending requests:', error);
            setError('Failed to fetch pending requests. Please try again.');
        }
    };

    const handleCreateNewRequest = () => {
        navigate('/create-swap-request');
    };

    const handleRequestAction = async (requestId, action) => {
        try {
            await axios.patch(`${API_URL}/swapRequests/${requestId}`, { status: action });

            if (action === 'approved') {
                const swapRequest = await axios.get(`${API_URL}/swapRequests/${requestId}`);
                
                // Update the booking requests
                const requestingBooking = await axios.get(`${API_URL}/bookingRequests?studentId=${swapRequest.data.requestingStudentId}&status=approved&isExpired=false`);
                const requestedBooking = await axios.get(`${API_URL}/bookingRequests?studentId=${swapRequest.data.requestedStudentId}&status=approved&isExpired=false`);

                if (requestingBooking.data.length > 0 && requestedBooking.data.length > 0) {
                    const requestingBookingData = requestingBooking.data[0];
                    const requestedBookingData = requestedBooking.data[0];

                    // Swap the dormitory, floor, room, and bed information
                    await axios.patch(`${API_URL}/bookingRequests/${requestingBookingData.id}`, {
                        dormitory: requestedBookingData.dormitory,
                        floor: requestedBookingData.floor,
                        room: requestedBookingData.room,
                        bed: requestedBookingData.bed
                    });

                    await axios.patch(`${API_URL}/bookingRequests/${requestedBookingData.id}`, {
                        dormitory: requestingBookingData.dormitory,
                        floor: requestingBookingData.floor,
                        room: requestingBookingData.room,
                        bed: requestingBookingData.bed
                    });
                }
            }

            alert(`Swap request ${action} successfully!`);
            fetchPendingRequests();
            fetchSwapHistory();
        } catch (error) {
            console.error(`Error ${action} request:`, error);
            setError(`Failed to ${action} request. Please try again.`);
        }
    };

    return (
        <LayoutUser>
            <Container>
                <h2>Swap Bed Request History</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Button onClick={handleCreateNewRequest} variant="primary" className="mb-3">
                    Create New Swap Request
                </Button>

                <h3>Pending and Rejected Requests</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Requesting Student</th>
                            <th>Requesting Bed</th>
                            <th>Semester</th>
                            <th>Created At</th>
                            <th>Status / Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingRequests.length > 0 ? (
                            pendingRequests.map((request) => (
                                <tr key={request.id}>
                                    <td>{request.requestingStudentName}</td>
                                    <td>{request.requestingBed}</td>
                                    <td>{request.semester}</td>
                                    <td>{new Date(request.createdAt).toLocaleString()}</td>
                                    <td>
                                        {request.status === 'pending' ? (
                                            <>
                                                <Button variant="success" size="sm" onClick={() => handleRequestAction(request.id, 'approved')} className="mr-2">
                                                    Accept
                                                </Button>
                                                <Button variant="danger" size="sm" onClick={() => handleRequestAction(request.id, 'rejected')}>
                                                    Reject
                                                </Button>
                                            </>
                                        ) : (
                                            request.status
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No pending or rejected requests available.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                <h3>Your Swap Request History</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Requested Student</th>
                            <th>Your Bed</th>
                            <th>Requested Bed</th>
                            <th>Semester</th>
                            <th>Status</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {swapHistory.length > 0 ? (
                            swapHistory.map((request) => (
                                <tr key={request.id}>
                                    <td>{request.requestedStudentName}</td>
                                    <td>{request.requestingBed}</td>
                                    <td>{request.requestedBed}</td>
                                    <td>{request.semester}</td>
                                    <td>{request.status}</td>
                                    <td>{new Date(request.createdAt).toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6">No swap request history available.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </LayoutUser>
    );
}