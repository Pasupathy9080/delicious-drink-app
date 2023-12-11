import { Button, Alert, Container, Row, Col, Input} from "reactstrap";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../actions/userActions";
import 'react-toastify/dist/ReactToastify.min.css';



const LoginPage = ({ location, history }) => {
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.currentUser);
  const { loading, error, userInfo } = currentUser;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  return (
    <div className="order-page">
      
      <Container className="d-flex align-items-center justify-content-center flex-wrap pb-5" style={{height:"90vh"}}>
        <Row>
          <Col lg='12'>
            <h5 className="title p-2 w-100 rounded-2 text-center text-light">SIGN IN</h5>
            {error && <Alert severity="error">{error}</Alert>}
            {loading && <Alert color='success'>Login success!</Alert>}
            <form onSubmit={submitHandler}>
                <label htmlFor="email" className="my-2">Email</label>
              <Input
                required
                type="email"            
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
                <label htmlFor="password" className="my-2">password</label>

              <Input
                required
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button className="title text-light rounded-2 border-0 w-100 my-4" type="submit">
                Submit
              </Button>
            </form>
            <p>
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/redirect"}
                style={{ textDecoration: "none" }}
                className="text-success"
              >
                Register Here
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
