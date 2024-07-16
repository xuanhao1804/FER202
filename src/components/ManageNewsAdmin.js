// News2.js
import TemplateAdmin from "../layout/LayoutAdmin";

import React from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

const ManageNewsAdmin = () => {
  // Functionality for managing news can be implemented here

  const buttonStyle = {
    backgroundColor: 'green',
    marginRight: '10px'
  };

  return (
    <TemplateAdmin>
    <Container fluid>
      <Col sm={11}>
      <Row className="mt-4">
        <Col>
          <h2>Manage News - Dormitory Administration</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          {/* Form to add or edit news */}
          <Form>
            <Form.Group controlId="formNewsTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter news title" />
            </Form.Group>

            <Form.Group controlId="formNewsContent">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter news content" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          {/* Table to display existing news */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Content</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Example row, replace with dynamic data */}
              <tr>
                <td>1</td>
                <td>News Title</td>
                <td>News Content</td>
                <td>
            <Button style={buttonStyle} size="sm">Edit</Button>
            <Button variant="danger" size="sm">Delete</Button>
          </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row></Col>
      <Col sm={1}></Col>
    </Container>
    </TemplateAdmin>
  );
};

export default ManageNewsAdmin;
