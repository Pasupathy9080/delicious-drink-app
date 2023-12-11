import React, { useState } from 'react';
import { Button, Container, FormGroup, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../../actions/cartActions';
import StepperNav from '../../components/StepperNav';



const PaymentPage = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('Stripe');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <div className='shipping-page'>
    
      <Container >
        <StepperNav stepNumber={2} />
        <Container className='w-25 mt-5'>
          <h6 className='title p-3 mb-3 text-light rounded-2 text-center'>PAYMENT METHOD</h6>
          <form onSubmit={submitHandler}>
            <FormGroup>
              <label htmlFor="Choose payment"></label>
              <Input
              
                type='select'
                name='paymentMethod'
                id='paymentMethod'
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value='Stripe'>Stripe Payment</option>
              </Input>
            </FormGroup>
            <Button className='order-page text-success fw-bold border-0 w-100' type='submit'>
              Continue
            </Button>
          </form>
        </Container>
      </Container>
    </div>
  );
};

export default PaymentPage;
