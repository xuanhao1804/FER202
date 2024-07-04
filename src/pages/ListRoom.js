import { useEffect, useState } from "react";
import { Col, Row, Table } from 'react-bootstrap';
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import LayoutUser from "../layout/LayoutUser";

const ListRoom = () => {
    const [bed, setBed] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const navigate = useNavigate();
    useEffect(() => {

    })
    // Fetch data from API or JSON server
    useEffect(() => {
        fetch('http://localhost:9999/dormitories')
            .then(resp => resp.json())
            .then(data => {
                setBed(data); // Set state with fetched data
            })
            .catch(err => {
                console.log(err.message);
                // Handle error gracefully, e.g., show a message to the user
            });
    }, []); // Empty dependency array ensures this runs only once on mount

    // Handle navigation based on user role and id
    useEffect(() => {
        const role = sessionStorage.getItem('userrole');
        const id = sessionStorage.getItem('id');
        if (role === "admin" || id === null) {
            // navigate("/error"); // Redirect to error page if not admin or no id
            navigate("/listroom");
        }
    }, [navigate]); // Dependency added to avoid missing the navigate function

    // Calculate pagination and current page display
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentBed = bed.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.ceil(bed.length / usersPerPage);

    // Function to handle pagination change
    const handlePaginationChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <LayoutUser>
            <Row>
                <Col xs={12}>
                    <Row>
                        <Col style={{ textAlign: 'center' }}>
                            <h2>Available Bed</h2>
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
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="2">Total</td>
                                        <td>{currentBed.reduce((total, b) => total + b.totalBeds, 0)}</td>
                                        <td>{currentBed.reduce((total, b) => total + b.usedBeds, 0)}</td>
                                        <td>{currentBed.reduce((total, b) => total + b.freeBeds, 0)}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Pagination
                                current={currentPage}
                                total={bed.length}
                                pageSize={usersPerPage}
                                onChange={handlePaginationChange}
                                style={{ marginTop: "16px", textAlign: "center" }}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </LayoutUser>
    );
};

export default ListRoom;
