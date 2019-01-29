import React from 'react';
import PropTypes from 'prop-types';
// import slide2 from "../../assets/images/slide-2.png";
// import slide3 from "../../assets/images/slide-3.png";
// import slide4 from "../../assets/images/slide-4.png";
// import stars from "../../assets/images/stars.png";

/* eslint-disable react/prefer-stateless-function */
class CarouselImages extends React.Component {
    render() {
        return (
            <>
                <div className="carousel slide" id="megaSlider" data-ride="carousel">
                    {/*Indicators*/}
                    <ol className="carousel-indicators">
                        {/* <li className="active" data-target="#megaSlider" data-slide-to="0"></li>
                        <li data-target="#megaSlider" data-slide-to="1"></li>
                        <li data-target="#megaSlider" data-slide-to="2"></li> */}
                        {this.props.imgUrls.map((img, index) => (
                            <li key={index} className={(index === 0 ? 'active' : '')} data-target="#megaSlider" data-slide-to={index}></li>
                        ))}
                    </ol>
                    {/*Wrapper for slides*/}
                    <div className="carousel-inner">
                        {this.props.imgUrls.map((img, index) => (
                            <div key={index} className={(index === 0 ? 'carousel-item active' : 'carousel-item')}>
                                <img src={img} alt="..." style={{maxHeight: 'calc(100vh - 230px)'}}/>
                                <div className="carousel-caption">
                                    {/* <img src={stars} alt=""/>
                                    <h2>Feel Like Your Home</h2>
                                    <p>Cogitavisse erant puerilis utrum efficiantur adhuc expeteretur.</p> */}
                                </div>
                            </div>
                        ))}
                        {/* <div className="carousel-item active"><img src={slide2} alt="..."/>
                            <div className="carousel-caption"><img src={stars} alt=""/>
                                <h2>Welcome to Mega Hotel</h2>
                                <p>Cogitavisse erant puerilis utrum efficiantur adhuc expeteretur.</p>
                            </div>
                        </div>
                        <div className="carousel-item"><img src={slide3} alt="..."/>
                            <div className="carousel-caption"><img src={stars} alt=""/>
                                <h2>Feel Like Your Home</h2>
                                <p>Cogitavisse erant puerilis utrum efficiantur adhuc expeteretur.</p>
                            </div>
                        </div>
                        <div className="carousel-item"><img src={slide4} alt="..."/>
                            <div className="carousel-caption"><img src={stars} alt=""/>
                                <h2>Perfect Place for Dining</h2>
                                <p>Cogitavisse erant puerilis utrum efficiantur adhuc expeteretur.</p>
                            </div>
                        </div> */}
                    </div>

                    <a className="carousel-control-prev carousel-control left" href="#megaSlider" role="button"
                       data-slide="prev"/>
                    <a className="carousel-control-next carousel-control right" href="#megaSlider" role="button"
                       data-slide="next"/>
                </div>
            </>
        );
    }
}

CarouselImages.propTypes = {
    imgUrls: PropTypes.array
};

CarouselImages.defaultProps = {
    imgUrls: []
};

export default CarouselImages;
