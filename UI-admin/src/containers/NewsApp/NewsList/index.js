import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import moment from "moment";
import {toastr} from "react-redux-toastr";

import {getListData, deleteData} from '../actions';
import {makeListLoading, makeSelectListData} from "../selectors";
import {ROUTE_TREE} from "../../App/constants";

class NewsList extends React.Component {
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
                    <tr key={index}>
                        <td> <div className="d-none d-lg-block">{data.name}</div></td>
                        <td> <div className="d-none d-lg-block">{data.description}</div></td>
                        <td> <div className="d-none d-lg-block">{data.typeObj.label}</div></td>
                        {/* <td> <div className="d-none d-lg-block">{data.imgs.map(item=> (<p>{item}</p>))}</div></td> */}
                        <td> <div className="d-none d-lg-block">{moment(data.startDate).format('DD/MM/YYYY')}</div></td>
                        <td> <div className="d-none d-lg-block">{moment(data.endDate).format('DD/MM/YYYY')}</div></td>
                        <td>
                            <div className="d-none d-lg-block">
                                {data.available ?
                                    (<span className="icon icon-circle s-12  mr-2 text-success"/>) : (<span className="icon icon-circle s-12  mr-2 text-danger"/>)}
                            </div>
                        </td>
                        <td>
                            <div className="d-none d-lg-block">{data.is_promoted ?
                                (<span className="icon icon-circle s-12  mr-2 text-success"/>) : (<span className="icon icon-circle s-12  mr-2 text-danger"/>)}
                            </div>
                        </td>
                        <td>
                            <Link to={'/' + ROUTE_TREE.news + '/' + ROUTE_TREE.newsDetails + '/' + data._id} className="btn">
                                <i className="icon-eye mr-3"/>
                            </Link>
                            <Link to={'/' + ROUTE_TREE.news + '/' + ROUTE_TREE.newsDetails + '/' + data._id} className="btn">
                                <i className="icon-pencil"/>
                            </Link>
                            <button onClick={() => {this.onDelete(data)}} type="button" className="btn"><i className="icon-trash-can"/></button>
                        </td>
                    </tr>
                );
            });
        }
        return (
            <tr>
                <td colSpan={9}>No data</td>
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
                                                <th>Name</th>
                                                <th> <div className="d-none d-lg-block">Description</div></th>
                                                <th> <div className="d-none d-lg-block">Type</div></th>
                                                {/* <th> <div className="d-none d-lg-block">Images</div></th> */}
                                                <th> <div className="d-none d-lg-block">From Date</div></th>
                                                <th> <div className="d-none d-lg-block">To Date</div></th>
                                                <th> <div className="d-none d-lg-block">Available</div></th>
                                                <th> <div className="d-none d-lg-block">Promoted</div></th>
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
                {/*Add New Message Fab Button*/}
                <Link to={'/' + ROUTE_TREE.news + '/' + ROUTE_TREE.newsAdd + '/'}
                      className="btn-fab btn-fab-md fab-right fab-right-bottom-fixed shadow btn-primary">
                    <i className="icon-add"/>
                </Link>
            </>
        );
    };

}

NewsList.propTypes = {
    loading: PropTypes.bool,
    list: PropTypes.array,
    getListData: PropTypes.func,
    deleteData: PropTypes.func,
};
export function mapDispatchToProps(dispatch) {
    return {
        getListData: () => dispatch(getListData()),
        deleteData: (_id) => dispatch(deleteData(_id))
    };
}
const mapStateToProps = createStructuredSelector({
    list: makeSelectListData(),
    loading: makeListLoading(),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NewsList);
