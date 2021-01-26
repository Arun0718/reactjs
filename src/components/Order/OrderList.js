import React, {Component} from 'react';
import {Card, Table,  ButtonGroup, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import MyToast from '../MyToast';
import axios from 'axios';

export default class OrderList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders : []
            
        };
    }



    componentDidMount() {
        this.findAllOrders();
    }

    findAllOrders(){
<<<<<<< HEAD
        axios.get("http://localhost:8084/api/v1/orders")
=======
        axios.get("http://localhost:8081/rest/orders")
>>>>>>> 0d46ec9ff8e69a72d5d04aa8069e20a8146acdee
            .then(response => response.data)
            .then((data) => {
                this.setState({orders: data});
            });
    };

   

    deleteOrder = (orderId) => {
<<<<<<< HEAD
        axios.delete("http://localhost:8084/api/v1/orders/"+orderId)
=======
        axios.delete("http://localhost:8081/rest/orders/"+orderId)
>>>>>>> 0d46ec9ff8e69a72d5d04aa8069e20a8146acdee
        .then(response => {
            if(response.data != null) {
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}),3000);
                this.setState({
                    orders:this.state.orders.filter(order => order.id !== orderId)
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
                   <MyToast show = {this.state.show} message = {"Order Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        
                            <FontAwesomeIcon icon={faList} /> Order List
                     </Card.Header>
                 
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                  <th>Quantity</th>
                                  <th>Delivery Address</th>
                                 
                                  
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                   this.state. orders.length === 0 ?
                                    <tr align="center">
                                      <td colSpan="6">No Orders Available.</td>
                                    </tr> :
                                   this.state.orders.map((order) => (
                                    <tr key={order.id}>
                                        
                                        <td>{order.quantity}</td>
                                        <td>{order.deliveryAddress}</td>
                                       
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"editOrder/"+order.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteOrder.bind(this, order.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                    ))
                                }
                              </tbody>
                        </Table>
                    </Card.Body>
<<<<<<< HEAD
=======
                    <Card.Footer style={{"textAlign":"right"}}>
                    <Link to={"addBranch"} className="nav-link">Proceed to branch</Link>

                    </Card.Footer>
>>>>>>> 0d46ec9ff8e69a72d5d04aa8069e20a8146acdee
                   
                </Card>
            </div>
        );
    }
<<<<<<< HEAD
}
=======
}



>>>>>>> 0d46ec9ff8e69a72d5d04aa8069e20a8146acdee
