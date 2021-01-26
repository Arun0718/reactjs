import React,{Component} from 'react';


import {Card, Form, Button, Col } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import axios from 'axios';


export default class Feedback extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.feedbackChange = this.feedbackChange.bind(this);
        this.submitFeedback = this.submitFeedback.bind(this);
    }

    initialState = {
        id:'', UserName:'', ProductName:'' , Feedback:''
    };

    componentDidMount() {
        const feedbackId = +this.props.match.params.id;
        if(feedbackId) {
            this.findFeedbackById(feedbackId);
        }
       
    }

   

    findFeedbackById = (feedbackId) => {
        axios.get("http://localhost:8084/api/v1/feedbacks/"+feedbackId)
        .then(response => {
            if(response.data != null){
                this.setState({
                    id: response.data.id,
                    UserName: response.data.UserName,
                    ProductName: response.data.ProductName,
		    Feedback: response.data.Feedback,
                   
            });
        }
    }).catch((error) => {
        console.error("Error -"+error);
    });
};
        

    resetFeedback = () => {
        this.setState(() => this.initialState);
    };

    submitFeedback = event => {
        event.preventDefault();

        const feedback = {
            
                    UserName: this.state.UserName,
                    ProductName: this.state.ProductName,
		    Feedback: this.state.Feedback,
                    
        };

        axios.post("http://localhost:8084/api/v1/feedbacks", feedback)
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

    updateFeedback = event => {
        event.preventDefault();

        const feedback = {
                    id: this.state.id,
                    UserName: this.state.UserName,
                    ProductName: this.state.ProductName,
                    Feedback: this.state.Feedback,
                  
        };
        axios.put("http://localhost:8084/api/v1/feedbacks", feedback)
        .then(response => {
            if(response.data != null) {
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}), 3000);
                setTimeout(() => this.feedbackList(), 3000);
            } else {
                this.setState({"show":false});
            }
        });

    this.setState(this.initialState);
};
        

    feedbackChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    feedbackList = () => {
        return this.props.history.push("/listFeedback");
    };

    render() {
        const {UserName, ProductName, Feedback} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Feedback Updated Successfully." : "Feedback Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Feedback" : "Add New Feedback"}
                    </Card.Header>
                    <Form onReset={this.resetFeedback} onSubmit={this.state.id ? this.updateFeedback : this.submitFeedback} id="feedbackFormId">
                        <Card.Body>
                            <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="UserName"
                                        value={UserName} onChange={this.feedbackChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter UserName" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="ProductName"
                                        value={ProductName} onChange={this.feedbackChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Product Name" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Feedback</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="Feedback"
                                        value={Feedback} onChange={this.feedbackChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Feedback" />
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
                            <Button size="sm" variant="info" type="button" onClick={this.feedbackList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Feedback List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}