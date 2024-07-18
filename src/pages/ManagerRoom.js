
import { useEffect, useState } from "react";
import { Col, Row, Table } from 'react-bootstrap';
import { Pagination } from "antd";
import { Link, useNavigate } from "react-router-dom";
import LayoutAdmin from "../layout/LayoutAdmin";

const ManagerRoom = () => {
    const [bed, setBed] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);

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

                    <Row>
                        <Col>
                            <Table className="box-shadow 2px">
                                <thead>
                                    <tr>
                                        <th>Dom Name</th>
                                        <th>Dom ID</th>
                                        <th>Total Bed</th>
                                        <th>Used Bed</th>
                                        <th>Free Bed</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentBed.map(b => (
                                        <tr key={b.id}>
                                            <td>{b.name}</td>
                                            <td>{b.id}</td>
                                            <td>{b.totalBeds}</td>
                                            <td>{b.usedBeds}</td>
                                            <td>{b.freeBeds}</td>
                                            <td><Link to={'/edit/room/' + b.id}>Edit</Link></td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="2">Total</td>
                                        <td>{currentBed.reduce((total, b) => total + Number(b.totalBeds), 0)}</td>
                                        <td>{currentBed.reduce((total, b) => total + b.usedBeds, 0)}</td>
                                        <td>{currentBed.reduce((total, b) => total + b.freeBeds, 0)}</td>
                                    </tr>
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
        </LayoutAdmin>
    );
}

export default ManagerRoom;
