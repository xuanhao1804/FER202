import { useEffect, useState } from "react";
import { Col, Container, Row, Image, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import LayoutUser from "../layout/LayoutUser";
export default function UserProfile() {
    const {id} = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState([]);
    const [bal, setBal] = useState([]);


    useEffect(() => {
        fetch(`http://localhost:9999/users/${id}`)
        .then(res => res.json())
        .then(res => setUser(res))
        .catch(err => console.log(err));
        fetch(`http://localhost:9999/payments`)
        .then(res => res.json())
        .then(res => setBal(res))
        .catch(err => console.log(err));
    },[])

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = (e) => {
        e.preventDefault();
        // Xử lý lưu thông tin cá nhân ở đây
        setIsEditing(false);
    };

    return (
        <LayoutUser>
            <Row 
                style={{ backgroundColor: "#034ea2",
                        marginTop: '2%' , 
                        marginRight: "70%", 
                        borderRadius: "12px" 
                        }}>
                <h2 style={{ color: "#fff", padding: "8px 25px;" }}> Personal information</h2>
            </Row>
            <Row style={{ marginTop: "15px" }}>
                <Col style={{ textAlign: "center" }}>
                    <Image src={user?.avatar} alt={`${user?.fullName}'s avatar`} width="60%" />
                </Col>
                <Col>
                    <div style={{ textAlign: "right", marginBottom: "10px" }}>
                        <Button 
                            style={{ backgroundColor: "#034ea2" }}
                            onClick={handleEditClick}
                            disabled={isEditing}
                        >Edit
                        </Button>
                    </div>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formUserName">
                            <Form.Label column sm="3"
                                style={{ fontSize: "18px", fontWeight: "bold", lineHeight: "150%", color: "#034ea2" }}>
                                Name:
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" value={user?.fullName} disabled={!isEditing}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formUserGender">
                            <Form.Label column sm="3"
                                style={{ fontSize: "18px", fontWeight: "bold", lineHeight: "150%", color: "#034ea2" }}>
                                Gender:
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text"  value={user?.gender} disabled={!isEditing}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formUserPhone">
                            <Form.Label column sm="3"
                                style={{ fontSize: "18px", fontWeight: "bold", lineHeight: "150%", color: "#034ea2" }}>
                                Phone:
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text"  value={user?.phone} disabled={!isEditing}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formUserAddress">
                            <Form.Label column sm="3"
                                style={{ fontSize: "18px", fontWeight: "bold", lineHeight: "150%", color: "#034ea2" }}>
                                Address:
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text"  value={user?.address} disabled={!isEditing}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formUserBed">
                            <Form.Label column sm="3"
                                style={{ fontSize: "18px", fontWeight: "bold", lineHeight: "150%", color: "#034ea2" }}>
                                Bed:
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" disabled/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formUserBalance">
                            <Form.Label column sm="3"
                                style={{ fontSize: "18px", fontWeight: "bold", lineHeight: "150%", color: "#034ea2" }}>
                                Balance:
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="number" disabled/>
                            </Col>
                        </Form.Group>
                        <div style={{ textAlign: "right" }}>
                            <Button 
                            type="submit" 
                            style={{ padding: "10px 20px", fontWeight: "600", backgroundColor: "#034ea2" }}
                            disabled={!isEditing}
                            >
                                Save personal information
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
            <Row style={{ backgroundColor: "#034ea2", marginRight: "70%", borderRadius: "12px" }}>
                <h2 style={{ color: "#fff", padding: "8px 25px;" }}> Contact information</h2>
            </Row>
            <Row style={{ marginTop: "20px" }}>
                <Col>
                    <p>
                        <strong style={{ fontSize: "18px", fontWeight: "bold", lineHeight: "150%", color: "#034ea2" }}
                        >Security room:
                        </strong>
                        (024) 6680 5 913
                    </p>
                    <p>
                        <strong style={{ fontSize: "18px", fontWeight: "bold", lineHeight: "150%", color: "#034ea2" }}
                        >Health station:
                        </strong>
                        (024) 6680 5 917
                    </p>
                </Col>
                <Col>
                    <p>
                        <strong style={{ fontSize: "18px", fontWeight: "bold", lineHeight: "150%", color: "#034ea2" }}
                        >Dormitory management:
                        </strong>
                        (024) 7308 1313
                    </p>
                    <p>
                        <strong style={{ fontSize: "18px", fontWeight: "bold", lineHeight: "150%", color: "#034ea2" }}
                        >Email:
                        </strong>
                        ktx@fpt.edu.vn
                    </p>
                </Col>
                <Col>
                </Col>
            </Row>
        </LayoutUser>
    );
}
