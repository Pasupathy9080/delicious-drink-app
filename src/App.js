import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header/';
import Product from './pages/Product'
import HomePage from './pages/Home';
import CartPage from './pages/Cart';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ProfilePage from './pages/Profile';
import ShippingPage from './pages/Shipping';
import PaymentPage from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';
import UserList from './pages/UserList';
import ProductList from './pages/ProductList';
import ProductEdit from './pages/ProductEdit';
import OrderList from './pages/OrderList';
import GenrePage from './pages/Genre'
import SearchPage from './pages/Search';
import Dashboard from './pages/Dashboard';
import Drinks from './pages/Drinks/Drinks'
import 'bootstrap/dist/css/bootstrap.min.css';
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess';


const App = () => {


  return (
    <Router>
      <div className="App">
     
        <Header />
          <main>
              <Route path='/' exact component={HomePage} />
              <Route path='/drinks' exact component={Drinks} />
              <Route path='/page/:page' exact component={HomePage} />
              <Route path='/product/:id' exact component={Product} />
              <Route path='/genre/:genre' component={GenrePage} />
              <Route path='/cart/:id?' component={CartPage} />
              <Route path='/paymentsuccess' exact component={PaymentSuccess} />
              <Route path='/login' component={LoginPage} />
              <Route path='/register' component={RegisterPage} />
              <Route path='/profile' component={ProfilePage} />
              <Route path='/shipping' component={ShippingPage} />
              <Route path='/payment' component={PaymentPage} />
              <Route path='/placeorder' component={PlaceOrder} />
              <Route path='/order/:id' component={Order} />
              <Route path='/admin/userlist' component={UserList} />
              <Route path='/admin/productlist/page/:page' component={ProductList} />
              <Route path='/admin/product/:id/edit' component={ProductEdit} />
              <Route path='/admin/orderlist' component={OrderList} />
              <Route path='/search/:keyword' component={SearchPage} />
              <Route path='/dashboard' component={Dashboard} />
          </main>
      </div>
    </Router>
    
  );
}

export default App;
