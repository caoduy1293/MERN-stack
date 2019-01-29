/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {DateRangePicker} from "react-dates";
import { push } from 'react-router-redux';
import qs from 'query-string';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {getRooms, getPartners, getServices} from "./actions";
import {makeLoading, makeSelectRooms, makeSelectPartners, makeSelectServices} from "./selectors";
import {KEY_APP} from "./constants";
import {makeSelectStartDate, makeSelectEndDate} from "../App/selectors";
import {setStartEndDate} from "../App/actions";
import reducer from "./reducer";
import saga from "./saga";
import CarouselImages from '../../components/CarouselImages';
import room1 from "../../assets/images/room-1.png";
import messages from './messages';

export class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focusedInput: null,
        };
    }

    componentDidMount() {
        this.props.getRooms();
        this.props.getPartners();
        this.props.getServices();
    }

    render() {

        return (
            <>

                <Helmet>
                    <title>Home Page</title>
                    <meta
                        name="description"
                        content="Home Page"
                    />
                </Helmet>
                <CarouselImages/>

                <section className="mg-book-now">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <h2 className="mg-bn-title">
                                    <FormattedMessage {...messages.findRoom} />

                                    <span className="mg-bn-big"><FormattedMessage {...messages.priceAndAvailableRoom} /></span>
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
                                                this.props.redirect({ pathname: '/rooms/booking', search: searchString });
                                            }}><FormattedMessage {...messages.checkNow} /></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mg-best-rooms">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="mg-sec-title undefined">
                                    <h1><FormattedMessage {...messages.roomsTitle} /></h1>
                                    <p><FormattedMessage {...messages.roomsSubTitle} /></p>
                                </div>
                                <div className="row">
                                    {
                                        this.props.rooms.map((item, index) => {
                                            return (
                                                <div className="col-md-4" key={index}>
                                                    <figure className="mg-room "><img className="img-fluid"
                                                                                      src={room1} alt="img11"/>
                                                        <figcaption>
                                                            <h2>{item.name}</h2>
                                                            <div className="mg-room-rating"><i className="fa fa-star"> </i> 5.0

                                                            </div>
                                                            <div className="mg-room-price">{item.price}<sup>/Night</sup></div>
                                                            <div className="row mg-room-fecilities">
                                                                <div className="col-md-12">
                                                                    <ul>
                                                                        {
                                                                            item.services.map((item, index) => (<li key={index}><i className="fp-ht-bed"/> {item.label}</li>))
                                                                        }
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                            <Link className="btn btn-link" to={'/rooms/details/' + item._id}>
                                                                View Details <i className="fa fa-angle-double-right"/>
                                                            </Link>
                                                            <Link className="btn btn-main" to={'/rooms/booking'}>Book</Link>
                                                        </figcaption>
                                                    </figure>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mg-about parallax">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-7">
                                <h1 className="mg-sec-left-title">SHINEE</h1>
                                <p><FormattedMessage {...messages.videoDescription} /></p>
                                <p><FormattedMessage {...messages.videoDescriptionExtra} /></p>
                                <Link className="btn btn-link" to={'/news'}><FormattedMessage {...messages.viewNews} /></Link>
                            </div>
                            <div className="col-lg-5">
                                <div className="video-responsive">
                                    <iframe src="video/shinee.mp4" width="500" height="281"
                                            frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true"
                                            allowFullScreen/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mg-features">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="mg-sec-title undefined">
                                    <h1><FormattedMessage {...messages.serviceTitle} /></h1>
                                    <p><FormattedMessage {...messages.serviceSubTitle} /></p>
                                </div>
                                <div className="row">
                                    {
                                        this.props.services.filter(item => item.isGlobal).map((item, index) => {
                                            return (
                                                <div className="col-md-4" key={index}>
                                                    <div className="mg-feature">
                                                        <div className="mg-feature-icon-title"><i className="fa fa-thumbs-up"/>
                                                            <h3>{item.name}</h3>
                                                        </div>
                                                        <p>{item.description}</p>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </>
        );
    }
}

HomePage.propTypes = {
    loading: PropTypes.bool,
    rooms: PropTypes.array,
    startDate: PropTypes.any,
    endDate: PropTypes.any,
    partners: PropTypes.array,
    services: PropTypes.array,
    getRooms: PropTypes.func,
    getPartners: PropTypes.func,
    getServices: PropTypes.func,
    redirect: PropTypes.func,
    setStartEndDate: PropTypes.func,
};
export function mapDispatchToProps(dispatch) {
    return {
        getRooms: () => dispatch(getRooms()),
        getPartners: () => dispatch(getPartners()),
        getServices: () => dispatch(getServices()),
        setStartEndDate: (dateObj) => dispatch(setStartEndDate(dateObj)),
        redirect: (url) => dispatch(push(url))
    };
}
const mapStateToProps = createStructuredSelector({
    loading: makeLoading(),
    rooms: makeSelectRooms(),
    partners: makeSelectPartners(),
    services: makeSelectServices(),
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
    withConnect,
)(HomePage);
