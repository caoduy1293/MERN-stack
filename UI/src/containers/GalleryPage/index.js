/*
 * FeaturePage
 *
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import $ from 'jquery';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import {getData, getTypes, getListData} from "./actions";
import {makeLoading, makeSelectData, makeSelectTypes, makeSelectListData} from "./selectors";
import {KEY_APP} from "./constants";
import reducer from "./reducer";
import saga from "./saga";
import room1 from '../../assets/images/room-1.png';

import Shuffle from 'shufflejs/dist/shuffle.min';

const idViewImg = 'viewImage';

class GalleryPage extends React.Component {
    shuffleInstance;

    constructor(props) {
        super(props);
        this.onChangeFilter = this.onChangeFilter.bind(this);
        this.setSelectedFilter = this.setSelectedFilter.bind(this);
        this.cbSuccess = this.cbSuccess.bind(this);
        this.viewImg = this.viewImg.bind(this);
        this.state = {
            defaultSelectedFilter: '',
            selectedImgUrl: ''
        };
        this.mgGrid = React.createRef();
        this.sizer = React.createRef();
    }

    componentDidMount() {
        this.props.getListData(this.cbSuccess);


    }

    cbSuccess() {
        this.setState({defaultSelectedFilter: 'all'},
            () => {
                const element = this.mgGrid.current;

                this.shuffleInstance = new Shuffle(element, {itemSelector: '.mg-gallery-item'});

                this.shuffleInstance.filter();
            });

    }

    setSelectedFilter(value) {
        return value === this.state.defaultSelectedFilter? 'btn-main': '';
    }

    onChangeFilter($event) {
        const value = $event.currentTarget.value;
        this.shuffleInstance.filter(value);
        this.setState({defaultSelectedFilter: value});
    }

    viewImg(img) {
        this.setState({
            selectedImgUrl: img
        });
        $(`#${idViewImg}`).modal();
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>Gallery</title>
                    <meta
                        name="description"
                        content="Gallery"
                    />
                </Helmet>

                <div className="mg-page">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="mg-filter">
                                    <form id="mg-filter">
                                        <fieldset>
                                            <label className={'btn btn-dark ' + this.setSelectedFilter('all')} >
                                                <input type="radio" name="filter" value="all" onChange={this.onChangeFilter}/>
                                                All
                                            </label>
                                            {
                                                this.props.types.map((item, index) => {
                                                    return (
                                                        <label key={index} className={'btn btn-dark ' + this.setSelectedFilter(item._id)}>
                                                            <input type="radio" name="filter" value={item._id} onChange={this.onChangeFilter}/>
                                                            {item.name}
                                                        </label>
                                                    );
                                                })
                                            }
                                        </fieldset>
                                    </form>
                                </div>
                                <div className="row" ref={this.mgGrid}>
                                    {
                                        this.props.list.map((item, index) => {
                                            return item.imgs.map(img => (
                                                <figure key={index} className="col-4 mg-gallery-item" data-groups={'["'+ item.galleryCategory.value +'"]'}>
                                                    <a onClick={(event) => {
                                                        event.preventDefault(); this.viewImg(img);
                                                    }} data-lightbox-gallery="rooms">
                                                        <img className="img-fluid" src={img} alt=""/>
                                                    <span className="mg-gallery-overlayer">
                                                    <i className="fa fa-search-plus"/></span>
                                                    </a>
                                                </figure>
                                            ));
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id={idViewImg} tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content bg-transparent text-center border-0">
                            <div>
                                {this.state.selectedImgUrl ? (<img className="img-fluid" src={this.state.selectedImgUrl} alt=""/>) : ''}
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
    data: PropTypes.object,
    types: PropTypes.array,
    list: PropTypes.array,
    getData: PropTypes.func,
    getListData: PropTypes.func,
    getTypes: PropTypes.func,
};
export function mapDispatchToProps(dispatch) {
    return {
        getData: () => dispatch(getData()),
        getListData: (cbSuccess) => dispatch(getListData(cbSuccess))
    };
}
const mapStateToProps = createStructuredSelector({
    data: makeSelectData(),
    loading: makeLoading(),
    types: makeSelectTypes(),
    list: makeSelectListData(),
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
