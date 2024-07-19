import { ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

import { FaBell } from "react-icons/fa";
import $ from 'jquery'; // Import the jQuery library


export default function Notification(props) {

    const {user} = props;

    function handleShowNotification() {
        $('#notification').toggle();
    }

    const [notification, setNotification] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:9999/notification')
            .then(res => {
                const sortedNotifications = res?.data?.sort((a, b) => {
                    // Sắp xếp theo trạng thái isRead trước (đưa các thông báo chưa đọc lên trên)
                    if (a.isRead !== b.isRead) {
                        return a.isRead - b.isRead;
                    }
                    // Nếu trạng thái isRead giống nhau, sắp xếp theo ngày (từ mới nhất đến cũ nhất)
                    return new Date(b.date) - new Date(a.date);
                }); 
                setNotification(sortedNotifications);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);


    return (
        <>
            <div style={{ position: 'relative', marginRight: '15px' }}>
                <FaBell color="blue" onClick={e => handleShowNotification()} />
                <div id="notification"
                    style={{ position: 'absolute', right: '0', width: '350px', maxHeight: '500px', overflow: 'scroll', display: 'none' }}>
                    <ListGroup >
                        {
                            notification?.map((item, index) => {
                                // Xác định màu nền dựa trên trạng thái isRead của thông báo
                                const backgroundColor = item.isRead ? 'lightgray' : 'lightblue';

                                return (
                                    <ListGroup.Item key={index} style={{ backgroundColor }}>
                                        <b>{item.type}: </b>{item.content}
                                    </ListGroup.Item>
                                );
                            })
                        }
                    </ListGroup>
                </div>
            </div>

        </>
    );
}
