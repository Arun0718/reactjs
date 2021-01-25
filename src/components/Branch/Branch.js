import React,{Component} from 'react';
import {Card, Form, Button, Col } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import axios from 'axios';


export default class Branch extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.branchChange = this.branchChange.bind(this);
        this.submitBranch = this.submitBranch.bind(this);
    }

    initialState = {
        id:'', branchCity:'', branchState:''
    };

    componentDidMount() {
        const branchId = +this.props.match.params.id;
        if(branchId) {
            this.findBranchById(branchId);
        }
       
    }

   

    findBranchById = (branchId) => {
        axios.get("http://localhost:8081/rest/branches/"+branchId)
        .then(response => {
            if(response.data != null){
                this.setState({
                    id: response.data.id,
                    branchCity: response.data.branchCity,
                    branchState: response.data.branchState,
                   
            });
        }
    }).catch((error) => {
        console.error("Error -"+error);
    });
};
        

    resetBranch = () => {
        this.setState(() => this.initialState);
    };

    submitBranch = event => {
        event.preventDefault();

        const branch = {
            
                    branchCity: this.state.branchCity,
                    branchState: this.state.branchState,
                    
        };

        axios.post("http://localhost:8081/rest/branches", branch)
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

    updateBranch = event => {
        event.preventDefault();

        const branch = {
                    id: this.state.id,
                    branchcity: this.state.branchCity,
                    branchState: this.state.branchState,
                  
        };
        axios.put("http://localhost:8081/rest/branches", branch)
        .then(response => {
            if(response.data != null) {
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}), 3000);
                setTimeout(() => this.branchList(), 3000);
            } else {
                this.setState({"show":false});
            }
        });

    this.setState(this.initialState);
};
        

    branchChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    branchList = () => {
        return this.props.history.push("/listBranch");
    };

    render() {
        const {branchCity, branchState} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Branch Updated Successfully." : "Branch Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Branch" : "Add New Branch"}
                    </Card.Header>
                    <Form onReset={this.resetBranch} onSubmit={this.state.id ? this.updateBranch : this.submitBranch} id="branchFormId">
                        <Card.Body>
                            <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Branch City</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="branchCity"
                                        value={branchCity} onChange={this.branchChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Branch City" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Branch State</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="branchState"
                                        value={branchState} onChange={this.branchChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Branch State" />
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
                            <Button size="sm" variant="info" type="button" onClick={this.branchList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Branch List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}