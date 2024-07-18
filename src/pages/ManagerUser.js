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

    //Editing status
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

    //Editing button
    const toggleEditMode = (user) => {
        if (editingUser && editingUser.id === user.id) {
            setEditingUser(null);
        } else {
            setEditingUser({ ...user, newPassword: '' });
        }
    };

    //HandlePassword
    const handlePasswordChange = (e) => {
        setEditingUser({ ...editingUser, newPassword: e.target.value });
    };

    //Handle Save Password
    const savePassword = async (userId) => {
        if (!editingUser.newPassword) {
            toast.error('New password cannot be empty');
            return;
        }
        if (editingUser.newPassword < 8) {
            toast.error('New password characters cannot be less than 8 ');
            return;
        }

        try {
            const salt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(editingUser.newPassword, salt);

            fetch(`http://localhost:9999/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password: hashedPassword }),
            })
                .then(res => res.json())
                .then(() => {
                    setUser(user.map(u =>
                        u.id === userId ? { ...u, password: hashedPassword } : u
                    ));
                    setEditingUser(null);
                    toast.success('Password updated successfully');
                })
                .catch(err => {
                    console.log(err);
                    toast.error('Failed to update password');
                });
        } catch (error) {
            console.error('Password update error:', error);
            toast.error('Failed to update password');
        }
    };

    //Input của model
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });

        if (name === 'email') {
            const usernameFromEmail = value.split('@')[0];
            setNewUser({ ...newUser, username: usernameFromEmail, email: value });
        }
    };

    //Validate
    const validateForm = () => {
        let isValid = true;
        const errors = {};
        // username validation
        if (!newUser.username.trim()) {
            errors.username = "Username cannot be empty";
            isValid = false;
        }
        // fullname validation
        if (!newUser.fullName.trim()) {
            errors.fullName = "Fullname cannot be empty";
            isValid = false;
        } else if (/[0-9]/.test(newUser.fullName)) {
            errors.fullName = "Fullname cannot contain numbers";
            isValid = false;
        } else if (/[!@#$%^&*(),.?":{}|<>]/.test(newUser.fullName)) {
            errors.fullName = "Fullname cannot contain special characters";
            isValid = false;
        }

        // Gender validation
        if (!newUser.gender.trim()) {
            errors.gender = "Gender number cannot be empty";
            isValid = false;
        }

        //Email validation
        if (!newUser.email.trim()) {
            errors.email = "Email cannot be empty";
            isValid = false;
        }

        //Password validation
        if (!newUser.password.trim()) {
            errors.password = "Password cannot be empty";
            isValid = false;
        } else if (newUser.password.length < 8) {
            errors.password = "Password characters cannot be less than 8"
        }

        //Address validation
        if (!newUser.address.trim()) {
            errors.address = "Address cannot be empty";
            isValid = false;
        }

        // Phone validation
        if (!newUser.phone.trim()) {
            errors.phone = "Phone number cannot be empty";
            isValid = false;
        } else if (newUser.phone.length > 11) {
            errors.phone = "Phone number cannot be longer than 11 digits";
            isValid = false;
        }

        //Role validation
        if (newUser.role == "0") {
            errors.role = "Role must be choosen";
            isValid = false;
        } else if (newUser.role == "admin") {
            window.confirm("Are you sure about creating admin account");
        }
        //StudentID validation
        if (newUser.role == 'student') {
            if (!newUser.studentID.trim()) {
                errors.studentID = "StudentID cannot be empty";
                isValid = false;
            }
        }

        // Avatar validation
        if (!newUser.avatar.trim()) {
            errors.avatar = "Avatar URL cannot be empty";
            isValid = false;
        } else if (!isValidImageURL(newUser.avatar)) {
            errors.avatar = "Avatar URL is not a valid image URL";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };


    //Validate Avatar
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
                    username: newUser.username,
                    email: newUser.email,
                    password: hashedPassword,
                    fullName: newUser.fullName,
                    gender: newUser.gender,
                    address: newUser.address,
                    phone: newUser.phone,
                    role: newUser.role,
                    avatar: newUser.avatar,
                    studentID: newUser.studentID,
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

                    {/* Add button */}
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
                            {
                                currentUser?.map(u => (
                                    <tr key={u.id}>
                                        <td>{u.fullName}</td>
                                        <td></td>
                                        <td>{u.studentID || 'NaN'}</td>
                                        <td>{u.email}</td>
                                        <td>{u.username}</td>
                                        <td>
                                            {editingUser && editingUser.id === u.id ? (
                                                <Form.Control
                                                    type="text"
                                                    value={editingUser.newPassword}
                                                    onChange={handlePasswordChange}

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
                                        <td> {/* Edit button */}
                                            <Button
                                                variant={editingUser && editingUser.id === u.id ? "secondary" : "primary"}
                                                onClick={() => toggleEditMode(u)}
                                            >
                                                {editingUser && editingUser.id === u.id ? "Cancel" : "Edit"}
                                            </Button>
                                        </td>
                                        <td>{/* Add button */}
                                            <Button
                                                variant="primary"
                                                onClick={() => savePassword(u.id)}
                                                disabled={!(editingUser && editingUser.id === u.id)}
                                            >
                                                Save
                                            </Button>
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
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={newUser.email}
                                        onChange={handleInputChange}
                                        isInvalid={!!formErrors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        value={newUser.username}
                                        onChange={handleInputChange}
                                        isInvalid={!!formErrors.username}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.username}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId="formEmail">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="password"
                                        value={newUser.password}
                                        onChange={handleInputChange}
                                        isInvalid={!!formErrors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formFullName">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="fullName"
                                        value={newUser.fullName}
                                        onChange={handleInputChange}
                                        isInvalid={!!formErrors.fullName}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.fullName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Gender</Form.Label>
                                    <div>
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Male"
                                            name="gender"
                                            value="male"
                                            checked={newUser.gender === 'male'}
                                            onChange={handleInputChange}
                                            isInvalid={!!formErrors.gender}
                                        />
                                        <Form.Check
                                            inline
                                            type="radio"
                                            label="Female"
                                            name="gender"
                                            value="female"
                                            checked={newUser.gender === 'female'}
                                            onChange={handleInputChange}
                                            isInvalid={!!formErrors.gender}
                                        />
                                    </div>
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.gender}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="formAddress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={newUser.address}
                                        onChange={handleInputChange}
                                        isInvalid={!!formErrors.address}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.address}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formPhone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="phone"
                                        value={newUser.phone}
                                        onChange={handleInputChange}
                                        isInvalid={!!formErrors.phone}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.phone}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formRole">
                                    <Form.Label>Role</Form.Label>
                                    <Form.Select
                                        type="text"
                                        name="role"
                                        value={newUser.role}
                                        onChange={handleInputChange}
                                        isInvalid={!!formErrors.role}
                                    >
                                        <option value='0'>Choose role</option>
                                        <option value='admin'>Admin</option>
                                        <option value='student'>Student</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.role}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group controlId="formStudentID">
                                    <Form.Label>Student ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="studentID"
                                        value={newUser.studentID}
                                        onChange={handleInputChange}
                                        isInvalid={!!formErrors.studentID}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.studentID}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Avatar</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="avatar"
                                        value={newUser.avatar}
                                        onChange={handleInputChange}
                                        isInvalid={!!formErrors.avatar}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formErrors.avatar}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                        </Row>


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