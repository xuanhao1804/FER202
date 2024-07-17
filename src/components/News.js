import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const News = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
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

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="news">
            <h2 className="news-heading">News</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Type to search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="news-list">
                {currentItems.map((item) => (
                    <div key={item.id} className="news-item" onClick={() => handleNewsClick(item.id)}>
                        <p>{formatDate(item.createdAt)}</p>
                        <h3>{item.title}</h3>
                        <div dangerouslySetInnerHTML={{ 
                            __html: item.content 
                                ? item.content.substring(0, 100) + '...' 
                                : 'No content available'
                        }} />
                    </div>
                ))}
            </div>
            <div className="pagination">
                <button onClick={() => paginate(1)} disabled={currentPage === 1}>{'««'}</button>
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>{'«'}</button>
                {Array.from({ length: Math.ceil(filteredNews.length / itemsPerPage) }, (_, i) => (
                    <button key={i} onClick={() => paginate(i + 1)} disabled={currentPage === i + 1}>
                        {i + 1}
                    </button>
                ))}
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredNews.length / itemsPerPage)}>{'»'}</button>
                <button onClick={() => paginate(Math.ceil(filteredNews.length / itemsPerPage))} disabled={currentPage === Math.ceil(filteredNews.length / itemsPerPage)}>{'»»'}</button>
            </div>
        </div>
    );
};

export default News;