import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LayoutAdmin from '../layout/LayoutAdmin';

const PaymentRequests = () => {
    const [requests, setRequests] = useState([]);
    const [balance, setBalance] = useState(0); // Thêm state cho số dư tài khoản

    const [users, setUsers] = useState([]);
    useEffect(() => {
        // Hàm để lấy danh sách yêu cầu thanh toán
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:9999/paymentRequests');
                setRequests(response.data); // Cập nhật state với danh sách yêu cầu

            } catch (error) {
                console.error('Error fetching payment requests:', error);
            }
        };

        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:9999/users');
                setUsers(response.data);

            } catch (error) {
                console.error('Error fetching payment requests:', error);
            }
        };
        fetchUser();
        fetchRequests();
    }, [requests]);

    const handleApprove = async (id) => {
        try {
            const response = await axios.get(`http://localhost:9999/paymentRequests/${id}`);
            const currentRequest = response.data;
            const updatedRequest = {
                ...currentRequest,
                status: 'Approved'
            };
            await axios.put(`http://localhost:9999/paymentRequests/${id}`, updatedRequest);
            console.log('Request updated successfully:', updatedRequest);

            // Cập nhật số dư của người dùng
            const userResponse = await axios.get(`http://localhost:9999/users/${currentRequest.studentid}`);
            const currentUser = userResponse.data;

            const updatedUser = {
                ...currentUser,
                balance: currentUser.balance + currentRequest.amount, // Cập nhật số dư
            };
            // Gửi yêu cầu PUT để cập nhật thông tin người dùng
            await axios.put(`http://localhost:9999/users/${currentRequest.studentid}`, updatedUser);
            const paymentData = {
                studentid: currentRequest.studentid, // ID của sinh viên từ localStorage
                amount: currentRequest.amount,
                date: new Date().toISOString().split('T')[0], // Ngày hiện tại
                semester: 'Fall 2024',

            };
            const response2 = await axios.post('http://localhost:9999/payments', paymentData);
            // Thông báo cập nhật thành công
            setBalance(updatedUser.balance); // Cập nhật state số dư

            alert('Payment approved successfully');
        } catch (error) {
            console.error('Error approving payment:', error);
            alert('Failed to approve payment');
        }
    };

    const handleReject = async (id) => {
        try {
            const response = await axios.get(`http://localhost:9999/paymentRequests/${id}`);
            const currentRequest = response.data;
            const updatedRequest = {
                ...currentRequest,
                status: 'Rejected'
            };
            await axios.put(`http://localhost:9999/paymentRequests/${id}`, updatedRequest);
            console.log('Request updated successfully:', updatedRequest);

            // Thông báo từ chối thành công
            setRequests(requests.map(request =>
                request.id === id ? { ...request, status: 'Rejected' } : request
            ));
            alert('Payment rejected successfully');
        } catch (error) {
            console.error('Error rejecting payment:', error);
            alert('Failed to reject payment');
        }
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        margin: '20px 0',
        fontSize: '1rem',
        textAlign: 'left',
    };

    const thStyle = {
        backgroundColor: '#f8f9fa',
        color: '#333',
        padding: '12px',
        borderBottom: '1px solid #ddd',
    };

    const tdStyle = {
        padding: '12px',
        borderBottom: '1px solid #ddd',
    };

    const buttonStyle = {
        padding: '6px 12px',
        margin: '0 5px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        color: '#fff',
    };

    const approveButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#28a745',
    };

    const rejectButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#dc3545',
    };

    return (
        <LayoutAdmin>
            <h1>Danh sách yêu cầu thanh toán</h1>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Sinh viên</th>
                        <th style={thStyle}>Số tiền</th>
                        <th style={thStyle}>Ngày</th>
                        <th style={thStyle}>Học kỳ</th>
                        <th style={thStyle}>Trạng thái</th>

                    </tr>
                </thead>
                <tbody>
                    {requests.map((request) => (
                        <tr key={request.id}>
                            <td style={tdStyle}>{request.id}</td>

           
                          
                            <td style={tdStyle}>{users.find(u => u.id == request.studentid)?.username}</td>
                            <td style={tdStyle}>{request.amount}</td>
                            <td style={tdStyle}>{request.date}</td>
                            <td style={tdStyle}>{request.semester}</td>
                            <td style={tdStyle}>
                                {request.status === 'pending' ? (
                                    <>
                                        <button
                                            style={approveButtonStyle}
                                            onClick={() => handleApprove(request.id)}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            style={rejectButtonStyle}
                                            onClick={() => handleReject(request.id)}
                                        >
                                            Reject
                                        </button>
                                    </>
                                ) : (
                                    request.status
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </LayoutAdmin>
    );
};

export default PaymentRequests;
