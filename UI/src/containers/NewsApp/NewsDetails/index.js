import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import moment from 'moment';

import {getData, getTypes} from "../actions";
import {makeLoading, makeSelectData, makeTypes} from "../selectors";


/* eslint-disable react/prefer-stateless-function */
class NewsDetails extends React.Component {
    componentDidMount() {
        if(this.props.match.params.id) {
            this.props.getData(this.props.match.params.id);
        }
    }

    renderData(data) {
        if(data) {
            return (
                <article className="mg-post">
                    <header>
                        <Link to="/"><img className="img-fluid" src="assets/images/blog-1.png" alt=""/></Link>
                        <h2 className="mg-post-title"><Link to="/" rel="bookmark">{data.name}</Link></h2>
                        <div className="mg-post-meta"><span><a
                            href="#">{moment(data.createdAt).format('DD MMM, YYYY')}</a></span><span>by <a
                            href="#">Admin</a></span>
                            {/* <span><a href="#">Room</a>, <a
                            href="#">Delux</a></span><span><a href="#">3 Comments</a></span> */}
                        </div>
                    </header>
                    <div>
                        <p dangerouslySetInnerHTML={{__html: data.content}} />
                    </div>
                    {/* <footer className="clearfix">
                        <div className="mg-single-post-tags tagcloud">
                            <Link to="#" rel="tag">rooms</Link>
                            <Link to="#" rel="tag">video</Link>
                            <Link to="#" rel="tag">image</Link></div>
                    </footer> */}
                </article>
            );
        }
        return (
            <p>no data</p>
        );

    }
    render() {
        return (
            <>
                {this.renderData(this.props.data)}
            </>
        );
    }
}

NewsDetails.propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.object,
    types: PropTypes.array,
    getData: PropTypes.func,
    getTypes: PropTypes.func
};
export function mapDispatchToProps(dispatch) {
    return {
        getData: (id) => dispatch(getData(id)),
        getTypes: () => dispatch(getTypes())
    };
}
const mapStateToProps = createStructuredSelector({
    data: makeSelectData(),
    loading: makeLoading(),
    types: makeTypes(),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewsDetails);
