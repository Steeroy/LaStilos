import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../App.css';
import { Icon } from '@iconify/react';
import hero__banner from '../../assets/hero_banner.png';

import './Home.css';
import '../../App.css';
import '../../App.css';

import Helmet from '../../components/Helmet';

import data from '../../data.js';
import ProductCard from '../../components/ProductCard';
import Recommendation from '../../components/Recommendation';

import RecomImg from '../../assets/recommendation_avatar.png';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH__REQUEST':
      return { ...state, loading: true };
    case 'FETCH__SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH__FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Home() {
  const [allProducts, setAllProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    loading: true,
    error: '',
    products: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH__REQUEST' });

      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH__SUCCESS', payload: result.data });
        setAllProducts(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH__FAIL', payload: err.message });
      }
    };

    fetchData();
  }, []);

  function filterProducts(cat) {
    setCategory(cat);
    filterProductsHandler(cat);
  }

  function filterProductsHandler(cat) {
    if (cat === 'all') {
      setAllProducts(products);
    }

    const filteredProducts = products.filter((item) => item.type === cat);
    setAllProducts(filteredProducts);
  }

  return (
    <Helmet title="Home">
      <div className="home">
        {/* This is the hero section */}
        <div className="whole_hero">
          <div className="hero__section">
            <Row>
              <Col md={7} className="hero__content">
                <div className="hero__texts">
                  <h1>
                    <span>Hey Bestie!</span> Get the <span>best</span> and the{' '}
                    <span>fastest</span> right at you door step
                  </h1>
                  <p>
                    We promise and guarantee to serve only the best and{' '}
                    <span>freshest</span> at the fastest time possible
                  </p>
                </div>
                <div className="hero__buttons">
                  <Link to="/menu">
                    <button className="button__primary_icon">
                      <span>Shop Now</span>
                      <Icon icon="ic:outline-shopping-cart" />
                    </button>
                  </Link>
                  <Link to="/orders">
                    <button className="button__secondary_icon">
                      <span>View Orders</span>
                      <Icon icon="mdi:order-bool-descending-variant" />
                    </button>
                  </Link>
                </div>
              </Col>
              <Col md={5} className="hero__img_col">
                <div className="hero__img">
                  <img src={hero__banner} alt="food" />
                </div>
              </Col>
            </Row>
          </div>
        </div>

        {/* This is the our services section */}
        <section className="services__section">
          <h2 className="section__title">What we offer</h2>

          <div className="services">
            <div className="service">
              <Icon icon="mdi:clock-fast" />
              <div className="service__content">
                <h5>Easy Order</h5>
                <p>Just a few clicks, you’re served.</p>
              </div>
            </div>
            <div className="service__separator"></div>
            <div className="service">
              <Icon icon="carbon:delivery" />
              <div className="service__content">
                <h5>Fast Delivery</h5>
                <p>Quick, you won’t even blink</p>
              </div>
            </div>
            <div className="service__separator"></div>
            <div className="service">
              <Icon icon="material-symbols:verified-user-outline-rounded" />
              <div className="service__content">
                <h5>Best Quality</h5>
                <p>Cooked with the best ingredients</p>
              </div>
            </div>
          </div>
        </section>

        <section className="menu__section">
          <h2 className="section__title">Our Menu</h2>

          <div className="menu__container">
            <div className="menu__row">
              {data.menus.map((item, index) => (
                <div
                  className={`menu__card ${
                    category === item.slug ? 'activeMenu' : ''
                  }`}
                  onClick={() => filterProducts(item.slug)}
                >
                  <div className="icon__circle">
                    <Icon icon={item.icon} />
                  </div>

                  <h5>{item.title}</h5>
                </div>
              ))}
            </div>
          </div>

          <div className="products__container">
            <Row>
              {loading ? (
                <LoadingBox />
              ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : (
                allProducts &&
                allProducts.map((item) => (
                  <div className="product__col" key={item.id}>
                    <ProductCard product={item} />
                  </div>
                ))
              )}
            </Row>
          </div>
        </section>

        <section className="recommendation__section">
          <Row className="recom__row">
            <Col md={4} className="reco__image_col">
              <div className="reco_img_box">
                <img src={RecomImg} alt="Recommendation" />
              </div>
            </Col>
            <Col md={8} className="reco__content_col">
              <div className="reco__content">
                <h2 className="section__title">What our Customers say</h2>

                <Recommendation />
              </div>
            </Col>
          </Row>
        </section>
      </div>
    </Helmet>
  );
}

export default Home;
