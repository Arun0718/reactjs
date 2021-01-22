import React,{Component} from 'react';

import {connect} from 'react-redux';
import {saveOrder,fetchOrder,updateOrder,fetchLanguages,fetchGenres} from '../../services/index';
import {Card, Form, Button, Col, InputGroup, Image} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';

class Order extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            genres: [],
            languages : [],
            show : false
        };
        this.orderChange = this.orderChange.bind(this);
        this.submitOrder = this.submitOrder.bind(this);
    }

    initialState = {
        id:'', title:'', author:'', coverPhotoURL:'', isbnNumber:'', price:'', language:'', genre:''
    };

    componentDidMount() {
        const orderId = +this.props.match.params.id;
        if(orderId) {
            this.findOrderById(orderId);
        }
       // this.findAllLanguages();
    }

    // findAllLanguages = () => {
    //     this.props.fetchLanguages();
    //     setTimeout(() => {
    //        // let orderLanguages = this.props.orderObject.languages;
            
    //         if(orderLanguages) {
    //             this.setState({
    //                 languages: [{value:'', display:'Select Language'}]
    //                     .concat(orderLanguages.map(language => {
    //                         return {value:language, display:language}
    //                     }))
    //             });
    //             this.findAllGenres();
    //         }
    //     }, 100);
    // };

    findAllGenres = () => {
        this.props.fetchGenres();
        setTimeout(() => {
            let orderGenres = this.props.orderObject.genres;
            if(orderGenres) {
                this.setState({
                    genres: [{value:'', display:'Select Genre'}]
                        .concat(orderGenres.map(genre => {
                            return {value:genre, display:genre}
                        }))
                });
            }
        }, 100);
    };

    findOrderById = (orderId) => {
        this.props.fetchBook(orderId);
        setTimeout(() => {
            let order = this.props.orderObject.order;
            if(order != null) {
                this.setState({
                    id: order.id,
                    title: order.title,
                    author: order.author,
                    coverPhotoURL: order.coverPhotoURL,
                    isbnNumber: order.isbnNumber,
                    price: order.price,
                    language: order.language,
                    genre: order.genre
                });
            }
        }, 1000);
    };

    resetOrder = () => {
        this.setState(() => this.initialState);
    };

    submitOrder = event => {
        event.preventDefault();

        const order = {
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language,
            genre: this.state.genre
        };

        this.props.saveOrder(order);
        setTimeout(() => {
            if(this.props.orderObject.order != null) {
                this.setState({"show":true, "method":"post"});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        }, 2000);
        this.setState(this.initialState);
    };

    updateOrder = event => {
        event.preventDefault();

        const order = {
            id: this.state.id,
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language,
            genre: this.state.genre
        };
        this.props.updateOrder(order);
        setTimeout(() => {
            if(this.props.orderObject.order != null) {
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        }, 2000);
        this.setState(this.initialState);
    };

    orderChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    orderList = () => {
        return this.props.history.push("/list");
    };

    render() {
        const {title, author, coverPhotoURL, isbnNumber, price, language, genre} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Order Updated Successfully." : "Order Saved Successfully."} type = {"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Update Order" : "Place your Order"}
                    </Card.Header>
                    <Form onReset={this.resetOrder} onSubmit={this.state.id ? this.updateOrder : this.submitOrder} id="orderFormId">
                        <Card.Body>
                            <Form.Row>
                            
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="title"
                                        value={title} onChange={this.orderChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Product Name" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridAuthor">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="author"
                                        value={author} onChange={this.orderChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter quantity " />
                                </Form.Group>
                            
                                
                                <Form.Group as={Col} controlId="formGridISBNNumber">
                                    <Form.Label> Delivery Address</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="isbnNumber"
                                        value={isbnNumber} onChange={this.orderChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter the delivery address" />
                                </Form.Group>
                            
                                
                                </Form.Row>
                               
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> {this.state.id ? "Update" : "Place Order"}
                            </Button>{' '}
                            
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        orderObject: state.order
    };
};
const mapDispatchToProps = dispatch => {
    return {
        saveOrder: (order) => dispatch(saveOrder(order)),
        fetchOrder: (orderId) => dispatch(fetchOrder(orderId)),
        updateOrder: (order) => dispatch(updateOrder(order)),
        fetchLanguages: () => dispatch(fetchLanguages()),
        fetchGenres: () => dispatch(fetchGenres())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);