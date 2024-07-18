
import { useEffect, useState } from "react";
import { Col, Row, Table, Modal, Button } from 'react-bootstrap';
import { Pagination } from "antd";
import { Link, useNavigate } from "react-router-dom";
import LayoutAdmin from "../layout/LayoutAdmin";

const ManagerRoom = () => {
    const [bed, setBed] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const [dormitories, setDormitories] = useState([]);
    const [selectedDorm, setSelectedDorm] = useState(null);

    useEffect(() => {
        fetch('http://localhost:9999/dormitories')
            .then(resp => resp.json())
            .then(data => {
                setDormitories(data);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, []);

    // Thêm hàm này để mở modal chi tiết
    const openDormDetails = (dorm) => {
        setSelectedDorm(dorm);
    };

    // Tính toán số trang
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentBed = bed.slice(indexOfFirstUser, indexOfLastUser);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const navigate = useNavigate();
    useEffect(() => {
        const role = sessionStorage.getItem('userrole');
        const id = sessionStorage.getItem('id');
        if (role !== "admin" || id === null) {
            navigate("/manage/room");
        }
    }, [navigate]);

    useEffect(() => {
        fetch('http://localhost:9999/dormitories')
            .then(resp => resp.json())
            .then(data => {
                const updatedData = data.map(dorm => {
                    let usedBeds = 0;
                    let freeBeds = 0;

                    dorm.floors.forEach(floor => {
                        floor.rooms.forEach(room => {
                            room.beds.forEach(bed => {
                                if (bed.status === "occupied") {
                                    usedBeds += 1;
                                } else {
                                    freeBeds += 1;
                                }
                            });
                        });
                    });

                    return {
                        ...dorm,
                        usedBeds,
                        freeBeds
                    };
                });

                setBed(updatedData);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, []);

    return (
        <LayoutAdmin>
            <Row>
                <Col xs={12}>
                    <Row>
                        <Col style={{ textAlign: 'center' }}>
                            <h2>Manager Room</h2>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <Button onClick={() => navigate('/create/dormitory')}>
                                Create New Dormitory
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table className="box-shadow 2px">
                                <thead>
                                    <tr>
                                        <th>Dom Name</th>
                                        <th>Total Beds</th>
                                        <th>Floors</th>
                                        <th>Rooms</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dormitories.map(dorm => (
                                        <tr key={dorm.id}>
                                            <td>{dorm.name}</td>
                                            <td>{dorm.totalBeds}</td>
                                            <td>
                                                {dorm.floors.map(floor => (
                                                    <div key={floor.id}>
                                                        Floor {floor.floorNumber}: {floor.rooms.length} rooms
                                                    </div>
                                                ))}
                                            </td>
                                            <td>
                                                {dorm.floors.flatMap(floor => floor.rooms).map(room => (
                                                    <div key={room.id}>
                                                        Room {room.roomNumber}: {room.roomType}
                                                    </div>
                                                ))}
                                            </td>
                                            <td>
                                                <Button onClick={() => openDormDetails(dorm)}>View Details</Button>
                                                <Link style={{ marginLeft: "8px" }} className="btn btn-primary" to={'/edit/room/' + dorm.id}>Edit</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Pagination
                                current={currentPage}
                                total={bed.length}
                                pageSize={usersPerPage}
                                onChange={paginate}
                                style={{ marginTop: "16px", textAlign: "center" }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            {selectedDorm && (
                <Modal show={true} onHide={() => setSelectedDorm(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedDorm.name} Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedDorm.floors.map(floor => (
                            <div key={floor.id}>
                                <h4>Floor {floor.floorNumber}</h4>
                                {floor.rooms.map(room => (
                                    <div key={room.id}>
                                        <h5>Room {room.roomNumber} ({room.roomType})</h5>
                                        <ul>
                                            {room.beds.map(bed => (
                                                <li key={bed.id}>
                                                    Bed {bed.name}: {bed.status}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </Modal.Body>
                </Modal>
            )}
        </LayoutAdmin>
    );
}

export default ManagerRoom;
