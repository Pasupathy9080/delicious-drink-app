import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../../actions/orderActions";
import StepperNav from "../../components/StepperNav";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Row,
  Col,
} from "reactstrap";

const PlaceOrder = ({ history }) => {
  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  cart.shippingPrice = cart.itemsPrice > 50 ? 0.0 : 2.0;

  cart.totalPrice = Number(
    Number(cart.itemsPrice) + Number(cart.shippingPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);

  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
    }

  }, [history, success,order]);

  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div>
      <StepperNav stepNumber={3} />

<Container>
  <Row>
    <Col lg="8" className="order-page rounded-2 d-flex flex-column align-items-center justify-content-center">

      <div>
        <p>
          <strong>Shipping Address: </strong>
          {`${cart.shippingAddress.address}, ${cart.shippingAddress.city}, ${cart.shippingAddress.postalCode} ${cart.shippingAddress.country}`}
        </p>
        <p>
          <strong>Payment Method: </strong>
          {cart.paymentMethod}
        </p>
      </div>


      <div className="w-100">
        {cart.cartItems.map((item,idx) => (
          <div key={idx}>
            <div className="d-flex align-items-center justify-content-center gap-5">
              <img
                style={{ width: "120px" }}
                src={`https://chego-store-be.onrender.com${item.image}`}
                alt={item.name}
              />
              <p className="mt-4">{item.name}</p>
              <p className="mt-4">{`${item.qty} x $${item.price} = $${
                item.qty * item.price
              }`}</p>
            </div>
          </div>
        ))}
      </div>


      <div>
        {cart.cartItems.length === 0 ? (
          <Alert>Your Cart is Empty</Alert>
        ) : (
          <></>
        )}
      </div>



    </Col>
    <Col lg="4">
      <Card className="border-0">
        <CardHeader className="border-0">
          <h5 className="title px-2 py-3 text-center rounded-2 text-light">ORDER SUMMARY</h5>
        </CardHeader>
        <CardBody>
          <div className="d-flex justify-content-between mb-3">
            <span>Items:</span>
            <span>${cart.itemsPrice}</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span>Shipping:</span>
            <span><span className="bg-warning px-3 py-1 mx-2 rounded-2">fastest !</span>${cart.shippingPrice}</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span>Total:</span>
            <span>${cart.totalPrice}</span>
          </div>

          {error ? <Alert color="danger">{error}</Alert> : <></>}

          <Button
            className="order-page w-100 border-0 text-success fw-bold"
            onClick={handleSubmit}
            disabled={cart.cartItems.length === 0}
          >
            PLACE ORDER
          </Button>
        </CardBody>
      </Card>
    </Col>
  </Row>
</Container>

    </div>
  );
};

export default PlaceOrder;
