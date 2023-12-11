import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Table, Alert ,Col,Row,Spinner} from 'reactstrap';
import { getOrders } from '../../actions/orderActions';
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";


const OrderList = ({ history }) => {

  const currentUser = useSelector(state => state.currentUser);
  const { userInfo } = currentUser;

  const orderList = useSelector(state => state.orderList);
  const { orders, loading, error } = orderList;


  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }
    dispatch(getOrders());
  }, [dispatch, history, userInfo]);



  return (
    <div className='order-page p-5 rounded-2'>
      <Container>
        {loading ? (
          <Container>
          <Row>
            <Col lg='12' className="d-flex align-items-center justify-content-center">
            <Spinner className="text-success text-center mt-5">Loading...</Spinner>
            </Col>
          </Row>
        
        </Container>
        ) : error ? (
          <Alert color='danger'>{error}</Alert>
        ) : (
          <>
         <h4 className='text-success rounded-1 px-3 bg-light p-2 fw-bold text-center'>Orders</h4>
            
            <Table responsive hover>
              <thead>
                <tr className='table-warning'>
                  <th className='text-center'>ID</th>
                  <th className='text-center'>User</th>
                  <th className='text-center'>Date</th>
                  <th className='text-center'>Total</th>
                  <th className='text-center'>Paid</th>
                  <th className='text-center'>Delivered</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr
                    key={order._id}
                    onClick={() => {
                      history.push(`/order/${order._id}`);
                    }}
                    className='table-success'
                  >
                    <td className='text-center'>{order._id}</td>
                    <td className='text-center'>{order.user.name}</td>
                    <td className='text-center'>{order.createdAt.slice(0, 10)}</td>
                    <td className='text-center'>${order.totalPrice}</td>
                    <td className='text-center'>
                      {order.isPaid ? (
                        order.paidAt.slice(0, 10)
                      ) : (
                        <FaCheckCircle className='text-success' />
                      )}
                    </td>
                    <td className='text-center'>
                      {order.isDelivered ? (
                        order.deliveredAt.slice(0, 10)
                      ) : (
                        <FaTimesCircle />
                      )}
                    </td>
                  </tr>             
                ))}
              </tbody>
            </Table>
            <h5 className='fw-bold bg-light text-success rounded-2 w-100 text-center p-2 py-3'>Pending Income: <span className='text-warning px-3 rounded-1'>${orders.reduce((acc, order) => acc + order.totalPrice, 0)}</span></h5>
          </>
        )}
      </Container>
    </div>
  );
};

export default OrderList;
