import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCartPlus} from '@fortawesome/free-solid-svg-icons';

class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            read: true,
        };
        this.buttonref = React.createRef();
        this.print = this.print.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
        this.handleReadMoreAndLess = this.handleReadMoreAndLess.bind(this);
    }

    /**
     *
     */
    componentDidMount() {
        this.setState({
            show: this.props.isInCard
        });
    };

    /**
     *
     * @param prevProps - The pervious props of the component
     * @description - componentDidUpdate needed because isInCard is value from props that inserted in show key (in state object)
     * and this value there is no any function that changed it because the component cannot do a render
     */
    componentDidUpdate(prevProps) {
        if (this.props.isInCard !== prevProps.isInCard) // Check if it's still in card isInCard
        {
            this.setState({
                show: this.props.isInCard
            });
        }
    };

    /**
     *
     * @description - Function to handle the Read more / Read less button
     * @steps:
     * 1) Send reference to closeOpenDescription function in BuyCoursesPage component
     * 2) Change the read value in state object
     */
    handleReadMoreAndLess = () => {
        this.props.closeOpenDescription(this.buttonref);
        this.setState({
            read: !this.state.read
        })
    };

    /**
     *
     * @description - Function to print Description with limitation of letters that shows in description <p>
     * @steps:
     * 1) Cut the description text and holds it in substring variable
     * 2) Check IF it's a text is course description or course title
     *  2.1) is course description return the substring of description and button (read more/ read less)
     */
    print = (text, size = 35) => {
        const substring =
            text.length > size ?
                text[size - 1] === " " ?
                    text.substr(0, size - 1) + ' ...'
                    :
                    text.substr(0, size) + '...'
                :
                text;
        return (
            <>
                {this.state.read ? substring : text}{size !== 35 &&
            <button ref={this.buttonref} className="btn btn-sm btn-link"
                    onClick={this.handleReadMoreAndLess}>{this.state.read ? "Read more" : "Read less"}</button>}
            </>
        );
    };

    /**
     *
     * @description - Change to trash icon with show variable in state object
     * and use addToCart function from parent component (BuyCoursesPage) that add course in cart array
     */
    handleAddToCart = (index) => {
        this.setState({show: true});
        this.props.addToCart(index);
    };

    /**
     *
     * @description - Change to cart icon with show variable in state object
     * and use removeFromCart function from parent component (BuyCoursesPage) that remove course from cart array
     */
    handleRemoveFromCart = (id) => {
        this.setState({show: false});
        this.props.removeFromCart(id);
    };

    setRef = ref => {
        // keep a reference to the dom ref as an instance property
        this.ref = ref;
        // give the dom ref to react-beautiful-dnd
        this.props.innerRef(ref);
    };

    render() {
        const { provided } = this.props;
        const course = this.props.children;
        const {exChangeValues, exChangeTo, index} = this.props;
        return (
            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={this.setRef} className="course-card col-12 col-md-6 my-2">
                <div className="card border-0 shadow-sm bg-light">
                    <div className="card-body">
                        <h5 className="card-title">{this.print(course.name)}</h5>
                        {/*<h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>*/}
                        <p className="card-text">{this.print(course.description, 110)}</p>
                        <p className="card-text card-price m-0">{course.price}$
                            {exChangeValues !== null && exChangeTo !== 'Choose...' && exChangeValues[exChangeTo] &&
                            <small
                                className="pl-1">({(course.price * exChangeValues[exChangeTo]).toFixed(2)} {exChangeTo})</small>
                            }
                        </p>
                    </div>
                    <div className="card-footer bg-transparent border-0 clearfix">
                        <small className="text-muted">
                            Level: {course.level} - {course.added_date}
                        </small>
                        <div className="float-right">
                            {!this.state.show &&
                                <button
                                    className={`btn btn-outline-primary btn-sm ${this.state.show ? '' : 'show'}`}
                                    onClick={() => this.handleAddToCart(index)}>
                                    <FontAwesomeIcon icon={faCartPlus}/>
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Course;