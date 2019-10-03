import React, {Component} from 'react';
import logo from '../logo.svg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';

/**
 * @class - Header
 * @description - Header that includes navbar and get the size of the cart array from the parent component (BuyCoursesPage)
 */
class Header extends Component {
    render() {
        const {cartSize} = this.props;
        return (
            <nav className="navbar navbar-light bg-light">
                <div className="container">
                    <div className="navbar-brand">
                        <img src={logo} width="30" height="30"
                             className="d-inline-block align-top mr-2" alt=""/>
                        <span className="font-weight-bold">Buy Courses</span>
                    </div>
                    <div className="ml-auto">
                        <button className="btn position-relative">
                            <FontAwesomeIcon icon={faShoppingCart} size="lg"/>
                            {
                                cartSize > 0 && <span
                                    className="badge badge-pill badge-info align-top position-absolute">{cartSize}</span>
                            }
                        </button>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;