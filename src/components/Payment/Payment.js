import React,{Component} from 'react';

import{connect} from 'react-redux';
import {savePayment,fetchPayment,updatePayment,fetchLanguages,fetchGenres} from '../../services/index';
import {Card, Form, Button, Col, InputGroup, Image} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';

class Payment extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            genres: [],
            languages : [],
            show : false
        };
        this.paymentChange = this.paymentChange.bind(this);
        this.submitPayment = this.submitPayment.bind(this);
    }

    initialState = {
        id:'', title:'', author:'', coverPhotoURL:'', isbnNumber:'', price:'', language:'', genre:''
    };

    componentDidMount() {
        const paymentId = +this.props.match.params.id;
        if(paymentId) {
            this.findPaymentById(paymentId);
        }
        this.findAllLanguages();
    }

    findAllLanguages = () => {
        this.props.fetchLanguages();
        setTimeout(() => {
            let paymentLanguages = this.props.paymentObject.languages;
            if(paymentLanguages) {
                this.setState({
                    languages: [{value:'', display:'Select Language'}]
                        .concat(paymentLanguages.map(language => {
                            return {value:language, display:language}
                        }))
                });
                this.findAllGenres();
            }
        }, 100);
    };

    findAllGenres = () => {
        this.props.fetchGenres();
        setTimeout(() => {
            let paymentGenres = this.props.paymentObject.genres;
            if(paymentGenres) {
                this.setState({
                    genres: [{value:'', display:'Select Genre'}]
                        .concat(paymentGenres.map(genre => {
                            return {value:genre, display:genre}
                        }))
                });
            }
        }, 100);
    };

    findPaymentById = (paymentId) => {
        this.props.fetchBook(paymentId);
        setTimeout(() => {
            let payment = this.props.paymentObject.sweet;
            if(payment != null) {
                this.setState({
                    id: payment.id,
                    title: payment.title,
                    author: payment.author,
                    coverPhotoURL: payment.coverPhotoURL,
                    isbnNumber: payment.isbnNumber,
                    price: payment.price,
                    language: payment.language,
                    genre: payment.genre
                });
            }
        }, 1000);
    };

    resetSweet = () => {
        this.setState(() => this.initialState);
    };

    submitPayment = event => {
        event.preventDefault();

        const payment = {
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language,
            genre: this.state.genre
        };

        this.props.savePayment(payment);
        setTimeout(() => {
            if(this.props.paymentObject.payment != null) {
                this.setState({"show":true, "method":"post"});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        }, 2000);
        this.setState(this.initialState);
    };

    updatePayment = event => {
        event.preventDefault();

        const payment = {
            id: this.state.id,
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language,
            genre: this.state.genre
        };
        this.props.updatePayment(payment);
        setTimeout(() => {
            if(this.props.paymentObject.payment != null) {
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        }, 2000);
        this.setState(this.initialState);
    };

    paymentChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    paymentList = () => {
        return this.props.history.push("/list");
    };

    render() {
        const {title, author, coverPhotoURL, isbnNumber, price, language, genre} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Payment Updated Successfully." : "Payment Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Payment" : "Add New Payment"}
                    </Card.Header>
                    <Form onReset={this.resetPayment} onSubmit={this.state.id ? this.updatePayment : this.submitPayment} id="paymentFormId">
                        <Card.Body>
                            <Form.Row>
                            
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label> Name On The Card</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="title"
                                        value={title} onChange={this.paymentChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter the name on the card" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridAuthor">
                                    <Form.Label>Card Number</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="author"
                                        value={author} onChange={this.paymentChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter the card number" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                
                                <Form.Group as={Col} controlId="formGridISBNNumber">
                                    <Form.Label>CVV Number</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="isbnNumber"
                                        value={isbnNumber} onChange={this.paymentChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter the CVV Number" />
                                </Form.Group>
                            
                                <Form.Group as={Col} controlId="formGridPrice">
                                    <Form.Label>Expiry Date</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="price"
                                        value={price} onChange={this.paymentChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter the Expiry data" />
                                </Form.Group>
                                </Form.Row>
                               
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> {this.state.id ? "Update" : "Submit"}
                            </Button>{' '}
                            {/* <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.paymentList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Update List
                            </Button> */}
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        paymentObject: state.payment
    };
};
const mapDispatchToProps = dispatch => {
    return {
        savePayment: (payment) => dispatch(savePayment(payment)),
        fetchPayment: (paymentId) => dispatch(fetchPayment(paymentId)),
        updatePayment: (payment) => dispatch(updatePayment(payment)),
        fetchLanguages: () => dispatch(fetchLanguages()),
        fetchGenres: () => dispatch(fetchGenres())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);