import logo from "./logo.svg";
import "./App.css";
import Header from "./component/Header";
import { Outlet } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginRedux } from './redux/userSlice'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const user = JSON.parse(storedUser)
       
        dispatch(loginRedux(user));
    }
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <div >
        <Header />
        <React.StrictMode warnAboutDeprecatedLifecycles={false}>
        <main
        className="root-container"
          style={{
            paddingTop: "4rem",
            backgroundColor: "#f8f9fa",
            minHeight: "calc(100vh)",
          }}
        >
          <Container >
            <Outlet />
          </Container>
        </main>
        </React.StrictMode>
      </div>
    </>
  );
}

export default App;
