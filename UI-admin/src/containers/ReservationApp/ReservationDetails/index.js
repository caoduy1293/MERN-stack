import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {push} from 'react-router-redux';
import Select from 'react-select';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';

import {getData, addData, updateData, deleteData, getRooms} from '../actions';
import {makeLoading, makeSelectData, makeRooms} from "../selectors";
import {RESERVATION_STATUSES} from "../constants";
import { ROUTE_TREE } from '../../App/constants';

class ReservationDetails extends React.Component {
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
            focusedInput: null,
            startDate: null,
            endDate: null,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSelectRoom = this.handleChangeSelectRoom.bind(this);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
    }


    componentDidMount() {
        if(this.props.match.params.id) {
            this.props.getData(this.props.match.params.id);
        }
        this.props.getRooms();
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.data !== nextProps.data) {
            this.setState({
                selectedItem: nextProps.data,
                startDate: moment.utc(nextProps.data.startDate),
                endDate: moment.utc(nextProps.data.endDate)
            })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.props.getData(this.props.match.params.id);
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

    handleChangeSelectRoom (data) {
        this.setState({
            selectedItem: {
                ...this.state.selectedItem,
                roomId: data.value
            }
        });
    }

    handleChangeStatus (data) {
        this.setState({
            selectedItem: {
                ...this.state.selectedItem,
                statusValue: data.value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let dtoObj = {
            startDate: moment.utc(this.state.startDate).format(),
            endDate: moment.utc(this.state.endDate).format(),
            roomId: this.state.selectedItem.roomId,
            statusValue: this.state.selectedItem.statusValue,
            adminNote: this.state.selectedItem.adminNote,
            customerNote: this.state.selectedItem.customerNote,
            clientFirstName: this.state.selectedItem.clientFirstName,
            clientLastName: this.state.selectedItem.clientLastName,
            clientPhone: this.state.selectedItem.clientPhone,
            clientEmail: this.state.selectedItem.clientEmail,
        };
        if(this.state.selectedItem._id) {
            dtoObj['_id'] = this.state.selectedItem._id;
            this.props.updateData(dtoObj, () => {
                this.handleSuccess();
            });
        } else {
            this.props.addData(dtoObj, () => {
                this.handleSuccess();
            });
        }

    }

    handleSuccess() {
        this.props.goTo({pathname: '/'+ ROUTE_TREE.reservation});
    }

    render() {
        const roomListOptions = this.props.rooms.map((item) => {
            return { value: item._id, label: item.name };
        });
        const statusesOptions = RESERVATION_STATUSES.map((item) => {
            return { value: item.value, label: item.title };
        });
        const selectedStatus = statusesOptions.filter(st => this.state.selectedItem.statusValue === st.value) || [];
        const selectedRoom = roomListOptions.filter(r => this.state.selectedItem.roomId === r.value) || [];

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="card mb-3 shadow no-b r-0">
                            <div className="card-header white">
                                <h6>Reservation Form</h6>
                            </div>
                            <div className="card-body">
                                <form className="needs-validation" onSubmit={this.handleSubmit}>
                                    <div className="form-row">
                                        <div className="col-md-12">
                                            <div className="card my-3 shadow no-b r-0">
                                                <div className="card-header white">
                                                    <h6>Reservation Information</h6>
                                                </div>
                                                <div className="card-body">

                                                    <div className="form-row">
                                                        <div className="col-md-6">
                                                            <label>Room</label>
                                                            <Select
                                                                value={selectedRoom[0]}
                                                                onChange={this.handleChangeSelectRoom}
                                                                options={roomListOptions}
                                                            />
                                                            <div className="invalid-feedback">
                                                                Please provide a valid zip.
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label>Date</label>
                                                            <div>
                                                                <DateRangePicker
                                                                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                                                                    startDateId="startDate" // PropTypes.string.isRequired,
                                                                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                                                                    endDateId="endDate" // PropTypes.string.isRequired,
                                                                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                                                                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                                                                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                                                                />
                                                            </div>
                                                            <div className="valid-feedback">
                                                                Looks good!
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="col-md-6 mb-3">
                                                            <label>Quantity</label>
                                                            <input type="number" className="form-control" name="quantity" value={this.state.selectedItem.quantity}
                                                                   onChange={this.handleChange}/>
                                                            <div className="invalid-feedback">
                                                                Please provide a valid zip.
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label>Status</label>
                                                            <Select
                                                                value={selectedStatus[0]}
                                                                onChange={this.handleChangeStatus}
                                                                options={statusesOptions}
                                                            />
                                                            <div className="invalid-feedback">
                                                                Please choose a username.
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="col-md-6 mb-3">
                                                            <label>Admin Note</label>
                                                            <textarea type="text" className="form-control" name="adminNote" value={this.state.selectedItem.adminNote}
                                                                      onChange={this.handleChange}></textarea>
                                                            <div className="invalid-feedback">
                                                                Please choose a username.
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label>Customer Note</label>
                                                            <textarea type="text" className="form-control" name="customerNote" value={this.state.selectedItem.customerNote}
                                                                      onChange={this.handleChange}></textarea>
                                                            <div className="invalid-feedback">
                                                                Please choose a username.
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="form-row">
                                                        <div className="col-md-12">
                                                            <label>description</label>
                                                            <textarea type="text" className="form-control" name="description" value={this.state.selectedItem.description}
                                                                      onChange={this.handleChange} ></textarea>
                                                            <div className="valid-feedback">
                                                                Looks good!
                                                            </div>
                                                        </div>
                                                    </div> */}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-12">
                                            <div className="card my-3 shadow no-b r-0">
                                                <div className="card-header white">
                                                    <h6>Client Information</h6>
                                                </div>
                                                <div className="card-body">
                                                    <div className="form-row">
                                                        <div className="col-md-6 mb-3">
                                                            <label>First name</label>
                                                            <input type="text" name={'clientFirstName'} className="form-control" onChange={this.handleChange}
                                                                   required value={this.state.selectedItem.clientFirstName}/>
                                                                <div className="valid-feedback">
                                                                    Looks good!
                                                                </div>
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label>Last name</label>
                                                            <input type="text" className="form-control"
                                                                   name={'clientLastName'} onChange={this.handleChange}
                                                                   required value={this.state.selectedItem.clientLastName}/>
                                                                <div className="valid-feedback">
                                                                    Looks good!
                                                                </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="col-md-6 mb-3">
                                                            <label>Phone</label>
                                                            <input type="text" className="form-control"
                                                                   name={'clientPhone'} onChange={this.handleChange}
                                                                   required="" value={this.state.selectedItem.clientPhone}/>
                                                                <div className="invalid-feedback">
                                                                    Please provide a valid city.
                                                                </div>
                                                        </div>
                                                        <div className="col-md-6 mb-3">
                                                            <label>Email</label>
                                                            <input type="text" className="form-control"
                                                                   name={'clientEmail'} onChange={this.handleChange}
                                                                   required value={this.state.selectedItem.clientEmail}/>
                                                                <div className="invalid-feedback">
                                                                    Please provide a valid state.
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary" type="submit">
                                        {this.state.selectedItem._id ? 'Edit' : 'Add'}
                                    </button>
                                </form>


                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

}

ReservationDetails.propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.object,
    rooms: PropTypes.array,
    getData: PropTypes.func,
    addData: PropTypes.func,
    updateData: PropTypes.func,
    getRooms: PropTypes.func,
    goTo: PropTypes.func
};
export function mapDispatchToProps(dispatch) {
    return {
        getData: (_id) => dispatch(getData(_id)),
        deleteData: (_id) => dispatch(deleteData(_id)),
        addData: (data, cb) => dispatch(addData(data, cb)),
        updateData: (data, cb) => dispatch(updateData(data, cb)),
        getRooms: () => dispatch(getRooms()),
        goTo: (obj) => dispatch(push(obj))
    };
}
const mapStateToProps = createStructuredSelector({
    data: makeSelectData(),
    loading: makeLoading(),
    rooms: makeRooms(),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ReservationDetails);
