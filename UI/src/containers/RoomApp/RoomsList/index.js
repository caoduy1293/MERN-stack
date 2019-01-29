import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import qs from 'query-string';
import { FormattedMessage } from 'react-intl';

import messages from "../messages";
import room1 from '../../../assets/images/room-1.png';
import {makeListLoading, makeSelectListData} from "../selectors";
import {getListData} from "../actions";

class RoomList extends React.Component {

    componentDidMount() {
        this.props.getListData();
    }

    renderData(arrayData) {
        if(arrayData && arrayData.length > 0) {
            return arrayData.map((data, index) => {
                return (
                    <div className="col-md-6" key={index}>
                        <figure className="mg-room mg-room-col-2">
                            <img className="img-fluid" src={room1} alt="img11"/>
                            <figcaption>
                                <h2>{data.name}</h2>
                                <div className="mg-room-rating"><i className="fa fa-star"> </i> 5.0</div>
                                <div className="mg-room-price">
                                    ${data.price}
                                    {/*<sup>/Night</sup>*/}
                                </div>
                                <p>{data.description}</p>
                                <div className="row mg-room-fecilities">
                                    <div className="col-md-12">
                                        <ul>
                                            {
                                                (data.services || []).map(item => (<li key={item.value}><i className="fp-ht-bed"/> {item.label}</li>))
                                            }
                                        </ul>
                                    </div>
                                </div>
                                <Link className="btn btn-link" to={'/rooms/details/' + data._id}>
                                    <FormattedMessage {...messages.viewDetails}/> <i className="fa fa-angle-double-right"/>
                                </Link>
                                <Link className="btn btn-main" to={'/rooms/booking'}><FormattedMessage {...messages.book}/></Link>
                            </figcaption>
                        </figure>
                    </div>
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
                <div className="mg-page">
                    <div className="container">
                        <div className="row">
                            {this.renderData(this.props.listAvailable)}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

RoomList.propTypes = {
    loading: PropTypes.bool,
    listAvailable: PropTypes.array,
    getListData: PropTypes.func
};
export function mapDispatchToProps(dispatch) {
    return {
        getListData: () => dispatch(getListData())
    };
}
const mapStateToProps = createStructuredSelector({
    listAvailable: makeSelectListData(),
    loading: makeListLoading(),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RoomList);
