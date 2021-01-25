import React,{Component} from 'react';


import {Card, Form, Button, Col } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import axios from 'axios';


export default class Order extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.orderChange = this.orderChange.bind(this);
        this.submitOrder = this.submitOrder.bind(this);
    }

    initialState = {
        id:'', quantity:'', deliveryAddress:''
    };

    componentDidMount() {
        const orderId = +this.props.match.params.id;
        if(orderId) {
            this.findOrderById(orderId);
        }
       
    }

   

    findOrderById = (orderId) => {
        axios.get("http://localhost:8081/rest/orders/"+orderId)
        .then(response => {
            if(response.data != null){
                this.setState({
                    id: response.data.id,
                    quantity: response.data.quantity,
                    deliveryAddress: response.data.deliveryAddress,
                   
            });
        }
    }).catch((error) => {
        console.error("Error -"+error);
    });
};
        

    resetOrder = () => {
        this.setState(() => this.initialState);
    };

    submitOrder = event => {
        event.preventDefault();

        const order = {
            
                    quantity: this.state.quantity,
                    deliveryAddress: this.state.deliveryAddress,
                    
        };

        axios.post("http://localhost:8081/rest/orders", order)
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

    updateOrder = event => {
        event.preventDefault();

        const order = {
                    id: this.state.id,
                    quantity: this.state.quantity,
                    deliveryAddress: this.state.deliveryAddress,
                  
        };
        axios.put("http://localhost:8081/rest/orders", order)
        .then(response => {
            if(response.data != null) {
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}), 3000);
                setTimeout(() => this.orderList(), 3000);
            } else {
                this.setState({"show":false});
            }
        });

    this.setState(this.initialState);
};
        

    orderChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    orderList = () => {
        return this.props.history.push("/listOrder");
    };

    render() {
        const {quantity, deliveryAddress} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Order Updated Successfully." : "Order Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Order" : "Add New Order"}
                    </Card.Header>
                    <Form onReset={this.resetOrder} onSubmit={this.state.id ? this.updateOrder : this.submitOrder} id="orderFormId">
                        <Card.Body>
                            <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="quantity"
                                        value={quantity} onChange={this.orderChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter quantity" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Delivery Address</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="deliveryAddress"
                                        value={deliveryAddress} onChange={this.orderChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Delivery Address" />
                                </Form.Group>
                                
                            </Form.Row>
                           
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> {this.state.id ? "Update" : "Save"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.orderList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Order List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}