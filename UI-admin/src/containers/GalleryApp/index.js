/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {toastr} from 'react-redux-toastr';
import Select from 'react-select';
import $ from 'jquery'

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import {getListData, addData, updateData, deleteData, addType, getType, updateType} from './actions';
import {KEY_APP} from './constants';
import {makeLoading, makeSelectData, makeSelectListData, makeTypes} from "./selectors";
import CarouselImages from './../../components/CarouselImages/index';

class GalleryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createObj: {
                _id: '',
                name: '',
                description: '',
                imgs: [],
                galleryCategory: null,
                _imgs: []
            },
            typeObj: {
                _id: '',
                name: '',
                description: '',
                enable: true
            },
            imgUrls: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFile = this.handleChangeFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.cancelForm = this.cancelForm.bind(this);
        this.openFrom = this.openFrom.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onImageChanged = this.onImageChanged.bind(this);
    }

    componentDidMount() {
        this.props.getListData();
        this.props.getTypes();
    }

    cancelForm () {
        this.setState({
            createObj: {
                _id: '',
                name: '',
                description: '',
                imgs: [],
                galleryCategory: null,
                _imgs: []
            }
        });
    }

    cancelTypeForm () {
        this.setState({
            typeObj: {
                _id: '',
                name: '',
                description: '',
                enable: true
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

    handleChangeFile (event) {
        this.setState({
            createObj: {
                imgs: event.target.files
            }
        });
    }

    handleChangeType (evt) {
        this.setState({
            createObj: {
                ...this.state.createObj,
                galleryCategory: evt
            }
        });
    }

    clearSelectedFile (evt) {
        evt.target.value = null;
        // evt.target.files = [];
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
            imgs: this.state.createObj._imgs,
            galleryCategory: this.state.createObj.galleryCategory,
        };
        if(this.state.createObj._id) {
            dtoObj['_id'] = this.state.createObj._id;
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

    handleSubmitType() {
        if(this.state.typeObj._id) {
            this.props.updateType(this.state.typeObj, () => {
                //todo
            });
        } else {
            this.props.addType(this.state.typeObj, () => {
                //todo
            });
        }

    }

    openFrom(data) {
        if(!data) {
            this.setState({createObj: {
                    _id: '',
                    name: '',
                    description: '',
                    galleryCategory: null,
                    imgs: [],
                    _imgs: []
                }});
        } else {
            let newState = {createObj: data};
            newState.createObj._imgs = data.imgs.concat([]);
            this.setState(newState);
        }
    }

    renderData(arrayData) {
        if(arrayData && arrayData.length > 0) {
            return arrayData.map((data, index) => {
                return (
                    <tr key={index}>

                        <td> <div className="d-none d-lg-block">{data.name}</div></td>
                        <td> <div className="d-none d-lg-block"><a onClick={() => {
                            $('#imageViewerModel').modal('show');
                            this.setState({...this.state, imgUrls: data.imgs});
                        }}>{data.imgs.length} images</a></div></td>
                        <td>
                            <div className="d-none d-lg-block">
                                <ul>
                                    <li>{data.galleryCategory.label}</li>
                                </ul>
                            </div>
                        </td>
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
                    createObj: {
                        ...this.state.createObj,
                        _imgs: this.state.createObj._imgs.concat(res.uploadedFileUrls)}}))
            .catch(error => console.log(error))
        ;
   }

  render() {
      const typesOptions = this.props.types.map((item) => {
          return { value: item._id, label: item.name };
      });
    return (
        <>
            <Helmet>
                <title>Gallery Page</title>
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
                                        <th> <div className="d-none d-lg-block">Category</div></th>
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
                            <h5 className="modal-title" id="exampleModalLabel">Gallery</h5>
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
                                        <label htmlFor="name">Category</label>
                                        <Select
                                            name="galleryCategory"
                                            value={this.state.createObj.galleryCategory}
                                            onChange={this.handleChangeType}
                                            options={typesOptions}
                                        />
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
                                            <input type="file" className="custom-file-input" accept="image/*" id="file" multiple
                                                   onChange={this.onImageChanged} onClick={this.clearSelectedFile}/>
                                                <label className="custom-file-label" htmlFor="file">Choose
                                                    file...</label>
                                                <div className="invalid-feedback">Example invalid custom file feedback
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

            <div className="modal fade" id="imageViewerModel" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">

                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Gallery Image Viewer</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <CarouselImages imgUrls={this.state.imgUrls}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            {/* <button type="button" className="btn btn-primary">Save changes</button> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="typeModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">

                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Type</h5>
                            <button onClick={this.cancelTypeForm} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="needs-validation" onSubmit={this.handleSubmitType}>
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
                                        <label htmlFor="name">Name</label>
                                        <Select
                                            isMulti
                                            name="galleryCategory"
                                            value={this.state.createObj.galleryCategory}
                                            onChange={this.handleChangeType}
                                            options={typesOptions}
                                        />
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
                                            <input type="file" className="custom-file-input" accept="image/*" id="file" multiple
                                                   onChange={this.handleChangeFile} onClick={this.clearSelectedFile}/>
                                            <label className="custom-file-label" htmlFor="file">Choose
                                                file...</label>
                                            <div className="invalid-feedback">Example invalid custom file feedback
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
GalleryPage.propTypes = {
    loading: PropTypes.bool,
    generalInfo: PropTypes.object,
    getListData: PropTypes.func,
    addData: PropTypes.func,
    updateData: PropTypes.func,
    deleteData: PropTypes.func,
    getTypes: PropTypes.func,
    addType: PropTypes.func,
    updateType: PropTypes.func,
    list: PropTypes.array,
    types: PropTypes.array,
};
export function mapDispatchToProps(dispatch) {
    return {
        getListData: () => dispatch(getListData()),
        addData: (data, cb) => dispatch(addData(data, cb)),
        updateData: (data, cb) => dispatch(updateData(data, cb)),
        deleteData: (id) => dispatch(deleteData(id)),
        getTypes: () => dispatch(getType()),
        addType: (type) => dispatch(addType(type)),
        updateType: (type) => dispatch(updateType(type)),
    };
}
const mapStateToProps = createStructuredSelector({
    generalInfo: makeSelectData(),
    list: makeSelectListData(),
    loading: makeLoading(),
    types: makeTypes(),
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
)(GalleryPage);
