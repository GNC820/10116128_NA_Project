import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import { Navbar, Nav, Container,Button  } from 'react-bootstrap';
import logo from '../assets/logo.png'

const Header = () => {

  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(logoutRedux());
    toast("User logged out");
  };


  return (
    <Navbar bg="dark" variant="dark" expand="lg">
    <Navbar.Brand href="/home">
        <img
          src={logo}
          alt="Logo"
          style={{ maxHeight: '0%', maxWidth: '9%', marginRight: '10px' }}
        />
       
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="ml-auto">
  
          <Nav.Link as={NavLink} to="/home"  className={(navData) => (navData.isActive ? "active-style" : 'none')}>Home</Nav.Link>
          <Nav.Link as={NavLink} to="/about" className={(navData) => (navData.isActive ? "active-style" : 'none')}>About</Nav.Link>
          <Nav.Link as={NavLink} to="/contact" className={(navData) => (navData.isActive ? "active-style" : 'none')}>Contact</Nav.Link>
          <Nav className="ml-auto">
            {userData && userData.id !== 0 ? (
              <>
              
              <Button variant="outline-light" onClick={handleLogout}> Logout</Button>
              
              </>
            ) : (
              <Nav.Link  variant="outline-light" as={NavLink} to="/login"> Login</Nav.Link>
            )}
          </Nav>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
