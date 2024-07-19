import React, { useEffect, useState } from 'react';
import { Container, Table, Form, Button } from "react-bootstrap";
import axios from 'axios';
import LayoutAdmin from '../layout/LayoutAdmin';

export default function FeedBackHistory() {
    const [feedbackHistory, setFeedBackHistory] = useState([]);
    const [reply, setReply] = useState('');
    const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [users, setUsers] = useState([]);
    const [selectedType, setSelectedType] = useState('');

    useEffect(() => {
        const fetchRequestHistory = async () => {
            try {
                const response = await axios.get('http://localhost:9999/feedbackRequest');
                setFeedBackHistory(response.data); // Cập nhật state với dữ liệu phản hồi
            } catch (error) {
                console.error('Error fetching feedback history:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:9999/users');
                setUsers(response.data); // Cập nhật state với dữ liệu phản hồi
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
        fetchRequestHistory();
    }, []);

    const handleReplyChange = (e) => {
        setReply(e.target.value);
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
    };

    const handleUpdate = async (feedbackId) => {
        try {
            const response = await axios.get(`http://localhost:9999/feedbackRequest/${feedbackId}`);
            const currentFeedback = response.data;
            const updatedFeedback = {
                ...currentFeedback,
                replyAdmin: reply,
                status: selectedStatus
            };
            await axios.put(`http://localhost:9999/feedbackRequest/${feedbackId}`, updatedFeedback);

            setReply('');
            setSelectedFeedbackId(null);
            setSelectedStatus('');

            // Tải lại dữ liệu phản hồi
            const updatedResponse = await axios.get('http://localhost:9999/feedbackRequest');
            setFeedBackHistory(updatedResponse.data);

            alert('Feedback updated successfully');
        } catch (error) {
            console.error('Error updating feedback:', error);
            alert('Failed to update feedback');
        }
    };

    // Định nghĩa các style inline
    const containerStyle = {
        marginTop: '20px',
        padding: '30px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
    };

    const thStyle = {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '12px 15px',
        textAlign: 'left',
        borderBottom: '2px solid #0069d9',
        fontWeight: 'bold',
    };

    const tdStyle = {
        padding: '12px 15px',
        borderBottom: '1px solid #ddd',
        verticalAlign: 'middle',
        wordWrap: 'break-word', // Tự động xuống dòng khi văn bản dài
        whiteSpace: 'normal', // Đảm bảo nội dung không bị cắt
        maxWidth: '200px', // Đặt chiều rộng tối đa cho ô để văn bản không quá dài
    };

    const formControlStyle = {
        marginTop: '10px',
        borderRadius: '4px',
        borderColor: '#ced4da',
        padding: '8px',
    };

    const buttonBaseStyle = {
        border: 'none',
        borderRadius: '4px',
        padding: '10px 20px',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const editButtonStyle = {
        ...buttonBaseStyle,
        backgroundColor: '#17a2b8',
        color: '#fff',
    };

    const submitButtonStyle = {
        ...buttonBaseStyle,
        backgroundColor: '#28a745',
        color: '#fff',
    };

    const trHoverStyle = {
        backgroundColor: '#f1f1f1',
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    const filteredFeedbackHistory = selectedType 
        ? feedbackHistory.filter(feedback => feedback.type === selectedType)
        : feedbackHistory;

    return (
        <LayoutAdmin>
            <Container style={containerStyle}>
                <h1 className="mb-4" style={{ fontSize: '30px', color: '#333' }}>Feedback of User</h1>
                <Form.Group controlId="typeFilter">
                    <Form.Label>Filter by Type</Form.Label>
                    <Form.Control 
                        as="select" 
                        value={selectedType} 
                        onChange={handleTypeChange} 
                        style={{ maxWidth: '200px', marginBottom: '20px' }}
                    >
                        <option value="">All Types</option>
                        {/* Thêm các tùy chọn loại phản hồi tại đây */}
                        <option value="Đề nghị chuyển Dom">Đề nghị chuyển Dom</option>
                        <option value="Đề nghị chuyển phòng">Đề nghị chuyển Phòng</option>
                        <option value="Đề nghị đổi tầng">Đề nghị đổi tầng</option>
                        <option value="Lý do khác">Lý do khác</option>
                    </Form.Control>
                </Form.Group>
                <Table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>UserId</th>
                            <th style={thStyle}>Name</th>
                            <th style={thStyle}>TYPE</th>
                            <th style={thStyle}>REASON</th>
                            <th style={thStyle}>DATE</th>
                            <th style={thStyle}>PROCESS NOTE</th>
                            <th style={thStyle}>STATUS</th>
                            <th style={thStyle}>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFeedbackHistory.map((feedback) => {
                            const user = users.find(u => u.id === feedback.userId);
                            return (
                                <tr key={feedback.id} style={trHoverStyle}>
                                    <td style={tdStyle}>{user ? user.id : 'Unknown'}</td>
                                    <td style={tdStyle}>{user ? user.username : 'Unknown'}</td>
                                    <td style={tdStyle}>{feedback.type}</td>
                                    <td style={tdStyle}>{feedback.reason}</td>
                                    <td style={tdStyle}>{feedback.date}</td>
                                    <td style={tdStyle}>
                                        {selectedFeedbackId === feedback.id ? (
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                value={reply}
                                                onChange={handleReplyChange}
                                                placeholder="Reply to the feedback"
                                                style={formControlStyle}
                                            />
                                        ) : (
                                            <div style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>
                                                {feedback.replyAdmin}
                                            </div>
                                        )}
                                    </td>
                                    <td style={tdStyle}>
                                        {selectedFeedbackId === feedback.id ? (
                                            <Form.Control
                                                as="select"
                                                value={selectedStatus}
                                                onChange={handleStatusChange}
                                                style={formControlStyle}
                                            >
                                                <option value="">Choose status</option>
                                                <option value="Approved">Approved</option>
                                                <option value="Rejected">Rejected</option>
                                            </Form.Control>
                                        ) : (
                                            feedback.status
                                        )}
                                    </td>
                                    <td style={tdStyle}>
                                        {selectedFeedbackId === feedback.id ? (
                                            <Button
                                                onClick={() => handleUpdate(feedback.id)}
                                                style={submitButtonStyle}
                                            >
                                                Submit
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => {
                                                    setSelectedFeedbackId(feedback.id);
                                                    setReply(feedback.replyAdmin || '');
                                                    setSelectedStatus(feedback.status);
                                                }}
                                                style={editButtonStyle}
                                            >
                                                Edit
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Container>
        </LayoutAdmin>
    );
}
