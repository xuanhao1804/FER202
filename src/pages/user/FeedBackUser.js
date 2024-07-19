import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import LayoutUser from '../../layout/LayoutUser';

export default function FeedBackUser() {
    const [applicationType, setApplicationType] = useState('');
    const [reason, setReason] = useState('');
    const [status] = useState('pending');
    const [date] = useState(new Date().toISOString().split('T')[0]);
    const [replyAdmin] = useState('');
    const user = JSON.parse(localStorage.getItem('user'));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const feedbackRequest = {
                userId: user.id,
                type: applicationType,
                reason: reason,
                date: date,
                status: status,
                replyAdmin: replyAdmin
            };
            await axios.post('http://localhost:9999/feedbackRequest', feedbackRequest);
            alert('Request sent successfully');
            resetForm(); // Reset form sau khi gửi thành công
        } catch (error) {
            console.error('Error sending request:', error);
            alert('Failed to send request');
        }
    };

    const resetForm = () => {
        setApplicationType('');
        setReason('');
    };

    // Định nghĩa các style inline
    const containerStyle = {
        padding: '40px 15px',
    };

    const formContainerStyle = {
        backgroundColor: '#f8f9fa',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '700px',
        margin: 'auto',
    };

    const headingStyle = {
        marginBottom: '25px',
        textAlign: 'center',
        color: '#333',
    };

    const formGroupStyle = {
        marginBottom: '20px',
    };

    const labelStyle = {
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#333',
    };

    const selectStyle = {
        borderRadius: '5px',
        border: '1px solid #ced4da',
        boxShadow: 'none',
        transition: 'border-color 0.2s ease-in-out',
    };

    const textareaStyle = {
        borderRadius: '5px',
        border: '1px solid #ced4da',
        boxShadow: 'none',
        transition: 'border-color 0.2s ease-in-out',
    };

    const buttonStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '5px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        transition: 'background-color 0.3s ease',
    };

    const buttonHoverStyle = {
        backgroundColor: '#0056b3',
    };

    const buttonFocusStyle = {
        outline: 'none',
        boxShadow: '0 0 0 0.2rem rgba(38, 143, 255, 0.25)',
    };

    return (
        <LayoutUser>
            <Container style={containerStyle}>
                <Row>
                    <Col md={8} className="mx-auto">
                        <div style={formContainerStyle}>
                            <h1 style={headingStyle}>Send Feedback to Dom Admin</h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formApplicationType" style={formGroupStyle}>
                                    <Form.Label style={labelStyle}>Choose Application Type</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={applicationType}
                                        onChange={(e) => setApplicationType(e.target.value)}
                                        required
                                        style={selectStyle}
                                    >
                                        <option value="">Choose application Type</option>
                                        <option value="Đề nghị chuyển Dom">Đề nghị chuyển Dom</option>
                                        <option value="Đề nghị chuyển phòng">Đề nghị Chuyển Phòng</option>                                     
                                        <option value="Đề nghị đổi tầng ">Đề nghị đổi tầng</option>
                                        <option value="Lý do khác">Lý do khác</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formReason" style={formGroupStyle}>
                                    <Form.Label style={labelStyle}>Reason</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        required
                                        style={textareaStyle}
                                    />
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    style={buttonStyle}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                                    onFocus={(e) => e.currentTarget.style.boxShadow = buttonFocusStyle.boxShadow}
                                    onBlur={(e) => e.currentTarget.style.boxShadow = 'none'}
                                >
                                    Send
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </LayoutUser>
    );
}
