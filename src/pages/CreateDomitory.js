import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LayoutAdmin from '../layout/LayoutAdmin';

const CreateDormitory = () => {
    const [name, setName] = useState('');
    const [totalBeds, setTotalBeds] = useState('');
    const [floors, setFloors] = useState([{ floorNumber: 1, rooms: [] }]);
    const navigate = useNavigate();

    const addFloor = () => {
        setFloors([...floors, { floorNumber: floors.length + 1, rooms: [] }]);
    };

    const addRoom = (floorIndex) => {
        const newFloors = [...floors];
        newFloors[floorIndex].rooms.push({
            roomNumber: `${floors[floorIndex].floorNumber}${newFloors[floorIndex].rooms.length + 1}`,
            roomType: '4 bed',
            beds: []
        });
        setFloors(newFloors);
    };

    const updateRoomType = (floorIndex, roomIndex, newType) => {
        const newFloors = [...floors];
        newFloors[floorIndex].rooms[roomIndex].roomType = newType;
        setFloors(newFloors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dormitoryData = {
                name,
                totalBeds: parseInt(totalBeds),
                floors: floors.map(floor => ({
                    floorNumber: floor.floorNumber,
                    rooms: floor.rooms.map(room => ({
                        roomNumber: room.roomNumber,
                        roomType: room.roomType,
                        beds: Array(parseInt(room.roomType.split(' ')[0])).fill().map((_, index) => ({
                            name: String.fromCharCode(65 + index),
                            status: 'available',
                            student: null
                        }))
                    }))
                }))
            };

            const response = await fetch('http://localhost:9999/dormitories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dormitoryData),
            });

            if (response.ok) {
                alert('Dormitory created successfully');
                navigate('/manage/room');
            } else {
                throw new Error('Failed to create dormitory');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to create dormitory');
        }
    };

    const handleBackToList = () => {
        navigate('/manage/room');
    };

    return (
        <LayoutAdmin>
            <Container>
                <h2>Create New Dormitory</h2>
                <Button variant="primary" onClick={handleBackToList}>Back to List</Button>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Dormitory Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Total Beds</Form.Label>
                        <Form.Control 
                            type="number" 
                            value={totalBeds} 
                            onChange={(e) => setTotalBeds(e.target.value)} 
                            required 
                        />
                    </Form.Group>
                    
                    {floors.map((floor, floorIndex) => (
                        <div key={floorIndex} className="mb-4">
                            <h4>Floor {floor.floorNumber}</h4>
                            {floor.rooms.map((room, roomIndex) => (
                                <Row key={roomIndex} className="mb-2">
                                    <Col>
                                        <Form.Control 
                                            type="text" 
                                            value={room.roomNumber} 
                                            readOnly 
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Select
                                            value={room.roomType}
                                            onChange={(e) => updateRoomType(floorIndex, roomIndex, e.target.value)}
                                        >
                                            <option>2 bed</option>
                                            <option>3 bed</option>
                                            <option>4 bed</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                            ))}
                            <Button onClick={() => addRoom(floorIndex)} className="mt-2">Add Room</Button>
                        </div>
                    ))}
                    
                    <Button onClick={addFloor} className="mb-3">Add Floor</Button>
                    
                    <div>
                        <Button variant="primary" type="submit">
                            Create Dormitory
                        </Button>
                    </div>
                </Form>
            </Container>
        </LayoutAdmin>
    );
};

export default CreateDormitory;