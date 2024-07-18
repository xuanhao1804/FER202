import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import LayoutAdmin from "../layout/LayoutAdmin";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Pagination } from "antd";
import bcryptjs from 'bcryptjs';

export default function ManagerUser() {
    const [user, setUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);
    const [formErrors, setFormErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        password: '',
        fullName: '',
        gender: '',
        address: '',
        phone: '',
        role: '0',
        avatar: '',
        studentID: '',
        balance: 0,
        isActive: true,
    });
    const [editingUser, setEditingUser] = useState(null);

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

    const toggleEditMode = (user) => {
        if (editingUser && editingUser.id === user.id) {
            setEditingUser(null);
        } else {
            setEditingUser({ ...user, newPassword: '' });
        }
    };

    const handleInputChange = (e, userId) => {
        const { name, value } = e.target;
        setEditingUser({ ...editingUser, [name]: value });
    };

    const handlePasswordChange = (e) => {
        setEditingUser({ ...editingUser, newPassword: e.target.value });
    };

    const saveChanges = async (userId) => {
        let updateData = {
            role: editingUser.role,
            isActive: editingUser.isActive,
        };

        if (editingUser.newPassword) {
            if (editingUser.newPassword.length < 8) {
                toast.error('New password must be at least 8 characters long');
                return;
            }
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(editingUser.newPassword, salt);
            updateData.password = hashedPassword;
        }

        fetch(`http://localhost:9999/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        })
            .then(res => res.json())
            .then(() => {
                setUser(user.map(u =>
                    u.id === userId ? { ...u, ...updateData } : u
                ));
                setEditingUser(null);
                toast.success('User updated successfully');
            })
            .catch(err => {
                console.log(err);
                toast.error('Failed to update user');
            });
    };

    const handleAddUserInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });

        if (name === 'email') {
            const usernameFromEmail = value.split('@')[0];
            setNewUser({ ...newUser, username: usernameFromEmail, email: value });
        }
    };

    const validateForm = () => {
        let isValid = true;
        const errors = {};
        // Existing validation logic...
        setFormErrors(errors);
        return isValid;
    };

    const isValidImageURL = (url) => {
        return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    };

    const checkDuplicateEmail = async (email) => {
        const response = await fetch(`http://localhost:9999/users`);
        const users = await response.json();
        return users.some(user => user.email === email);
    };

    const checkDuplicateUserName = async (username) => {
        const response = await fetch(`http://localhost:9999/users`);
        const users = await response.json();
        return users.some(user => user.username === username);
    };

    const checkDuplicateID = async (studentID) => {
        const response = await fetch(`http://localhost:9999/users`);
        const users = await response.json();
        return users.some(user => user.studentID === studentID);
    };

    const checkDuplicatePhone = async (phone) => {
        const response = await fetch(`http://localhost:9999/users`);
        const users = await response.json();
        return users.some(user => user.phone === phone);
    };

    const handleAddUser = async () => {
        if (validateForm()) {
            try {
                const isDuplicateEmail = await checkDuplicateEmail(newUser.email);
                const isDuplicateUserName = await checkDuplicateUserName(newUser.username);
                const isDuplicateID = await checkDuplicateID(newUser.studentID);
                const isDuplicatePhone = await checkDuplicatePhone(newUser.phone);

                if (isDuplicateEmail) {
                    toast.error('Email already exists');
                    return;
                }
                if (isDuplicateUserName) {
                    toast.error('UserName already exists');
                    return;
                }
                if (isDuplicateID) {
                    toast.error('StudentID already exists');
                    return;
                }
                if (isDuplicatePhone) {
                    toast.error('Phone already exists');
                    return;
                }

                const salt = await bcryptjs.genSalt(10);
                const hashedPassword = await bcryptjs.hash(newUser.password, salt);

                const formData = {
                    ...newUser,
                    password: hashedPassword,
                    balance: 0,
                    isActive: true,
                };

                fetch(`http://localhost:9999/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                })
                    .then(res => res.json())
                    .then(res => {
                        setUser([...user, res]);
                        setShowModal(false);
                        toast.success('User added successfully');
                        window.location.reload();
                    })
                    .catch(err => console.log(err));
            } catch (error) {
                console.error('Add user error:', error);
                toast.error("Failed to Add: " + (error.response?.data?.message || error.message));
            }
        }
    };

    return (
        <LayoutAdmin>
            <Row>
                <Col style={{ textAlign: 'center' }}>
                    <h2>Manager User</h2>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col style={{ textAlign: 'right' }}>
                    <Button variant="success" style={{ marginRight: '20px' }} onClick={() => setShowModal(true)}>
                        Add User
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table className="box-shadow 2px">
                        <thead>
                            <tr>
                                <th>FullName</th>
                                <th>Role</th>
                                <th>StudentID</th>
                                <th>Email</th>
                                <th>User Name</th>
                                <th>Password</th>
                                <th>Active</th>
                                <th colSpan={2}>Function</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUser?.map(u => (
                                <tr key={u.id}>
                                    <td>{u.fullName}</td>
                                    <td>
                                        {editingUser && editingUser.id === u.id ? (
                                            <Form.Select
                                                value={editingUser.role}
                                                onChange={(e) => handleInputChange(e, u.id)}
                                                name="role"
                                            >
                                                <option value="admin">Admin</option>
                                                <option value="student">Student</option>
                                            </Form.Select>
                                        ) : (
                                            u.role
                                        )}
                                    </td>
                                    <td>{u.studentID || 'NaN'}</td>
                                    <td>{u.email}</td>
                                    <td>{u.username}</td>
                                    <td>
                                        {editingUser && editingUser.id === u.id ? (
                                            <Form.Control
                                                type="text"
                                                value={editingUser.newPassword}
                                                onChange={handlePasswordChange}
                                                placeholder="New password"
                                            />
                                        ) : (
                                            <Form.Control
                                                type="password"
                                                value={u.password}
                                                readOnly
                                            />
                                        )}
                                    </td>
                                    <td>
                                        {editingUser && editingUser.id === u.id ? (
                                            <Form.Select
                                                value={editingUser.isActive ? 'true' : 'false'}
                                                onChange={(e) => handleInputChange({
                                                    target: {
                                                        name: 'isActive',
                                                        value: e.target.value === 'true'
                                                    }
                                                }, u.id)}
                                                style={{ color: editingUser.isActive ? 'green' : 'red' }}
                                            >
                                                <option value="true" style={{ color: "green" }}>Enable</option>
                                                <option value="false" style={{ color: "red" }}>Disable</option>
                                            </Form.Select>
                                        ) : (
                                            <span style={{ color: u.isActive ? 'green' : 'red' }}>
                                                {u.isActive ? 'Enable' : 'Disable'}
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <Button
                                            variant={editingUser && editingUser.id === u.id ? "secondary" : "primary"}
                                            onClick={() => toggleEditMode(u)}
                                        >
                                            {editingUser && editingUser.id === u.id ? "Cancel" : "Edit"}
                                        </Button>
                                    </td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            onClick={() => saveChanges(u.id)}
                                            disabled={!(editingUser && editingUser.id === u.id)}
                                        >
                                            Save
                                        </Button>
                                    </td>
                                </tr>
                            ))}
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
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* Add user form fields */}
                        {/* ... (Keep your existing form fields for adding a new user) */}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddUser}>
                        Add User
                    </Button>
                </Modal.Footer>
            </Modal>
        </LayoutAdmin>
    );
}