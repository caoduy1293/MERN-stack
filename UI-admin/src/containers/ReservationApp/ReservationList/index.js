import React from 'react';
import {Link} from "react-router-dom";
import {toastr} from "react-redux-toastr";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import moment from 'moment';
import {createStructuredSelector} from "reselect";
import {RESERVATION_STATUSES} from "../constants";

import {getListData, deleteData, getRooms, markReleased} from '../actions';
import {makeListLoading, makeRooms, makeSelectListData} from "../selectors";

import {ROUTE_TREE} from "../../App/constants";

class ReservationList extends React.Component {

    componentDidMount() {
        this.props.getListData();
        this.props.getRooms();
    }

    onDelete(data) {
        const toastrConfirmOptions = {
            onOk: () => {
                this.props.deleteData(data._id);
            },
            onCancel: () => {
                console.log('cancel delete');
            }
        };
        toastr.confirm('Are you sure ?', toastrConfirmOptions);
    }

    onMarkComplete(data) {
        const toastrConfirmOptions = {
            onOk: () => {
                this.props.markReleased(data);
            },
            onCancel: () => {
                console.log('cancel Mark released');
            }
        };
        toastr.confirm('Mark it released ?', toastrConfirmOptions);
    }

    renderData(arrayData) {
        if(arrayData && arrayData.length > 0) {
            return arrayData.map((data, index) => {
                let selectedRoom = this.props.rooms.filter((room) => {
                    return room._id === data.roomId;
                });
                let selectedStatus = RESERVATION_STATUSES.filter(s => data.statusValue === s.value);
                return (
                    <tr key={index}>
                        <td>
                            <div className="d-flex">
                                <div>
                                    <div>
                                        <strong>{data.clientFirstName + ' ' + data.clientLastName}</strong>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td> <div className="d-none d-lg-block">{data.clientPhone}</div></td>

                        <td> <div className="d-none d-lg-block">{data.clientEmail}</div></td>
                        <td> <div className="d-none d-lg-block">{moment(data.startDate).format('DD/MM/YYYY')}</div></td>
                        <td> <div className="d-none d-lg-block">{moment(data.endDate).format('DD/MM/YYYY')}</div></td>
                        <td>
                            <div className="d-none d-lg-block">
                                { (selectedRoom.length > 0) ? selectedRoom[0].name : ''}
                            </div>
                        </td>
                        <td> <div className="d-none d-lg-block"><span className="r-3 badge badge-success ">{
                            selectedStatus.length > 0 ? selectedStatus[0].title : ''}</span></div></td>
                        <td>
                            <Link className="btn" to={'/' + ROUTE_TREE.reservation + '/' + ROUTE_TREE.reservationDetails + '/' + data._id}>
                                <i className="icon-pencil"/></Link>
                            <button type={'button'} className="btn" onClick={() => {this.onMarkComplete(data)}}><i className="icon-done"/></button>
                        </td>
                    </tr>
                );
            });
        }
        return (
            <tr>
                <td colSpan={8}>No data</td>
            </tr>
        );

    }
    render() {
        return (
            <>
                {/*#navbar*/}
                <div className="container-fluid">
                    <div className="row my-3">
                        <div className="col-md-12">
                            <div className="card r-0 shadow">
                                <div className="table-responsive">
                                    <form>
                                        <table className="table table-striped table-hover r-0">
                                            <thead>
                                            <tr className="no-b">
                                                <th>Client Name</th>
                                                <th> <div className="d-none d-lg-block">Client Phone</div></th>
                                                <th> <div className="d-none d-lg-block">Client Email</div></th>
                                                <th> <div className="d-none d-lg-block">From Date</div></th>
                                                <th> <div className="d-none d-lg-block">To Date</div></th>
                                                <th> <div className="d-none d-lg-block">Room name</div></th>
                                                <th> <div className="d-none d-lg-block">Current Status</div></th>
                                                <th></th>
                                            </tr>
                                            </thead>

                                            <tbody>
                                                {this.renderData(this.props.list)}
                                            </tbody>
                                        </table>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Add New Message Fab Button*/}
                <Link to={'/' + ROUTE_TREE.reservation + '/' + ROUTE_TREE.reservationAdd + '/'}
                      className="btn-fab btn-fab-md fab-right fab-right-bottom-fixed shadow btn-primary">
                    <i className="icon-add"/></Link>
            </>
        );
    };

}

ReservationList.propTypes = {
    loading: PropTypes.bool,
    list: PropTypes.array,
    rooms: PropTypes.array,
    getListData: PropTypes.func,
    deleteData: PropTypes.func,
    markReleased: PropTypes.func,
    getRooms: PropTypes.func,
};
export function mapDispatchToProps(dispatch) {
    return {
        getListData: () => dispatch(getListData()),
        deleteData: (_id) => dispatch(deleteData(_id)),
        getRooms: () => dispatch(getRooms()),
        markReleased: (data) => dispatch(markReleased(data)),
    };
}
const mapStateToProps = createStructuredSelector({
    list: makeSelectListData(),
    loading: makeListLoading(),
    rooms: makeRooms(),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ReservationList);
