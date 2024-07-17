

import { useEffect, useState } from "react";
import { Col, Row, Table, Button } from 'react-bootstrap';
import { useParams, useNavigate } from "react-router-dom";
import LayoutUser from "../../layout/LayoutUser";

const DormitoryDetail = () => {
    const { dormitoryId } = useParams();
    const [dormitory, setDormitory] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:9999/dormitories/${dormitoryId}`)
            .then(resp => resp.json())
            .then(data => setDormitory(data))
            .catch(err => console.log(err.message));
    }, [dormitoryId]);

    if (!dormitory) {
        return <div>Loading...</div>;
    }

    const usedBeds = [];
    const freeBeds = [];

    dormitory.floors.forEach(floor => {
        floor.rooms.forEach(room => {
            room.beds.forEach(bed => {
                if (bed.status === "occupied") {
                    usedBeds.push({ roomId: room.roomNumber, bedId: bed.id });
                } else {
                    freeBeds.push({ roomId: room.roomNumber, bedId: bed.id });
                }
            });
        });
    });

    return (
        <LayoutUser>
            <Row className="justify-content-center mb-4">
                <Col xs={12} className="text-center">
                    <h2>{dormitory.name} Details</h2>
                </Col>
            </Row>
            <Row className="justify-content-center mb-4">
                <Col xs={12} className="text-center">
                    <Button variant="secondary" onClick={() => navigate("/listroom")}>
                        Back to List
                    </Button>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={12} md={10}>
                    <Table striped bordered hover className="box-shadow mb-4">
                        <thead>
                            <tr>
                                <th>Dom Name</th>
                                <th>Dom ID</th>
                                <th>Total Bed</th>
                                <th>Used Bed</th>
                                <th>Free Bed</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{dormitory.name}</td>
                                <td>{dormitory.id}</td>
                                <td>{dormitory.totalBeds}</td>
                                <td>{usedBeds.length}</td>
                                <td>{freeBeds.length}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Row>
                        <Col xs={6}>
                            <h3 className="text-center">Used Beds</h3>
                            <Table striped bordered hover className="box-shadow mb-4">
                                <thead>
                                    <tr>
                                        <th>Room Number</th>
                                        <th>Bed ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usedBeds.map((bed, index) => (
                                        <tr key={index}>
                                            <td>{bed.roomId}</td>
                                            <td>{bed.bedId}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                        <Col xs={6}>
                            <h3 className="text-center">Free Beds</h3>
                            <Table striped bordered hover className="box-shadow mb-4">
                                <thead>
                                    <tr>
                                        <th>Room Number</th>
                                        <th>Bed ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {freeBeds.map((bed, index) => (
                                        <tr key={index}>
                                            <td>{bed.roomId}</td>
                                            <td>{bed.bedId}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </LayoutUser>
    );
};

export default DormitoryDetail;

