import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Container, Form, Button } from "react-bootstrap";
import bcrypt from "bcryptjs";

function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    accountType: "",
  });

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
    const { firstName, lastName, email, password, accountType } = data;
    if (firstName && lastName && email && password && accountType) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/users/register`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            ...data,
            password: bcrypt.hashSync(data.password, 10),
          }),
        }
      );

      const dataRes = await fetchData.json();
      
      if (dataRes.error)
        toast(dataRes.error);
     
      else
        toast(dataRes.message);
      if (dataRes && dataRes.user) {
        navigate("/login");
      }
    } else {
      alert("Please enter required fields");
    }
  };

  return (
    <Container className="p-5 md:p-5">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        <Form className="w-full py-3" onSubmit={handleSubmit}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={data.firstName}
              onChange={handleOnChange}
              className="mt-1 mb-2 w-full bg-light px-2 py-1 rounded"
            />
          </Form.Group>

          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={data.lastName}
              onChange={handleOnChange}
              className="mt-1 mb-2 w-full bg-light px-2 py-1 rounded"
            />
          </Form.Group>

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
          <Form.Group controlId="accountType">
            <Form.Label>Account Type</Form.Label>
            <Form.Control
            name ="accountType"
              as="select"
              value={data.accountType}
              onChange={handleOnChange}
            >
              <option value="">Select Account Type</option>
              <option value="Manufacturer">Manufacturer</option>
              <option value="Admin">Admin</option>
              <option value="Store">Store</option>
            </Form.Control>
          </Form.Group>

          <Button
            variant="dark"
            type="submit"
            className="w-full max-w-[150px] m-auto"
          >
            Sign up
          </Button>
        </Form>

        <p className="text-left text-sm mt-2">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 underline">
            Login
          </Link>
        </p>
      </div>
    </Container>
  );
}

export default Signup;
