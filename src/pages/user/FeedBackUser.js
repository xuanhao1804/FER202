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

    const formStyles = {
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '600px',
        margin: 'auto'
    };

    const headingStyles = {
        marginBottom: '20px',
        textAlign: 'center'
    };

    const buttonStyles = {
        width: '100%',
        padding: '10px',
        borderRadius: '4px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        cursor: 'pointer'
    };

    return (
        <LayoutUser>
            <Container>
                <Row>
                    <Col md={8} className="mx-auto">
                        <div style={formStyles}>
                            <h1 style={headingStyles}>Send Feedback to Dom Admin</h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formApplicationType">
                                    <Form.Label>Choose Application Type</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={applicationType}
                                        onChange={(e) => setApplicationType(e.target.value)}
                                        required
                                    >
                                        <option value="">Choose application Type</option>
                                        <option value="Đề nghị chuyển Dom">Đề nghị chuyển Dom</option>
                                        <option value="Đề nghị Chuyển Phòng">Đề nghị Chuyển Phòng</option>
                                        <option value="Đề nghị khác">Đề nghị khác</option>
                                        <option value="Lý do khác">Lý do khác</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formReason">
                                    <Form.Label>Reason</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    style={buttonStyles}
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
