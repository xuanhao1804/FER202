// StudentGuide.js
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Pagination } from "antd";
import LayoutUser from "../../layout/LayoutUser";
import "../../style/guide.css";
import axios from 'axios';

const StudentGuide = () => {
    const [guide, setGuide] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        axios.get('http://localhost:9999/guide')
            .then(response => {
                setGuide(response.data);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, []);


    //Thêm trạng thái để lưu `id` của button đang được kích hoạt
    const [activeId, setActiveId] = useState(null);

    //Cập nhật hàm `handleClick` để nhận `id` của button được nhấn
    const handleClick = (id) => {
        setActiveId(id); // Cập nhật trạng thái với `id` của button được nhấn
    };

    const guidesPerPage = 5;
    const indexOfLastGuide = currentPage * guidesPerPage;
    const indexOfFirstGuide = indexOfLastGuide - guidesPerPage;
    const currentGuide = guide.slice(indexOfFirstGuide, indexOfLastGuide);


    // Function to handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    //luu key words search
    const [search, setSearch] = useState('');
   

    //filter guide theo key word khong phan biet hoa thuong
    function handleSearch(keyWord) {
        keyWord = keyWord.toLowerCase();
        axios.get('http://localhost:9999/guide')
            .then(response => {
                setGuide(response.data?.filter(g => g.name.toLowerCase().includes(keyWord)));
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    useEffect(() => {
        if(search === '') {
            axios.get('http://localhost:9999/guide')
            .then(response => {
                setGuide(response.data);
            })
            .catch(err => {
                console.log(err.message);
            });
        }
    }, [search]);


    return (
        <LayoutUser>
            <div>
                <h1 style={{ color: '#034EA2' }}><b>User Guide</b></h1>

                <Row>

                    <Col md={4} >

                        <div className='d-flex'>
                            <input class="search-input mr-2"
                                type="text"
                                placeholder="Type to search"
                                aria-label=".form-control-lg example"
                                onChange={e => setSearch(e.target.value)} />

                            <button type="button"
                                class="btn-search"
                                onClick={e => handleSearch(search)}>
                                <b>Search</b>
                            </button>
                        </div>

                        <div id='guide-list'>
                            {currentGuide?.map((g) => (
                                <div key={g.id}>
                                    {/* Kiểm tra `id` của mỗi button với `id` trong trạng thái */}
                                    <button
                                        type="button"
                                        onClick={() => handleClick(g.id)} // Cập nhật hàm `handleClick` để nhận `id`
                                        className={`btn-guide text-start ${activeId === g.id ? 'active' : ''}`} // Thêm class `active` nếu `id` trùng khớp
                                    >
                                        <b>{g.name}</b>
                                    </button>
                                </div>

                            ))}
                        </div>
                        {/* Ant Design Pagination Component */}
                        <Pagination
                            current={currentPage}
                            onChange={handlePageChange}
                            total={guide.length} // This should be dynamic based on total items/pages
                            pageSize={guidesPerPage}
                        />
                    </Col>
                    <Col md={8}>
                        {
                            guide.map((g) => (
                                g.id === activeId ?
                                    <div key={g.id}>
                                        <h3 style={{ color: '#034EA2', fontWeight: '500' }}>{g.name}</h3>
                                        <div id='guide-detail'>
                                            {g.step.map((s, index) => (
                                                <div key={s.id}>
                                                    <b>Step {index + 1}: {s.description}</b>
                                                    <div>
                                                        {s.link.name && <a href={s.link.url}>{s.link.name}</a>}
                                                    </div>
                                                    {s.note && <p className='fst-italic'>*Note: {s.note}</p>}
                                                    {s.recommendation.length > 0 && (
                                                        <p className='fst-italic'>
                                                            *Recommendation:{' '}
                                                            {s.recommendation.map((r) => (
                                                                <span key={r.id} style={{ fontWeight: r.bold ? 'bold' : 'normal' }}>{r.text}{' '}</span>
                                                            )).reduce((prev, curr) => [prev, '', curr])}
                                                        </p>
                                                    )}
                                                    <div className='step-image'>
                                                        {s.image && <img src={`../img/guide/${s.image}`} alt={`${s.image}`} />}
                                                    </div>
                                                    <hr></hr>
                                                </div>

                                            ))}
                                        </div>
                                    </div>
                                    : ''
                            ))
                        }

                    </Col>
                </Row>
            </div>
        </LayoutUser>
    );
};

export default StudentGuide;
