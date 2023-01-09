import React, { useEffect, useReducer, useState } from 'react';
import Helmet from '../../components/Helmet';
import { Icon } from '@iconify/react';
import ReactPaginate from 'react-paginate';

import './Menu.css';
import '../../App.css';
import logger from 'use-reducer-logger';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import ProductCard from '../../components/ProductCard';

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

function Menu() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    loading: true,
    error: '',
    products: [],
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [pageNumber, setPageNumber] = useState(0);

  //const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH__REQUEST' });

      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH__SUCCESS', payload: result.data });
        //setFilteredProducts(result.data);
      } catch (err) {
        dispatch({ type: 'FETCH__FAIL', payload: err.message });
      }
    };

    fetchData();
  }, []);

  const searchedProducts = products.filter((item) => {
    if (searchTerm.value === '') return item;
    if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) return item;

    return '';
  });

  const productPerPage = 10;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = searchedProducts.slice(
    visitedPage,
    visitedPage + productPerPage
  );

  const pageCount = Math.ceil(searchedProducts.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Helmet title="Menu">
      <div className="menu">
        <div className="page__banner">
          <div className="page__banner_text">
            <span>All Foods</span>
          </div>
        </div>

        <div className="menu__details">
          <div className="search__filters">
            <div className="search">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span>
                <Icon icon="material-symbols:search-rounded" />
              </span>
            </div>

            <div className="filters">
              <div className="sort">
                <span>Sort by:</span>
                <select>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="cheapest">Cheapest</option>
                  <option value="expensive">Expensive</option>
                </select>
              </div>
            </div>
          </div>

          <div className="products">
            <Row>
              {loading ? (
                <LoadingBox />
              ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : (
                displayPage &&
                displayPage.map((item) => (
                  <Col md={2} className="product__col" key={item.id}>
                    <ProductCard product={item} />
                  </Col>
                ))
              )}
            </Row>
            <ReactPaginate
              pageCount={pageCount}
              onPageChange={changePage}
              previousLabel="Prev"
              nextLabel="Next"
              containerClassName="paginationBttns"
            />
          </div>
        </div>
      </div>
    </Helmet>
  );
}

export default Menu;
