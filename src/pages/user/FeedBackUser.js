// src/components/FeedBackUser.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import LayoutUser from '../../layout/LayoutUser';

export default function FeedBackUser() {
  
  

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
                            <Form >
                                <Form.Group controlId="formApplicationType">
                                    <Form.Label>Choose Application Type</Form.Label>
                                    <Form.Control
                                        as="select"
                                    
                                      
                                        required
                                    >
                                        <option value="">Choose application Type</option>
                                        <option value="type1">Đề nghị chuyển Dom</option>
                                        <option value="type2">Đề nghị Chuyển Phòng</option>
                                        <option value="type3">Đề nghị khác</option>
                                        <option value="type4">Lý do khác</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formReason">
                                    <Form.Label>Reason</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                     
                                     
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
