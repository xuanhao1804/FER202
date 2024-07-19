// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate, useLocation } from 'react-router-dom';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// import LayoutAdmin from "../layout/LayoutAdmin";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { toast } from 'react-toastify';


// const EditRoom = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { updateDormitory } = location.state || {};
//     const [dormitory, setDormitory] = useState(null);

//     useEffect(() => {
//         fetch(`http://localhost:9999/dormitories/${id}`)
//             .then(resp => resp.json())
//             .then(dormData => {
//                 setDormitory(dormData);
//                 calculateTotalBeds(dormData.floors);
//             })
//             .catch(err => console.log(err.message));
//     }, [id]);

//     const calculateTotalBeds = (floors) => {
//         const total = floors.reduce((acc, floor) => {
//             return acc + floor.rooms.reduce((roomAcc, room) => {
//                 return roomAcc + parseInt(room.roomType.split(' ')[0]);
//             }, 0);
//         }, 0);
//         setDormitory(prevState => ({ ...prevState, totalBeds: total }));
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         fetch(`http://localhost:9999/dormitories/${id}`, {
//             method: 'PUT',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(dormitory),
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(dormData => {
//             console.log('Success:', dormData);
//             if (updateDormitory) {
//                 updateDormitory(dormData);
//             }
//             toast.success('Dormitory updated successfully', {
//                 onClose: () => navigate('/manage/room')
//             });
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//             toast.error('Failed to update dormitory: ' + error.message);
//         });
//     };

//     const handleRoomTypeChange = (floorIndex, roomIndex, newType) => {
//         setDormitory(prevState => {
//             const newFloors = [...prevState.floors];
//             newFloors[floorIndex].rooms[roomIndex].roomType = newType;
//             const updatedDormitory = { ...prevState, floors: newFloors };
//             calculateTotalBeds(updatedDormitory.floors);
//             return updatedDormitory;
//         });
//     };

//     const handleRoomNumberChange = (floorIndex, roomIndex, newNumber) => {
//         setDormitory(prevState => {
//             const newFloors = [...prevState.floors];
//             newFloors[floorIndex].rooms[roomIndex].roomNumber = newNumber;
//             return { ...prevState, floors: newFloors };
//         });
//     };

//     const addFloor = () => {
//         setDormitory(prevState => {
//             const newFloors = [
//                 ...prevState.floors,
//                 { floorNumber: prevState.floors.length + 1, rooms: [] }
//             ];
//             return { ...prevState, floors: newFloors };
//         });
//     };

//     const addRoom = (floorIndex) => {
//         setDormitory(prevState => {
//             const newFloors = [...prevState.floors];
//             newFloors[floorIndex].rooms.push({
//                 roomNumber: `${newFloors[floorIndex].floorNumber}${newFloors[floorIndex].rooms.length + 1}`,
//                 roomType: '4 bed',
//                 beds: []
//             });
//             const updatedDormitory = { ...prevState, floors: newFloors };
//             calculateTotalBeds(updatedDormitory.floors);
//             return updatedDormitory;
//         });
//     };

//     const handleBackToList = () => {
//         navigate('/manage/room');
//     };

//     if (!dormitory) return <div>Loading...</div>;

//     return (
//         <LayoutAdmin>
//             <Container>
//                 <Row className="mb-3">
//                     <Col>
//                         <h2>Edit Dormitory: {dormitory.name}</h2>
//                     </Col>
//                     <Col className="text-end">
//                         <Button variant="secondary" onClick={handleBackToList}>Back to List</Button>
//                     </Col>
//                 </Row>
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group as={Row} className="mb-3">
//                         <Form.Label column sm={2}>Name:</Form.Label>
//                         <Col sm={10}>
//                             <Form.Control
//                                 type="text"
//                                 name="name"
//                                 value={dormitory.name}
//                                 onChange={(e) => setDormitory({ ...dormitory, name: e.target.value })}
//                             />
//                         </Col>
//                     </Form.Group>
//                     <Form.Group as={Row} className="mb-3">
//                         <Form.Label column sm={2}>Total Beds:</Form.Label>
//                         <Col sm={10}>
//                             <Form.Control
//                                 type="number"
//                                 name="totalBeds"
//                                 value={dormitory.totalBeds}
//                                 readOnly
//                             />
//                         </Col>
//                     </Form.Group>
//                     <Button onClick={addFloor} className="mb-3">Add Floor</Button>
//                     {dormitory.floors.map((floor, floorIndex) => (
//                         <div key={floorIndex} className="mb-4">
//                             <h4>Floor {floor.floorNumber}</h4>
//                             {floor.rooms.map((room, roomIndex) => (
//                                 <Row key={roomIndex} className="mb-2">
//                                     <Col>
//                                         <Form.Control
//                                             type="text"
//                                             value={room.roomNumber}
//                                             onChange={(e) => handleRoomNumberChange(floorIndex, roomIndex, e.target.value)}
//                                         />
//                                     </Col>
//                                     <Col>
//                                         <Form.Select
//                                             value={room.roomType}
//                                             onChange={(e) => handleRoomTypeChange(floorIndex, roomIndex, e.target.value)}
//                                         >
//                                             <option>2 bed</option>
//                                             <option>3 bed</option>
//                                             <option>4 bed</option>
//                                         </Form.Select>
//                                     </Col>
//                                 </Row>
//                             ))}
//                             <Button onClick={() => addRoom(floorIndex)} className="mt-2">Add Room</Button>
//                         </div>
//                     ))}



//                     <Button type="submit" variant="primary" className="me-2">Update</Button>
//                     <Button variant="secondary" onClick={handleBackToList}>Cancel</Button>
//                 </Form>
//             </Container>
//             <ToastContainer />
//         </LayoutAdmin>

//     );
// };

// export default EditRoom;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import LayoutAdmin from "../layout/LayoutAdmin";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

const EditRoom = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { updateDormitory } = location.state || {};
    const [dormitory, setDormitory] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:9999/dormitories/${id}`)
            .then(resp => resp.json())
            .then(dormData => {
                setDormitory(dormData);
                calculateTotalBeds(dormData.floors);
            })
            .catch(err => console.log(err.message));
    }, [id]);

    const calculateTotalBeds = (floors) => {
        const total = floors.reduce((acc, floor) => {
            return acc + floor.rooms.reduce((roomAcc, room) => {
                return roomAcc + room.beds.length;
            }, 0);
        }, 0);
        setDormitory(prevState => ({ ...prevState, totalBeds: total }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:9999/dormitories/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dormitory),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(dormData => {
            console.log('Success:', dormData);
            if (updateDormitory) {
                updateDormitory(dormData);
            }
            toast.success('Dormitory updated successfully', {
                onClose: () => navigate('/manage/room')
            });
        })
        .catch((error) => {
            console.error('Error:', error);
            toast.error('Failed to update dormitory: ' + error.message);
        });
    };

    const handleRoomTypeChange = (floorIndex, roomIndex, newType) => {
        setDormitory(prevState => {
            const newFloors = [...prevState.floors];
            const room = newFloors[floorIndex].rooms[roomIndex];
            room.roomType = newType;
            const bedCount = parseInt(newType.split(' ')[0]);
            
            // Adjust the number of beds
            if (bedCount > room.beds.length) {
                for (let i = room.beds.length; i < bedCount; i++) {
                    room.beds.push({ name: String.fromCharCode(65 + i), status: "available", student: null });
                }
            } else if (bedCount < room.beds.length) {
                room.beds = room.beds.slice(0, bedCount);
            }

            const updatedDormitory = { ...prevState, floors: newFloors };
            calculateTotalBeds(updatedDormitory.floors);
            return updatedDormitory;
        });
    };

    const handleRoomNumberChange = (floorIndex, roomIndex, newNumber) => {
        setDormitory(prevState => {
            const newFloors = [...prevState.floors];
            newFloors[floorIndex].rooms[roomIndex].roomNumber = newNumber;
            return { ...prevState, floors: newFloors };
        });
    };

    const handleBedStatusChange = (floorIndex, roomIndex, bedIndex, newStatus) => {
        setDormitory(prevState => {
            const newFloors = [...prevState.floors];
            newFloors[floorIndex].rooms[roomIndex].beds[bedIndex].status = newStatus;
            return { ...prevState, floors: newFloors };
        });
    };

    const addFloor = () => {
        setDormitory(prevState => {
            const newFloors = [
                ...prevState.floors,
                { floorNumber: prevState.floors.length + 1, rooms: [] }
            ];
            return { ...prevState, floors: newFloors };
        });
    };

    const addRoom = (floorIndex) => {
        setDormitory(prevState => {
            const newFloors = [...prevState.floors];
            const newRoomNumber = `${newFloors[floorIndex].floorNumber}${newFloors[floorIndex].rooms.length + 1}`.padStart(3, '0');
            newFloors[floorIndex].rooms.push({
                roomNumber: newRoomNumber,
                roomType: '4 bed',
                beds: [
                    { name: 'A', status: 'available', student: null },
                    { name: 'B', status: 'available', student: null },
                    { name: 'C', status: 'available', student: null },
                    { name: 'D', status: 'available', student: null }
                ]
            });
            const updatedDormitory = { ...prevState, floors: newFloors };
            calculateTotalBeds(updatedDormitory.floors);
            return updatedDormitory;
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
                                onChange={(e) => setDormitory({ ...dormitory, name: e.target.value })}
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
                                readOnly
                            />
                        </Col>
                    </Form.Group>
                    <Button onClick={addFloor} className="mb-3">Add Floor</Button>
                    {dormitory.floors.map((floor, floorIndex) => (
                        <div key={floorIndex} className="mb-4">
                            <h4>Floor {floor.floorNumber}</h4>
                            {floor.rooms.map((room, roomIndex) => (
                                <div key={roomIndex} className="mb-3">
                                    <Row className="mb-2">
                                        <Col>
                                            <Form.Control
                                                type="text"
                                                value={room.roomNumber}
                                                onChange={(e) => handleRoomNumberChange(floorIndex, roomIndex, e.target.value)}
                                            />
                                        </Col>
                                        <Col>
                                            <Form.Select
                                                value={room.roomType}
                                                onChange={(e) => handleRoomTypeChange(floorIndex, roomIndex, e.target.value)}
                                            >
                                                <option>2 bed</option>
                                                <option>3 bed</option>
                                                <option>4 bed</option>
                                            </Form.Select>
                                        </Col>
                                    </Row>
                                    {room.beds.map((bed, bedIndex) => (
                                        <Row key={bedIndex} className="mb-1">
                                            <Col xs={2}>
                                                <Form.Control
                                                    type="text"
                                                    value={bed.name}
                                                    readOnly
                                                />
                                            </Col>
                                            <Col>
                                                <Form.Select
                                                    value={bed.status}
                                                    onChange={(e) => handleBedStatusChange(floorIndex, roomIndex, bedIndex, e.target.value)}
                                                >
                                                    <option value="available">Available</option>
                                                    <option value="occupied">Occupied</option>
                                                    <option value="inactive">Inactive</option>
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                    ))}
                                </div>
                            ))}
                            <Button onClick={() => addRoom(floorIndex)} className="mt-2">Add Room</Button>
                        </div>
                    ))}

                    <Button type="submit" variant="primary" className="me-2">Update</Button>
                    <Button variant="secondary" onClick={handleBackToList}>Cancel</Button>
                </Form>
            </Container>
            <ToastContainer />
        </LayoutAdmin>
    );
};

export default EditRoom;