import React from "react";
import { Container, Row, Col } from "reactstrap";
import { useSelector } from "react-redux";
import OrderList from "../pages/OrderList";
import UserList from "../pages/UserList";
import { FaTag } from "react-icons/fa";

const AdminHome = () => {
  // orders count
  const orderList = useSelector((state) => state.orderList);
  const { orders } = orderList;
  const totalOrders = orders?.length || 0;

  //users count
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const totalUsers = users?.length || 0;

  return (
    <>
      <Container className="mx-3">
        <Row className="gap-4">
          <Col
            lg="2"
            className="order-page text-success text-center py-5 mb-3 rounded-2"
          >
            <h5>
              No.of Users :{" "}
              <span className="text-warning bg-light px-2 rounded-5">
                {" "}
                {totalUsers}
              </span>
            </h5>
          </Col>
          <Col
            lg="3"
            className="order-page text-success  text-center py-5 mb-3  rounded-2"
          >
            <h5>
              No.of Orders :{" "}
              <span className="text-warning bg-light px-2 rounded-5">
                {totalOrders}
              </span>
            </h5>
          </Col>
          <Col
            lg="3"
            className="order-page text-success  text-center py-5 mb-3 rounded-2"
          >
            <h5>
              Collabration Brands:{" "}
              <span className="text-warning bg-light px-2 py-1 rounded-5">
                23
              </span>
            </h5>
          </Col>
          <Col
            lg="3"
            className="order-page text-success text-center py-5 mb-3 rounded-2"
          >
            <h5>
              Variety of Drinks:{" "}
              <span className="text-warning bg-light px-2 py-1 rounded-5">
                34
              </span>
            </h5>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col lg="8" className="my-2">
            <OrderList />
            <br />
            <UserList />
          </Col>
          <Col lg="4" className="order-page rounded-2 px-5 py-5 my-2">
            <h5 className="text-center fw-bold bg-light text-success p-2 rounded-2">
              New offers
            </h5>
            <h6 className="mt-3 text-start text-light  bg-success p-3 rounded-2">
              <FaTag />
              <span>
                "Summer may be ending, but the savings are just heating up. Shop
                our end-of-season sale and get up to 50% off all remaining
                summer items."
              </span>
            </h6>
            <h6 className="mt-3 text-success bg-light p-3 rounded-2">
              <FaTag />
              <span>
                "The early bird gets the worm, and our breakfast specials. Join
                us for breakfast before 8am and enjoy 10% off your order!"
              </span>
            </h6>
           
            <h6 className="mt-3 text-start text-light bg-success p-3 rounded-2">
              <FaTag />
              <span>
                "Treat yourself to a little luxury with our spa package deal.
                Book any 60-minute massage and receive a complimentary facial
                treatment valued at $50. Relax and rejuvenate with us today!"
              </span>
            </h6>
            <h6 className="mt-3 text-success bg-light p-3 rounded-2">
              <FaTag />
              <span>
                "The early bird gets the worm, and our breakfast specials. Join
                us for breakfast before 8am and enjoy 10% off your order!"
              </span>
            </h6>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminHome;
