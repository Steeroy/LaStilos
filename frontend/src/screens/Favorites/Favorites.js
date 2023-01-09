import React, { useContext } from 'react';

import './Favorites.css';
import '../../App.css';
import Helmet from '../../components/Helmet';
import { Store } from '../../Store';
import { Col, Row } from 'react-bootstrap';
import ProductCard from '../../components/ProductCard';
import MessageBox from '../../components/MessageBox';
import { Link } from 'react-router-dom';

function Favorites() {
  const { state } = useContext(Store);
  const {
    cart: { favouriteItems },
  } = state;

  return (
    <Helmet title="Favorites">
      <div className="favourites">
        <div className="page__banner">
          <div className="page__banner_text">
            <span>Favourites</span>
          </div>
        </div>

        <div className="favourites__content">
          <Row>
            {favouriteItems ? (
              favouriteItems.map((item) => (
                <Col md={2} className="product__col" key={item.id}>
                  <ProductCard product={item} />
                </Col>
              ))
            ) : (
              <MessageBox>
                No Favoutes. <Link to="/menu">Add favourites</Link>
              </MessageBox>
            )}
          </Row>
        </div>
      </div>
    </Helmet>
  );
}

export default Favorites;
