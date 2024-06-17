import { useState } from "react";
import { Col, Container, Row, Image, Form, Button } from "react-bootstrap";

export default function UserProfile() {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = (e) => {
        e.preventDefault();
        // Xử lý lưu thông tin cá nhân ở đây
        setIsEditing(false);
    };
<<<<<<< HEAD
//new update
    return (
        <Container style={{marginTop:"15px"}}>
=======

    return (
        <Container>
>>>>>>> 28d9f6a73c5b7f7db017b1dcd715068a7769ec6d
            <Row style={{ backgroundColor: "#034ea2", marginRight: "70%", borderRadius: "12px" }}>
                <h2 style={{ color: "#fff", padding: "8px 25px;" }}> Personal information</h2>
            </Row>
            <Row style={{ marginTop: "15px" }}>
                <Col style={{ textAlign: "center" }}>
<<<<<<< HEAD
                    <Image src="./test.png" width="60%" />
=======
                    <Image src="./logo192.png" width="60%" />
>>>>>>> 28d9f6a73c5b7f7db017b1dcd715068a7769ec6d
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
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="3"
                                style={{ fontSize: "18px", fontWeight: "bold", lineHeight: "150%", color: "#034ea2" }}>
                                Name:
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" disabled={!isEditing}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="3"
                                style={{ fontSize: "18px", fontWeight: "bold", lineHeight: "150%", color: "#034ea2" }}>
                                Date:
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" disabled={!isEditing}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column sm="3"
                                style={{ fontSize: "18px", fontWeight: "bold", lineHeight: "150%", color: "#034ea2" }}>
                                Mã:
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" disabled={!isEditing}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="3"
                                style={{ fontSize: "18px", fontWeight: "bold", lineHeight: "150%", color: "#034ea2" }}>
                                Bed:
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text" disabled={!isEditing}/>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column sm="3"
                                style={{ fontSize: "18px", fontWeight: "bold", lineHeight: "150%", color: "#034ea2" }}>
                                Balance:
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="number" disabled={!isEditing}/>
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
                <Col>
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
        </Container>
    );
}
