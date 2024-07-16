// NewsDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
            setNews(response.data);
        } catch (error) {
            console.error('Error fetching news detail:', error);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    if (!news) {
        return <div>Loading...</div>;
    }

    return (
        <div className="news-detail">
            <h2>{news.title}</h2>
            <p>Created at: {formatDate(news.createdAt)}</p>
            <p>{news.description}</p>
            <button onClick={() => navigate('/viewnews')}>Back to News List</button>
        </div>
    );
};

export default NewsDetail;