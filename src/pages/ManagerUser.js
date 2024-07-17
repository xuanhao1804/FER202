import { Button, Col, Form, Row, Table } from "react-bootstrap";
import LayoutAdmin from "../layout/LayoutAdmin";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Pagination } from "antd";

export default function ManagerUser() {
    const [user, setUser] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);

    // Tính toán số trang
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUser = user.slice(indexOfFirstUser, indexOfLastUser);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        fetch(`http://localhost:9999/users`)
            .then(res => res.json())
            .then(res => setUser(res))
            .catch(err => console.log(err));
    }, []);
    const handleStatusChange = (userId, newStatus) => {
        fetch(`http://localhost:9999/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isActive: newStatus }),
        })
            .then(res => res.json())
            .then(() => {
                // Update the local state
                setUser(user.map(user =>
                    user.id === userId ? { ...user, isActive: newStatus } : user
                ));
            })
            .catch(err => console.log(err));
    };
    const toggleEditMode = (userId) => {
        setEditUserId(userId === editUserId ? null : userId);
    };

    const handlePasswordChange = (userId, newPassword) => {
        fetch(`http://localhost:9999/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: newPassword }),
        })
            .then(res => res.json())
            .then(() => {
                // Update the local state
                setUser(user.map(user =>
                    user.id === userId ? { ...user, password: newPassword } : user
                ));
                toast.success('Update password successfully');
            })
            .catch(err => console.log(err));
    };
    return (
        <LayoutAdmin>
            <Row>
                <Col style={{ textAlign: 'center' }}>
                    <h2>Manager User</h2>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col style={{textAlign: "right"}}>
                    <Button variant="primary" onClick={() => toggleEditMode(user.id)}>
                        Edit
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table className="box-shadow 2px">
                        <thead>
                            <tr>
                                <th>FullName</th>
                                <th>StudentID</th>
                                <th>Email</th>
                                <th>User Name</th>
                                <th>Password</th>
                                <th>Active</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentUser?.map(u => (
                                    <tr key={u.id}>
                                        <td>{u.fullName}</td>
                                        <td>{u.studentID || 'NaN'}</td>
                                        <td>{u.email}</td>
                                        <td>{u.username}</td>
                                        <td>
                                            {editUserId === user.id ? (
                                                <Form.Control
                                                    type="text"
                                                    value={u.password}
                                                    onChange={(e) => handlePasswordChange(u.id, e.target.value)}

                                                />
                                            ) : (
                                                u.password
                                            )}
                                        </td>
                                        <td>
                                            <Form.Select
                                                value={u.isActive ? 'true' : 'false'}
                                                onChange={(e) => handleStatusChange(u.id, e.target.value === 'true')}
                                                style={{ color: u.isActive ? 'green' : 'red' }}
                                                disabled={u.role == 'admin'} 
                                            >
                                                <option value="true" style={{ color: "green" }}>Enable</option>
                                                <option value="false" style={{ color: "red" }}>Disable</option>
                                            </Form.Select>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                    <Pagination
                        current={currentPage}
                        total={user.length}
                        pageSize={usersPerPage}
                        onChange={paginate}
                        style={{ marginTop: "16px", textAlign: "center" }}
                    />
                </Col>
            </Row>
        </LayoutAdmin>
    );
}