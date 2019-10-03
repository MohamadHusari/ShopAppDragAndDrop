import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDown, faArrowUp} from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from "react-tooltip";

class SearchBar extends Component {
    constructor() {
        super();
        this.state = {
            arrow: 'DOWN',
            selectvalue: 'Date',
            currencyselect: 'Choose...'
        };
        this.handleOrder = this.handleOrder.bind(this);
        this.handlerCurrency = this.handlerCurrency.bind(this);
    }

    /**
     * @description - Function that handle the select option and the arrow of order by
     * @param e - event object
     * @param arrow - is which arrow is right now showin the search bar under Sort by
     * @steps -
     * 1) change the select option to selected value in (selectvalue in state object) and update the arrow
     * if changed from the default value "DOWN", after the values changes change sortby and currentPage in parent state object.
     */
    handleOrder = (e, arrow = "DOWN") => {
        e.preventDefault();
        this.setState({
            selectvalue: e.target.value ? e.target.value : this.state.selectvalue,
            arrow
        }, () =>
            this.props.handleChangeStateWithObject({sortby: this.state.selectvalue + arrow, currentPage: 1}))
    };

    /**
     *
     * @param e - event object
     */
    handlerCurrency = (e) => {
        e.preventDefault();
        this.setState({currencyselect:e.target.value}, () =>
            this.props.handleChangeStateWithObject({exchangeto:this.state.currencyselect}))
    };

    render() {
        return (
            <form className="m-3">
                <div className="row">
                    <div className="col-12 col-lg-5 my-1 m-lg-0">
                        <input type="text" className="form-control form-control-sm" placeholder="Search Courses..."
                               onChange={this.props.searchCourses}/>
                    </div>
                    <div className="col-12 col-lg-4 my-1 m-lg-0">
                        <label htmlFor="sort-by" className="col-form-label-sm mx-2 mb-0 pl-2 pl-lg-0">Sort By
                            :</label>
                        <select className="d-inline w-50 form-control form-control-sm"
                                onChange={this.handleOrder} value={this.state.selectvalue}>
                            <option value="Date">Date</option>
                            <option value="Price">Price</option>
                            <option value="Level">Level</option>
                        </select>
                        {this.state.arrow === 'UP' ?
                            <>
                                <span data-tip="ascending" data-for="arrowup" className="mx-2">
                                        <button className="btn btn-outline-dark btn-sm border-0"
                                                onClick={e => {
                                                    this.handleOrder(e)
                                                }
                                                }>
                                            <FontAwesomeIcon icon={faArrowUp}/>
                                        </button>
                                </span>
                                <ReactTooltip id="arrowup" place="right" type="dark" effect="solid"/>
                            </>
                            :
                            <>
                                <span data-tip="descending" data-for="arrowdown" className="mx-2">
                                    <button className="btn btn-outline-dark btn-sm border-0"
                                            onClick={e => {
                                                this.handleOrder(e, "UP")
                                            }}>
                                        <FontAwesomeIcon icon={faArrowDown}/>
                                    </button>
                                    <ReactTooltip id="arrowdown" place="right" type="dark" effect="solid"/>
                                </span>
                            </>
                        }
                    </div>
                    <div className="col-12 col-lg-3 d-flex justify-content-start justify-content-lg-center">
                        <label htmlFor="sort-by" className="col-form-label-sm mx-2 mb-0 pl-2 pl-lg-0">Currency:</label>
                        <select className="d-inline w-50 form-control form-control-sm mt-1 m-lg-0" value={this.state.currencyselect} onChange={this.handlerCurrency}>
                            <option value="Choose...">Choose...</option>
                            <option value="EUR">EUR</option>
                            <option value="ILS">ILS</option>
                            <option value="GBP">GBP</option>
                        </select>
                    </div>
                </div>
            </form>
        );
    }
}

export default SearchBar;
