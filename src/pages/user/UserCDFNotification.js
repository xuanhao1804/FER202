import { Col, Row } from "react-bootstrap";
import LayoutUser from "../../layout/LayoutUser";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserCDFNotification() {
    const [userId, setUserId] = useState(null);
    const [userCDF, setUserCDF] = useState(0);
    const [cdfChangeHistory, setCdfChangeHistory] = useState([]);

    const [notification, setNotification] = useState([]);

    

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserId(user.id); // Cập nhật userId dựa trên dữ liệu từ localStorage
        }
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:9999/users/${userId}`)
            .then(res => {
                setUserCDF(res.data.cdf);
            }
            )
            .catch(err => {
                console.log(err);
            });
    }, [userId]);


    // Cập nhật useEffect này để thêm userId vào mảng phụ thuộc
    useEffect(() => {
        if (userId) { // Kiểm tra xem userId đã sẵn sàng để sử dụng chưa
            axios.get(`http://localhost:9999/notification?student=${userId}`)
                .then(res => {
                    const sortedNotifications = res?.data?.sort((a, b) => {
                        if (a.isRead !== b.isRead) {
                            return a.isRead - b.isRead;
                        }
                        return new Date(b.date) - new Date(a.date);
                    });
                    setNotification(sortedNotifications);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [userId]); // Thêm userId vào mảng phụ thuộc

    // Cập nhật useEffect này tương tự như trên
    useEffect(() => {
        if (userId) { // Kiểm tra xem userId đã sẵn sàng để sử dụng chưa
            axios.get(`http://localhost:9999/cdfHistory?student=${userId}`)
                .then(res => {
                    setCdfChangeHistory(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }, [userId]); // Thêm userId vào mảng phụ thuộc


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

    return (
        <LayoutUser>
            <Row>
                <Col>
                    <h1>Notification</h1>
                    <table class="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Bonus/Minus</th>
                                <th scope="col">Reason</th>
                                <th scope="col">Date</th>
                                <th scope="col">CDF Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                notification?.map((item, index) => {

                                    return (
                                        <tr key={index}>
                                            <td>{item.title}</td>
                                            <td>
                                                {
                                                    cdfChangeHistory?.find(cdf => cdf.id == item.cdfId)?.bonus ?
                                                        '+' + cdfChangeHistory?.find(cdf => cdf.id == item.cdfId)?.bonus : ''
                                                }
                                                {
                                                    cdfChangeHistory?.find(cdf => cdf.id == item.cdfId)?.minus ?
                                                        '-' + cdfChangeHistory?.find(cdf => cdf.id == item.cdfId)?.minus : ''
                                                }
                                            </td>
                                            <td>
                                                {
                                                    bonusReason?.find(reason => reason.id == cdfChangeHistory?.find(cdf => cdf.id == item.cdfId)?.bonusReason)?.reason
                                                }
                                                {
                                                    minusReason?.find(reason => reason.id == cdfChangeHistory?.find(cdf => cdf.id == item.cdfId)?.minusReason)?.reason
                                                }
                                            </td>
                                            <td>
                                                {
                                                    cdfChangeHistory?.find(cdf => cdf.id == item.cdfId)?.date
                                                }
                                            </td>
                                            <td>
                                                {
                                                    userCDF
                                                }
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </Col>
            </Row>
        </LayoutUser>
    );
}
