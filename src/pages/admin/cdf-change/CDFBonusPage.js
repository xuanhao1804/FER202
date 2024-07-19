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

export default function CDFBonusPage() {

    
    const { sid } = useParams('sid');

    //useNavigate to back to CDFChangeHistory
    const navigate = useNavigate();
    function back() {
        navigate('/manage/cdf/history');
    }

    //get bonus reason
    const [bonusReason, setBonusReason] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:9999/bonusScoreReasons")
            .then((response) => {
                setBonusReason(response.data);
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

    const [bonusValue, setBonusValue] = useState(0);
    const [bonusReasonId, setBonusReasonId] = useState('');
    const [otherReason, setOtherReason] = useState('');


    //show other reason
    useEffect(() => {
        if (bonusReasonId === 'other') {
            $('#other').show();
        } else {
            $('#other').hide();
            $('#other-reason').val('');
        }
    }, [bonusReasonId]);

    //function get current date
    function getCurrentDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    //function submit bonus
    async function submitBonus() {
        // Validate input fields
        if (!bonusValue || bonusValue === 0) {
            toast.warn("Please input bonus value");
            return;
        }

        if (bonusValue < 0) {
            toast.warn("Please input positive value");
            return;
        }

        if (!bonusReasonId) {
            toast.warn("Please select bonus reason");
            return;
        }

        try {
            // Handle 'other' reason case
            let reason = bonusReasonId;
            if (bonusReasonId === 'other') {
                const response = await axios.post("http://localhost:9999/bonusScoreReasons", { reason: otherReason });
                reason = response.data.id;
                console.log('New reason ID:', reason);
            }

            // Update user's cdf value
            const userResponse = await axios.get(`http://localhost:9999/users/${sid}`);
            const userData = userResponse.data;
            userData.cdf += parseFloat(bonusValue);
            await axios.put(`http://localhost:9999/users/${sid}`, userData);

            // Post bonus data
            const data = {
                student: sid,
                bonus: parseFloat(bonusValue),
                bonusReason: reason,
                date: getCurrentDate()
            };
            await axios.post("http://localhost:9999/cdfHistory", data);
            toast.success("Bonus successfully");

            const newCDFHistory = [];
            await axios.get(`http://localhost:9999/cdfHistory`)
                .then(res => {
                    newCDFHistory.push(...res.data);
                })
                .catch(err => {
                    console.log(err);
                });

            

            addCDFNotification(sid, newCDFHistory[newCDFHistory.length - 1].id);

            navigate('/manage/cdf/history');



        } catch (error) {
            console.error('There was an error!', error);
            toast.error("Bonus failed");
        }
    }

    //add new notification
    function addCDFNotification(sid, cdfId){
        const data = {
            title: "You just have been got bonus cdf score",
            isRead: false,
            student: sid,
            cdfId : cdfId,
            url: `/notification/cdf`
        }

        axios.post("http://localhost:9999/notification", data)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });            
    }


    return (
        <LayoutAdmin>
            <h2>CDF Bonus</h2>
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
                                <Form.Label>Bonus Value</Form.Label>
                                <Form.Control id='bonusValue' type="number" onChange={e => setBonusValue(e.target.value)} />
                                <Form.Label>Bonus Reason</Form.Label>
                                <Form.Select aria-label="Default select example" id="bonus-reason" onChange={e => setBonusReasonId(e.target.value)}>
                                    <option value={''} disabled selected>Select Bonus Reason</option>
                                    {
                                        bonusReason?.map((reason) => {
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
                            <Button variant="primary" className="mr-3" onClick={e => submitBonus()}>Save</Button>
                            <Button variant="secondary" onClick={e => back()}>Cancel</Button>
                        </div>
                    </Form>
                </Container>
            </section>
        </LayoutAdmin>
    );
}