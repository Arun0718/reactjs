import React,{Component} from 'react';


import {Card, Form, Button, Col } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import axios from 'axios';


export default class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.paymentChange = this.paymentChange.bind(this);
        this.submitPayment = this.submitPayment.bind(this);
    }

    initialState = {
        id:'', nameOnTheCard:'', cvv:'', expiryDate:'', cardno:''
    };

    componentDidMount() {
        const paymentId = +this.props.match.params.id;
        if(paymentId) {
            this.findPaymentById(paymentId);
        }
       
    }

   

    findPaymentById = (paymentId) => {
        axios.get("http://localhost:8081/rest/payments/"+paymentId)
        .then(response => {
            if(response.data != null){
                this.setState({
                    id: response.data.id,
                    nameOnTheCard: response.data.nameOnTheCard,
                    cvv: response.data.cvv,
                    expiryDate: response.data.expiryDate,
                    cardno: response.data.cardno
            });
        }
    }).catch((error) => {
        console.error("Error -"+error);
    });
};
        

    resetPayment = () => {
        this.setState(() => this.initialState);
    };

    submitPayment = event => {
        event.preventDefault();

        const payment = {
            
                    nameOnTheCard: this.state.nameOnTheCard,
                    cvv: this.state.cvv,
                    expiryDate: this.state.expiryDate,
                    cardno: this.state.cardno
        };

        axios.post("http://localhost:8081/rest/payments", payment)
            .then(response => {
                if(response.data != null){
                    this.setState({"show":true, "method":"post"});
                    setTimeout(() => this.setState({"show":false}),3000);
                } else {
                    this.setState({"show":false});
                }
            });
            this.setState(this.initialState);
        };

    updatePayment = event => {
        event.preventDefault();

        const payment = {
                    id: this.state.id,
                    nameOnTheCard: this.state.nameOnTheCard,
                    cvv: this.state.cvv,
                    expiryDate: this.state.expiryDate,
                    cardno: this.state.cardno
        };
        axios.put("http://localhost:8081/rest/payments", payment)
        .then(response => {
            if(response.data != null) {
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}), 3000);
                setTimeout(() => this.paymentList(), 3000);
            } else {
                this.setState({"show":false});
            }
        });

    this.setState(this.initialState);
};
        

    paymentChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    paymentList = () => {
        return this.props.history.push("/listPayment");
    };

    render() {
        const {nameOnTheCard, cvv, expiryDate, cardno} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Payment Updated Successfully." : "Payment Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Payment" : "Add New Payment"}
                    </Card.Header>
                    <Form onReset={this.resetPayment} onSubmit={this.state.id ? this.updatePayment : this.submitPayment} id="paymentFormId">
                        <Card.Body>
                            <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>NameOnTheCard</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="nameOnTheCard"
                                        value={nameOnTheCard} onChange={this.paymentChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Name On The Card" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Cvv</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="tel" name="cvv" minlength="3" maxlength="3"
                                        value={cvv} onChange={this.paymentChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Cvv Number" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridAuthor">
                                    <Form.Label>Expiry Date</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="expiryDate" pattern="(?:0[1-9]|1[0-2])/[0-9]{2}"
                                        value={expiryDate} onChange={this.paymentChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Expiry Date MM/YY" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                
                                <Form.Group as={Col} controlId="formGridISBNNumber">
                                    <Form.Label>Card Number</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="tel" name="cardno" minlength="16" maxlength="16"
                                        value={cardno} onChange={this.paymentChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Card Number" />
                                </Form.Group>
                                </Form.Row>
                            
                       </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> {this.state.id ? "Update" : "Payment"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.paymentList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Payment List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}