import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Contact = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1>Contact Us</h1>
          <p>Have questions or feedback? Reach out to us using the form below:</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Your Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={5} placeholder="Enter your message" />
            </Form.Group>
            <Button variant="dark" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h3>Contact Information</h3>
          <p>Email: info@nozzlealchemy.com</p>
          <p>Phone: +1234567890</p>
          <p>Address: 123 Main St, London, UK</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;