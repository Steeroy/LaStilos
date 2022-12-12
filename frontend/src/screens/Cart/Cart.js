import React, { useContext } from 'react';
import { Store } from '../../Store';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

import '../../App.css';
import CheckoutSteps from '../../components/CheckoutSteps';
import MessageBox from '../../components/MessageBox';
import './Cart.css';
import Helmet from '../../components/Helmet';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';

function Cart() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);

    if (data.inStock < quantity) {
      window.alert('Sorry. Product is out of stock.');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };

  return (
    <Helmet title="Cart">
      <div className="cart">
        <div className="page__banner">
          <div className="page__banner_text">
            <span>Cart</span>
          </div>
        </div>

        <div className="cart__items">
          <CheckoutSteps step1></CheckoutSteps>
          <Row className="items">
            <Col md={8}>
              <Row className="items__header">
                <Col md={6}>
                  <h5>Product</h5>
                </Col>
                <Col md={2}>
                  <h5>Quantity</h5>
                </Col>
                <Col md={2}>
                  <h5>Total</h5>
                </Col>
                <Col md={2}>
                  <h5>Remove</h5>
                </Col>
              </Row>
              {cartItems.length === 0 ? (
                <MessageBox>
                  Cart is empty. <Link to="/menu">Go Shopping</Link>
                </MessageBox>
              ) : (
                <div className="item__row">
                  {cartItems.map((item) => (
                    <Row className="align-items-center" key={item._id}>
                      <Col md={6} className="d-flex align-items-center gap-3">
                        <div className=" rounded item__image">
                          <img src={item.imgUrl} alt={item.name} />
                        </div>
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>
                        <div className="add__subtract">
                          <button
                            disabled={item.quantity === 1}
                            onClick={() =>
                              updateCartHandler(item, item.quantity - 1)
                            }
                          >
                            <Icon icon="ic:round-minus" />
                          </button>{' '}
                          <span>{item.quantity}</span>{' '}
                          <button
                            disabled={item.quantity === item.inStock}
                            onClick={() =>
                              updateCartHandler(item, item.quantity + 1)
                            }
                          >
                            <Icon icon="ic:round-plus" />
                          </button>
                        </div>
                      </Col>
                      <Col md={2} className="price">
                        R{item.price}
                      </Col>
                      <Col md={2} className="remove__icon">
                        <button onClick={() => removeItemHandler(item)}>
                          <Icon icon="mdi:trash-outline" />
                        </button>
                      </Col>
                    </Row>
                  ))}
                </div>
              )}
            </Col>
            <Col md={4} className="order__summary">
              <Row>
                <h4>Order Summary</h4>
              </Row>
              <Row>
                <div className="d-flex">
                  <Col md={6} className="titles">
                    Cart items
                  </Col>
                  <Col md={6} className="outcomes">
                    {cartItems.reduce((a, c) => a + c.quantity, 0)} items
                  </Col>
                </div>

                <div className="d-flex">
                  <Col md={6} className="titles">
                    Cart total
                  </Col>
                  <Col md={6} className="outcomes">
                    R{cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}{' '}
                  </Col>
                </div>
              </Row>
              <Row>
                <button
                  type="button"
                  disabled={cartItems.length === 0}
                  className="button__primary_icon"
                  onClick={checkoutHandler}
                >
                  <span>Proceed to Checkout</span>
                  <Icon icon="material-symbols:arrow-right-alt-rounded" />
                </button>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </Helmet>
  );
}

export default Cart;
