// import { useEffect, useState } from "react";
// import { Col, Row, Table, Button } from 'react-bootstrap';
// import { Pagination } from "antd";
// import { useNavigate } from "react-router-dom";
// import LayoutUser from "../layout/LayoutUser";

// const ListRoom = () => {
//     const [bed, setBed] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [usersPerPage] = useState(5);
//     const navigate = useNavigate();

//     // Fetch data from API or JSON server
//     useEffect(() => {
//         fetch('http://localhost:9999/dormitories')
//             .then(resp => resp.json())
//             .then(data => {
//                 const updatedData = data.map(dorm => {
//                     let usedBeds = 0;
//                     let freeBeds = 0;

//                     dorm.floors.forEach(floor => {
//                         floor.rooms.forEach(room => {
//                             room.beds.forEach(bed => {
//                                 if (bed.status === "occupied") {
//                                     usedBeds += 1;
//                                 } else {
//                                     freeBeds += 1;
//                                 }
//                             });
//                         });
//                     });

//                     return {
//                         ...dorm,
//                         usedBeds,
//                         freeBeds
//                     };
//                 });

//                 setBed(updatedData); // Set state with updated data
//             })
//             .catch(err => {
//                 console.log(err.message);
//                 // Handle error gracefully, e.g., show a message to the user
//             });
//     }, []); // Empty dependency array ensures this runs only once on mount

//     // Handle navigation based on user role and id
//     useEffect(() => {
//         const role = sessionStorage.getItem('userrole');
//         const id = sessionStorage.getItem('id');
//         if (role === "admin" || id === null) {
//             // navigate("/error"); // Redirect to error page if not admin or no id
//             navigate("/listroom");
//         }
//     }, [navigate]); // Dependency added to avoid missing the navigate function

//     // Calculate pagination and current page display
//     const indexOfLastUser = currentPage * usersPerPage;
//     const indexOfFirstUser = indexOfLastUser - usersPerPage;
//     const currentBed = bed.slice(indexOfFirstUser, indexOfLastUser);
//     const totalPages = Math.ceil(bed.length / usersPerPage);

//     // Function to handle pagination change
//     const handlePaginationChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     // Function to handle detail button click
//     const handleDetailClick = (dormId) => {
//         navigate(`/dormitory/${dormId}`); // Navigate to detail page for the dormitory
//     };

//     return (
//         <LayoutUser>
//             <Row>
//                 <Col xs={12}>
//                     <Row>
//                         <Col style={{ textAlign: 'center' }}>
//                             <h2>Available Bed</h2>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Col>
//                             <Table className="box-shadow 2px">
//                                 <thead>
//                                     <tr>
//                                         <th>Dom Name</th>
//                                         <th>Dom ID</th>
//                                         <th>Total Bed</th>
//                                         <th>Used Bed</th>
//                                         <th>Free Bed</th>
//                                         <th>Detail</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {currentBed.map(b => (
//                                         <tr key={b.id}>
//                                             <td>{b.name}</td>
//                                             <td>{b.id}</td>
//                                             <td>{b.totalBeds}</td>
//                                             <td>{b.usedBeds}</td>
//                                             <td>{b.freeBeds}</td>
//                                             <td>
//                                                 <Button
//                                                     variant="primary"
//                                                     onClick={() => handleDetailClick(b.id)}
//                                                 >
//                                                     Detail
//                                                 </Button>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                     <tr>
//                                         <td colSpan="2">Total</td>
//                                         <td>{currentBed.reduce((total, b) => total + b.totalBeds, 0)}</td>
//                                         <td>{currentBed.reduce((total, b) => total + b.usedBeds, 0)}</td>
//                                         <td>{currentBed.reduce((total, b) => total + b.freeBeds, 0)}</td>
//                                     </tr>
//                                 </tbody>
//                             </Table>
//                             <Pagination
//                                 current={currentPage}
//                                 total={bed.length}
//                                 pageSize={usersPerPage}
//                                 onChange={handlePaginationChange}
//                                 style={{ marginTop: "16px", textAlign: "center" }}
//                             />
//                         </Col>
//                     </Row>
//                 </Col>
//             </Row>
//         </LayoutUser>
//     );
// };

// export default ListRoom;

// ListRoom.js

// ListRoom.js

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
                    usedBeds += room.beds.filter(bed => bed.status === "occupied").length;
                });
            }
        });
        return usedBeds;
    };

    const countTotalUsedBeds = () => {
        if (!dormitories || dormitories.length === 0) return 0;
        
        let totalUsedBeds = 0;
        dormitories.forEach(dorm => {
            totalUsedBeds += countUsedBeds(dorm);
        });
        return totalUsedBeds;
    };

    const countTotalFreeBeds = () => {
        if (!dormitories || dormitories.length === 0) return 0;
        
        let totalBeds = 0;
        dormitories.forEach(dorm => {
            totalBeds += dorm.totalBeds;
        });
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
                                <th>Dom ID</th>
                                <th>Total Bed</th>
                                <th>Used Bed</th>
                                <th>Free Bed</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentDormitories.map(dorm => (
                                <tr key={dorm.id}>
                                    <td>{dorm.name}</td>
                                    <td>{dorm.id}</td>
                                    <td>{dorm.totalBeds}</td>
                                    <td>{countUsedBeds(dorm)}</td>
                                    <td>{dorm.totalBeds - countUsedBeds(dorm)}</td>
                                    <td>
                                        <Button variant="info" onClick={() => handleDetailClick(dorm.id)}>
                                            Details
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td colSpan="2"><strong>Total</strong></td>
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
