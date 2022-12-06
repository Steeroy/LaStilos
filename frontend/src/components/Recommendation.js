import React from 'react';
import Slider from 'react-slick';
import data from '../data.js';

import '../App.css';
import { Col, Row } from 'react-bootstrap';

function Recommendation() {
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 2500,
    autoplaySpeed: 8000,
    swipeToSlide: true,
    slideToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
  };

  return (
    <Slider {...settings}>
      {data.recommendations.map((item, index) => (
        <Row className="testimonial" key={index}>
          <Col md={2} className="test__img_box">
            <div className="test__img">
              <img src={item.imgUrl} alt={item.name} />
            </div>
          </Col>
          <Col md={10} className="test__content">
            <p>
              "{item.message}" <span>{item.name}</span>
            </p>
          </Col>
        </Row>
      ))}
    </Slider>
  );
}

export default Recommendation;
