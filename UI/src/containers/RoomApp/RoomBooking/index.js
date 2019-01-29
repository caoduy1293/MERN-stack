import React from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import {createStructuredSelector} from "reselect";
import qs from "query-string";
import moment from "moment";
import $ from 'jquery';
import {FormattedMessage} from "react-intl";

import messages from '../messages';
import room1 from '../../../assets/images/room-1.png';
import {getData, getListDataAvailable, makeBooking} from "../actions";
import {makeLoading, makeSelectData, makeBookedObj, makeSelectListAvailableData} from "../selectors";
import {makeSelectEndDate, makeSelectStartDate, makeSelectLocation} from "../../App/selectors";
import {setStartEndDate} from "../../App/actions";

const tabControl = {
    selectRoom: 'selectRoom',
    selectRoomTab: 'selectRoomTab',
    personalInfo: 'personalInfo',
    personalInfoTab: 'personalInfoTab',
    thankyou: 'thankyou',
    thankyouTab: 'thankyouTab',
};

class RoomsBooking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: {
                _id: '',
                name: '',
                description: '',
                endDate: '',
                startDate: '',
                quantity: 1,
                price: 0,
                imgs: [],
                clientFirstName: '',
                clientLastName: '',
                clientPhone: '',
                clientEmail: '',
                customerNote: '',
                adminNote: '',
                roomId: '',
                statusValue: 0
            },
            disableNext: true,
            disableThankyou: true,
        };
        this.selectRoom = this.selectRoom.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.successBooking = this.successBooking.bind(this);
    }

    componentDidMount() {
        let filterAvailable = {
            startDate: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).startDate,
            endDate: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).endDate,
        };
        if(filterAvailable.startDate && filterAvailable.endDate) {
            filterAvailable.startDate = moment(filterAvailable.startDate).utc();
            filterAvailable.endDate = moment(filterAvailable.endDate).utc();
            this.props.getListDataAvailable(filterAvailable);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            let filterAvailable = {
                startDate: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).startDate,
                endDate: qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).endDate,
            };
            if(filterAvailable.startDate && filterAvailable.endDate) {
                filterAvailable.startDate = moment(filterAvailable.startDate).utc();
                filterAvailable.endDate = moment(filterAvailable.endDate).utc();
                this.props.getListDataAvailable(filterAvailable);
            }
        }
    }

    handleChange (evt) {
        this.setState({
            selectedItem: {
                ...this.state.selectedItem,
                [evt.target.name]: evt.target.value
            }
        });
    }

    selectRoom(idRoom) {
        this.props.getRoom(idRoom);
        this.setState({
            disableNext: false
        }, ()=> {
            $(`a#${tabControl.personalInfo}`).tab('show');
        });
    }

    handleSubmit() {
        let dtoObj = {
            startDate: moment.utc(this.props.startDate).utc(),
            endDate: moment.utc(this.props.endDate).utc(),
            roomId: this.props.data._id,
            customerNote: this.state.selectedItem.customerNote,
            clientFirstName: this.state.selectedItem.clientFirstName,
            clientLastName: this.state.selectedItem.clientLastName,
            clientPhone: this.state.selectedItem.clientPhone,
            clientEmail: this.state.selectedItem.clientEmail,
        };
        this.props.makeBooking(dtoObj, this.successBooking);

    }

    successBooking() {
        this.setState({
            disableThankyou: false
        }, () => {
            $(`a#${tabControl.thankyou}`).tab('show');
            this.props.setStartEndDate({startDate: null, endDate: null});
        });
    }

    handleBack(evt) {
        evt.preventDefault();
        $(`a#${tabControl.selectRoom}`).tab('show');
    }

    render() {
        return (
            <>
                <div className="mg-page">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="mg-booking-form">
                                    <ul className="nav nav-tabs" role="tablist" id="tabReservation">
                                        <li className="nav-item" role="presentation">
                                            <a id={tabControl.selectRoom} className="nav-link active show"
                                               href={`#${tabControl.selectRoomTab}`} aria-controls="select-room"
                                               role="tab" data-toggle="tab">
                                            <span className="mg-bs-tab-num">1</span><span className="mg-bs-bar"/>
                                                <FormattedMessage {...messages.chooseRoomStep}/>
                                            </a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a id={tabControl.personalInfo}
                                               className={this.state.disableNext ? 'nav-link disabled' : 'nav-link'}
                                               href={`#${tabControl.personalInfoTab}`}
                                               aria-controls="personal-info" role="tab" data-toggle="tab">
                                            <span className="mg-bs-tab-num">2</span><span className="mg-bs-bar"/>
                                                <FormattedMessage {...messages.personalInfoStep}/>
                                            </a>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <a id={tabControl.thankyou} className={this.state.disableThankyou ? 'nav-link disabled' : 'nav-link'}
                                               href={`#${tabControl.thankyouTab}`} aria-controls="thank-you" role="tab" data-toggle="tab">
                                                <span className="mg-bs-tab-num">3</span>
                                                <FormattedMessage {...messages.completeStep}/>
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div className="tab-pane fade show active" id={tabControl.selectRoomTab} role="tabpanel">
                                            {
                                                this.props.ListAvailable.map((data, index) => {
                                                    return (
                                                        <div key={index} className="mg-available-rooms">
                                                            <div className="mg-avl-room">
                                                                <div className="row">
                                                                    <div className="col-sm-5"><a href="#">
                                                                        <img className="img-fluid" src={room1} alt=""/></a></div>
                                                                    <div className="col-sm-7">
                                                                        <h3 className="mg-avl-room-title">
                                                                            <a href="#">{data.name}</a>
                                                                            <span>
                                                                                ${data.price}
                                                                            {/*/Night*/}
                                                                            </span>
                                                                        </h3>
                                                                        <p>{data.description}</p>
                                                                        <div className="row mg-room-fecilities">
                                                                            <div className="col-sm-12">
                                                                                <ul>
                                                                                    {
                                                                                        data.services.map((data, index) => {
                                                                                            return (<li key={index}><i className="fp-ht-bed"/>
                                                                                                {data.label}</li>);
                                                                                        })
                                                                                    }
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                        <div className="nav">
                                                                            <button className="btn btn-main btn-next-tab" type="button"
                                                                            onClick={() => {this.selectRoom(data._id)}}>
                                                                                <FormattedMessage {...messages.chooseThisRoom}/>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>

                                        <div className="tab-pane fade" id={tabControl.personalInfoTab} role="tabpanel">
                                            <div className="row">
                                                <div className="col-lg-8">
                                                    <div className="mg-book-form-personal">
                                                        <h2 className="mg-sec-left-title">
                                                            <FormattedMessage {...messages.personalInfoStep}/>
                                                        </h2>
                                                        <div className="row pb40">
                                                            <div className="col-lg-12">
                                                                <div className="mg-book-form-input">
                                                                    <label><FormattedMessage {...messages.firstName}/></label>
                                                                    <input className="form-control" type="text" name={'clientFirstName'}
                                                                           onChange={this.handleChange} required=""
                                                                           value={this.state.selectedItem.clientFirstName}/>
                                                                </div>
                                                                <div className="mg-book-form-input">
                                                                    <label><FormattedMessage {...messages.lastName}/></label>
                                                                    <input className="form-control" type="text" name={'clientLastName'}
                                                                           onChange={this.handleChange} required=""
                                                                           value={this.state.selectedItem.clientLastName}/>
                                                                </div>
                                                            </div>
                                                            <div className="col-lg-12">
                                                                <div className="mg-book-form-input">
                                                                    <label><FormattedMessage {...messages.phone}/></label>
                                                                    <input className="form-control" type="tel" name={'clientPhone'}
                                                                           onChange={this.handleChange}
                                                                           required="" value={this.state.selectedItem.clientPhone}/>
                                                                </div>
                                                                <div className="mg-book-form-input">
                                                                    <label><FormattedMessage {...messages.email}/></label>
                                                                    <input className="form-control" type="email" name={'clientEmail'}
                                                                           onChange={this.handleChange}
                                                                           required="" value={this.state.selectedItem.clientEmail}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <h2 className="mg-sec-left-title">
                                                            <FormattedMessage {...messages.extraInfo}/>
                                                        </h2>
                                                        <div className="row pb40">
                                                            <div className="col-lg-12">
                                                                <div className="mg-book-form-input">
                                                                    <label><FormattedMessage {...messages.note}/></label>
                                                                    <textarea className="form-control" name={'customerNote'}
                                                                           onChange={this.handleChange}
                                                                           value={this.state.selectedItem.customerNote}/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/*<div className="clearfix mg-terms-input">*/}
                                                            {/*<div className="float-left">*/}
                                                                {/*<label>*/}
                                                                    {/*<input type="checkbox"/> By Sign up you are agree*/}
                                                                        {/*with our <Link to="/">terms and condition</Link>*/}
                                                                {/*</label>*/}
                                                            {/*</div>*/}
                                                        {/*</div>*/}
                                                        <div className="nav justify-content-between">
                                                            <button className="btn btn-default btn-prev-tab" type="button" onClick={this.handleBack}>
                                                                <FormattedMessage {...messages.back}/>
                                                            </button>
                                                            <button className="btn btn-lg btn-success btn-next-tab text-white"
                                                                    type="button" onClick={this.handleSubmit}>
                                                                <FormattedMessage {...messages.book}/>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4">
                                                    <div className="mg-cart-container">
                                                        <aside className="mg-widget mt50" id="mg-room-cart">
                                                            <h2 className="mg-widget-title">
                                                                <FormattedMessage {...messages.bookingDetails}/>
                                                            </h2>
                                                            <div className="mg-widget-cart">
                                                                <div className="mg-cart-room"><img className="img-fluid"
                                                                                                   src={room1}/>
                                                                    <h3>{this.props.data.name}</h3>
                                                                </div>
                                                                <div className="mg-widget-cart-row">
                                                                    <strong><FormattedMessage {...messages.checkIn}/></strong>
                                                                    <span>{moment(this.props.startDate).format('DD/MM/YYYY')}</span>
                                                                </div>
                                                                <div className="mg-widget-cart-row">
                                                                    <strong><FormattedMessage {...messages.checkOut}/></strong>
                                                                    <span>{moment(this.props.endDate).format('DD/MM/YYYY')}</span>
                                                                </div>
                                                                <div className="mg-cart-total">
                                                                    <strong><FormattedMessage {...messages.total}/></strong>
                                                                    <span>${this.props.data.price}</span></div>
                                                            </div>
                                                        </aside>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tab-pane fade" id={tabControl.thankyouTab} role="tabpanel">
                                            <div className="alert alert-success alert-dismissible clearfix">
                                                <button className="close" type="button" data-dismiss="alert"
                                                        aria-label="Close"><span aria-hidden="true">×</span></button>
                                                <div className="mg-alert-icon"><i className="fa fa-check"/></div>
                                                <h3 className="mg-alert-payment">
                                                    <FormattedMessage {...messages.thanksBooking}
                                                        values={{userName: `${this.props.bookedObj.clientFirstName} ${this.props.bookedObj.clientLastName}`}}/>

                                                </h3>
                                            </div>
                                            <div className="mg-cart-container mg-paid">
                                                <aside className="mg-widget mt50" id="mg-room-cart">
                                                    <h2 className="mg-widget-title"><FormattedMessage {...messages.bookingDetails}/></h2>
                                                    <div className="mg-widget-cart">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="mg-cart-room">
                                                                    <img className="img-fluid" src="assets/images/room-1.png" alt={this.props.data.name}/>
                                                                    <h3>{this.props.data.name}</h3>
                                                                    <p>{this.props.data.description}</p>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <h3 className="mg-payment-id">
                                                                    <FormattedMessage {...messages.yourBooking}
                                                                values={{bookingId: this.props.bookedObj._id}}/>
                                                                </h3>
                                                                <div className="mg-widget-cart-row">
                                                                    <strong><FormattedMessage {...messages.checkIn}/> </strong>
                                                                    <span>{moment(this.props.bookedObj.startDate).format('DD/MM/YYYY')}</span>
                                                                </div>
                                                                <div className="mg-widget-cart-row">
                                                                    <strong><FormattedMessage {...messages.checkOut}/> </strong>
                                                                    <span>{moment(this.props.bookedObj.endDate).format('DD/MM/YYYY')}</span>
                                                                </div>
                                                                <div className="mg-widget-cart-row">
                                                                    <strong><FormattedMessage {...messages.email}/> </strong>
                                                                    <span>{this.props.bookedObj.clientEmail}</span>
                                                                </div>
                                                                <div className="mg-widget-cart-row">
                                                                    <strong><FormattedMessage {...messages.phone}/> </strong>
                                                                    <span>{this.props.bookedObj.clientPhone}</span>
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
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

RoomsBooking.propTypes = {
    loading: PropTypes.bool,
    startDate: PropTypes.any,
    endDate: PropTypes.any,
    location: PropTypes.any,
    data: PropTypes.object,
    ListAvailable: PropTypes.array,
    bookedObj: PropTypes.object,
    getRoom: PropTypes.func,
    makeBooking: PropTypes.func,
    getListDataAvailable: PropTypes.func,
    setStartEndDate: PropTypes.func,
};
export function mapDispatchToProps(dispatch) {
    return {
        getRoom: (id) => dispatch(getData(id)),
        getListDataAvailable: (filterObj) => dispatch(getListDataAvailable(filterObj)),
        setStartEndDate: (dateObj) => dispatch(setStartEndDate(dateObj)),
        makeBooking: (bookingObj, cb) => dispatch(makeBooking(bookingObj, cb))
    };
}
const mapStateToProps = createStructuredSelector({
    data: makeSelectData(),
    ListAvailable: makeSelectListAvailableData(),
    loading: makeLoading(),
    bookedObj: makeBookedObj(),
    startDate: makeSelectStartDate(),
    endDate: makeSelectEndDate(),
    location: makeSelectLocation(),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RoomsBooking);
