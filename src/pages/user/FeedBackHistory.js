import React, { useEffect, useState } from 'react';
import { Container, Table, Pagination } from "react-bootstrap";
import axios from 'axios';
import LayoutUser from "../../layout/LayoutUser";

export default function FeedBackHistory() {
    const [feedbackHistory, setFeedBackHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [feedbacksPerPage] = useState(10); // Số phản hồi mỗi trang
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchRequestHistory = async () => {
            try {
                const response = await axios.get('http://localhost:9999/feedbackRequest');
                const userFeedbacks = response.data.filter(x => x.userId === user.id);
                setFeedBackHistory(userFeedbacks); // Cập nhật state với dữ liệu phản hồi
            } catch (error) {
                console.error('Error fetching feedback history:', error);
            }
        };

        fetchRequestHistory();
    }, [user.id]);

    // Tính toán các chỉ số cho phân trang
    const indexOfLastFeedback = currentPage * feedbacksPerPage;
    const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
    const currentFeedbacks = feedbackHistory.slice(indexOfFirstFeedback, indexOfLastFeedback);

    // Tạo các số trang
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(feedbackHistory.length / feedbacksPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const tableStyles = {
        width: '100%',
        marginTop: '20px',
        borderCollapse: 'collapse'
    };

    const thStyles = {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px',
        textAlign: 'left',
    };

    const tdStyles = {
        padding: '10px',
        borderBottom: '1px solid #ddd',
    };

    return (
        <LayoutUser>
            <Container>
                <Table style={tableStyles}>
                    <thead>
                        <tr>
                            <th style={thStyles}>TYPE</th>
                            <th style={thStyles}>PURPOSE</th>
                            <th style={thStyles}>CREATEDATE</th>
                            <th style={thStyles}>PROCESSNOTE</th>
                            <th style={thStyles}>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentFeedbacks.map((feedback) => (
                            <tr key={feedback.id}>
                                <td style={tdStyles}>{feedback.type}</td>
                                <td style={tdStyles}>{feedback.reason}</td>
                                <td style={tdStyles}>{feedback.date}</td>
                                <td style={tdStyles}>{feedback.replyAdmin}</td>
                                <td style={tdStyles}>{feedback.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Pagination className="justify-content-center">
                    {pageNumbers.map(number => (
                        <Pagination.Item
                            key={number}
                            active={number === currentPage}
                            onClick={() => handlePageChange(number)}
                        >
                            {number}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </Container>
        </LayoutUser>
    );
}
