import React from "react";
import {Switch, withRouter, Link} from "react-router-dom";
import {Helmet} from "react-helmet";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import DashboardPage from '../DashboardPage/Loadable';
import FeedbackApp from '../FeedbackApp/Loadable';
import GalleryApp from '../GalleryApp/Loadable';
// import GeneralApp from '../GeneralApp/Loadable';
import NewsApp from '../NewsApp/Loadable';
import PartnerApp from '../PartnerApp/Loadable';
import ReservationApp from '../ReservationApp/Loadable';
import RoomApp from '../RoomApp/Loadable';
import ServiceApp from '../ServiceApp/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import FancyRoute from "./FancyRoute";
import {ROUTE_TREE} from "./constants";
import NavLink from "../../components/NavLink";
import PropTypes from "prop-types";
import {getPendingReservation} from "./Global/actions";
import {makeSelectPendingReservation} from "./Global/selectors";


const rootRoutes = [
    {
        title: 'Feedback page',
        path: '/' + ROUTE_TREE.feedback,
        component: FeedbackApp
    },
    {
        title: 'Gallery Page',
        path: '/' + ROUTE_TREE.gallery,
        component: GalleryApp
    },
    // {
    //     title: 'General Page',
    //     path: '/' + ROUTE_TREE.general,
    //     component: GeneralApp
    // },
    {
        title: 'News app',
        path: '/' + ROUTE_TREE.news,
        component: NewsApp
    },
    {
        title: 'Partner Page',
        path: '/' + ROUTE_TREE.partner,
        component: PartnerApp
    },
    {
        title: 'Reservation App',
        path: '/' + ROUTE_TREE.reservation,
        component: ReservationApp
    },
    {
        title: 'Room App',
        path: '/' + ROUTE_TREE.rooms,
        component: RoomApp
    },
    {
        title: 'Service Page',
        path: '/' + ROUTE_TREE.service,
        component: ServiceApp
    },
    {
        title: 'Dashboard Page',
        path: '/',
        exact: true,
        component: DashboardPage
    },
    {
        title: 'Not Found',
        path: '',
        component: NotFoundPage
    }
];

class AppWrapped extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    componentDidMount() {
        this.props.getPendingReservations();
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>Admin Page</title>
                    <meta
                        name="description"
                        content="Admin Page"
                    />
                </Helmet>
                <aside className="main-sidebar fixed offcanvas b-r sidebar-tabs" data-toggle='offcanvas'>
                    <div className="sidebar">
                        <div className="d-flex hv-100 align-items-stretch">

                            <div className="tab-content flex-grow-1" id="v-pills-tabContent">
                                <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel"
                                     aria-labelledby="v-pills-home-tab">
                                    <div className="relative brand-wrapper sticky b-b">
                                        <div className="d-flex justify-content-between align-items-center p-3">
                                            <div className="text-xs-center">
                                                <span className="font-weight-lighter s-18">Menu</span>
                                            </div>
                                            {/* <div className="badge badge-danger r-0">New Panel</div> */}
                                        </div>
                                    </div>
                                    <ul className="sidebar-menu">
                                        <NavLink to={'/'}>
                                            <i className="icon icon-sailing-boat-water s-24"/>
                                            <span>Dashboard</span>
                                        </NavLink>
                                        {/* <NavLink to={'/' + ROUTE_TREE.general}>
                                            <i className="icon icon-organization-4 s-24"></i>
                                            <span>general</span>
                                        </NavLink> */}
                                        <NavLink to={'/' + ROUTE_TREE.partner}>
                                            <i className="icon icon-people s-24"/>Partner
                                        </NavLink>
                                        <NavLink to={'/' + ROUTE_TREE.reservation}>
                                            <i className="icon icon-clipboard-list s-24"/>Reservation
                                        </NavLink>
                                        <NavLink to={'/' + ROUTE_TREE.rooms}>
                                            <i className="icon icon-room s-24"/>Rooms
                                        </NavLink>
                                        <NavLink to={'/' + ROUTE_TREE.news}>
                                            <i className="icon icon-newspaper s-24"/>News
                                        </NavLink>
                                        <NavLink to={'/' + ROUTE_TREE.gallery}>
                                            <i className="icon icon-image s-24"/>Gallery
                                        </NavLink>
                                        <NavLink to={'/' + ROUTE_TREE.feedback}>
                                            <i className="icon icon-feed s-24"/>Feedback
                                        </NavLink>
                                        <NavLink to={'/' + ROUTE_TREE.service}>
                                            <i className="icon icon-room_service s-24"/>Services
                                        </NavLink>
                                    </ul>
                                </div>
                                <div className="tab-pane fade" id="v-pills-profile" role="tabpanel"
                                     aria-labelledby="v-pills-profile-tab">
                                    <div className="relative brand-wrapper sticky b-b p-3">
                                        <form>
                                            <div className="form-group input-group-sm has-right-icon">
                                                <input className="form-control form-control-sm light r-30"
                                                       placeholder="Search" type="text"/>
                                                <i className="icon-search"/>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="sticky slimScroll">

