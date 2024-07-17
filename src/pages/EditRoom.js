import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import LayoutAdmin from "../layout/LayoutAdmin";

const EditRoom = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { updateDormitory } = location.state || {};
    const [dormitory, setDormitory] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:9999/dormitories/${id}`)
            .then(resp => resp.json())
            .then(data => setDormitory(data))
            .catch(err => console.log(err.message));
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:9999/dormitories/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dormitory),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            if (updateDormitory) {
                updateDormitory(data);
            }
            navigate('/manage/room');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDormitory(prevState => ({
            ...prevState,
            [name]: name === 'totalBeds' ? Number(value) : value
        }));
    };

    if (!dormitory) return <div>Loading...</div>;

    return (
        <LayoutAdmin>
            <Container>
                <h2>Edit Dormitory: {dormitory.name}</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>Name:</Form.Label>
                        <Col sm={10}>
                            <Form.Control 
                                type="text" 
                                name="name" 
                                value={dormitory.name} 
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm={2}>Total Beds:</Form.Label>
                        <Col sm={10}>
                            <Form.Control 
                                type="number" 
                                name="totalBeds" 
                                value={dormitory.totalBeds} 
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                    <Button type="submit">Update</Button>
                </Form>
            </Container>
        </LayoutAdmin>
    );
};

export default EditRoom;