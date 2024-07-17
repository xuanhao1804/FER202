import { useState, useEffect } from 'react';
import "../style/regulation.css";
import { Col, Row, Card, Button, Form } from 'react-bootstrap';
import PDFViewer from '../components/pdf.js';
import axios from 'axios';
import { message, Pagination } from "antd";
import background_rule_card from '../assert/images/background-rule-card.jpg';
import $ from 'jquery'; // Import the jQuery library
import LayoutAdmin from '../layout/LayoutAdmin';
import { toast } from 'react-toastify';


$(document).ready(function () {
    $('#add-rule-form').hide();
    $('#edit-rule-form').hide();
});

export default function AdminRegulations() {

    const [rule, setRule] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    function getRuleList() {
        axios.get('http://localhost:9999/rules')
            .then(response => {
                setRule(response.data);
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    useEffect(() => {
        getRuleList();
    }, []);

    //Thêm trạng thái để lưu `id` của button đang được kích hoạt
    const [activeId, setActiveId] = useState(null);

    //Cập nhật hàm `handleClick` để nhận `id` của button được nhấn
    const handleClick = (id) => {
        setActiveId(id); // Cập nhật trạng thái với `id` của b        if(window.confirm(message)){pdf').hide();
        $('#add-rule-form').hide();
        $('#edit-rule-form').hide();
    };


    //Function to close the rule card
    function handleClose() {
        setActiveId(null);
        $('#pdf').show();
    }


    //Function to show the add rule form
    function showAddRuleForm() {
        setActiveId(null);
        $('#pdf').hide();
        $('#add-rule-form').show();
        $('#edit-rule-form').hide();
    }

    //Function to hide the add rule form
    function hideAddRuleForm() {
        $('#pdf').show();
        $('#add-rule-form').hide();
    }

    //Function to show the edit rule form
    function showEditRuleForm(id) {
        setActiveId(null);
        axios.get('http://localhost:9999/rules/' + id)
            .then(response => {
                $('#edit-rule-form').show();
                $('#pdf').hide();
                setId(response.data.id);
                setTitle(response.data.title);
                setDescription(response.data.description);
            })
            .catch(err => {
                console.log(err.message);
            });
    }

    //Function to hide the edit rule form
    function hideEditRuleForm() {
        $('#edit-rule-form').hide();
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
                setRule(response.data?.filter(r => r.title.toLowerCase().includes(keyWord)));
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



    //function to add new rule to database
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    function addRule() {
        if (title === '' || description === '') {
            toast.error('Please fill in all fields');
            return;
        }
        axios.post('http://localhost:9999/rules', {
            title: title,
            description: description
        })
            .then(response => {
                console.log(response.data);
                toast.success('Add new rule successfully');
                $('#add-rule-form').hide();
                $('#pdf').show();
                setRule([...rule, response.data]);
            })
            .catch(err => {
                console.log(err.message);
                toast.error('Add new rule failed');
            });
    }

    //function to edit rule
    function editRule() {
        if (title === '' || description === '') {
            toast.error('Please fill in all fields');
            return;
        }

        // Remove this line as we're already using the state variable 'id'
        // const id = $('#edit-rule-form #id').val();

        axios.put('http://localhost:9999/rules/' + id, {
            title: title,
            description: description
        })
            .then(response => {
                toast.success('Edit rule successfully');
                $('#edit-rule-form').hide();
                $('#pdf').show();
                getRuleList();
            })
            .catch(err => {
                console.log(err.message);
                toast.error('Edit rule failed');
            });
    }

    //function to delete rule
    function deleteRule(id) {
        const message = 'Are you sure you want to delete this rule?';
        if (window.confirm(message)) {
            axios.delete('http://localhost:9999/rules/' + id)
                .then(response => {
                    toast.success('Delete rule successfully');
                    getRuleList();
                    setCurrentPage(1);
                    $('#pdf').show();
                })
                .catch(err => {
                    console.log(err.message);
                    toast.error('Delete rule failed');
                });
        }
    }


    return (
        <LayoutAdmin>
            <div>
                <Row className='mb-2'>
                    <Col >
                        <h1 style={{ color: '#034EA2' }}><b>Dormitory Regulations</b></h1>
                    </Col>
                    <Col >
                        <div className='d-md-flex justify-content-end'>

                            <Button variant="outline-primary" onClick={e => showAddRuleForm()}>
                                <i class="fa-regular fa-square-plus"></i>
                                <b> Add new Rule</b>
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>

                    <Col md={4} className='mb-3'>

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
                                                <div style={{
                                                    width: '30vw', // Chiều rộng bằng 80% của viewport
                                                    height: '20vh', // Chiều cao bằng 50% của viewport
                                                    color: '#034EA2',
                                                    fontWeight: '500'
                                                }}>
                                                    <h3 style={{ color: '#034EA2', fontWeight: '500' }}>{r.title}</h3>
                                                    <p style={{ marginLeft: '25px', fontSize: 'clamp(1rem, 1.6vw, 2rem)' }}>{r.description}</p>
                                                </div>
                                                <div className='d-flex justify-content-end' style={{ width: '100%' }}>
                                                    <Button variant="primary"
                                                        className='mr-3'
                                                        onClick={e => showEditRuleForm(r.id)}>
                                                        Edit
                                                    </Button>
                                                    <Button variant="danger"
                                                        className='mr-3'
                                                        onClick={e => deleteRule(r.id)}>
                                                        Delete
                                                    </Button>
                                                    <Button variant="secondary"
                                                        onClick={e => handleClose()}>
                                                        Close
                                                    </Button>
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
                        <div id='add-rule-form'>
                            <h2 style={{ color: '#034EA2' }}><b>Add New Rule</b></h2>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text"
                                        placeholder="Enter the title of the rule"
                                        onChange={e => setTitle(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Content</Form.Label>
                                    <Form.Control as="textarea"
                                        placeholder="Enter the content of the rule"
                                        onChange={e => setDescription(e.target.value)}
                                        rows={3} />
                                </Form.Group>
                                <div className='d-md-flex justify-content-end'>
                                    <Button variant="primary"
                                        style={{ width: '80px', marginRight: '10px' }}
                                        onClick={e => addRule()}>
                                        Save
                                    </Button>
                                    <Button type='submit'
                                        variant="danger"
                                        style={{ width: '80px' }}
                                        onClick={e => hideAddRuleForm()}>
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        </div>
                        <div id='edit-rule-form'>
                            <h2 style={{ color: '#034EA2' }}><b>Edit Rule</b></h2>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Id</Form.Label>
                                    <Form.Control type="text"
                                        id='id'
                                        value={id}
                                        readOnly />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text"
                                        id='title'
                                        placeholder="Enter the title of the rule"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Content</Form.Label>
                                    <Form.Control as="textarea"
                                        id='description'
                                        placeholder="Enter the content of the rule"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        rows={3} />
                                </Form.Group>
                                <div className='d-md-flex justify-content-end'>
                                    <Button variant="primary"

                                        style={{ width: '80px', marginRight: '10px' }}
                                        onClick={e => editRule()}>
                                        Save
                                    </Button>
                                    <Button type='submit'
                                        variant="danger"
                                        style={{ width: '80px' }}
                                        onClick={e => hideEditRuleForm()}>
                                        Cancel
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>

            </div>
        </LayoutAdmin>
    );
}