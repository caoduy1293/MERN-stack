import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Select from 'react-select';
import moment from 'moment';
import {createStructuredSelector} from 'reselect';
import {fetch} from 'whatwg-fetch'
import {push} from 'react-router-redux';

import {getData, addData, updateData, getServices, resetDetails} from '../actions';
import {makeLoading, makeSelectData, makeServices} from "../selectors";
import { ROUTE_TREE } from '../../App/constants';
// import {go} from 'react-router-redux';
// import {ROUTE_TREE} from './../../App/constants'

class RoomDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: {
                _id: '',
                name: '',
                description: '',
                available_quantity: 0,
                services: [],
                price: 0,
                imgs: [],
                available: true,
                isPromoted: false,
                _imgs: []
            },
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleServices = this.handleServices.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onImageChanged = this.onImageChanged.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
    }

    componentDidMount() {
        if(this.props.match.params.id) {
            this.props.getData(this.props.match.params.id);
        } else {
            this.props.resetDetails();
        }
        this.props.getServices();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.data && this.props.data !== nextProps.data) {
            let newState = {
                selectedItem: nextProps.data
            };
            newState.selectedItem._imgs = [];
            this.setState(newState);
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

    handleServices (evt) {
        this.setState({
            selectedItem: {
                ...this.state.selectedItem,
                services: evt
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let dtoObj = {
            name: this.state.selectedItem.name,
            description: this.state.selectedItem.description,
            price: this.state.selectedItem.price,
            imgs: this.state.selectedItem.imgs,
            services: this.state.selectedItem.services,
            available_quantity: this.state.selectedItem.available_quantity,
            active: this.state.selectedItem.available,
            is_promoted: this.state.selectedItem.isPromoted
        };
        if(this.state.selectedItem._id) {
            dtoObj['_id'] = this.state.selectedItem._id;
            dtoObj.imgs = this.state.selectedItem._imgs;
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
        this.props.goTo({pathname: '/'+ ROUTE_TREE.rooms});
    }

    onImageChanged(evt) {
        let reqOps;
        let formData;
        let i, len, files;

        formData = new FormData();

        files = evt.target.files || [];
        for (i = 0, len = evt.target.files.length; i < len; i++) {
            formData.append('image', files[i]);
        }

        reqOps = {
            method: 'POST',
            body: formData // This is your file object
        };

        fetch('/v1/upload/multi', reqOps)
            .then(res => res.json())
            .then(
                res => this.setState({
                    selectedItem: {
                        ...this.state.selectedItem,
                        _imgs: res.uploadedFileUrls}}))
            .catch(error => console.log(error))
        ;
   }

    render() {
        const servicesListOptions = this.props.services.filter(item => {
            return !item.isGlobal;
        }).map((item) => {
            return { value: item._id, label: item.name };
        });

        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="card mb-3 shadow no-b r-0">
                            <div className="card-header white">
                                <h6>Room</h6>
                            </div>
                            <div className="card-body">
                                <form className="needs-validation" onSubmit={this.handleSubmit}>
                                    <div className="form-row">
                                        <div className="col-md-12 mb-3">
                                            <label>Name</label>
                                            <input type="text" className="form-control" name="name"
                                                   value={this.state.selectedItem.name || ''} onChange={this.handleChange}/>
                                            <div className="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-6">
                                            <label >Description</label>
                                            <textarea className="form-control" name="description"
                                                      value={this.state.selectedItem.description || ''} onChange={this.handleChange}>
                                            </textarea>
                                            <div className="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label>Services</label>
                                            <Select
                                                isMulti
                                                name="services"
                                                value={this.state.selectedItem.services}
                                                onChange={this.handleServices}
                                                options={servicesListOptions}
                                            />
                                            <div className="invalid-feedback">
                                                Please choose a username.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-12 mb-3">
                                            <label >Quantity</label>
                                            <input type="number" className="form-control" name="available_quantity"
                                                   value={this.state.selectedItem.available_quantity || ''}
                                                   onChange={this.handleChange} required/>
                                            <div className="invalid-feedback">
                                                Please provide a valid zip.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-12 mb-3">
                                            <label >Price</label>
                                            <input type="number" className="form-control" name="price"
                                                   value={this.state.selectedItem.price || ''}
                                                   onChange={this.handleChange} required/>
                                            <div className="invalid-feedback">
                                                Please choose a username.
                                            </div>
                                        </div>
                                        <div className="col-md-12 mb-3">
                                            <label>Images</label>
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" name="avatar"
                                                       onChange={this.onImageChanged} multiple/>
                                                <label className="custom-file-label">Choose
                                                    file...</label>
                                                <div className="invalid-feedback">Example invalid custom file feedback
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox"
                                                   value={this.state.selectedItem.available}
                                                   name="available" onChange={evt => this.setState({
                                                    selectedItem: {
                                                        ...this.state.selectedItem,
                                                        [evt.target.name]: evt.target.checked
                                                    }
                                                })}/>
                                            <label className="form-check-label">
                                                Enable
                                            </label>
                                            <div className="invalid-feedback">
                                                You must agree before submitting.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox"
                                                   name="isPromoted" value={this.state.selectedItem.isPromoted}
                                                   onChange={evt =>
                                                        this.setState({
                                                            selectedItem: {
                                                                ...this.state.selectedItem,
                                                                [evt.target.name]: evt.target.checked
                                                            }
                                                        })
                                                   }/>
                                            <label className="form-check-label">
                                                Promoted
                                            </label>
                                            <div className="invalid-feedback">
                                                You must agree before submitting.
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

RoomDetails.propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.object,
    services: PropTypes.array,
    getData: PropTypes.func,
    addData: PropTypes.func,
    updateData: PropTypes.func,
    getServices: PropTypes.func,
    resetDetails: PropTypes.func,
    goTo: PropTypes.func
};
export function mapDispatchToProps(dispatch) {
    return {
        getData: (_id) => dispatch(getData(_id)),
        addData: (data, cb) => dispatch(addData(data, cb)),
        updateData: (data, cb) => dispatch(updateData(data, cb)),
        getServices: (data, cb) => dispatch(getServices(data, cb)),
        resetDetails: () => dispatch(resetDetails()),
        goTo: (obj) => dispatch(push(obj))
    };
}
const mapStateToProps = createStructuredSelector({
    data: makeSelectData(),
    loading: makeLoading(),
    services: makeServices(),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RoomDetails);
