import React,{ useEffect, useRef } from 'react'
import {Col,Row,Container,Button} from 'reactstrap'
import { TweenMax, Power3 } from "gsap";
import {Link} from 'react-router-dom'
const PaymentSuccess = () => {
    let genreRef = useRef([]);

    useEffect(() => {
        TweenMax.from(genreRef.current, {
          opacity: 0,
          scale: 0,
          stagger: 0.1,
          ease: Power3.easeOut,
          delay: 1,
        });
      }, []);
  return (
   <Container>
    <Row>
        <Col lg='12' className='my-5 py-5'>
        <h3 className='title p-5 text-light' ref={(el) => (genreRef.current[1] = el)}><i className="fa-regular fa-circle-check text-success"></i> Payment Success!</h3>
        <h6 className='order-page p-5 text-success' ref={(el) => (genreRef.current[2] = el)}>Your drinks have been successfully ordered. You will receive your drinks within the mentioned time period from our delivery partner as mentioned.</h6>
       <Link to='/drinks' ref={(el) => (genreRef.current[4] = el)}><Button  className='mt-3' outline color='success'>order more</Button></Link> 
       <Link to='/' ref={(el) => (genreRef.current[3] = el)}><Button  className='mt-3 mx-3' outline color='success'>back home</Button></Link> 
        </Col>
    </Row>
   </Container>
  )
}

export default PaymentSuccess