import React from 'react';
import { Helmet } from 'react-helmet';
import {Switch} from "react-router-dom";
import {compose} from 'redux';
import {DateRangePicker} from "react-dates";
import qs from "query-string";
import PropTypes from "prop-types";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {push} from "react-router-redux";
import { FormattedMessage } from 'react-intl';

import messages from "./messages";
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {KEY_APP} from "./constants";
import reducer from "./reducer";
import saga from "./saga";
import RoomDetails from "./RoomDetails";
import RoomsList from "./RoomsList";
import RoomsBooking from "./RoomBooking";
import BookingDetails from "./BookingDetails";
import FancyRoute from "../../components/FancyRoute";
import {setStartEndDate} from "../App/actions";
import {makeSelectEndDate, makeSelectStartDate} from "../App/selectors";

const roomRoutes = [
    {
        title: 'Room Details',
        path: '/rooms/details/:id',
        component: RoomDetails
    },
    {
        title: 'Room Booking',
        path: '/rooms/booking',
        component: RoomsBooking
    },
    {
        title: 'Booking Details',
        path: '/rooms/booking-details/:id',
        component: BookingDetails
    },
    {
        title: 'Rooms List',
        path: '/rooms/',
        exact: true,
        component: RoomsList
    },
];
class RoomApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focusedInput: null,
        };
    }

    componentDidMount() {}

    render() {

        return (
            <>
                <Helmet>
                    <title>Rooms</title>
                    <meta
                        name=""
                        content=""
                    />
                </Helmet>

                <section className="mg-book-now">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <h2 className="mg-bn-title">
                                    <FormattedMessage {...messages.findRoom}/>
                                    <span className="mg-bn-big"><FormattedMessage {...messages.priceAndAvailableRoom}/></span>
                                </h2>
                            </div>
                            <div className="col-lg-9">
                                <div className="mg-bn-forms">
                                    <div className="row">
                                        <div className="col-md-12 col-lg-5">
                                            <div>
                                                <DateRangePicker
                                                    startDate={this.props.startDate} // momentPropTypes.momentObj or null,
                                                    startDateId="startDate" // PropTypes.string.isRequired,
                                                    endDate={this.props.endDate} // momentPropTypes.momentObj or null,
                                                    endDateId="endDate" // PropTypes.string.isRequired,
                                                    onDatesChange={({ startDate, endDate }) => this.props.setStartEndDate({ startDate, endDate })} // PropTypes.func.isRequired,
                                                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-12 col-lg-3">
                                            <button className="btn btn-main btn-block" type="button" onClick={() => {
                                                const query = { startDate: this.props.startDate, endDate: this.props.endDate };
                                                const searchString = qs.stringify(query);
                                                this.props.goTo({ pathname: '/rooms/booking', search: searchString });
                                            }}><FormattedMessage {...messages.checkNow}/></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Switch>
                    {roomRoutes.map((route, i) =>
                        <FancyRoute key={i} {...route} />
                    )}
                </Switch>
            </>
        );
    }
}

RoomApp.propTypes = {
    goTo: PropTypes.func,
    setStartEndDate: PropTypes.func,
    startDate: PropTypes.any,
    endDate: PropTypes.any,
};

export function mapDispatchToProps(dispatch) {
    return {
        goTo: (obj) => dispatch(push(obj)),
        setStartEndDate: (dateObj) => dispatch(setStartEndDate(dateObj)),
    };
}
const mapStateToProps = createStructuredSelector({
    startDate: makeSelectStartDate(),
    endDate: makeSelectEndDate(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({key: KEY_APP, reducer});
const withSaga = injectSaga({key: KEY_APP, saga});

export default compose(
    withReducer,
    withSaga,
    withConnect
)(RoomApp);
