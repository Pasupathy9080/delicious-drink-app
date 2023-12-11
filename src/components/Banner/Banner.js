import React, { useEffect, useRef } from 'react'
import {Row,Col,Button} from 'reactstrap'
import BannerImg from '../../assets/banner-1.png'
import { Link } from "react-router-dom";
import { TweenMax, Power3 } from "gsap";
const Banner = () => {
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
   <div>
    <Row className='m-0'>
    <Col lg='6' className='title'>
       <img src={BannerImg} ref={(el) => (genreRef.current[3] = el)} alt="Loading" className='bannerImg' />
      </Col>
      <Col lg='6' className='d-flex title justify-content-center flex-column flex-wrap p-0 pb-4'>
    
        {/* <h5 className='banner-text-2 bg-success  p-3 text-light rounded-5'><span className='text order-page rounded-5 px-3 py-1'><i className="fa-solid fa-motorcycle"></i></span> fastest delivery partner</h5> */}
        <div className="banner-text-container">
      <h5 ref={(el) => (genreRef.current[2] = el)} className="banner-text-2 bg-success p-3 text-light rounded-5">
        <span className="text order-page rounded-5 px-3 py-1">
        <i className="fa-solid fa-motorcycle fa-flip-horizontal"></i>
        </span>
        <span className="typing-text">
          <span className="typed-text">&nbsp;fastest delivery partner</span>
          <span className="cursor"></span>
        </span>
      </h5>
    </div>
       
        <div ref={(el) => (genreRef.current[1] = el)} className='order-page p-5 banner-text mb-2 mt-1'>
        <h3 className='fw-bold text'>Welcome to che<span className='text-success rounded-2 py-0'>Go</span> store</h3>
        <h5>Quench Your Thirst, Elevate Your Taste.</h5>
        <Button className='bg-success text-light px-5 mt-2' color='success' outline>
         <Link to='/drinks' className='text-light'>Explore <i className="fa-solid fa-arrow-right-long"></i></Link></Button>             
        </div> 
      
      {/* <h6 className='mt-3 banner-text-3'><span className='bg-success w-50 p-3 text-light rounded-5'><i className="fa-solid fa-mug-hot text order-page rounded-5 fs-5 px-4 py-2"></i> Heat or cool, we never lose</span></h6> */}
      <div ref={(el) => (genreRef.current[4] = el)} className="banner-text-container">
      <h6 className="mt-3 banner-text-3">
        <span className="bg-success w-50 p-3 text-light rounded-5 relative">
          <i className="fa-solid fa-mug-hot text order-page rounded-5 fs-5 px-4 py-2"></i>
          &nbsp; Heat or cool, we never lose
          <span className="vapor-effect"></span>
        </span>
      </h6>
    </div>
      
      </Col>
      
    </Row>
   </div>
  )
}

export default Banner;