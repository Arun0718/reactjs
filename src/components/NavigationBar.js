
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignInAlt, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {logoutUser} from '../services/index';

class NavigationBar extends Component {
    logout = () => {
        this.props.logoutUser();
    };

    render() {
        const guestLinks = (
            <>
                <div className="mr-auto"></div>
                <Nav className="navbar-right">
                     <Link to={"login"} className="nav-link"><FontAwesomeIcon icon={faSignInAlt} />  Login</Link>
                     <Link to={"addCustomer"} className="nav-link"><FontAwesomeIcon icon={faSignInAlt} />  Sign Up</Link>
                </Nav>
            </>
        );
        const userLinks = (
            <>
            <div className="mr-auto"></div>
                <Nav className="navbar-center">
                
                    <Link to={"logout"} className="nav-link" onClick={this.logout}><FontAwesomeIcon icon={faSignOutAlt} />  Logout</Link>
                    <Link to={"addSweet"} className="nav-link">Add Sweet</Link>
                    

                   
                </Nav>
               
            </>
        );

        return (
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand">
                Online Sweet Shop
                </Link>
                {this.props.auth.isLoggedIn ? userLinks : guestLinks}
            </Navbar>
        );
    };
};

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logoutUser: () => dispatch(logoutUser())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);