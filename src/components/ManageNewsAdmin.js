import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Modal } from 'react-bootstrap';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TemplateAdmin from "../layout/LayoutAdmin";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaEyeSlash, FaEye } from 'react-icons/fa';

const ManageNewsAdmin = () => {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newsToToggle, setNewsToToggle] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:9999/news');
      setNews(response.data);
    } catch (error) {
      console.error('Error fetching news:', error);
      toast.error('Failed to fetch news');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:9999/news/${editingId}`, { title, content });
        toast.success('News updated successfully');
      } else {
        await axios.post('http://localhost:9999/news', { title, content });
        toast.success('News created successfully');
      }
      setTitle('');
      setContent('');
      setEditingId(null);
      fetchNews();
    } catch (error) {
      console.error('Error submitting news:', error);
      toast.error('Failed to submit news');
    }
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    setContent(item.content || '');
    setEditingId(item.id);
  };

  const handleVisibilityToggleConfirmation = (item) => {
    setNewsToToggle(item);
    setShowModal(true);
  };

  const handleVisibilityToggle = async () => {
    try {
      await axios.patch(`http://localhost:9999/news/${newsToToggle.id}`, { isDisplay: !newsToToggle.isDisplay });
      setShowModal(false);
      fetchNews();
      toast.success(`News ${newsToToggle.isDisplay ? 'hidden' : 'unhidden'} successfully`);
    } catch (error) {
      console.error('Error toggling news visibility:', error);
      toast.error('Failed to toggle news visibility');
    }
  };

  return (
    <TemplateAdmin>
      <Container fluid>
        <ToastContainer />
        <Col sm={11}>
          <Row className="mt-4">
            <Col>
              <h2>Manage News - Dormitory Administration</h2>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formNewsTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Enter news title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                
                <Form.Group controlId="formNewsContent">
                  <Form.Label>Content</Form.Label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    config={{
                      ckfinder: {
                        uploadUrl: 'http://localhost:9999/upload-image'
                      }
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setContent(data);
                    }}
                  />
                </Form.Group>
                
                <Button variant="primary" type="submit">
                  {editingId ? 'Update' : 'Submit'}
                </Button>
              </Form>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {news.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>
                        <Button variant="primary" onClick={() => handleEdit(item)} className="mr-2">
                          <FaEdit /> Edit
                        </Button>
                        <Button 
                          variant={item.isDisplay ? "warning" : "success"} 
                          onClick={() => handleVisibilityToggleConfirmation(item)}
                        >
                          {item.isDisplay ? <FaEyeSlash /> : <FaEye />} {item.isDisplay ? 'Hide' : 'Unhide'}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
        <Col sm={1}></Col>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Visibility Change</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to {newsToToggle?.isDisplay ? 'hide' : 'unhide'} this news item?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleVisibilityToggle}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </TemplateAdmin>
  );
};

export default ManageNewsAdmin;