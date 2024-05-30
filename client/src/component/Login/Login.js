import { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./login.css";
import axios from "axios";
import BackgroundImage from "../Login/background.jpg";
import { Link, useNavigate } from "react-router-dom"; // Sử dụng useNavigate thay vì useHistory

const Login = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Sử dụng useNavigate thay vì useHistory

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/login", {
        username: inputUsername,
        password: inputPassword,
      });
      if (response.status === 200) {
        const { message, token } = response.data;
        localStorage.setItem("token", token); // Lưu token vào localStorage
        localStorage.setItem("username", inputUsername); // Lưu username vào localStorage
        // Redirect người dùng đến các trang tương ứng
        if (inputUsername.startsWith("admin")) {
          navigate("/admin/dashboard");
        } else if (inputUsername.includes("bs")) {
          navigate("/doctor/profile");
        } else {
          navigate("/default"); // Nếu không phải admin hoặc bs, redirect đến trang mặc định
        }
      } else {
        setShow(true); // Show an error message for unsuccessful login
      }
    } catch (error) {
      console.error("API call error:", error);
      setShow(true); // Show an error message for API call failure
    }
    setLoading(false);
  };

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        {/* Header */}
        <div className="h4 mb-2 text-center">Login</div>
        {/* Alert */}
        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Wrong account or password
          </Alert>
        ) : (
          <div />
        )}
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={inputUsername}
            placeholder="Username"
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={inputPassword}
            placeholder="Password"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </Form.Group>
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Login
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Changing direction...
          </Button>
        )}
        <div className="text-center mt-3">
          Do not have an account?{" "}
          <Link to="/sign_up" className="text-primary">
            Register now
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
