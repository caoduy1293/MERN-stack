import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {push} from "react-router-redux";
import $ from "jquery";
import { FormattedMessage } from 'react-intl';

import messages from "../messages";
import {getData} from "../actions";
import {makeLoading, makeSelectData} from "../selectors";

class RoomDetails extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if(this.props.match.params.id) {
            this.props.getData(this.props.match.params.id, this.makeSlideImage);
        }
    }

    makeSlideImage() {
        /*
         * Owl Carousel for Gallery
         */
        let sync1 = $("#mg-gallery");
        let sync2 = $("#mg-gallery-thumb");
        sync1.owlCarousel({
            navigation: true,
            singleItem: true,
            pagination: false,
            afterAction: syncPosition,
            navigationText: ['<i class="fa fa-long-arrow-left"></i>', '<i class="fa fa-long-arrow-right"></i>']

        });

        sync2.owlCarousel({
            items: 3,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [979, 3],
            itemsTablet: [768, 3],
            itemsMobile: [479, 3],
            navigation: false,
            pagination: false,
            navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            afterInit: function afterInit(el) {
                el.find(".owl-item").eq(0).addClass("synced");
            }

        });

        function syncPosition(el) {
            var current = this.currentItem;
            $("#mg-gallery-thumb").find(".owl-item").removeClass("synced").eq(current).addClass("synced");
            if ($("#mg-gallery-thumb").data("owlCarousel") !== undefined) {
                center(current);
            }
        }

        sync2.on("click", ".owl-item", function(e) {
            e.preventDefault();
            var number = $(this).data("owlItem");
            sync1.trigger("owl.goTo", number);
        });

        function center(number) {
            let sync2visible = sync2.data("owlCarousel").owl.visibleItems;
            let num = number;
            let found = false;
            for (let i in sync2visible) {
                if (num === sync2visible[i]) {
                    found = true;
                }
            }

            if (found === false) {
                if (num > sync2visible[sync2visible.length - 1]) {
                    sync2.trigger("owl.goTo", num - sync2visible.length + 2);
                } else {
                    if (num - 1 === -1) {
                        num = 0;
                    }
                    sync2.trigger("owl.goTo", num);
                }
            } else if (num === sync2visible[sync2visible.length - 1]) {
                sync2.trigger("owl.goTo", sync2visible[1]);
            } else if (num === sync2visible[0]) {
                sync2.trigger("owl.goTo", num - 1);
            }
        }
    }

    renderData(data) {
        if(data) {
            return (
                <>
                    <div className="mg-single-room-price">
                        <div className="mg-srp-inner">
                            ${data.price}
                            {/*<span>/Night</span>*/}
                        </div>
                    </div>
                    <div className="mg-single-room">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-7 mb-4 mb-lg-0">

                                    <div className="mg-gallery-container">
                                        <ul className="mg-gallery" id="mg-gallery">
                                            {data.imgs.map((item, index) => {
                                                return (<li key={index}><img src={item} alt="Hình phòng"/></li>);
                                            })}
                                        </ul>
                                        <ul className="mg-gallery-thumb" id="mg-gallery-thumb">
                                            {data.imgs.map((item, index) => {
                                                return (<li key={index}><img src={item} alt="Hình phòng"/></li>);
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-5 mg-room-fecilities">
                                    <h2 className="mg-sec-left-title">{data.name}</h2>
                                    <div className="row">
                                        <div className="col-12">
                                            <ul>
                                                {
                                                    (data.services || []).map(item => (<li><i className="fp-ht-bed"/> {item.label}</li>))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mg-single-room-txt">
                                        <h2 className="mg-sec-left-title"><FormattedMessage {...messages.roomDescription}/></h2>
                                        <p>{data.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<div className="mg-single-room-review-sec">*/}
                        {/*<div className="container">*/}
                            {/*<div className="row">*/}
                                {/*<div className="col-md-12 clearfix">*/}
                                    {/*<div className="mg-sm-full-rating">*/}
                                        {/*<h2 className="mg-sec-left-title">Room Reviews</h2>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            {/*<div className="row">*/}
                                {/*<div className="col-lg-7">*/}
                                    {/*<div className="mg-reviews">*/}
                                        {/*<div className="media"><a href="#"><img className="mr-3 media-object"*/}
                                                                                {/*src={review}*/}
                                                                                {/*alt="..."/></a>*/}
                                            {/*<div className="media-body">*/}
                                                {/*<div className="mg-media-meta">*/}
                                                    {/*<h4 className="media-heading">Dylan Taylor</h4>*/}
                                                    {/*<div className="mg-media-user-rating"><span className="mg-rs-icon"><i*/}
                                                        {/*className="fas fa-star"></i><i className="fas fa-star"></i><i*/}
                                                        {/*className="fas fa-star"></i><i className="fas fa-star"></i><i*/}
                                                        {/*className="far fa-star"></i></span></div>*/}
                                                    {/*<div className="media-date">25 Jan, 2015</div>*/}
                                                {/*</div>*/}
                                                {/*<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perfunctio*/}
                                                    {/*dicturum cupiditatibusque refugiendi facillimis genuit fecerit amoris*/}
                                                    {/*atomos. Praeclarorum, superstitio quem nostra turpius</p>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                        {/*<div className="media"><a href="#"><img className="mr-3 media-object"*/}
                                                                                {/*src={review}*/}
                                                                                {/*alt="..."/></a>*/}
                                            {/*<div className="media-body">*/}
                                                {/*<div className="mg-media-meta">*/}
                                                    {/*<h4 className="media-heading">Vincent Watson</h4>*/}
                                                    {/*<div className="mg-media-user-rating"><span className="mg-rs-icon"><i*/}
                                                        {/*className="fas fa-star"></i><i className="fas fa-star"></i><i*/}
                                                        {/*className="fas fa-star"></i><i className="fas fa-star"></i><i*/}
                                                        {/*className="far fa-star"></i></span></div>*/}
                                                    {/*<div className="media-date">25 Jan, 2015</div>*/}
                                                {/*</div>*/}
                                                {/*<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perfunctio*/}
                                                    {/*dicturum cupiditatibusque refugiendi facillimis genuit fecerit amoris*/}
                                                    {/*atomos. Praeclarorum, superstitio quem nostra turpius</p>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div className="col-lg-5">*/}
                                    {/*<form>*/}
                                        {/*<div className="row">*/}
                                            {/*<div className="col-6 mg-star-rating">*/}
                                                {/*<div className="mg-star-rating-title">Position:</div>*/}
                                                {/*<div className="starrr" id="mg-star-position"></div>*/}
                                                {/*<input id="mg-star-position-input" type="hidden"/>*/}
                                            {/*</div>*/}
                                            {/*<div className="col-6 mg-star-rating">*/}
                                                {/*<div className="mg-star-rating-title">Comfort:</div>*/}
                                                {/*<div className="starrr" id="mg-star-comfort"></div>*/}
                                                {/*<input id="mg-star-comfort-input" type="hidden"/>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                        {/*<div className="row">*/}
                                            {/*<div className="col-6 mg-star-rating">*/}
                                                {/*<div className="mg-star-rating-title">Price:</div>*/}
                                                {/*<div className="starrr" id="mg-star-price"></div>*/}
                                                {/*<input id="mg-star-price-input" type="hidden"/>*/}
                                            {/*</div>*/}
                                            {/*<div className="col-6 mg-star-rating">*/}
                                                {/*<div className="mg-star-rating-title">Quality:</div>*/}
                                                {/*<div className="starrr" id="mg-star-quality"></div>*/}
                                                {/*<input id="mg-star-quality-input" type="hidden"/>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                        {/*<div className="row">*/}
                                            {/*<div className="col-md-6">*/}
                                                {/*<input className="form-control" type="text" placeholder="Your Name"/>*/}
                                            {/*</div>*/}
                                            {/*<div className="col-md-6">*/}
                                                {/*<input className="form-control" type="text" placeholder="Your Email"/>*/}
                                            {/*</div>*/}
                                        {/*</div>*/}
                                        {/*<textarea className="form-control" placeholder="Your Comment" rows="5"></textarea>*/}
                                        {/*<input className="btn btn-dark float-right" type="submit" value="Submit Review"/>*/}
                                    {/*</form>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                </>
            );
        }
        return (
            <p>no data</p>
        );

    }
    render() {
        return this.renderData(this.props.data);
    }
}
RoomDetails.propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.object,
    getData: PropTypes.func,
    redirect: PropTypes.func,
};
export function mapDispatchToProps(dispatch) {
    return {
        getData: (id, cbSuccess) => dispatch(getData(id, cbSuccess)),
        redirect: (url) => dispatch(push(url))
    };
}
const mapStateToProps = createStructuredSelector({
    data: makeSelectData(),
    loading: makeLoading(),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RoomDetails);
