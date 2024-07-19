import LayoutAdmin from "../../../layout/LayoutAdmin";
import { Col, Row, Card, Button, Form, Container } from 'react-bootstrap';
import $ from 'jquery'; // Import the jQuery library
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { log } from "util";

$(document).ready(function () {
    $('#other').hide();
});

export default function CDFMinusPage() {

    const { sid } = useParams('sid');

    //useNavigate to back to CDFChangeHistory
    const navigate = useNavigate();
    function back() {
        navigate('/manage/cdf/history');
    }

    //get minus reason
    const [minusReason, setMinusReason] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:9999/minusScoreReasons")
            .then((response) => {
                setMinusReason(response.data);
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    }, []);

    //get users
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:9999/users")
            .then((response) => {
                setUsers(response?.data?.filter((user) => user.role === "student"));
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    }, []);

    const [minusValue, setMinusValue] = useState(0);
    const [minusReasonId, setMinusReasonId] = useState('');
    const [otherReason, setOtherReason] = useState('');


    //show other reason
    useEffect(() => {
        if (minusReasonId === 'other') {
            $('#other').show();
        } else {
            $('#other').hide();
            $('#other-reason').val('');
        }
    }, [minusReasonId]);

    //function get current date
    function getCurrentDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    //function submit minus
    async function submitMinus() {

        // Validate input fields
        if (!minusValue || minusValue <= 0) {
            toast.warn("Please input a positive value for minus");
            return;
        }

        if (!minusReasonId) {
            toast.warn("Please select a reason for minus");
            return;
        }

        try {
            // Handle 'other' reason case
            let reason = minusReasonId;
            if (minusReasonId === 'other') {
                const response = await axios.post("http://localhost:9999/minusScoreReasons", { reason: otherReason });
                reason = response.data.id;
                console.log('New reason ID:', reason);
            }

            // Update user's cdf value
            const userResponse = await axios.get(`http://localhost:9999/users/${sid}`);
            const userData = userResponse.data;
            userData.cdf -= parseFloat(minusValue);
            await axios.put(`http://localhost:9999/users/${sid}`, userData);

            // Post minus data
            const data = {
                student: sid,
                minus: parseFloat(minusValue),
                minusReason: reason,
                date: getCurrentDate()
            };
            await axios.post("http://localhost:9999/cdfHistory", data);
            toast.success("Minus successfully");
            navigate('/manage/cdf/history');



        } catch (error) {
            console.error('There was an error!', error);
            toast.error("Minus failed");
        }
    }




    return (
        <LayoutAdmin>
            <h2>CDF Minus</h2>
            <section>
                <Container>
                    <Form>
                        <Row>
                            <Col md={6}>
                                {
                                    users?.map((user) => {
                                        if (user.id === sid) {
                                            return (
                                                <>
                                                    <Form.Label>Student ID</Form.Label>
                                                    <Form.Control id='studentId' value={user.id} type="text" disabled />
                                                    <Form.Label>Student Name</Form.Label>
                                                    <Form.Control id='studentName' value={user.fullName} type="text" disabled />
                                                </>
                                            );
                                        }

                                    })
                                }
                            </Col>
                            <Col md={6}>
                                <Form.Label>Minus Value</Form.Label>
                                <Form.Control id='minusValue' type="number" onChange={e => setMinusValue(e.target.value)} />
                                <Form.Label>Minus Reason</Form.Label>
                                <Form.Select aria-label="Default select example" id="minus-reason" onChange={e => setMinusReasonId(e.target.value)}>
                                    <option value={''} disabled selected>Select Minus Reason</option>
                                    {
                                        minusReason?.map((reason) => {
                                            return (
                                                <option value={reason.id}>{reason.reason}</option>
                                            );
                                        })
                                    }
                                    <option value={'other'}>Other</option>

                                </Form.Select>
                            </Col>
                            <div id="other">
                                <Form.Label>Other Reason</Form.Label>
                                <Form.Control as="textarea" rows={3} id='other-reason' onChange={e => setOtherReason(e.target.value)} />
                            </div>
                        </Row>
                        <div className="mt-3 mb-3">
                            <Button variant="primary" className="mr-3" onClick={e => submitMinus()}>Save</Button>
                            <Button variant="secondary" onClick={e => back()}>Cancel</Button>
                        </div>
                    </Form>
                </Container>
            </section>
        </LayoutAdmin>
    );
}