import { Button, Alert, Container, Row, Col, Input } from "reactstrap";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { registerUser } from "../../actions/userActions";

const RegisterPage = ({ location, history }) => {
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();

  const registeredUser = useSelector((state) => state.registeredUser);

  const { loading, error, userInfo } = registeredUser;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(registerUser(name, email, password));
    }
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  return (
    <div className="order-page">
      <Container
        className="d-flex align-items-center justify-content-center flex-wrap pb-5"
        style={{ height: "90vh" }}
      >
        <Row>
          <Col>
            <h5 className="title p-2 w-100 rounded-2 text-center text-light">
              New User
            </h5>

            {message && <Alert color="danger">{message}</Alert>}
            {error && <Alert color="danger">{error}</Alert>}
            {loading && <Alert color="success">{error}</Alert>}
            <form onSubmit={submitHandler}>
              <label htmlFor="name" className="my-2">
                Name
              </label>

              <Input
                required
                id="standard-required"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="email" className="my-2">
                Email
              </label>

              <Input
                required
                id="standard-required"
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password" className="my-2">
                password
              </label>

              <Input
                required
                id="standard-required"
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="confirm password" className="my-2">
                Confirm Password
              </label>

              <Input
                required
                id="standard-required"
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <Button
                className="title text-light rounded-2 border-0 w-100 my-4"
                type="submit"
              >
                Sign Up
              </Button>
            </form>

            <p>
              Already have an account?{" "}
              <Link
                to={redirect ? `/login?redirect=${redirect}` : "/login"}
                style={{ textDecoration: "none" }}
                className="text-success"
              >
                Login Here
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterPage;
