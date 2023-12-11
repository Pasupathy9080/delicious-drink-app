import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteUser, getUserList } from '../../actions/userActions';
import { Container, Table, Alert,Row,Col,Spinner } from 'reactstrap';
import { RiDeleteBinLine, RiCheckLine, RiCloseLine } from 'react-icons/ri';



const UserList = ({history}) => {

    const currentUser = useSelector( state => state.currentUser);
    const { userInfo } = currentUser;

    const userList = useSelector( state => state.userList);
    const { users, loading, error } = userList;

    const dispatch = useDispatch();

    const deleteHandler = (id) => {
        if(window.confirm('Reconfirm to remove')){
            dispatch(deleteUser(id));
            dispatch(getUserList())
        }
        
    }

    useEffect(() => {
        
        if(userInfo && userInfo.isAdmin){
            dispatch(getUserList())
        }else{
            history.push('/login')
        }
        
    }, [dispatch, history, userInfo])

    return (
        <div className='order-page p-5 rounded-2'>
          
            <Container>
            {
            loading ?  <Container>
            <Row>
              <Col lg='12' className="d-flex align-items-center justify-content-center">
              <Spinner className="text-success text-center mt-5">Loading...</Spinner>
              </Col>
            </Row>
          
          </Container>: error ? <Alert severity='error'>{error}</Alert> : (
                <>
               
               <h4 className='text-white rounded-1 px-3 bg-success p-2 fw-bold text-center'>Users</h4>

            <Table responsive hover>
              <thead>
                <tr className='table-warning'>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Admin</th>
                  <th></th>           
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr
                    key={user._id}
                    onClick={() => {
                      history.push(`/order/${user._id}`);
                    }}
                    className='table-success'
                  >
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className='text-center'>{user.isAdmin ? <RiCheckLine style={{color:`green`}} /> : <RiCloseLine style={{color:'red'}}/> }</td>
                    <td><RiDeleteBinLine onClick={()=> deleteHandler(user._id)}/></td>
                  </tr>             
                ))}
              </tbody>
            </Table>                  
                </>
            )
            }
            </Container>
        </div>
    )
}

export default UserList
