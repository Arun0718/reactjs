import React, {Component} from 'react';
import {Card, Table,  ButtonGroup, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import MyToast from '../MyToast';
import axios from 'axios';

export default class EventList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            events : []
            
        };
    }



    componentDidMount() {
        this.findAllEvents();
    }

    findAllEvents(){
        axios.get("http://localhost:8084/api/v1/events")
            .then(response => response.data)
            .then((data) => {
                this.setState({events: data});
            });
    };

   

    deleteEvent = (eventId) => {
        axios.delete("http://localhost:8084/api/v1/events/"+eventId)
        .then(response => {
            if(response.data != null) {
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}),3000);
                this.setState({
                    orders:this.state.events.filter(event => event.id !== eventId)
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
                   <MyToast show = {this.state.show} message = {"Event Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        
                            <FontAwesomeIcon icon={faList} /> Event List
                     </Card.Header>
                 
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                  <th>Event Name</th>
                                  <th>Quantity</th>
                                  <th>Delivery Address</th>
                                 
                                  
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                   this.state. events.length === 0 ?
                                    <tr align="center">
                                      <td colSpan="6">No Events Available.</td>
                                    </tr> :
                                   this.state.events.map((event) => (
                                    <tr key={event.id}>
                                        <td>{event.eventName}</td>
                                        <td>{event.quantity}</td>
                                        <td>{event.deliveryAddress}</td>
                                       
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"editEvent/"+event.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteEvent.bind(this, event.id)}><FontAwesomeIcon icon={faTrash} /></Button>
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