import React, {Component} from 'react';
import isEmpty from 'lodash.isempty';
import ReactTooltip from 'react-tooltip'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import {Droppable, Draggable} from 'react-beautiful-dnd';

class Cart extends Component {
    constructor() {
        super();
        this.state = {
            editmode: false
        };
        this.handleEditModeChange = this.handleEditModeChange.bind(this);
    }

    /**
     * @description - Change Toggle turn on and turn off for edit mode toggle
     */
    handleEditModeChange = () => {
        this.setState({editmode: !this.state.editmode})
    };

    /**
     * @description - function to handle the small button on every cart course row
     * Use the removeFromCart function from Parent component (BuyCoursesPage) to remove the course by the course id
     * @param e - event object
     */
    handleSmallRemoveButton = (e) => {
        this.props.removeFromCart(e.target.closest('li').value);
    };

    render() {
        const {cartList, exChangeValues, exChangeTo} = this.props;
        let sum = 0;
        return (
            <aside id="cart" className="sticky-top">
                <div className="clearfix">
                    <h3 className="d-inline font-weight-light h5">Cart</h3>
                    {!isEmpty(cartList) &&
                    <div className="float-right">
                        <span data-tip="Edit mode" data-for="editmode">
                            <Toggle className="bg-light"
                                    defaultChecked={this.state.editmode}
                                    onChange={this.handleEditModeChange}/>
                        </span>
                        <ReactTooltip id="editmode" type="dark" effect="solid"/>
                    </div>
                    }
                    {!isEmpty(cartList) && this.state.editmode &&
                    <div className="float-right">
                        <span data-tip="Clear all" data-for="clearall">
                            <button type="button" className="btn btn-sm text-uppercase"
                                    onClick={() => this.props.clearCartPopup('Are you sure?', 'You won\'t be able to revert this!', 'warning')}>
                            <FontAwesomeIcon icon={faTrashAlt} size="lg"/>
                            </button>
                        </span>
                        <ReactTooltip id="clearall" type="dark" effect="solid"/>
                    </div>
                    }
                </div>
                <Droppable droppableId="droppable2">
                    {provided => (
                        <div {...provided.droppableProps} ref={provided.innerRef} className="card bg-light border-0 p-2 shadow-sm">
                            <ul className="list-unstyled">
                                {
                                    this.props.loading ?
                                        <div className="text-center">
                                            <div className="spinner-border" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        </div>
                                        :
                                        isEmpty(cartList) ?
                                            <span className="d-block text-center text-muted text-uppercase">Cart is Empty</span>
                                            :
                                            cartList.map((course,i) => {
                                                sum += parseFloat(course.price);
                                                return (
                                                    <Draggable key={course.id} draggableId={course.id} index={i}>
                                                        {provided => {
                                                            const onDragStart = (() => {
                                                            // dragHandleProps might be null
                                                                sum = 0;
                                                            if (!provided.dragHandleProps) {
                                                            return onDragStart;
                                                            }

                                                            // creating a new onMouseDown function that calls myOnMouseDown as well as the drag handle one.
                                                            return event => {
                                                            provided.dragHandleProps.onDragStart(event);
                                                                };
                                                        })();
                                                            return (<li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onDragStart={onDragStart} value={i}
                                                                className="d-flex justify-content-between align-items-center py-2">
                                                                <span className="course-title pl-1">
                                                                    {course.name}
                                                                </span>
                                                                <span className="course-price">
                                                                    {course.price}$
                                                                </span>
                                                                {this.state.editmode &&
                                                                <>
                                                                        <span data-tip="Remove" data-for="removeone">
                                                                            <button type="button" className="btn btn-sm text-danger"
                                                                                    onClick={this.handleSmallRemoveButton}>
                                                                                <FontAwesomeIcon icon={faTrashAlt} size="sm"/>
                                                                            </button>
                                                                        </span>
                                                                    <ReactTooltip id="removeone" place="right" type="dark"
                                                                                  effect="solid"/>
                                                                </>
                                                                }
                                                            </li>
                                                        );
                                                        }}
                                                    </Draggable>
                                                );
                                            })
                                }
                            </ul>
                            <p className="d-flex justify-content-between align-items-center mb-0 py-2">
                                <span className="course-title">
                                    Total
                                </span>
                                <span className="cart-total-price">
                                    {sum.toFixed(2)}$
                                    {sum !== 0 && exChangeValues !== null && exChangeTo !== 'Choose...' && exChangeValues[exChangeTo] &&
                                    <small
                                        className="pl-1">({(sum * exChangeValues[exChangeTo]).toFixed(2)} {exChangeTo})</small>
                                    }
                                </span>
                            </p>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </aside>
        );
    }

}

export default Cart;