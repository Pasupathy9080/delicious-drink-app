import React, { useState} from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.currentUser.userInfo);

  const handleLogout = () => {
    dispatch(logout());
  };
  //toggle menu
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

// useEffect hook to listen for changes in cartItems array
//  const storedItems = JSON.parse(localStorage.getItem('cartItems'));

  return (
    <Navbar  className="header" expand="md">
      <NavbarBrand className="text-success mx-5 fw-bold" href="/">cheGo</NavbarBrand>
      <NavbarToggler onClick={toggle}>
        <i className="fa-solid fa-burger"></i>
      </NavbarToggler>
      <Collapse isOpen={isOpen} navbar>
        <Nav className="d-flex justify-content-end w-100 mx-5 flex-wrap my-3" navbar>
          <NavItem>
            <Link className="text-success mx-3 py-3" to='/'>Home</Link>
          </NavItem>
          <NavItem>
            <Link className="text-success mx-3 py-3" to='/drinks'>Drinks</Link>
          </NavItem>
          {!userInfo ? (
            <>
              <NavItem>
                <Link className="text-success mx-2" to="/register?redirect=/">register</Link>
              </NavItem>
              <NavItem>
                <Link className="text-success mx-2" to="/login">login</Link>
              </NavItem>
            </>
          ) : (
            <></>
          )}
          <UncontrolledDropdown nav inNavbar>
            <>
              {userInfo ? (
                <>
                  <DropdownToggle nav caret className="text-success pt-0">
                    {userInfo.name}
                  </DropdownToggle>
                </>
              ) : (
                <></>
              )}

              <DropdownMenu>
                <DropdownItem className="mb-1">
                  <Link to="/profile" className="text-success">Profile</Link>
                </DropdownItem>
                {userInfo && userInfo.isAdmin && (
                  <>
                  <DropdownItem className="mb-1">
                    <Link to='/dashboard' className="text-success">Dashboard</Link>
                  </DropdownItem>
                    {/* <DropdownItem>
                      <Link to="/admin/userlist">Users</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/admin/productlist/page/1">Products</Link>
                    </DropdownItem>
                    <DropdownItem>
                      <Link to="/admin/orderlist">Orders</Link>
                    </DropdownItem> */}
                  </>
                )}
                <DropdownItem onClick={handleLogout} className="text-danger">Logout</DropdownItem>
              </DropdownMenu>
            </>
          </UncontrolledDropdown>
          <Link to="/cart" className="mx-3">
          <i className="fa-solid fa-cart-shopping text-warning"></i>
           
            {/* {storedItems ? (
               <sup className="rounded-5"><Badge color="warning" id="cart-count" className="ml-1 rounded-5">{storedItems.length}</Badge></sup>
            ) : (
              <></>
            )} */}
         
          </Link>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