                                        <div className="p-2">
                                            <ul className="list-unstyled">
                                                {/*Alphabet with number of contacts */}
                                                <li className="pt-3 pb-3 sticky p-3 b-b white">
                                                    <span className="badge r-3 badge-success">A</span>
                                                </li>
                                                {/*Single contact */}
                                                <li className="my-1">
                                                    <div className="card no-b p-3">
                                                        <div className="">

                                                            <div className="image mr-3  float-left">
                                                                <img className="w-40px"
                                                                     src="assets/img/dummy/u1.png"
                                                                     alt="User"/>
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    <strong>Alexander Pierce</strong>
                                                                </div>
                                                                <small> alexander@paper.com</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="my-1">
                                                    <div className="card no-b p-3">
                                                        <div className="">

                                                            <div className="image mr-3  float-left">
                                                                <img className="w-40px"
                                                                     src="assets/img/dummy/u6.png"
                                                                     alt="User"/>
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    <strong>Alexander Pierce</strong>
                                                                </div>
                                                                <small> alexander@paper.com</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="my-1">
                                                    <div className="card no-b p-3">
                                                        <div className="">

                                                            <div className="image mr-3  float-left">
                                                                <img className="w-40px"
                                                                     src="assets/img/dummy/u6.png"
                                                                     alt="User"/>
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    <strong>Alexander Pierce</strong>
                                                                </div>
                                                                <small> alexander@paper.com</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <ul className="list-unstyled">
                                                <li className="pt-3 pb-3 sticky p-3 b-b white">
                                                    <span className="badge r-3 badge-danger">B</span>
                                                </li>
                                                <li className="my-1">
                                                    <div className="card no-b p-3">
                                                        <div className="">

                                                            <div className="image mr-3  float-left">
                                                                <img className="w-40px"
                                                                     src="assets/img/dummy/u2.png"
                                                                     alt="User"/>
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    <strong>Alexander Pierce</strong>
                                                                </div>
                                                                <small> alexander@paper.com</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="my-1">
                                                    <div className="card no-b p-3">
                                                        <div className="">

                                                            <div className="image mr-3  float-left">
                                                                <img className="w-40px"
                                                                     src="assets/img/dummy/u3.png"
                                                                     alt="User"/>
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    <strong>Alexander Pierce</strong>
                                                                </div>
                                                                <small> alexander@paper.com</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="my-1">
                                                    <div className="card no-b p-3">
                                                        <div className="">

                                                            <div className="image mr-3  float-left">
                                                                <img className="w-40px"
                                                                     src="assets/img/dummy/u4.png"
                                                                     alt="User"/>
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    <strong>Alexander Pierce</strong>
                                                                </div>
                                                                <small> alexander@paper.com</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                            <ul className="list-unstyled">
                                                {/*Alphabet with number of contacts*/}
                                                <li className="pt-3 pb-3 sticky p-3 b-b white">
                                                    <span className="badge r-3 badge-success gradient">C</span>
                                                </li>
                                                {/*Single contact */}
                                                <li className="my-1">
                                                    <div className="card no-b p-3">
                                                        <div className="">

                                                            <div className="image mr-3  float-left">
                                                                <img className="w-40px"
                                                                     src="assets/img/dummy/u1.png"
                                                                     alt="User"/>
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    <strong>Alexander Pierce</strong>
                                                                </div>
                                                                <small> alexander@paper.com</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="my-1">
                                                    <div className="card no-b p-3">
                                                        <div className="">

                                                            <div className="image mr-3  float-left">
                                                                <img className="w-40px"
                                                                     src="assets/img/dummy/u6.png"
                                                                     alt="User"/>
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    <strong>Alexander Pierce</strong>
                                                                </div>
                                                                <small> alexander@paper.com</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="my-1">
                                                    <div className="card no-b p-3">
                                                        <div className="">

                                                            <div className="image mr-3  float-left">
                                                                <img className="w-40px"
                                                                     src="assets/img/dummy/u6.png"
                                                                     alt="User"/>
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    <strong>Alexander Pierce</strong>
                                                                </div>
                                                                <small> alexander@paper.com</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="my-4">
                                                    <span className="badge r-3 badge-danger purple">D</span>
                                                </li>
                                                <li className="my-1">
                                                    <div className="card no-b p-3">
                                                        <div className="">

