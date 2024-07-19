import { useEffect, useState } from "react";
import { Col, Row, Table, Button } from 'react-bootstrap';
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import LayoutUser from "../../layout/LayoutUser";

const ListRoom = () => {
    const [dormitories, setDormitories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:9999/dormitories')
            .then(resp => resp.json())
            .then(data => setDormitories(data))
            .catch(err => console.log(err.message));
    }, []);

    useEffect(() => {
        const role = sessionStorage.getItem('userrole');
        const id = sessionStorage.getItem('id');
        if (role === "admin" || id === null) {
            navigate("/listroom");
        }
    }, [navigate]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDormitories = dormitories.slice(indexOfFirstItem, indexOfLastItem);

    const handlePaginationChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDetailClick = (id) => {
        navigate(`/dormitory/${id}`);
    };

    const countUsedBeds = (dormitory) => {
        if (!dormitory || !dormitory.floors) return 0;
        
        let usedBeds = 0;
        dormitory.floors.forEach(floor => {
            if (floor.rooms) {
                floor.rooms.forEach(room => {
                    if (room.beds) {
                        usedBeds += room.beds.filter(bed => bed.status === "occupied").length;
                    }
                });
            }
        });
        return usedBeds;
    };

    const countTotalUsedBeds = () => {
        return dormitories.reduce((total, dorm) => total + countUsedBeds(dorm), 0);
    };

    const countTotalFreeBeds = () => {
        const totalBeds = dormitories.reduce((total, dorm) => total + dorm.totalBeds, 0);
        return totalBeds - countTotalUsedBeds();
    };

    return (
        <LayoutUser>
            <Row className="justify-content-center mb-4">
                <Col xs={12} className="text-center">
                    <h2>Available Beds</h2>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={12} md={10}>
                    <Table striped bordered hover className="box-shadow">
                        <thead>
                            <tr>
                                <th>Dom Name</th>
                                <th>Total Bed</th>
                                <th>Used Bed</th>
                                <th>Free Bed</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentDormitories.map(dorm => {
                                const usedBeds = countUsedBeds(dorm);
                                return (
                                    <tr key={dorm.id}>
                                        <td>{dorm.name}</td>
                                        <td>{dorm.totalBeds}</td>
                                        <td>{usedBeds}</td>
                                        <td>{dorm.totalBeds - usedBeds}</td>
                                        <td>
                                            <Button variant="info" onClick={() => handleDetailClick(dorm.id)}>
                                                Details
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <td colSpan="1"><strong>Total</strong></td>
                                <td>{dormitories.reduce((total, dorm) => total + dorm.totalBeds, 0)}</td>
                                <td>{countTotalUsedBeds()}</td>
                                <td>{countTotalFreeBeds()}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </Table>
                    <Pagination
                        current={currentPage}
                        total={dormitories.length}
                        pageSize={itemsPerPage}
                        onChange={handlePaginationChange}
                        style={{ marginTop: "16px", textAlign: "center" }}
                    />
                </Col>
            </Row>
        </LayoutUser>
    );
};

export default ListRoom;