import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1>About Us</h1>
          <p>
            <strong>
              Welcome to our platform, where we're bridging the gap between the
              burgeoning world of 3D printing and its real-world applications.
            </strong>
          </p>
          <p>
            <strong>
              At the heart of our project is the recognition of two fundamental
              issues within the 3D printing sector. Firstly, many individuals
              purchase 3D printers as a hobby, only to find them gathering dust
              once the initial excitement fades. Secondly, there exists a
              growing community of designers and small businesses navigating the
              challenges of online store management and 3D printed design.
              Despite their creative talent, these individuals often face
              limitations in fulfilling client needs due to the constraints of
              their printing capabilities.
            </strong>
          </p>
          <p>
            <strong>
              Our mission is clear: to address these challenges head-on by
              providing a web-based platform that empowers both hobbyists and
              professionals alike. Through innovative solutions and user-centric
              design, we aim to unlock the full potential of 3D printing, making
              it more accessible, practical, and impactful in various
              industries.
            </strong>
          </p>
          <p>
            <strong>
              Join us on this journey as we revolutionize the 3D printing
              landscape, turning obstacles into opportunities and redefining the
              way we approach digital design and manufacturing.
            </strong>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
