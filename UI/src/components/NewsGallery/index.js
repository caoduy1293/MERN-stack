import React from 'react';
import { Link } from 'react-router-dom';


/* eslint-disable react/prefer-stateless-function */
class NewsGallery extends React.Component {
    render() {
        return (
            <>
                <section className="mg-news-gallery">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5">
                                <h2 className="mg-sec-left-title">Recent News</h2>
                                <ul className="mg-recnt-posts">
                                    <li>
                                        <div className="mg-recnt-post">
                                            <div className="mg-rp-date">27
                                                <div className="mg-rp-month">may</div>
                                            </div>
                                            <h3><a href="#">A Standard Blog Post</a></h3>
                                            <p>Nostram virtutem poterimus quoddam praesertim legendos libero
                                                exhorrescere saluti...</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="mg-recnt-post">
                                            <div className="mg-rp-date">27
                                                <div className="mg-rp-month">may</div>
                                            </div>
                                            <h3><a href="#">A Standard Blog Post</a></h3>
                                            <p>Nostram virtutem poterimus quoddam praesertim legendos libero
                                                exhorrescere saluti...</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="mg-recnt-post">
                                            <div className="mg-rp-date">27
                                                <div className="mg-rp-month">may</div>
                                            </div>
                                            <h3><a href="#">A Standard Blog Post</a></h3>
                                            <p>Nostram virtutem poterimus quoddam praesertim legendos libero
                                                exhorrescere saluti...</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-7">
                                <h2 className="mg-sec-left-title">Our Gallery</h2>
                                <div className="mg-gallery-container">
                                    <ul className="mg-gallery" id="mg-gallery">
                                        <li><img src="assets/images/gallery-01.png" alt="Partner Logo"/></li>
                                        <li><img src="assets/images/gallery-02.png" alt="Partner Logo"/></li>
                                        <li><img src="assets/images/gallery-05.png" alt="Partner Logo"/></li>
                                        <li><img src="assets/images/gallery-06.png" alt="Partner Logo"/></li>
                                        <li><img src="assets/images/gallery-07.png" alt="Partner Logo"/></li>
                                        <li><img src="assets/images/gallery-08.png" alt="Partner Logo"/></li>
                                    </ul>
                                    <ul className="mg-gallery-thumb" id="mg-gallery-thumb">
                                        <li><img src="assets/images/gallery-thumb-01.png" alt="Partner Logo"/></li>
                                        <li><img src="assets/images/gallery-thumb-02.png" alt="Partner Logo"/></li>
                                        <li><img src="assets/images/gallery-thumb-05.png" alt="Partner Logo"/></li>
                                        <li><img src="assets/images/gallery-thumb-06.png" alt="Partner Logo"/></li>
                                        <li><img src="assets/images/gallery-thumb-07.png" alt="Partner Logo"/></li>
                                        <li><img src="assets/images/gallery-thumb-08.png" alt="Partner Logo"/></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default NewsGallery;
