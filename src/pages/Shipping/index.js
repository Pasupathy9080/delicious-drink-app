import React, { useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../actions/cartActions';
import StepperNav from '../../components/StepperNav';

const ShippingPage = ({ history }) => {

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        history.push('/payment')
    }

    return (
        <div className='shipping-page mb-5'>
            <StepperNav stepNumber={1} />
           
            <Container className='d-flex align-items-center justify-content-center flex-wrap'>
                
                <Form onSubmit={submitHandler}>
                    <h5 className='text-center mb-4 title p-2 rounded-2 text-light'>SHIPPING</h5>
                    <FormGroup >
                        <Label for='address'>Address</Label>
                        <Input type='text' id='address' placeholder='Enter Address' required value={address} onChange={(e) => setAddress(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='city'>City</Label>
                        <Input type='text' id='city' placeholder='Enter City' required value={city} onChange={(e) => setCity(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='postalCode'>Postal Code</Label>
                        <Input type='text' id='postalCode' placeholder='Enter Postal Code' required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for='country'>Country</Label>
                        <Input type='text' id='country' placeholder='Enter Country' required value={country} onChange={(e) => setCountry(e.target.value)} />
                    </FormGroup>
                    <Button className='bg-success border-0 w-100' type='submit'>Continue</Button>
                </Form>
            </Container>
        </div>
    )
}

export default ShippingPage;
