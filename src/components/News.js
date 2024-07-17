import React, { useState, useEffect } from 'react';
import { Col, Row, Table, Button, Form } from 'react-bootstrap';
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import LayoutUser from "../layout/LayoutUser";
import axios from 'axios';

const News = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get('http://localhost:9999/news');
            const displayedNews = response.data.filter(item => item.isDisplay);
            setNewsItems(displayedNews);
            setFilteredNews(displayedNews);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const handleSearch = () => {
        const normalizedSearchTerm = searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const filtered = newsItems.filter(item => 
            item.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(normalizedSearchTerm)
        );
        setFilteredNews(filtered);
        setCurrentPage(1);
    };

    const handleNewsClick = (id) => {
        navigate(`/news/${id}`);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredNews.slice(indexOfFirstItem, indexOfLastItem);

    const handlePaginationChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <LayoutUser>
            <Row className="justify-content-center mb-4">
                <Col xs={12} className="text-center">
                    <h2>News</h2>
                </Col>
            </Row>
            <Row className="justify-content-center mb-3">
                <Col xs={12} md={6}>
                    <Form.Group className="d-flex">
                        <Form.Control
                            type="text"
                            placeholder="Type to search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="primary" onClick={handleSearch}>Search</Button>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={12} md={10}>
                    <Table striped bordered hover className="box-shadow">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Title</th>
                                <th>Preview</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{formatDate(item.createdAt)}</td>
                                    <td>{item.title}</td>
                                    <td>
                                        <div dangerouslySetInnerHTML={{ 
                                            __html: item.content 
                                                ? item.content.substring(0, 100) + '...' 
                                                : 'No content available'
                                        }} />
                                    </td>
                                    <td>
                                        <Button variant="info" onClick={() => handleNewsClick(item.id)}>
                                            Read More
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Pagination
                        current={currentPage}
                        total={filteredNews.length}
                        pageSize={itemsPerPage}
                        onChange={handlePaginationChange}
                        style={{ marginTop: "16px", textAlign: "center" }}
                    />
                </Col>
            </Row>
        </LayoutUser>
    );
};

export default News;