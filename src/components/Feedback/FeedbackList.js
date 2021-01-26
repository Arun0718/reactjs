import React, {Component} from 'react';
import {Card, Table,  ButtonGroup, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import MyToast from '../MyToast';
import axios from 'axios';

export default class FeedbackList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            feedbacks : []
            
        };
    }



    componentDidMount() {
        this.findAllFeedbacks();
    }

    findAllFeedbacks(){
        axios.get("http://localhost:8084/api/v1/feedbacks")
            .then(response => response.data)
            .then((data) => {
                this.setState({feedbacks: data});
            });
    };

   

    deleteFeedback = (orderId) => {
        axios.delete("http://localhost:8084/api/v1/feedbacks/"+orderId)
        .then(response => {
            if(response.data != null) {
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}),3000);
                this.setState({
                    feedbacks:this.state.feedbacks.filter(feedback => feedback.id !== orderId)
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
                   <MyToast show = {this.state.show} message = {"Feedback Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        
                            <FontAwesomeIcon icon={faList} /> Feedback List
                     </Card.Header>
                 
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                  <th>User Name</th>
                                  <th>Product Name</th>
				  <th>Feedback</th>
                                 
                                  
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                   this.state. feedbacks.length === 0 ?
                                    <tr align="center">
                                      <td colSpan="6">No Feedbacks Available.</td>
                                    </tr> :
                                   this.state.feedbacks.map((feedback) => (
                                    <tr key={feedback.id}>
                                        
                                        <td>{feedback.UserName}</td>
                                        <td>{feedback.ProductName}</td>
					<td>{feedback.Feedback}</td>
                                       
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"editFeedback/"+feedback.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteFeedback.bind(this, feedback.id)}><FontAwesomeIcon icon={faTrash} /></Button>
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