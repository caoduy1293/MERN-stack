import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import Select from 'react-select';
import {push} from 'react-router-redux';
import moment from 'moment';
import CKEditor from "react-ckeditor-component";
import {DateRangePicker} from "react-dates";

import {getData, addData, updateData, deleteData, addCategory, getCategory, updateCategory} from '../actions';
import {makeLoading, makeSelectData, makeCategories} from "../selectors";
import {ROUTE_TREE} from "../../App/constants";

class NewsDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedItem: {
                _id: '',
                name: '',
                description: '',
                content: '',
                quantity: 0,
                price: 0,
                imgs: [],
                newsCategories: [],
                typeObj: null,
                isPromoted: false,
                available: true,
            },
            focusedInput: null,
            startDate: null,
            endDate: null,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.onImageChanged = this.onImageChanged.bind(this);
    }

    componentWillMount() {
        if(this.props.match.params.id) {
            this.props.getData(this.props.match.params.id);
        }
        this.props.getCate();
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.data !== nextProps.data) {
            this.setState({
                selectedItem: nextProps.data
            })
        }
    }

    handleChangeType (data) {
        this.setState({
            selectedItem: {
                ...this.state.selectedItem,
                typeObj: data
            }
        });
    }

    handleChange (evt) {
        this.setState({
            selectedItem: {
                ...this.state.selectedItem,
                [evt.target.name]: evt.target.value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        let dtoObj = {
            name: this.state.selectedItem.name,
            description: this.state.selectedItem.description,
            typeObj: this.state.selectedItem.typeObj,
            imgs: this.state.selectedItem.imgs,
            newsCategories: this.state.selectedItem.newsCategories,
            content: this.state.selectedItem.content,
            startDate: moment.utc(this.state.startDate).format(),
            endDate: moment.utc(this.state.endDate).format(),
            available: this.state.selectedItem.available,
            is_promoted: this.state.selectedItem.isPromoted,
        };
        if(this.state.selectedItem._id) {
            dtoObj._id = this.state.selectedItem._id;
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
        this.props.goTo({pathname: '/'+ROUTE_TREE.news});
    }

    clearSelectedFile (evt) {
        evt.target.value = null;
        // evt.target.files = [];
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
                        imgs: this.state.selectedItem.imgs.concat(res.uploadedFileUrls)}}))
            .catch(error => console.log(error))
        ;
   }

    render() {
        const typesOptions = [
            { value: 'news', label: 'News'},
            { value: 'event', label: 'Event'},
        ];
        const categoriesOptions = [
            { value: 'news', label: 'News'},
            { value: 'event', label: 'Event'},
        ];
        return (
            <>
                <div className="row">
                    <div className="col-12">
                        <div className="card mb-3 shadow no-b r-0">
                            <div className="card-header white">
                                <h6>News</h6>
                            </div>
                            <div className="card-body">
                                <form className="needs-validation" onSubmit={this.handleSubmit}>
                                    <div className="form-row">
                                        <div className="col-md-12 mb-3">
                                            <label>Name</label>
                                            <input type="text" className="form-control" name="name" onChange={this.handleChange}
                                                   value={this.state.selectedItem.name}/>
                                            <div className="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="validationCustom02">Description</label>
                                            <textarea className="form-control" id="description" onChange={this.handleChange}
                                                      name="description" value={this.state.selectedItem.description}/>
                                            <div className="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-12 mb-3">
                                            <label>Images</label>
                                            <div className="custom-file">
                                                <input type="file" className="custom-file-input" accept="image/*" id="file" multiple
                                                    onChange={this.onImageChanged} onClick={this.clearSelectedFile}/>
                                                    <label className="custom-file-label" htmlFor="file">Choose
                                                        file...</label>
                                                    <div className="invalid-feedback">Example invalid custom file feedback
                                                    </div>
                                                    <div>
                                                        <label>Image URLs</label>
                                                        <div>{(this.state.selectedItem.imgs || []).map(
                                                            img => (<div key={img}>{img}</div>)
                                                        )}</div>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-12 mb-3">
                                            <label>Content</label>
                                            <CKEditor
                                                activeClass="p10"
                                                content={this.state.selectedItem.content}
                                                events={{
                                                    "blur": () => {},
                                                    "afterPaste": () => {},
                                                    "change": evt => {
                                                        this.setState({selectedItem: {
                                                            ...this.state.selectedItem,
                                                            content: evt.editor.getData()
                                                        }})
                                                    }
                                                }}
                                            />
                                            <div className="valid-feedback">
                                                Looks good!
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="col-md-12">
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
                                        <div className="col-md-12 mb-3">
                                            <label htmlFor="validationCustomUsername">Type</label>
                                            <Select
                                                value={this.state.selectedItem.typeObj}
                                                onChange={this.handleChangeType}
                                                options={typesOptions}
                                            />
                                            <div className="invalid-feedback">
                                                Please choose a username.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="available"
                                                   value={this.state.selectedItem.available} name="available"
                                                   onChange={evt =>
                                                    this.setState({
                                                        selectedItem: {
                                                            ...this.state.selectedItem,
                                                            [evt.target.name]: evt.target.checked
                                                        }
                                                    })}/>
                                            <label className="form-check-label" htmlFor="available">
                                                Active
                                            </label>
                                            <div className="invalid-feedback">
                                                You must agree before submitting.
                                            </div>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="isPromoted"
                                                   value={this.state.selectedItem.isPromoted} name="isPromoted"
                                                   onChange={evt =>
                                                    this.setState({
                                                        selectedItem: {
                                                            ...this.state.selectedItem,
                                                            [evt.target.name]: evt.target.checked
                                                        }
                                                    })}/>
                                            <label className="form-check-label" htmlFor="isPromoted">
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

NewsDetails.propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.object,
    categories: PropTypes.array,
    getData: PropTypes.func,
    addData: PropTypes.func,
    updateData: PropTypes.func,
    getCate: PropTypes.func,
    addCate: PropTypes.func,
    updateCate: PropTypes.func,
    goTo: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
    return {
        getData: (id) => dispatch(getData(id)),
        deleteData: (id) => dispatch(deleteData(id)),
        addData: (data, cb) => dispatch(addData(data, cb)),
        updateData: (data, cb) => dispatch(updateData(data, cb)),
        getCate: () => dispatch(getCategory()),
        addCate: (type) => dispatch(addCategory(type)),
        updateCate: (type) => dispatch(updateCategory(type)),
        goTo: (obj) => dispatch(push(obj)),
    };
}

const mapStateToProps = createStructuredSelector({
    data: makeSelectData(),
    loading: makeLoading(),
    categories: makeCategories(),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewsDetails);
