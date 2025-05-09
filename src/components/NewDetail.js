import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Col, Row, Button } from 'react-bootstrap';
import LayoutUser from "../layout/LayoutUser";
import axios from 'axios';

const NewsDetail = () => {
    const [news, setNews] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchNewsDetail();
    }, [id]);

    const fetchNewsDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:9999/news/${id}`);
            if (response.data && response.data.isDisplay !== false) {
                setNews(response.data);
            } else {
                navigate('/news'); // Redirect if news is not found or not displayed
            }
        } catch (error) {
            console.error('Error fetching news detail:', error);
            navigate('/news'); // Redirect on error
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    if (!news) {
        return <div>Loading...</div>;
    }

    return (
        <LayoutUser>
            <Row className="justify-content-center mb-4">
                <Col xs={12} md={10}>
                    <h2>{news.title}</h2>
                    {news.date && <p>Date: {formatDate(news.date)}</p>}
                    {news.description && (
                        <div className="mb-3">
                            <h4>Description:</h4>
                            <p>{news.description}</p>
                        </div>
                    )}
                    {news.content && (
                        <div className="mb-3">
                            <h4>Content:</h4>
                            <div dangerouslySetInnerHTML={{ __html: news.content }} />
                        </div>
                    )}
                    <Button variant="primary" onClick={() => navigate('/viewnews')}>Back to News List</Button>
                </Col>
            </Row>
        </LayoutUser>
    );
};

export default NewsDetail;