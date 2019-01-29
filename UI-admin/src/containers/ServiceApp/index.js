import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {toastr} from 'react-redux-toastr';
import $ from 'jquery'

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import {getListData, addData, updateData, deleteData} from './actions';
import {KEY_APP} from './constants';
import {makeLoading, makeSelectData, makeSelectListData} from "./selectors";

class ServicePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createObj: {
                _id: '',
                name: '',
                description: '',
                imgs: [],
                _imgs: []
            }
        };
        this.handleChange = this.handleChange.bind(this);
        // this.handleChangeFile = this.handleChangeFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.cancelForm = this.cancelForm.bind(this);
        this.openFrom = this.openFrom.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onImageChanged = this.onImageChanged.bind(this);
    }

    componentDidMount() {
        this.props.getListData();
    }

    cancelForm () {
        this.setState({
            createObj: {
                _id: '',
                name: '',
                description: '',
                isGlobal: false,
                imgs: [],
                _imgs: []
            }
        });
    }

    handleChange (evt) {
        this.setState({
            createObj: {
                ...this.state.createObj,
                [evt.target.name]: evt.target.value
            }
        });
    }
    //todo add file
    // handleChangeFile (event) {
    //     this.setState({
    //         createObj: {
    //             ...this.state.createObj,
    //             imgs: event.target.files
    //         }
    //     });
    // }
    clearSelectedFile (evt) {
        evt.target.value = null;
        evt.target.files = [];
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

    handleSubmit() {
        let dtoObj = {
            name: this.state.createObj.name,
            description: this.state.createObj.description,
            isGlobal: this.state.createObj.isGlobal,
            imgs: this.state.createObj.imgs
        };
        if(this.state.createObj._id) {
            dtoObj['_id'] = this.state.createObj._id;
            dtoObj.imgs = this.state.createObj._imgs;
            this.props.updateData(dtoObj, () => {
                $('#exampleModal').modal('toggle');
                this.props.getListData();
            });
        } else {
            this.props.addData(dtoObj, () => {
                $('#exampleModal').modal('toggle');
                this.props.getListData();
            });
        }

    }

    openFrom(data) {
        if(!data) {
            this.setState({createObj: {
                    _id: '',
                    name: '',
                    description: '',
                    isGlobal: false,
                    imgs: [],
                    _imgs: []
                }});
        } else {
            data._imgs = [];
            this.setState({createObj: data});
        }
    }


    renderData(arrayData) {
        if(arrayData && arrayData.length > 0) {
            return arrayData.map((data, index) => {
                return (
                    <tr key={data._id}>

                        <td> <div className="d-none d-lg-block">{data.name}</div></td>
                        <td> <div className="d-none d-lg-block">{data.imgs}</div></td>
                        <td> <div className="d-none d-lg-block">{data.description}</div></td>
                        <td>
                            <button onClick={() => {this.openFrom(data)}} type="button" className="btn mr-1" data-toggle="modal" data-target="#exampleModal"><i className="icon-pencil"/></button>
                            <button onClick={() => {this.onDelete(data)}} type="button" className="btn"><i className="icon-trash-can"/></button>
                        </td>
                    </tr>
                );
            });
        }
        return (
            <tr>
                <td colSpan={5}>No data</td>
            </tr>
        );
    }

    onImageChanged(evt) {
        let reqOps;
        let formData;

        formData = new FormData();
        formData.append('avatar', evt.target.files[0]);

        reqOps = {
            method: 'POST',
            body: formData // This is your file object
        };

        fetch('/v1/upload', reqOps)
            .then(res => res.json())
            .then(
                res => this.setState({
                    createObj: {
                        ...this.state.createObj,
                        _imgs: [res.uploadedFileUrl]}}))
            .catch(error => console.log(error))
        ;
   }

  render() {
    return (
        <>
            <Helmet>
                <title>Service Page</title>
                <meta
                    name="description"
                    content="Feature page of React.js Boilerplate application"
                />
            </Helmet>
            {/*#navbar*/}
            <div className="container-fluid">
                <div className="row my-3">
                    <div className="col-md-12">
                        <div className="card r-0 shadow">
                            <div className="table-responsive">
                                <table className="table table-striped table-hover r-0">
                                    <thead>
                                    <tr className="no-b">
                                        <th>Name</th>
                                        <th> <div className="d-none d-lg-block">Images</div></th>
                                        <th> <div className="d-none d-lg-block">Description</div></th>
                                        <th/>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {this.renderData(this.props.list)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*Add New Message Fab Button*/}
            <button onClick={() => {this.openFrom(null)}} type="button" className="btn-fab btn-fab-md fab-right fab-right-bottom-fixed shadow btn-primary"
                    data-toggle="modal" data-target="#exampleModal">
                <i className="icon-add"/></button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">

                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Service</h5>
                            <button onClick={this.cancelForm} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="needs-validation" onSubmit={this.handleSubmit}>
                                <div className="form-row">
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" className="form-control" id="name" name="name"
                                               value={this.state.createObj.name} onChange={this.handleChange}/>
                                        <div className="valid-feedback">
                                            Looks good!
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label htmlFor="description">Description</label>
                                        <textarea className="form-control" id="description" name="description"
                                                  value={this.state.createObj.description} onChange={this.handleChange}/>
                                        <div className="valid-feedback">
                                            Looks good!
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label>Images</label>
                                        <div className="custom-file">
                                            <input type="file" className="custom-file-input" accept="image/*" id="file"
                                            onChange={this.onImageChanged}/>
                                                <label className="custom-file-label" htmlFor="file">Choose
                                                    file...</label>
                                                <div className="invalid-feedback">Example invalid custom file feedback
                                                </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <div className="form-group">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox"
                                                       id="is-global-service-checkbox"
                                                       name="isGlobal" defaultChecked={this.state.createObj.isGlobal}
                                                       onChange={evt =>
                                                           this.setState({
                                                               createObj: {
                                                                   ...this.state.createObj,
                                                                   [evt.target.name]: evt.target.checked
                                                               }
                                                           })
                                                       }/>
                                                <label className="form-check-label" htmlfor="is-global-service-checkbox">
                                                    Global
                                                </label>
                                                <div className="invalid-feedback">
                                                    You must agree before submitting.
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button onClick={this.cancelForm} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button onClick={this.handleSubmit} type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
  }
}
ServicePage.propTypes = {
    loading: PropTypes.bool,
    generalInfo: PropTypes.object,
    getListData: PropTypes.func,
    addData: PropTypes.func,
    updateData: PropTypes.func,
    deleteData: PropTypes.func,
    list: PropTypes.array
};
export function mapDispatchToProps(dispatch) {
    return {
        getListData: () => dispatch(getListData()),
        addData: (data, cb) => dispatch(addData(data, cb)),
        updateData: (data, cb) => dispatch(updateData(data, cb)),
        deleteData: (id) => dispatch(deleteData(id)),

    };
}
const mapStateToProps = createStructuredSelector({
    generalInfo: makeSelectData(),
    list: makeSelectListData(),
    loading: makeLoading(),
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
)(ServicePage);
