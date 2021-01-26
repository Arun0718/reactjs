import React,{Component} from 'react';


import {Card, Form, Button, Col } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import axios from 'axios';


export default class Event extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.eventChange = this.eventChange.bind(this);
        this.submitEvent = this.submitEvent.bind(this);
    }

    initialState = {
        id:'', eventName:'', quantity:'', deliveryAddress:''
    };

    componentDidMount() {
        const eventId = +this.props.match.params.id;
        if(eventId) {
            this.findEventById(eventId);
        }
       
    }

   

    findEventById = (eventId) => {
        axios.get("http://localhost:8084/api/v1/events/"+eventId)
        .then(response => {
            if(response.data != null){
                this.setState({
                    id: response.data.id,
		    eventName: response.data.eventName,
                    quantity: response.data.quantity,
                    deliveryAddress: response.data.deliveryAddress,
                   
            });
        }
    }).catch((error) => {
        console.error("Error -"+error);
    });
};
        

    resetEvent = () => {
        this.setState(() => this.initialState);
    };

    submitEvent = event => {
        event.preventDefault();

        const event = {
            	    eventName: this.state.eventName,
                    quantity: this.state.quantity,
                    deliveryAddress: this.state.deliveryAddress,
                    
        };

        axios.post("http://localhost:8084/api/v1/events", event)
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

    updateEvent = event => {
        event.preventDefault();

        const event = {
                    id: this.state.id,
                    eventName: this.state.eventName,
                    quantity: this.state.quantity,
                    deliveryAddress: this.state.deliveryAddress,
                  
        };
        axios.put("http://localhost:8084/api/v1/events", event)
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
        

    eventChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    eventList = () => {
        return this.props.history.push("/listEvent");
    };

    render() {
        const {eventName,quantity, deliveryAddress} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Event Updated Successfully." : "Event Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Event" : "Add New Event"}
                    </Card.Header>
                    <Form onReset={this.resetEvent} onSubmit={this.state.id ? this.updateEvent : this.submitEvent} id="eventFormId">
                        <Card.Body>
                            <Form.Row>
			    <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Event Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="eventName"
                                        value={eventName} onChange={this.eventChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter the event name" />
                                </Form.Group>
                            <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="quantity"
                                        value={quantity} onChange={this.eventChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter quantity" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Delivery Address</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="deliveryAddress"
                                        value={deliveryAddress} onChange={this.eventChange}
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
                                <FontAwesomeIcon icon={faList} /> Event List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}