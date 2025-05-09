import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import LayoutAdmin from "../layout/LayoutAdmin";

const EditRoom = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { updateDormitory } = location.state || {};
    const [dormitory, setDormitory] = useState(null);
    const [roomTypes, setRoomTypes] = useState([]);


    useEffect(() => {
        Promise.all([
            fetch(`http://localhost:9999/dormitories/${id}`).then(resp => resp.json()),
            fetch('http://localhost:9999/roomTypes').then(resp => resp.json())
        ])
            .then(([dormData, roomTypesData]) => {
                setDormitory(dormData);
                setRoomTypes(roomTypesData);
            })
            .catch(err => console.log(err.message));
    }, [id]);

    useEffect(() => {
        fetch(`http://localhost:9999/dormitories/${id}`)
            .then(resp => resp.json())
            .then(data => setDormitory(data))
            .catch(err => console.log(err.message));
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        Promise.all([
            fetch(`http://localhost:9999/dormitories/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dormitory),
            }),
            fetch('http://localhost:9999/roomTypes', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(roomTypes),
            })
        ])
            .then(([dormResponse, roomTypesResponse]) =>
                Promise.all([dormResponse.json(), roomTypesResponse.json()])
            )
            .then(([dormData, roomTypesData]) => {
                console.log('Success:', { dormData, roomTypesData });
                if (updateDormitory) {
                    updateDormitory(dormData);
                }
                navigate('/manage/room');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleRoomTypeChange = (typeId, event) => {
        const { value } = event.target;
        const cleanedValue = value.replace(/^0+/, '');
        setRoomTypes(prevTypes => prevTypes.map(type =>
            type.id === typeId ? { ...type, price: Number(cleanedValue) } : type
        ));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDormitory(prevState => ({
            ...prevState,
            [name]: name === 'totalBeds' ? Number(value) : value
        }));
    };

    const handleFloorChange = (floorIndex, event) => {
        const { name, value } = event.target;
        setDormitory(prevState => {
            const newFloors = [...prevState.floors];
            newFloors[floorIndex] = { ...newFloors[floorIndex], [name]: value };
            return { ...prevState, floors: newFloors };
        });
    };

    const updateRoomType = (floorIndex, roomIndex, newType) => {
        setDormitory(prevState => {
            const newFloors = [...prevState.floors];
            newFloors[floorIndex].rooms[roomIndex].roomType = newType;
            return { ...prevState, floors: newFloors };
        });
    };

    const handleRoomChange = (floorIndex, roomIndex, event) => {
        const { name, value } = event.target;
        setDormitory(prevState => {
            const newFloors = [...prevState.floors];
            newFloors[floorIndex].rooms[roomIndex] = {
                ...newFloors[floorIndex].rooms[roomIndex],
                [name]: name === 'roomType' ? value : Number(value)
            };
            return { ...prevState, floors: newFloors };
        });
    };

    const addFloor = () => {
        setDormitory(prevState => ({
            ...prevState,
            floors: [
                ...prevState.floors,
                { floorNumber: prevState.floors.length + 1, rooms: [] }
            ]
        }));
    };


    const addRoom = (floorIndex) => {
        setDormitory(prevState => {
            const newFloors = [...prevState.floors];
            newFloors[floorIndex].rooms.push({
                roomNumber: `${newFloors[floorIndex].floorNumber}${newFloors[floorIndex].rooms.length + 1}`,
                roomType: '4 bed',
                beds: []
            });
            return { ...prevState, floors: newFloors };
        });
    };

    const handleBackToList = () => {
        navigate('/manage/room');
    };

    if (!dormitory) return <div>Loading...</div>;

    return (
        <LayoutAdmin>
            <Container>
                <Row className="mb-3">
                    <Col>
                        <h2>Edit Dormitory: {dormitory.name}</h2>
                    </Col>
                    <Col className="text-end">
                        <Button variant="secondary" onClick={handleBackToList}>Back to List</Button>
                    </Col>
                </Row>
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

                    {dormitory.floors.map((floor, floorIndex) => (
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
                            <h3>Room Types and Prices</h3>
                            {roomTypes.map(type => (
                                <Form.Group as={Row} className="mb-3" key={type.id}>
                                    <Form.Label column sm={2}>{type.type}:</Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            type="text"
                                            value={type.price}
                                            onChange={(e) => {
                                                const numericValue = e.target.value.replace(/[^0-9]/g, '');
                                                handleRoomTypeChange(type.id, { target: { value: numericValue } });
                                            }}
                                        />
                                    </Col>
                                </Form.Group>
                            ))}
                            <Button onClick={() => addRoom(floorIndex)} className="mt-2">Add Room</Button>
                        </div>
                    ))}

                    <Button onClick={addFloor} className="mb-3">Add Floor</Button>

                    <Button type="submit" variant="primary" className="me-2">Update</Button>
                    <Button variant="secondary" onClick={handleBackToList}>Cancel</Button>
                </Form>
            </Container>
        </LayoutAdmin>
    );
};

export default EditRoom;