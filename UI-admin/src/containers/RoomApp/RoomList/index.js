import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {toastr} from "react-redux-toastr";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import $ from 'jquery';

import {getListData, deleteData} from '../actions';
import {makeListLoading, makeSelectListData} from "../selectors";
import {ROUTE_TREE} from "../../App/constants";
import CarouselImages from './../../../components/CarouselImages/index';

class RoomList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrls: []
        };
    }

    componentDidMount() {
        this.props.getListData();
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

    renderData(arrayData) {
        if(arrayData && arrayData.length > 0) {
            return arrayData.map((data, index) => {
                return (
                    <tr key={data._id}>
                        <td>
                            <div className="d-flex">
                                <div>
                                    <div>
                                        <strong>{data.name}</strong>
                                    </div>
                                </div>
                            </div>
                        </td>

                        <td> <div className="d-none d-lg-block">{data.price}</div></td>
                        <td> <div className="d-none d-lg-block">
                            <ul>
                            {data.services.map((service, index) => {
                            return (<li key={index}>{service.label}</li>);
                            })}
                            </ul>
                        </div></td>

                        <td> <div className="d-none d-lg-block">{data.available_quantity}</div></td>
                        <td> <div className="d-none d-lg-block">{data.booked_quantity}</div></td>
                        <td>
                            <div className="d-none d-lg-block">
                            {data.available ?
                            (<span className="icon icon-circle s-12  mr-2 text-success"/>) : (<span className="icon icon-circle s-12  mr-2 text-danger"/>)}
                            </div>
                        </td>
                        <td> <div className="d-none d-lg-block"><a onClick={() => {
                            $('#imageViewerModel').modal('show');
                            this.setState({...this.state, imgUrls: data.imgs});
                        }}>{data.imgs.length} images</a></div></td>
                        {/* <td>
                            <div className="d-none d-lg-block">{data.is_promoted ?
                            (<span className="icon icon-circle s-12  mr-2 text-success"/>) : (<span className="icon icon-circle s-12  mr-2 text-danger"/>)}
                            </div>
                        </td> */}
                        <td>
                            <Link to={'/' + ROUTE_TREE.rooms + '/' + ROUTE_TREE.roomDetails + '/' + data._id} className="btn"><i className="icon-eye mr-3"/></Link>
                            <Link to={'/' + ROUTE_TREE.rooms + '/' + ROUTE_TREE.roomDetails + '/' + data._id} className="btn"><i className="icon-pencil"/></Link>
                            <button onClick={() => {this.onDelete(data)}} type="button" className="btn"><i className="icon-trash-can"/></button>
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
                                                <th>NAME</th>

                                                <th> <div className="d-none d-lg-block">PRICES</div></th>
                                                <th> <div className="d-none d-lg-block">SERVICES</div></th>
                                                <th> <div className="d-none d-lg-block">QUANTITY</div></th>
                                                <th> <div className="d-none d-lg-block">BOOKED QUANTITY</div></th>
                                                <th> <div className="d-none d-lg-block">AVAILABLE</div></th>
                                                <th> <div className="d-none d-lg-block">IMAGES</div></th>
                                                {/* <th> <div className="d-none d-lg-block">PROMOTED</div></th> */}
                                                <th/>
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
                {/*Add New Message Fab Button*/}
                <Link to={'/' + ROUTE_TREE.rooms + '/' + ROUTE_TREE.roomsAdd + '/'} className="btn-fab btn-fab-md fab-right fab-right-bottom-fixed shadow btn-primary"><i
                    className="icon-add"/></Link>
            </>
        );
    };

}

RoomList.propTypes = {
    loading: PropTypes.bool,
    list: PropTypes.array,
    getListData: PropTypes.func,
    deleteData: PropTypes.func
};

export function mapDispatchToProps(dispatch) {
    return {
        getListData: () => dispatch(getListData()),
        deleteData: (_id) => dispatch(deleteData(_id)),
    };
}

const mapStateToProps = createStructuredSelector({
    list: makeSelectListData(),
    loading: makeListLoading(),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RoomList);
