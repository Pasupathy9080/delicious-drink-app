import React, { useState } from 'react';
import { Row, Col, Nav, NavItem, NavLink } from 'reactstrap';
import { FaHome, FaBox, FaUsers, FaShoppingCart } from 'react-icons/fa';
import UserList from './UserList';
import OrderList from './OrderList';
import { Link } from 'react-router-dom';
import AdminHome from '../components/AdminHome';
import OtherProducts from '../components/OtherProducts/OtherProducts';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  
  return (
    <>
      <div>
        <Row>
          <Col xs="2" sm="3" md="2" lg="2" className="sidebar pt-3">
            <Nav vertical>
              <NavItem className="m-2">
                <NavLink className={activeTab === 'home' ? 'active bg-white text-dark rounded-2 ' : 'text-warning'} onClick={() => { toggle('home'); }}>
                  <FaHome /> <span className='responsive'>Home</span>
                </NavLink>
              </NavItem>
              <NavItem className="m-2">
                <NavLink className={activeTab === 'orders' ? 'active bg-white text-dark rounded-2 ' : 'text-warning'} onClick={() => { toggle('orders'); }}>
                  <FaShoppingCart /> <span className='responsive'>Orders</span>
                </NavLink>
              </NavItem>
              <NavItem className="m-2">
                <NavLink className={activeTab === 'products' ? 'active bg-white text-dark rounded-2 ' : 'text-warning'} onClick={() => { toggle('products'); }}>
                  <FaBox /> <span className='responsive'>Products</span>
                </NavLink>
              </NavItem>
              <NavItem className="m-2">
                <NavLink className={activeTab === 'users' ? 'active bg-white text-dark rounded-2 ' : 'text-warning'} onClick={() => { toggle('users'); }}>
                  <FaUsers /> <span className='responsive'>Users</span>
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col xs="10" sm="9" md="10" lg="10" className="main-content my-4 px-4">
            {activeTab === 'home' && (
              <div>
                <AdminHome />
              </div>
            )}
            {activeTab === 'orders' && (
              <div>
                <OrderList />
              </div>
            )}
            {activeTab === 'products' && (
              <>
                <div className="d-flex align-items-center order-page justify-content-center  mb-4 gap-4 py-4 rounded-3">
                  <h2 className="m-0 p-0 text-success fw-bold">Products</h2>
                  <Link to="/admin/productlist/page/:page" className="bg-success text-white px-3 py-2 rounded-2">
                    + Product Actions
                  </Link>
                </div>
               <OtherProducts/>
              </>
            )}
            {activeTab === 'users' && (
              <div>
                <UserList />
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
