import React, { useState } from "react";
import { Tab, Nav, Row, Col,Card } from "react-bootstrap";
import Orders from "../component/order/Orders";
import Finance from "../component/Finance";
import Portfolio from "../component/manufacturer/Portfolio";

const AdminComponent = () => {

  const [activeTab, setActiveTab] = useState("orders");

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Card fluid className="h-100 d-flex flex-column">
      <Card.Body className="flex-grow-1">
        <Card.Title>Admin Dashboard</Card.Title>
    <Tab.Container
      id="manufacturer-tabs"
      activeKey={activeTab}
      onSelect={handleTabSelect}
      className="mb-3"
    >
      <Row>
        <Col>
          <Nav variant="tabs" >
            <Nav.Item>
              <Nav.Link eventKey="orders" >Orders</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="finance">Finance</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="portfolio">Portfolio</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
      <Row>
        <Col>
          <Tab.Content>
            <Tab.Pane eventKey="orders">
              <Orders />
            </Tab.Pane>
            <Tab.Pane eventKey="finance">
              <Finance />
            </Tab.Pane>
            <Tab.Pane eventKey="portfolio">
              <Portfolio />
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    </Card.Body>
  </Card>
  );
};

export default AdminComponent;