                                                            <div className="image mr-3  float-left">
                                                                <img className="w-40px"
                                                                     src="assets/img/dummy/u2.png"
                                                                     alt="User"/>
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    <strong>Alexander Pierce</strong>
                                                                </div>
                                                                <small> alexander@paper.com</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="my-1">
                                                    <div className="card no-b p-3">
                                                        <div className="">

                                                            <div className="image mr-3  float-left">
                                                                <img className="w-40px"
                                                                     src="assets/img/dummy/u3.png"
                                                                     alt="User"/>
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    <strong>Alexander Pierce</strong>
                                                                </div>
                                                                <small> alexander@paper.com</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="my-1">
                                                    <div className="card no-b p-3">
                                                        <div className="">

                                                            <div className="image mr-3  float-left">
                                                                <img className="w-40px"
                                                                     src="assets/img/dummy/u4.png"
                                                                     alt="User"/>
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    <strong>Alexander Pierce</strong>
                                                                </div>
                                                                <small> alexander@paper.com</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                <div className="has-sidebar-left">
                    <div className="pos-f-t">
                        <div className="collapse" id="navbarToggleExternalContent">
                            <div className="bg-dark pt-2 pb-2 pl-4 pr-2">
                                <div className="search-bar">
                                    <input
                                        className="transparent s-24 text-white b-0 font-weight-lighter w-128 height-50"
                                        type="text"
                                        placeholder="start typing..."/>
                                </div>
                                <a href="#" data-toggle="collapse" data-target="#navbarToggleExternalContent"
                                   aria-expanded="false"
                                   aria-label="Toggle navigation"
                                   className="paper-nav-toggle paper-nav-white active "><i/></a>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="has-sidebar-left has-sidebar-tabs">
                    {/*navbar*/}
                    <div className="sticky">
                        <div className="navbar navbar-expand d-flex justify-content-between bd-navbar white shadow">
                            <div className="relative">
                                <div className="d-flex">
                                    <div className="d-none d-md-block">
                                        {/*<h1 className="nav-title">Dashboard</h1>*/}
                                    </div>
                                </div>
                            </div>
                            {/*Top Menu Start*/}
                            <div className="navbar-custom-menu">
                                <ul className="nav navbar-nav">
                                    {/*Notifications */}
                                    <li className="dropdown custom-dropdown notifications-menu">
                                        <a href="#" className=" nav-link" data-toggle="dropdown"
                                           aria-expanded="false">
                                            <i className="icon-notifications_none"/>
                                            <span className="badge badge-danger badge-mini rounded-circle">{this.props.pendingReservations.length}</span>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-right">
                                            <li className="header">You have {this.props.pendingReservations.length} notifications</li>
                                            <li>
                                                {/*inner menu: contains the actual data */}
                                                <ul className="menu">
                                                    {this.props.pendingReservations.map((item, index) => {
                                                        return (
                                                            <li key={index}>
                                                                <Link to={`/${ROUTE_TREE.reservation}/${ROUTE_TREE.reservationDetails}/${item._id}`}>
                                                                    <i className="icon icon-data_usage text-success"/>
                                                                    {`${item.clientFirstName} ${item.clientLastName} booked`}
                                                                </Link>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </li>
                                            <li className="footer p-2 text-center"><Link to={`/${ROUTE_TREE.reservation}`}>View all</Link></li>
                                        </ul>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>


                    <Switch>
                        {rootRoutes.map((route, i) =>
                            <FancyRoute key={i} {...route} />
                        )}
                    </Switch>

                </div>


                <aside className="control-sidebar fixed white ">
                    <div className="slimScroll">
                        <div className="sidebar-header">
                            <h4>Activity List</h4>
                            <a href="#" data-toggle="control-sidebar"
                               className="paper-nav-toggle  active"><i/></a>
                        </div>
                        <div className="p-3">
                            <div>
                                <div className="my-3">
                                    <small>25% Complete</small>
                                    <div className="progress" style={{height: 3}}>
                                        <div className="progress-bar bg-success" role="progressbar"
                                             style={{width: '25%'}} aria-valuenow="25"
                                             aria-valuemin="0" aria-valuemax="100"/>
                                    </div>
                                </div>
                                <div className="my-3">
                                    <small>45% Complete</small>
                                    <div className="progress" style={{height: 3}}>
                                        <div className="progress-bar bg-info" role="progressbar"
                                             style={{width: '45%'}}
                                             aria-valuenow="45"
                                             aria-valuemin="0" aria-valuemax="100"/>
                                    </div>
                                </div>
                                <div className="my-3">
                                    <small>60% Complete</small>
                                    `
                                    <div className="progress" style={{height: 3}}>
                                        <div className="progress-bar bg-warning" role="progressbar"
                                             style={{width: '60%'}} aria-valuenow="60"
                                             aria-valuemin="0" aria-valuemax="100"/>
                                    </div>
                                </div>
                                <div className="my-3">
                                    <small>75% Complete</small>
                                    <div className="progress" style={{height: 3}}>
                                        <div className="progress-bar bg-danger" role="progressbar"
                                             style={{width: '75%'}} aria-valuenow="75"
                                             aria-valuemin="0" aria-valuemax="100"/>
                                    </div>
                                </div>
                                <div className="my-3">
                                    <small>100% Complete</small>
                                    <div className="progress" style={{height: 3}}>
                                        <div className="progress-bar" role="progressbar"
                                             style={{width: '100%'}}
                                             aria-valuenow="100"
                                             aria-valuemin="0" aria-valuemax="100"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="p-3 bg-primary text-white">
                            <div className="row">
                                <div className="col-md-6">
                                    <h5 className="font-weight-normal s-14">Sodium</h5>
                                    <span className="font-weight-lighter text-primary">Spark Bar</span>
                                    <div> Oxygen
                                        <span className="text-primary">
                                                <i className="icon icon-arrow_downward"/> 67%</span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <canvas width="100" height="70" data-chart="spark" data-chart-type="bar"
                                            data-dataset="[[28,68,41,43,96,45,100,28,68,41,43,96,45,100,28,68,41,43,96,45,100,28,68,41,43,96,45,100]]"
                                            data-labels="['a','b','c','d','e','f','g','h','i','j','k','l','m','n','a','b','c','d','e','f','g','h','i','j','k','l','m','n']">
                                    </canvas>
                                </div>
                            </div>
                        </div>
                        <div className="table-responsive">
                            <table id="recent-orders"
                                   className="table table-hover mb-0 ps-container ps-theme-default">
                                <tbody>
                                <tr>
                                    <td>
                                        <a href="#">INV-281281</a>
                                    </td>
                                    <td>
                                        <span className="badge badge-success">Paid</span>
                                    </td>
                                    <td>$ 1228.28</td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="#">INV-01112</a>
                                    </td>
                                    <td>
                                        <span className="badge badge-warning">Overdue</span>
                                    </td>
                                    <td>$ 5685.28</td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="#">INV-281012</a>
                                    </td>
                                    <td>
                                        <span className="badge badge-success">Paid</span>
                                    </td>
                                    <td>$ 152.28</td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="#">INV-01112</a>
                                    </td>
                                    <td>
                                        <span className="badge badge-warning">Overdue</span>
                                    </td>
                                    <td>$ 5685.28</td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href="#">INV-281012</a>
                                    </td>
                                    <td>
                                        <span className="badge badge-success">Paid</span>
                                    </td>
                                    <td>$ 152.28</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="sidebar-header">
                            <h4>Activity</h4>
                            <a href="#" data-toggle="control-sidebar"
                               className="paper-nav-toggle  active"><i></i></a>
                        </div>
                        <div className="p-4">
                            <div className="activity-item activity-primary">
                                <div className="activity-content">
                                    <small className="text-muted">
                                        <i className="icon icon-user position-left"/> 5 mins ago
                                    </small>
                                    <p>Lorem ipsum dolor sit amet conse ctetur which ascing elit users.</p>
                                </div>
                            </div>
                            <div className="activity-item activity-danger">
                                <div className="activity-content">
                                    <small className="text-muted">
                                        <i className="icon icon-user position-left"/> 8 mins ago
                                    </small>
                                    <p>Lorem ipsum dolor sit ametcon the sectetur that ascing elit users.</p>
                                </div>
                            </div>
                            <div className="activity-item activity-success">
                                <div className="activity-content">
                                    <small className="text-muted">
                                        <i className="icon icon-user position-left"/> 10 mins ago
                                    </small>
                                    <p>Lorem ipsum dolor sit amet cons the ecte tur and adip ascing elit users.</p>
                                </div>
                            </div>
                            <div className="activity-item activity-warning">
                                <div className="activity-content">
                                    <small className="text-muted">
                                        <i className="icon icon-user position-left"/> 12 mins ago
                                    </small>
                                    <p>Lorem ipsum dolor sit amet consec tetur adip ascing elit users.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
                {/*/.right-sidebar */}
                {/*Add the sidebar's background. This div must be placed*/}
                {/*immediately after the control sidebar */}
                <div className="control-sidebar-bg shadow white fixed"/>



            </>
        );
    }
}

AppWrapped.propTypes = {
    pendingReservations: PropTypes.array,
    getPendingReservations: PropTypes.func,
};
export function mapDispatchToProps(dispatch) {
    return {
        getPendingReservations: () => dispatch(getPendingReservation())
    };
}

const mapStateToProps = createStructuredSelector({
    pendingReservations: makeSelectPendingReservation(),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(withRouter(AppWrapped));

// export default AppWrapped;
