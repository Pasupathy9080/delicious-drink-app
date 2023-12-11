import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../actions/cartActions';
import { Button, Card, CardBody, CardHeader, Container, Col, Row } from 'reactstrap';
import { Alert } from 'reactstrap';
import CartItems from '../../components/CartItems';


const CartPage = ({ match, location, history }) => {

  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const checkoutHandler = () => {
    console.log('checkout');
    history.push('/login?redirect=shipping');
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <div className='cart-page'>
     
      <Container>
        <Row>
          <Col xs='12' sm='8' lg='8'>
            <h2 className='title py-3 mt-5 text-center text-light rounded-2'>SHOPPING CART</h2>
            {cartItems.length === 0 ? (
              <Alert color='warning'>{'Shopping cart is empty'}</Alert>
            ) : (
              <CartItems items={cartItems} />
            )}
          </Col>
          <Col xs='12' sm='4' md='3' lg='4' className='mt-5'>
            <Card className='border-0'>
              <CardHeader className='text-center order-page'>
                <h3 className='fw-bold text-success pb-0'>TOTAL</h3>
              </CardHeader>
              <CardBody className='border-0'>
                <h5>Total Items : {cartItems.reduce((acc, item) => acc + item.qty, 0)}</h5>
                <h5>Total Amount : ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</h5>
                <hr />

                <Button
                  onClick={checkoutHandler}
                  className='title'
                  disabled={cartItems.length === 0}
                  block
                >
                  Proceed To Checkout
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartPage;
