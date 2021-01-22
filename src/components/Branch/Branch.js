import React,{Component} from 'react';

import {connect} from 'react-redux';
import {saveBranch,fetchBranch,updateBranch,fetchLanguages,fetchGenres} from '../../services/index';
import {Card, Form, Button, Col, InputGroup, Image} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from '../MyToast';

class Branch extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state = {
            genres: [],
            languages : [],
            show : false
        };
        this.branchChange = this.branchChange.bind(this);
        this.submitBranch = this.submitBranch.bind(this);
    }

    initialState = {
        id:'', title:'', author:'', coverPhotoURL:'', isbnNumber:'', price:'', language:'', genre:''
    };

    componentDidMount() {
        const branchId = +this.props.match.params.id;
        if(branchId) {
            this.findBranchById(branchId);
        }
       // this.findAllLanguages();
    }

    // findAllLanguages = () => {
    //     this.props.fetchLanguages();
    //     setTimeout(() => {
    //         let branchLanguages = this.props.branchObject.languages;
    //         if(branchLanguages) {
    //             this.setState({
    //                 languages: [{value:'', display:'Select Language'}]
    //                     .concat(branchLanguages.map(language => {
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
            let branchGenres = this.props.branchObject.genres;
            if(branchGenres) {
                this.setState({
                    genres: [{value:'', display:'Select Genre'}]
                        .concat(branchGenres.map(genre => {
                            return {value:genre, display:genre}
                        }))
                });
            }
        }, 100);
    };

    findBranchById = (branchId) => {
        this.props.fetchBook(branchId);
        setTimeout(() => {
            let branch = this.props.branchObject.branch;
            if(branch != null) {
                this.setState({
                    id: branch.id,
                    title: branch.title,
                    author: branch.author,
                    coverPhotoURL: branch.coverPhotoURL,
                    isbnNumber: branch.isbnNumber,
                    price: branch.price,
                    language: branch.language,
                    genre: branch.genre
                });
            }
        }, 1000);
    };

    resetBranch = () => {
        this.setState(() => this.initialState);
    };

    submitBranch = event => {
        event.preventDefault();

        const branch = {
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language,
            genre: this.state.genre
        };

        this.props.saveBranch(branch);
        setTimeout(() => {
            if(this.props.branchObject.branch != null) {
                this.setState({"show":true, "method":"post"});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        }, 2000);
        this.setState(this.initialState);
    };

    updateBranch = event => {
        event.preventDefault();

        const branch = {
            id: this.state.id,
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language,
            genre: this.state.genre
        };
        this.props.updateBranch(branch);
        setTimeout(() => {
            if(this.props.branchObject.branch != null) {
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        }, 2000);
        this.setState(this.initialState);
    };

    branchChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    branchList = () => {
        return this.props.history.push("/list");
    };

    render() {
        const {title, author, coverPhotoURL, isbnNumber, price, language, genre} = this.state;

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
                                        type="test" name="title"
                                        value={title} onChange={this.branchChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter the branch city" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridAuthor">
                                    <Form.Label>Branch State</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="author"
                                        value={author} onChange={this.branchChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter the branch state" />
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
};

const mapStateToProps = state => {
    return {
        branchObject: state.branch
    };
};
const mapDispatchToProps = dispatch => {
    return {
        saveBranch: (branch) => dispatch(saveBranch(branch)),
        fetchBranch: (branchId) => dispatch(fetchBranch(branchId)),
        updateBranch: (branch) => dispatch(updateBranch(branch)),
        fetchLanguages: () => dispatch(fetchLanguages()),
        fetchGenres: () => dispatch(fetchGenres())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Branch);