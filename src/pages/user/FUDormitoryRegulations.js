import { useState, useEffect } from 'react';
import LayoutUser from "../../layout/LayoutUser";
import "../../style/regulation.css";
import { Col, Row, Card, Button } from 'react-bootstrap';
import PDFViewer from '../../components/pdf.js';
import axios from 'axios';
import { Pagination } from "antd";
import background_rule_card from '../../assert/images/background-rule-card.jpg';
import $ from 'jquery'; // Import the jQuery library

export default function FUDormitoryRegulations() {

    const [rule, setRule] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get('http://localhost:9999/rules')
            .then(response => {
                setRule(response?.data);
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
        $('#pdf').hide();
    };    
    
    function handleClose(){
        setActiveId(null);
        $('#pdf').show();
    }

    // Function to handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const guidesPerPage = 5;
    const indexOfLastRule = currentPage * guidesPerPage;
    const indexOfFirstRule = indexOfLastRule - guidesPerPage;
    const currentRule = rule.slice(indexOfFirstRule, indexOfLastRule);

    //luu key words search
    const [search, setSearch] = useState('');


    //filter guide theo key word khong phan biet hoa thuong
    function handleSearch(keyWord) {
        keyWord = keyWord.toLowerCase();
        axios.get('http://localhost:9999/rules')
            .then(response => {
                setRule(response?.data?.filter(r => r.title.toLowerCase().includes(keyWord)));
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    useEffect(() => {
        if (search === '') {
            axios.get('http://localhost:9999/rules')
                .then(response => {
                    setRule(response.data);
                })
                .catch(err => {
                    console.log(err.message);
                });
        }
    }, [search]);

    return (
        <LayoutUser>
            <div>
                <h1 style={{ color: '#034EA2' }}><b>Dormitory Regulations</b></h1>
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
                            {currentRule?.map((r) => (
                                <div key={r.id}>
                                    {/* Kiểm tra `id` của mỗi button với `id` trong trạng thái */}
                                    <button
                                        type="button"
                                        onClick={() => handleClick(r.id)} // Cập nhật hàm `handleClick` để nhận `id`
                                        className={`btn-guide text-start ${activeId === r.id ? 'active' : ''}`} // Thêm class `active` nếu `id` trùng khớp
                                    >
                                        <b>{r.title}</b>
                                    </button>
                                </div>

                            ))}
                        </div>
                        {/* Ant Design Pagination Component */}
                        <Pagination
                            current={currentPage}
                            onChange={handlePageChange}
                            total={rule.length} // This should be dynamic based on total items/pages
                            pageSize={guidesPerPage}
                        />
                    </Col>
                    <Col md={8}>
                        {/*Hien thi thong tin chi tiet cua rule tai day */}
                        {
                            rule.map((r) => (
                                r.id === activeId ?
                                    <div className='rule-card' key={r.id}>
                                        <div className='rule-card-main'>
                                            <div className='rule-card-content' style={{}}>
                                                <h3 style={{ color: '#034EA2', fontWeight: '500' }}>{r.title}</h3>
                                                <p style={{ marginLeft: '25px', fontSize: 'clamp(1rem, 1.6vw, 2rem)' }}>{r.description}</p>
                                                <div className='d-flex justify-content-end' style={{ width: '100%' }}>
                                                    <Button variant="primary" onClick={e => handleClose()}>Close</Button>
                                                </div>
                                            </div>
                                            <div className='rule-card-img'>
                                                <img src={background_rule_card} alt='rule' style={{ width: '100%', height: 'auto' }} />
                                            </div>
                                        </div>
                                    </div>
                                    : null
                            ))
                        }
                        <div id='pdf'>
                            <PDFViewer pdfUrl="../document/regulations/KTX-HL.pdf" />
                        </div>
                    </Col>
                </Row>

            </div>
        </LayoutUser>
    );
}