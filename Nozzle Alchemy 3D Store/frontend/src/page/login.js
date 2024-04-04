import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";
import { Container, Form, Button } from "react-bootstrap";
import bcrypt from "bcryptjs";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const userData = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/users/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email: data.email, password: data.password }),
        }
      );

      const dataRes = await fetchData.json();

      if (dataRes.error) toast(dataRes.error);
      else toast(dataRes.message);

      if (dataRes && dataRes.user) {
        localStorage.setItem("user", JSON.stringify(dataRes.user));
        dispatch(loginRedux(dataRes.user));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } else {
      alert("Please Enter required fields");
    }
  };

  return (
    <Container className="p-5 md:p-5" style={{ maxHeight: "100px" }}>
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        <Form className="w-full py-3" onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={data.email}
              onChange={handleOnChange}
              className="mt-1 mb-2 w-full bg-light px-2 py-1 rounded"
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <div className="flex px-2 py-1 bg-light rounded mt-1 mb-2">
              <Form.Control
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleOnChange}
                className="w-full border-0"
              />
              <span
                className="flex text-xl cursor-pointer"
                onClick={handleShowPassword}
              >
                {showPassword ? <BiShow /> : <BiHide />}
              </span>
            </div>
          </Form.Group>

          <Button
            variant="dark"
            type="submit"
            className="w-full max-w-[150px] m-auto"
          >
            Login
          </Button>
        </Form>

        <p className="text-left text-sm mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-500 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default Login;
