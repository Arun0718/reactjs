import React,{Component} from 'react';

import {connect} from 'react-redux';
import {saveSweet,fetchSweet,updateSweet,fetchLanguages,fetchGenres} from '../../services/index';
import {Card, Form, Button, Col, InputGroup, Image} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';

class Sweet extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            genres: [],
            languages : [],
            show : false
        };
        this.sweetChange = this.sweetChange.bind(this);
        this.submitSweet = this.submitSweet.bind(this);
    }

    initialState = {
        id:'', title:'', author:'', coverPhotoURL:'', isbnNumber:'', price:'', language:'', genre:''
    };

    componentDidMount() {
        const sweetId = +this.props.match.params.id;
        if(sweetId) {
            this.findSweetById(sweetId);
        }
        this.findAllLanguages();
    }

    findAllLanguages = () => {
        this.props.fetchLanguages();
        setTimeout(() => {
            let sweetLanguages = this.props.sweetObject.languages;
            if(sweetLanguages) {
                this.setState({
                    languages: [{value:'', display:'Select Language'}]
                        .concat(sweetLanguages.map(language => {
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
            let sweetGenres = this.props.sweetObject.genres;
            if(sweetGenres) {
                this.setState({
                    genres: [{value:'', display:'Select Genre'}]
                        .concat(sweetGenres.map(genre => {
                            return {value:genre, display:genre}
                        }))
                });
            }
        }, 100);
    };

    findSweetById = (sweetId) => {
        this.props.fetchBook(sweetId);
        setTimeout(() => {
            let sweet = this.props.sweetObject.sweet;
            if(sweet != null) {
                this.setState({
                    id: sweet.id,
                    title: sweet.title,
                    author: sweet.author,
                    coverPhotoURL: sweet.coverPhotoURL,
                    isbnNumber: sweet.isbnNumber,
                    price: sweet.price,
                    language: sweet.language,
                    genre: sweet.genre
                });
            }
        }, 1000);
    };

    resetSweet = () => {
        this.setState(() => this.initialState);
    };

    submitSweet = event => {
        event.preventDefault();

        const sweet = {
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language,
            genre: this.state.genre
        };

        this.props.saveSweet(sweet);
        setTimeout(() => {
            if(this.props.sweetObject.sweet != null) {
                this.setState({"show":true, "method":"post"});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        }, 2000);
        this.setState(this.initialState);
    };

    updateSweet = event => {
        event.preventDefault();

        const sweet = {
            id: this.state.id,
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language,
            genre: this.state.genre
        };
        this.props.updateSweet(sweet);
        setTimeout(() => {
            if(this.props.sweetObject.sweet != null) {
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        }, 2000);
        this.setState(this.initialState);
    };

    sweetChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    sweetList = () => {
        return this.props.history.push("/list");
    };

    render() {
        const {title, author, coverPhotoURL, isbnNumber, price, language, genre} = this.state;

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
                            <Form.Group as={Col} controlId="formGridLanguage">
                                    <Form.Label>Category Name</Form.Label>
                                    <Form.Control required as="select"
                                        custom onChange={this.sweetChange}
                                        name="language" value={language}
                                        className={"bg-dark text-white"}>
                                        {this.state.languages.map(language =>
                                            <option key={language.value} value={language.value}>
                                                {language.display}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Product Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="title"
                                        value={title} onChange={this.sweetChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Product Name" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridAuthor">
                                    <Form.Label>Product Rate</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="author"
                                        value={author} onChange={this.sweetChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Product Rate" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                
                                <Form.Group as={Col} controlId="formGridISBNNumber">
                                    <Form.Label>Offer Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="isbnNumber"
                                        value={isbnNumber} onChange={this.sweetChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Offer Name" />
                                </Form.Group>
                            
                                <Form.Group as={Col} controlId="formGridPrice">
                                    <Form.Label>Offer Price</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="price"
                                        value={price} onChange={this.sweetChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Offer Price" />
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
};

const mapStateToProps = state => {
    return {
        sweetObject: state.sweet
    };
};
const mapDispatchToProps = dispatch => {
    return {
        saveSweet: (sweet) => dispatch(saveSweet(sweet)),
        fetchSweet: (sweetId) => dispatch(fetchSweet(sweetId)),
        updateSweet: (sweet) => dispatch(updateSweet(sweet)),
        fetchLanguages: () => dispatch(fetchLanguages()),
        fetchGenres: () => dispatch(fetchGenres())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sweet);