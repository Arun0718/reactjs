import React, {Component} from 'react';
import {Card, Table,  ButtonGroup, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import MyToast from '../MyToast';
import axios from 'axios';

export default class CustomerList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            customers : []
            
        };
    }



    componentDidMount() {
        this.findAllCustomers();
    }

    findAllCustomers(){
        axios.get("http://localhost:8081/rest/customers")
            .then(response => response.data)
            .then((data) => {
                this.setState({customers: data});
            });
    };

   

    deleteCustomer = (customerId) => {
        axios.delete("http://localhost:8081/rest/customers/"+customerId)
        .then(response => {
            if(response.data != null) {
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}),3000);
                this.setState({
                    customers:this.state.customers.filter(customer => customer.id !== customerId)
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
                   <MyToast show = {this.state.show} message = {"Customer Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        
                            <FontAwesomeIcon icon={faList} /> Customer List
                     </Card.Header>
                 
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                  <th>Email</th>
                                  <th>Name</th>
                                 
                                  <th> Password </th>
                                  <th>Contact</th>
                                  
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                   this.state. customers.length === 0 ?
                                    <tr align="center">
                                      <td colSpan="6">No Customers Available.</td>
                                    </tr> :
                                   this.state.customers.map((customer) => (
                                    <tr key={customer.id}>
                                        <td>{customer.email}</td>
                                        <td>{customer.name}</td>
                                        <td>{customer.passwrod}</td>
                                        <td>{customer.contact}</td>
                                        
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"editCustomer/"+customer.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteCustomer.bind(this, customer.id)}><FontAwesomeIcon icon={faTrash} /></Button>
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



