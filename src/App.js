import React from 'react';
import './App.css';

import {Container, Row, Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Sweet from './components/Sweet/Sweet';
import SweetList from './components/Sweet/SweetList';
import Payment from './components/Payment/Payment';
import PaymentList from './components/Payment/PaymentList';
import Order from './components/Order/Order';
import OrderList from './components/Order/OrderList';
import Branch from './components/Branch/Branch';
import BranchList from './components/Branch/BranchList';
import Customer from './components/Customer/Customer';
import CustomerList from './components/Customer/CustomerList';
import Login from './components/User/Login';


import Footer from './components/Footer';




export default function App() {

  const heading = "Welcome to CG Cassendra";
  const quote = "You Are What You Eat , So Eat Something Sweet";
  const footer = "";

  return (
    <Router>
        <NavigationBar/>
        <Container>
            <Row>
                <Col lg={12} className={"margin-top"}>
                    <Switch>
                        <Route path="/" exact component={() => <Welcome heading={heading} quote={quote} footer={footer}/>}/>
                     
                        <Route path="/login" exact component={Login}/>
                        <Route path="/logout" exact component={Login}/>
                       
                       
                        <Route path="/addSweet" exact component={Sweet}/>
                        <Route path="/editSweet/:id" exact component={Sweet}/>
                        <Route path="/listSweet" exact component={SweetList}/>

                        <Route path="/addPayment" exact component={Payment}/>
                        <Route path="/editPayment/:id" exact component={Payment}/>
                        <Route path="/listPayment" exact component={PaymentList}/>

                        <Route path="/addOrder" exact component={Order}/>
                        <Route path="/editOrder/:id" exact component={Order}/>
                        <Route path="/listOrder" exact component={OrderList}/>

                        <Route path="/addBranch" exact component={Branch}/>
                        <Route path="/editBranch/:id" exact component={Branch}/>
                        <Route path="/listBranch" exact component={BranchList}/>

                        <Route path="/addCustomer" exact component={Customer}/>
                        <Route path="/editCustomer/:id" exact component={Customer}/>
                        <Route path="/listCustomer" exact component={CustomerList}/>
                        

                    </Switch>
                </Col>
            </Row>
        </Container>
        <Footer/>
    </Router>
  );
}
