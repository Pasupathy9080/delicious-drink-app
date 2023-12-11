import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Alert,
  Spinner,
  Row,
  Col,
  Label,
  Input,
  Button,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails, updateUserProfile } from "../../actions/userActions";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { getMyOrders } from "../../actions/orderActions";

const ProfilePage = ({ history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const currentUser = useSelector((state) => state.currentUser);
  const { userInfo } = currentUser;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);

  const { success } = userUpdateProfile;

  const myOrders = useSelector((state) => state.myOrders);

  const { loading: ordersLoading, orders, error: ordersError } = myOrders;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.hasOwnProperty("name")) {
        dispatch(getUserDetails("profile"));
        dispatch(getMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
        document.title = user.name;
      }
    }
  }, [history, userInfo, user, dispatch]);
  return (
    <div>
      <Container>
        <Row>
          <Col lg="4" className="my-5">
            <h4 className="title text-light p-2 text-center rounded-2">
              Profile
            </h4>

            {message && <Alert color="danger">{message}</Alert>}
            {success && <Alert color="success">{"Profile Updated"}</Alert>}
            {error && <Alert color="danger">{error}</Alert>}
            {loading && <Alert color="success">{"Updating..."}</Alert>}
            <form onSubmit={submitHandler}>
              <Label for="name">Name</Label>
              <Input
                required
                margin="dense"
                
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-3"
              />
              <Label for="exampleEmail">Email</Label>
              <Input
                required
                margin="dense"
                type="email"
                
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-3"
              />
              <Label for="password">password</Label>
              <Input
                type="password"
                required
                margin="dense"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-3"
              />
              <Label for="ConfirmPassword">Confirm Password </Label>
              <Input
                type="password"
                required
                margin="dense"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mb-3"
              />
              <Button type="submit" color="success" className="border-0 order-page text-success w-100">
                Update Profile
              </Button>
            </form>
          </Col>

          <Col lg="8" className="mt-5">
            <h4 className="title text-light p-2 text-center rounded-2 mb-3">Your Orders</h4>
            {ordersLoading ? (
              <Spinner className="m-5" color="success">Loading...</Spinner>
            ) : ordersError ? (
              <Alert color="danger">{error}</Alert>
            ) : orders.length === 0 ? (
              <Alert color="danger">You have no orders</Alert>
            ) : (
              <>
                <Table responsive hover>
                  <thead>
                    <tr className="table-warning">
                      <th className="text-center">ID</th>
                      <th className="text-center">Date</th>
                      <th className="text-center">Total</th>
                      <th className="text-center">Items</th>
                      <th className="text-center">Paid</th>
                      <th className="text-center">Delivered</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order._id}                    
                        className="table-success"
                      >
                        <td className="text-center">{order._id}</td>
                        <td className="text-center">
                          {order.createdAt.slice(0, 10)}
                        </td>
                        <td className="text-center">${order.totalPrice}</td>
                        <td className="text-center">
                          {order.orderItems.reduce(
                            (total, item) => total + item.qty,
                            0
                          )}
                        </td>
                        <td>
                          {" "}
                          <p className="text-success text-center">
                            <FaCheckCircle />
                          </p>
                        </td>
                        <td className="text-center">
                          {order.isDelivered ? (
                            <p style={{ color: `green` }}>
                              {order.deliveredAt.slice(0, 10)}
                            </p>
                          ) : (
                            <FaTimesCircle />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfilePage;
