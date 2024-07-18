import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TemplateAdmin from "../layout/LayoutAdmin";
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

export default function MangeParkingCost() {
    const [typeVehichle, settypeVehichle] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState('');

    useEffect(() => {
        fetch(`http://localhost:9999/TypeVehicle`)
            .then(res => res.json())
            .then(result => {
                settypeVehichle(result);
            })
            .catch(error => console.error('Error fetching vehicles:', error));
    }, []);

    const handleEditClick = (vehicle) => {
        setSelectedVehicle(vehicle);
        setName(vehicle.name);
        setPrice(vehicle.price);
        setShowEditModal(true);
    };

    const handleSaveEdit = () => {
        const updatedVehicle = { ...selectedVehicle, name, price };
        axios.put(`http://localhost:9999/TypeVehicle/${updatedVehicle.id}`, updatedVehicle)
            .then(response => {
                settypeVehichle(typeVehichle.map(vehicle =>
                    vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
                ));
                setShowEditModal(false);
                setSelectedVehicle(null);
            })
            .catch(error => {
                console.error('Error updating vehicle:', error);
                alert('Failed to update vehicle. Please try again.');
            });
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedVehicle(null);
    };

    const handleAddClick = () => {
        setNewName('');
        setNewPrice('');
        setShowAddModal(true);
    };

    const handleSaveAdd = () => {
        const newVehicle = { name: newName, price: newPrice };
        axios.post(`http://localhost:9999/TypeVehicle`, newVehicle)
            .then(response => {
                settypeVehichle([...typeVehichle, response.data]);
                setShowAddModal(false);
            })
            .catch(error => {
                console.error('Error adding vehicle:', error);
                alert('Failed to add vehicle. Please try again.');
            });
    };

    const handleCloseAddModal = () => {
        setShowAddModal(false);
    };

    return (
        <TemplateAdmin>
            <Link to={`/manage/parking`}>Back</Link>
            <h1>Edit Parking Price</h1>
            <Button variant="success" onClick={handleAddClick} className="mb-3">Add New Vehicle</Button>
            <div className="container mt-5">
                <div className="d-flex justify-content-center row">
                    <div className="col-md-10">
                        <div className="rounded">
                            <div className="table-responsive table-borderless table-striped">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Price</th>
                                            <th>Edit</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-body">
                                        {typeVehichle?.map((vehicle) => {
                                            return (
                                                <tr key={vehicle?.id} className="cell-1">
                                                    <td>{vehicle?.id}</td>
                                                    <td>{vehicle?.name}</td>
                                                    <td>{vehicle?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} VND</td>
                                                    <td>
                                                        <Button
                                                            variant="primary"
                                                            onClick={() => handleEditClick(vehicle)}
                                                        >
                                                            Edit
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {selectedVehicle && (
                <Modal show={showEditModal} onHide={handleCloseEditModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Vehicle</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseEditModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSaveEdit}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}

            {/* Add Modal */}
            <Modal show={showAddModal} onHide={handleCloseAddModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Vehicle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formNewName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formNewPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                value={newPrice}
                                onChange={(e) => setNewPrice(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveAdd}>
                        Add Vehicle
                    </Button>
                </Modal.Footer>
            </Modal>
        </TemplateAdmin>
    );
}
