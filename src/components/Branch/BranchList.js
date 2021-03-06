import React, {Component} from 'react';
import {Card, Table,  ButtonGroup, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import MyToast from '../MyToast';
import axios from 'axios';

export default class BranchList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            branches : []
            
        };
    }



    componentDidMount() {
        this.findAllBranches();
    }

    findAllBranches(){
<<<<<<< HEAD
        axios.get("http://localhost:8081/api/v1/branches")
=======
        axios.get("http://localhost:8081/rest/branches")
>>>>>>> 0d46ec9ff8e69a72d5d04aa8069e20a8146acdee
            .then(response => response.data)
            .then((data) => {
                this.setState({branches: data});
            });
    };

   

    deleteBranch = (branchId) => {
<<<<<<< HEAD
        axios.delete("http://localhost:8081/api/v1/branches/"+branchId)
=======
        axios.delete("http://localhost:8081/rest/branches/"+branchId)
>>>>>>> 0d46ec9ff8e69a72d5d04aa8069e20a8146acdee
        .then(response => {
            if(response.data != null) {
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}),3000);
                this.setState({
                    branches:this.state.branches.filter(branch => branch.id !== branchId)
                });
            } else {
                this.setState({"show":false});
            }
<<<<<<< HEAD
        } );
=======
        });
>>>>>>> 0d46ec9ff8e69a72d5d04aa8069e20a8146acdee
        
   
    };
    
   
    

   
   

    render() {
        
        return (
           <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                   <MyToast show = {this.state.show} message = {"Branch Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        
                            <FontAwesomeIcon icon={faList} /> Branch List
                     </Card.Header>
                 
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                  <th>Branch City</th>
                                  <th>Branch State</th>
                                 
                                  
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                   this.state. branches.length === 0 ?
                                    <tr align="center">
                                      <td colSpan="6">No Branches Available.</td>
                                    </tr> :
                                   this.state.branches.map((branch) => (
                                    <tr key={branch.id}>
                                        
                                        <td>{branch.branchCity}</td>
                                        <td>{branch.branchState}</td>
                                       
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"editBranch/"+branch.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
<<<<<<< HEAD
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteOrder.bind(this, branch.id)}><FontAwesomeIcon icon={faTrash} /></Button>
=======
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteBranch.bind(this, branch.id)}><FontAwesomeIcon icon={faTrash} /></Button>
>>>>>>> 0d46ec9ff8e69a72d5d04aa8069e20a8146acdee
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
                    <Link to={"addPayment"} className="nav-link">Proceed to Payment</Link>

                    </Card.Footer>
>>>>>>> 0d46ec9ff8e69a72d5d04aa8069e20a8146acdee
                   
                </Card>
            </div>
        );
    }
}