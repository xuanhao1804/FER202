import { useEffect, useState } from "react";
import { Col, Row, Image, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import LayoutUser from "../layout/LayoutUser";
import { toast } from "react-toastify";

export default function UserProfile() {
    const {id} = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [bedInfo, setBedInfo] = useState(null);

    //Fetch user by id to get information
    useEffect(() => {
        fetch(`http://localhost:9999/users/${id}`)
        .then(res => res.json())
        .then(res =>{
            setUser(res)
            fetchBedInfo(res.studentID);
        })
        .catch(err => console.log(err));
    },[]);

    //Fetch dormitories to get bed information
    const fetchBedInfo = (studentID) => {
        fetch(`http://localhost:9999/dormitories`)
        .then(res => res.json())
        .then(dormitories => {
            for (let dormitory of dormitories) {
                for (let floor of dormitory.floors) {
                    for (let room of floor.rooms) {
                        for (let bed of room.beds) {
                            if (bed.student === studentID) {
                                setBedInfo({
                                    dormitory: dormitory.name,
                                    floor: floor.floorNumber,
                                    room: room.roomNumber,
                                    bed: bed.name
                                });
                                return;
                            }
                        }
                    }
                }
            }
        })
        .catch(err => console.log(err));
    };

    //Set Editing button 
    const handleEditClick = () => {
        setIsEditing(true);
    };

    //Handle Input from edit submit
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    //Handle form save button
    const handleSaveClick = (e) => {
        e.preventDefault();
        if (validateForm()) {
            fetch(`http://localhost:9999/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(res => {
                setUser(res);
                setIsEditing(false);
                toast.success('Update profile successfully');
            })
            .catch(err => console.log(err));
        }
       
    };
    // Image validation
    const handleImageError = (e) => {
        e.target.src = "https://cdn-icons-png.freepik.com/512/10453/10453654.png";
    };

    // Validation for input
    const validateForm = () => {
        let isValid = true;
        const errors = {};
      
        // Name validation
        if (!user.fullName.trim()) {
          errors.fullName = "Name cannot be empty";
          isValid = false;
        } else if (/[0-9]/.test(user.fullName)) {
          errors.fullName = "Name cannot contain numbers";
          isValid = false;
        } else if (/[!@#$%^&*(),.?":{}|<>]/.test(user.fullName)) {
          errors.fullName = "Name cannot contain special characters";
          isValid = false;
        }
      
        // Phone validation
        if (!user.phone.trim()) {
          errors.phone = "Phone number cannot be empty";
          isValid = false;
        } else if (user.phone.length > 11) {
          errors.phone = "Phone number cannot be longer than 11 digits";
          isValid = false;
        }
      
        setFormErrors(errors);
        return isValid;
    };

    return (
        <LayoutUser>
            <Row 
                className="mb-5"
                style={{ backgroundColor: "#034ea2",
                        marginTop: '2%' , 
                        marginRight: "70%", 
                        borderRadius: "12px" 
                        }}>
                <h2 style={{ color: "#fff", padding: "8px 25px;" }}> Personal information</h2>
            </Row>
            <Row style={{ marginTop: "15px" }}>
                <Col lg={4} style={{ textAlign: "center" }}>
                    <Image 
                        src={user?.avatar} 
                        alt={`${user?.fullName}'s avatar`} 
                        width="60%" 
                        onError={handleImageError}
                        />
                </Col>
                <Col lg={7}>
                    <div style={{ textAlign: "right", marginBottom: "10px" }}>
                        <Button 
                            style={{ backgroundColor: "#034ea2" }}
                            onClick={handleEditClick}
                            disabled={isEditing}
                        >Edit
                        </Button>
                    </div>

                    {/* Form */}
                    <Form onSubmit={handleSaveClick}>

                        {/* Name information */}
                        <Form.Group as={Row} className="mb-3" controlId="formUserName">
                            <Form.Label 
                                column sm="3"
                                style={{ fontSize: "18px", fontWeight: "bold", lineHeight: "150%", color: "#034ea2" }}
                            >
                                Name:
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control 
                                    type="text" 
                                    name="fullName"
                                    value={user?.fullName} 
                                    onChange={handleInputChange} 
                                    disabled={!isEditing}
                                    isInvalid={!!formErrors.fullName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.fullName}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        {/* Gender information */}
                        <Form.Group as={Row} className="mb-3" controlId="formUserGender">
                            <Form.Label 
                                column sm="3"
                                style={{ fontSize: "18px", fontWeight: "bold", lineHeight: "150%", color: "#034ea2" }}
                            >
                                Gender:
                            </Form.Label>
                            <Col sm="9">
                                <Form.Select 
                                    name="gender"
                                    value={user?.gender} 
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        {/* Phone information */}
                        <Form.Group as={Row} className="mb-3" controlId="formUserPhone">
                            <Form.Label column sm="3"
                                style={{ fontSize: "18px", fontWeight: "bold", lineHeight: "150%", color: "#034ea2" }}>
                                Phone:
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control 
                                    type="number"  
                                    name="phone"
                                    value={user?.phone} 
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    isInvalid={!!formErrors.phone}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {formErrors.phone}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Group>

                        {/* StudentID information */}
                        <Form.Group as={Row} className="mb-3" controlId="formUserAddress">
                            <Form.Label column sm="3"
                                style={{ fontSize: "18px", fontWeight: "bold", lineHeight: "150%", color: "#034ea2" }}>
                                StudentID:
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="text"  value={user?.studentID || "NaN"} disabled/>
                            </Col>
                        </Form.Group>

                        {/* Bed information */}
                        <Form.Group as={Row} className="mb-3" controlId="formUserBed">
                            <Form.Label column sm="3"
                                style={{ fontSize: "18px", fontWeight: "bold", lineHeight: "150%", color: "#034ea2" }}>
                                Bed:
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control 
                                    type="" 
                                    value={bedInfo ? `${bedInfo.dormitory}, Floor ${bedInfo.floor}, Room ${bedInfo.room}, Bed ${bedInfo.bed}` : "Not assigned"} 
                                    disabled
                                />
                            </Col>
                        </Form.Group>

                        {/* Balance information */}
                        <Form.Group as={Row} className="mb-3" controlId="formUserBalance">
                            <Form.Label column sm="3"
                                style={{ fontSize: "18px", fontWeight: "bold", lineHeight: "150%", color: "#034ea2" }}>
                                Balance:
                            </Form.Label>
                            <Col sm="9">
                                <Form.Control type="number" value={user?.balance || 0} disabled/>
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
                <Col lg={1}>
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
