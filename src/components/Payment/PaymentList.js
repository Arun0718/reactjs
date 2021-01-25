
import React, {Component} from 'react';
import {Card, Table,  ButtonGroup, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import MyToast from '../MyToast';
import axios from 'axios';

export default class PaymentList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            payments : []
            
        };
    }



    componentDidMount() {
        this.findAllPayments();
    }

    findAllPayments(){
        axios.get("http://localhost:8081/rest/payments")
            .then(response => response.data)
            .then((data) => {
                this.setState({payments: data});
            });
    };

   

    deletePayment = (paymentId) => {
        axios.delete("http://localhost:8081/rest/payments/"+paymentId)
        .then(response => {
            if(response.data != null) {
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}),3000);
                this.setState({
                    payments:this.state.payments.filter(payment => payment.id !== paymentId)
                });
            } else {
                this.setState({"show":false});
            }
        } );
        
   
    };
    
   
    

   
   

    render() {
        
        return (
           <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                   <MyToast show = {this.state.show} message = {"Payment Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        
                            <FontAwesomeIcon icon={faList} /> Payment List
                     </Card.Header>
                 
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                  <th>Name On The Card</th>
                                  <th>Cvv</th>
                                  <th>Expiry Date</th>
                                  <th>Card Number</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                   this.state.payments.length === 0 ?
                                    <tr align="center">
                                      <td colSpan="6">No Payments Available.</td>
                                    </tr> :
                                   this.state.payments.map((payment) => (
                                    <tr key={payment.id}>
                                        
                                        <td>{payment.nameOnTheCard}</td>
                                        <td>{payment.cvv}</td>
                                        <td>{payment.expiryDate}</td>
                                        <td>{payment.cardno}</td>
                                        
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"editPayment/"+payment.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                                <Button size="sm" variant="outline-danger" onClick={this.deletePayment.bind(this, payment.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                    ))
                                }
                              </tbody>
                        </Table>
                    </Card.Body>
                   
                </Card>
            </div>
        );
    }
}
