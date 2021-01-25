import React,{Component} from 'react';


import {Card, Form, Button, Col } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import axios from 'axios';


export default class Customer extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.customerChange = this.customerChange.bind(this);
        this.submitCustomer = this.submitCustomer.bind(this);
    }

    initialState = {
        id:'', email:'', name:'', password:'', contact:''
    };

    componentDidMount() {
        const customerId = +this.props.match.params.id;
        if(customerId) {
            this.findCustomerById(customerId);
        }
       
    }

   

    findCustomerById = (customerId) => {
        axios.get("http://localhost:8081/rest/customers/"+customerId)
        .then(response => {
            if(response.data != null){
                this.setState({
                    id: response.data.id,
                    email: response.data.email,
                    name: response.data.name,
                    password: response.data.password,
                    contact: response.data.contact
                    
            });
        }
    }).catch((error) => {
        console.error("Error -"+error);
    });
};
        

    resetCustomer = () => {
        this.setState(() => this.initialState);
    };

    submitCustomer = event => {
        event.preventDefault();

        const customer = {
            
                    
                    id: this.state.id,
                    email: this.state.email,
                    name: this.state.name,
                    password: this.state.password,
                    contact: this.state.contact
                   
        };

        axios.post("http://localhost:8081/rest/customers", customer)
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

    updateCustomer = event => {
        event.preventDefault();

        const customer = {
            id: this.state.id,
            email: this.state.email,
            name: this.state.name,
            password: this.state.password,
            contact: this.state.contact
        };
        axios.put("http://localhost:8081/rest/customers", customer)
        .then(response => {
            if(response.data != null) {
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}), 3000);
                setTimeout(() => this.sweetList(), 3000);
            } else {
                this.setState({"show":false});
            }
        });

    this.setState(this.initialState);
};
        

    customerChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    customerList = () => {
        return this.props.history.push("/listCustomer");
    };

    render() {
        const {email,name,password,contact} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Customer Updated Successfully." : "Customer Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Customer" : " Customer Registration "}
                    </Card.Header>
                    <Form onReset={this.resetCustomer} onSubmit={this.state.id ? this.updateCustomer : this.submitCustomer} id="customerFormId">
                        <Card.Body>
                            <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="email"
                                        value={email} onChange={this.customerChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter email" />
                                </Form.Group>
                                </Form.Row><Form.Row>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="name"
                                        value={name} onChange={this.customerChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter the  name" />
                                </Form.Group>
                                </Form.Row><Form.Row>
                                <Form.Group as={Col} controlId="formGridAuthor">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="password"
                                        value={password} onChange={this.customerChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter the password" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                
                                <Form.Group as={Col} controlId="formGridISBNNumber">
                                    <Form.Label>Contact</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="contact"
                                        value={contact} onChange={this.customerChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter contact" />
                                </Form.Group>
                            
                                
                                </Form.Row>
                               
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"center"}}>
                            <Button size="sm" variant="success" type="Register">
                                <FontAwesomeIcon icon={faSave} /> {this.state.id ? "Update" : "Register"}
                            </Button>{' '}
                            
                           
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}