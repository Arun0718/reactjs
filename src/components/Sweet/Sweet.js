import React,{Component} from 'react';


import {Card, Form, Button, Col } from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';
import axios from 'axios';


export default class Sweet extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.sweetChange = this.sweetChange.bind(this);
        this.submitSweet = this.submitSweet.bind(this);
    }

    initialState = {
        id:'', categoryName:'', productName:'', rate:'', offerName:'', offerRate:''
    };

    componentDidMount() {
        const sweetId = +this.props.match.params.id;
        if(sweetId) {
            this.findSweetById(sweetId);
        }
       
    }

   

    findSweetById = (sweetId) => {
        axios.get("http://localhost:8081/rest/sweets/"+sweetId)
        .then(response => {
            if(response.data != null){
                this.setState({
                    id: response.data.id,
                    categoryName: response.data.categoryName,
                    productName: response.data.productName,
                    rate: response.data.rate,
                    offerName: response.data.offerName,
                    offerRate: response.data.offerRate
            });
        }
    }).catch((error) => {
        console.error("Error -"+error);
    });
};
        

    resetSweet = () => {
        this.setState(() => this.initialState);
    };

    submitSweet = event => {
        event.preventDefault();

        const sweet = {
            
                    categoryName: this.state.categoryName,
                    productName: this.state.productName,
                    rate: this.state.rate,
                    offerName: this.state.offerName,
                    offerRate: this.state.offerRate
        };

        axios.post("http://localhost:8081/rest/sweets", sweet)
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

    updateSweet = event => {
        event.preventDefault();

        const sweet = {
                    id: this.state.id,
                    categoryName: this.state.categoryName,
                    productName: this.state.productName,
                    rate: this.state.rate,
                    offerName: this.state.offerName,
                    offerRate: this.state.offerRate
        };
        axios.put("http://localhost:8081/rest/sweets", sweet)
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
        

    sweetChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    sweetList = () => {
        return this.props.history.push("/listSweet");
    };

    render() {
        const {categoryName, productName, rate, offerName, offerRate} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Sweet Updated Successfully." : "Sweet Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Sweet" : "Add New Sweet"}
                    </Card.Header>
                    <Form onReset={this.resetSweet} onSubmit={this.state.id ? this.updateSweet : this.submitSweet} id="sweetFormId">
                        <Card.Body>
                            <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>category Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="categoryName"
                                        value={categoryName} onChange={this.sweetChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter category Name" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="productName"
                                        value={productName} onChange={this.sweetChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Product Name" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridAuthor">
                                    <Form.Label>Product Rate</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="rate"
                                        value={rate} onChange={this.sweetChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Product Rate" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                
                                <Form.Group as={Col} controlId="formGridISBNNumber">
                                    <Form.Label>Offer Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="offerName"
                                        value={offerName} onChange={this.sweetChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Offer Name" />
                                </Form.Group>
                            
                                <Form.Group as={Col} controlId="formGridPrice">
                                    <Form.Label>Offer Rate</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="offerRate"
                                        value={offerRate} onChange={this.sweetChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Offer Rate" />
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
                            <Button size="sm" variant="info" type="button" onClick={this.sweetList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Sweet List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}