import React from 'react';
import { createStructuredSelector } from 'reselect';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import {makeSelectListData, makeSelectListLoading} from "../selectors";
import {getListData} from "../actions";
import messages from "../messages";

class NewsList extends React.Component {
    renderData(arrayData) {
        if(arrayData && arrayData.length > 0) {
            return arrayData.map((data, index) => {
                return (
                    <article className="mg-post" key={index}>
                        <header>
                            <h2 className="mg-post-title">
                                <Link to={'/news/details/' + data._id} rel="bookmark">{data.name}</Link>
                            </h2>
                            <div className="mg-post-meta"><span>
                                <a href="#">27 Jan, 2015</a></span><span>by
                                <a href="#">Admin</a></span><span><a href="#">Room</a>,
                                <a href="#">Delux</a></span><span><a href="#">3 Comments</a></span>
                            </div>
                        </header>
                        <div>
                            <p>{data.description}</p>
                        </div>
                        <footer className="clearfix">
                            <Link className="mg-read-more" to={'/news/details/' + data._id}><FormattedMessage {...messages.viewDetails}/>
                                <i className="fas fa-long-arrow-alt-right"/>
                            </Link>
                        </footer>
                    </article>
                );
            });
        }
        return (
            <p>no data</p>
        );

    }
    render() {
        return (
            <>
                {this.renderData(this.props.list)}
            </>
        );
    }
}

NewsList.propTypes = {
    loading: PropTypes.bool,
    list: PropTypes.array,
    getListData: PropTypes.func
};
export function mapDispatchToProps(dispatch) {
    return {
        getListData: () => dispatch(getListData())
    };
}
const mapStateToProps = createStructuredSelector({
    list: makeSelectListData(),
    loading: makeSelectListLoading(),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewsList);
