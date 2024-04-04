import React from "react";
import { useSelector } from "react-redux";
import Manufacturer from '../page/Manufacturer';
import Store from '../page/Store'
import Admin from '../page/Admin';
import { Container, Row, Col, Button } from 'react-bootstrap';
import logo from '../assets/logo2.svg'
const Home = () => {
 
  const userData = useSelector((state) => state.user);
  const handleLogin = () => {
    // Handle redirect to login page
    window.location.href = '/login';
    console.log('Redirecting to login page...');
  };
    let componentToRender;
    switch (userData.accountType) {
      case 'Manufacturer':
        componentToRender = <Manufacturer />;
        break;
      case 'Store':
        componentToRender = <Store />;
        break;
      case 'Admin':
        componentToRender = <Admin />;
        break;
      default:
        componentToRender =   <Container className="align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
        <Row>
          <Col md={12} className="text-center">
          <img src={logo} alt="Logo" className="img-fluid mb-3"   style={{ maxHeight: '100%', maxWidth: '70%'}}/>
            <h2 >Please log in to access all features.</h2>
            <Button onClick={handleLogin} variant="dark" className="d-block mx-auto">Login</Button>
          </Col>
        </Row>
      </Container>
    }
  
    return (
      <div>
        {componentToRender}
      </div>
    );
};

export default Home;
