import React, { useEffect, useState } from "react";
import {
  Alert,
  Row,
  Col,
  Card,
  CardBody,
  Spinner,
  Container,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../actions/orderActions";
import types from "../../actions/types";
import { clearCart } from "../../actions/cartActions";
import StripeCheckout from "react-stripe-checkout";


const Order = ({ match, history }) => {
  const orderId = match.params.id;

  const currentUser = useSelector((state) => state.currentUser);
  const { userInfo } = currentUser;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay } = orderPay;

  const dispatch = useDispatch();

  const [paid, setPaid] = useState(false);

  const handleToken = () => {
    setPaid(true);
  };

  if(paid){
    history.push('/paymentsuccess')
    localStorage.removeItem('cartItems');
  };

  useEffect(() => {
    if (!userInfo || !userInfo.name) {
      history.push("/login");
    }
    dispatch({ type: types.ORDER_CREATE_RESET });

    if (!order || order._id !== orderId || successPay) {
      dispatch({ type: types.ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
      dispatch(clearCart());
    }
  }, [history, userInfo, order, orderId, successPay, dispatch]);

  return (
    <div className="mb-5">
      <Container className="text-center mt-5">
        {loading ? (
          <Spinner color="success">Loading...</Spinner>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <>
            <Container>
              <Row>
                <Col lg="8" className="">
                  <h6 className="title text-light p-2 py-3 rounded-2">{`ORDER NO. ${order._id}`}</h6>

                  <div className="p-3 mt-3 rounded-2 d-flex flex-column align-items-center justify-content-center flex-wrap order-page">
                    <h6 className="title text-light w-100 p-3 rounded-2">
                      Order Items
                    </h6>
                    {order.orderItems.length === 0 ? (
                      <Alert>No Items to Display</Alert>
                    ) : (
                      order.orderItems.map((item) => (
                        <div key={item._id} className="w-100">
                          <div className=" d-flex align-items-center justify-content-around mt-2">
                            <img
                              style={{ width: "50px" }}
                              src={`https://chego-store-be.onrender.com${item.image}`}
                              alt={item.name}
                            />
                            <p>{item.name}</p>
                            <p>{`${item.qty} x $${item.price} = $${
                              item.qty * item.price
                            }`}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-3 rounded-2 d-flex flex-column align-items-center justify-content-center flex-wrap order-page">
                    <p>
                      <strong>Name: </strong>
                      {`${order.user.name}`}
                    </p>
                    <p>
                      <strong>Email: </strong>
                      {`${order.user.email}`}
                    </p>
                    <p>
                      <strong>Address: </strong>
                      {`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode} ${order.shippingAddress.country}`}
                    </p>
                    <p className="w-50">
                      {order.isDelivered ? (
                        <Alert color="success">
                          Delivered on {order.deliveredAt}
                        </Alert>
                      ) : (
                        <Alert color="danger">Not Delivered Yet</Alert>
                      )}
                    </p>
                  </div>

                  <div className="p-3 mt-3 rounded-2 d-flex flex-column align-items-center justify-content-center flex-wrap order-page">
                    <p>
                      <strong>Payment Method: </strong>
                      {order.paymentMethod}
                    </p>
                    <p className="w-50">
                      {paid ? (
                        <Alert color="success">
                          Paid Successfully
                        </Alert>
                      ) : (
                        <Alert color="danger">Not Paid</Alert>
                      )}
                    </p>
                  </div>
                </Col>

                <Col lg="4">
                  <div>
                    <Card>
                      <CardBody>
                        <h5 className="title p-2 rounded-2 text-white">
                          ORDER SUMMARY
                        </h5>

                        <div className="d-flex justify-content-between mb-3">
                          <span>Items:</span>
                          <strong>
                            $
                            {order.orderItems
                              .reduce(
                                (acc, item) => acc + item.price * item.qty,
                                0
                              )
                              .toFixed(2)}
                          </strong>
                        </div>

                        <div className="d-flex justify-content-between mb-3">
                          <span>Shipping:</span>{" "}
                          <strong>${order.shippingPrice}</strong>
                        </div>

                        <div className="d-flex justify-content-between mb-3">
                          <span>Total:</span>
                          <strong>${order.totalPrice}</strong>
                        </div>
                      </CardBody>

                      {paid ? (
                        <div className="text-success order-page p-2">
                          Payment success!
                        </div>
                      ) : (
                        <StripeCheckout
                          token={handleToken}
                          stripeKey="pk_test_51MY3rESD5CXFUEJk5gBRbiZ7GsWtobaCZ54YWqqbqkOCHQUpgnkPMdhkYOJaaiGcb6N3kv8pucSVuF2L5aJXXoMb00b68E5ClN"
                          amount={order.totalPrice * 100}
                          currency="USD"
                          email={userInfo.email}
                        />
                      )}
                    </Card>
                  </div>
                </Col>
              </Row>
            </Container>
          </>
        )}
      </Container>
    </div>
  );
};

export default Order;
