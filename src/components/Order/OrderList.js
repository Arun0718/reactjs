import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteOrder} from '../../services/index';

import './../../assets/css/Style.css';
import {Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import MyToast from '../MyToast';
import axios from 'axios';

class OrderList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders : [],
            search : '',
            currentPage : 1,
            ordersPerPage : 5,
            sortDir: "asc"
        };
    }

    sortData = () => {
        setTimeout(() => {
            this.state.sortDir === "asc" ? this.setState({sortDir: "desc"}) : this.setState({sortDir: "asc"});
            this.findAllOrders(this.state.currentPage);
        }, 500);
    };

    componentDidMount() {
        this.findAllOrders(this.state.currentPage);
    }

    findAllOrders(currentPage) {
        currentPage -= 1;
        axios.get("http://localhost:8081/rest/orders?pageNumber="+currentPage+"&pageSize="+this.state.ordersPerPage+"&sortBy=price&sortDir="+this.state.sortDir)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    orders: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            });
    };

    deleteOrder = (orderId) => {
        this.props.deleteOrder(orderId);
        setTimeout(() => {
            if(this.props.orderObject != null) {
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}), 3000);
                this.findAllOrders(this.state.currentPage);
            } else {
                this.setState({"show":false});
            }
        }, 1000);
    };

    changePage = event => {
        let targetPage = parseInt(event.target.value);
        if(this.state.search) {
            this.searchData(targetPage);
        } else {
            this.findAllOrders(targetPage);
        }
        this.setState({
            [event.target.name]: targetPage
        });
    };

    firstPage = () => {
        let firstPage = 1;
        if(this.state.currentPage > firstPage) {
            if(this.state.search) {
                this.searchData(firstPage);
            } else {
                this.findAllOrders(firstPage);
            }
        }
    };

    prevPage = () => {
        let prevPage = 1;
        if(this.state.currentPage > prevPage) {
            if(this.state.search) {
                this.searchData(this.state.currentPage - prevPage);
            } else {
                this.findAllOrders(this.state.currentPage - prevPage);
            }
        }
    };

    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.ordersPerPage);
        if(this.state.currentPage < condition) {
            if(this.state.search) {
                this.searchData(condition);
            } else {
                this.findAllOrders(condition);
            }
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.totalElements / this.state.ordersPerPage)) {
            if(this.state.search) {
                this.searchData(this.state.currentPage + 1);
            } else {
                this.findAllOrders(this.state.currentPage + 1);
            }
        }
    };

    searchChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    cancelSearch = () => {
        this.setState({"search" : ''});
        this.findAllOrders(this.state.currentPage);
    };

    searchData = (currentPage) => {
        currentPage -= 1;
        axios.get("http://localhost:8081/rest/orders/search/"+this.state.search+"?page="+currentPage+"&size="+this.state.ordersPerPage)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    orders: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            });
    };

    render() {
        const {orders, currentPage, totalPages, search} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Order Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <div style={{"float":"left"}}>
                            <FontAwesomeIcon icon={faList} /> Order List
                        </div>
                        <div style={{"float":"right"}}>
                             <InputGroup size="sm">
                                <FormControl placeholder="Search" name="search" value={search}
                                    className={"info-border bg-dark text-white"}
                                    onChange={this.searchChange}/>
                                <InputGroup.Append>
                                    <Button size="sm" variant="outline-info" type="button" onClick={this.searchData}>
                                        <FontAwesomeIcon icon={faSearch}/>
                                    </Button>
                                    <Button size="sm" variant="outline-danger" type="button" onClick={this.cancelSearch}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </Button>
                                </InputGroup.Append>
                             </InputGroup>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                  
                                  <th>Product Name</th>
                                 
                                  <th onClick={this.sortData}>Quantity <div className={this.state.sortDir === "asc" ? "arrow arrow-up" : "arrow arrow-down"}> </div></th>
                                  <th>Delivery Address</th>
                                
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                    orders.length === 0 ?
                                    <tr align="center">
                                      <td colSpan="7">No Orders Available.</td>
                                    </tr> :
                                    orders.map((order) => (
                                    <tr key={order.id}>
                                        <td>
                                            <Image src={order.coverPhotoURL} roundedCircle width="25" height="25"/> {order.title}
                                        </td>
                                        <td>{order.author}</td>
                                        <td>{order.isbnNumber}</td>
                                        <td>{order.price}</td>
                                        <td>{order.language}</td>
                                        <td>{order.genre}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"edit/"+order.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteOrder.bind(this, order.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                    ))
                                }
                              </tbody>
                        </Table>
                    </Card.Body>
                    {orders.length > 0 ?
                        <Card.Footer>
                            <div style={{"float":"left"}}>
                                Showing Page {currentPage} of {totalPages}
                            </div>
                            <div style={{"float":"right"}}>
                                <InputGroup size="sm">
                                    <InputGroup.Prepend>
                                        <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.firstPage}>
                                            <FontAwesomeIcon icon={faFastBackward} /> First
                                        </Button>
                                        <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.prevPage}>
                                            <FontAwesomeIcon icon={faStepBackward} /> Prev
                                        </Button>
                                    </InputGroup.Prepend>
                                    <FormControl className={"page-num bg-dark"} name="currentPage" value={currentPage}
                                        onChange={this.changePage}/>
                                    <InputGroup.Append>
                                        <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.nextPage}>
                                            <FontAwesomeIcon icon={faStepForward} /> Next
                                        </Button>
                                        <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.lastPage}>
                                            <FontAwesomeIcon icon={faFastForward} /> Last
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                        </Card.Footer> : null
                     }
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orderObject: state.order
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteOrder: (orderId) => dispatch(deleteOrder(orderId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);