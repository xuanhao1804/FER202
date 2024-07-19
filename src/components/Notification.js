import { ListGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import $ from 'jquery'; // Import the jQuery library


export default function Notification(props) {

    const { user } = props;

    function handleShowNotification() {
        $('#notification').toggle();
         // Update all notifications as read
         const updatedNotifications = notification.map(item => ({
            ...item,
            isRead: true, // Set isRead to true for all notifications
        }));

        // Update the state to reflect the changes
        setNotification(updatedNotifications);

        // Optionally, send a request to the backend to update the database
        // This step depends on your backend implementation
        axios.post('http://localhost:9999/notification?student=' + user.userId)
            .then(res => console.log(res.data))
            .catch(err => console.error(err));

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
                    style={{ position: 'absolute', right: '0', width: '350px', maxHeight: '500px', overflow: 'auto', display: 'none' }}>
                    <ListGroup >
                        {
                            notification?.map((item, index) => {
                                // Xác định màu nền dựa trên trạng thái isRead của thông báo
                                const backgroundColor = item.isRead ? 'lightgray' : 'lightblue';

                                return (
                                    <ListGroup.Item key={index} style={{ backgroundColor }}>
                                        <Link to={`${item.url}`} style={{ textDecoration: 'none' }}>{item.title}</Link>
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
