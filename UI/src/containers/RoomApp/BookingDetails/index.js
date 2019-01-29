import React from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import {createStructuredSelector} from "reselect";
import moment from "moment";
import {FormattedMessage} from "react-intl";

import messages from '../messages';
import {getBookingDetails} from "../actions";
import {makeSelectBookingDetails, makeSelectData} from "../selectors";

class BookingDetails extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.match.params.id) {
            this.props.getBookingDetails(this.props.match.params.id);
        }
    }

    render() {
        return (
            <>
                <div className={'container'}>
                    <div className={'row'}>
                        <div className={'col-12'}>
                            <div className="mg-cart-container mg-paid">
                                <aside className="mg-widget mt50" id="mg-room-cart">
                                    <h2 className="mg-widget-title"><FormattedMessage {...messages.bookingDetails}/></h2>
                                    <div className="mg-widget-cart">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="mg-cart-room">
                                                    <img className="img-fluid" src={this.props.data.imgs[0]} alt={this.props.data.name}/>
                                                    <h3>{this.props.data.name}</h3>
                                                    <p>{this.props.data.description}</p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <h3 className="mg-payment-id">
                                                    <FormattedMessage {...messages.yourBooking}
                                                                      values={{bookingId: this.props.bookingObj._id}}/>
                                                    </h3>
                                                <div className="mg-widget-cart-row">
                                                    <strong><FormattedMessage {...messages.checkIn}/> </strong>
                                                    <span>{moment(this.props.bookingObj.startDate).format('DD/MM/YYYY')}</span>
                                                </div>
                                                <div className="mg-widget-cart-row">
                                                    <strong><FormattedMessage {...messages.checkOut}/> </strong>
                                                    <span>{moment(this.props.bookingObj.endDate).format('DD/MM/YYYY')}</span>
                                                </div>
                                                <div className="mg-widget-cart-row">
                                                    <strong><FormattedMessage {...messages.email}/> </strong>
                                                    <span>{this.props.bookingObj.clientEmail}</span>
                                                </div>
                                                <div className="mg-widget-cart-row">
                                                    <strong><FormattedMessage {...messages.phone}/> </strong>
                                                    <span>{this.props.bookingObj.clientPhone}</span>
                                                </div>
                                                <div className="mg-cart-total">
                                                    <strong><FormattedMessage {...messages.total}/> </strong>
                                                    <span>${this.props.data.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

BookingDetails.propTypes = {
    bookingObj: PropTypes.object,
    data: PropTypes.object,
    getBookingDetails: PropTypes.func,
};
export function mapDispatchToProps(dispatch) {
    return {
        getBookingDetails: (id) => dispatch(getBookingDetails(id)),
    };
}
const mapStateToProps = createStructuredSelector({
    bookingObj: makeSelectBookingDetails(),
    data: makeSelectData(),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BookingDetails);
