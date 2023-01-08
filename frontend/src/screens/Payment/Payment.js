import React, { useContext } from 'react';
import Helmet from '../../components/Helmet';

import '../../App.css';
import './Payment.css';
import CheckoutSteps from '../../components/CheckoutSteps';
import { Col, Form, FormCheck, Row } from 'react-bootstrap';
import { Store } from '../../Store';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useEffect } from 'react';

function Payment() {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    cart: { cartItems, shippingAddress, paymentMethod },
  } = state;

  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping?redirect=/payment');
    }
  }, [shippingAddress, navigate]);

  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || 'PayPal'
  );

  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName });
    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };

  return (
    <Helmet title="Payment">
      <div className="payment">
        <div className="page__banner">
          <div className="page__banner_text">
            <span>Payment Details</span>
          </div>
        </div>

        <div className="payment__info">
          <CheckoutSteps step1 step2 step3></CheckoutSteps>

          <Row className="product__info">
            <Col md={6} className="products_col">
              <div className="products">
                <h4>Products</h4>
                <div className="cart__items">
                  {cartItems.map((item) => (
                    <Row
                      className="item__row d-flex align-items-center"
                      key={item._id}
                    >
                      <Col md={3} className="item__image">
                        <img src={item.imgUrl} alt={item.name} />
                      </Col>
                      <Col md={6}>
                        <h5>{item.name}</h5>
                      </Col>
                      <Col md={3}>R{item.quantity * item.price}</Col>
                    </Row>
                  ))}
                </div>
                <Link to="/cart">
                  <h6>Edit</h6>
                </Link>
              </div>
              <div className="address">
                <h4>Address</h4>
                <div className="address_details">
                  <p>{shippingAddress.fullname}</p>
                  <p>{shippingAddress.address}</p>
                  <p>{shippingAddress.city}</p>
                  <p>{shippingAddress.zip}</p>
                </div>
                <Link to="/shipping">
                  <h6>Edit</h6>
                </Link>
              </div>
            </Col>
            <Col md={6} className="payment_col order__summary">
              <div className="payment__button">
                <Form>
                  <FormCheck
                    type="radio"
                    id="PayPal"
                    label="PayPal"
                    value="PayPal"
                    checked={paymentMethodName === 'PayPal'}
                    onChange={(e) => setPaymentMethodName(e.target.value)}
                  />

                  <FormCheck
                    type="radio"
                    id="Stripe"
                    label="Stripe"
                    value="Stripe"
                    checked={paymentMethodName === 'Stripe'}
                    onChange={(e) => setPaymentMethodName(e.target.value)}
                  />
                </Form>
              </div>
              <Row>
                <h4>Order Summary</h4>
              </Row>
              <Row>
                <div className="d-flex">
                  <Col md={6} className="titles">
                    Cart items:
                  </Col>
                  <Col md={6} className="outcomes">
                    {cartItems.reduce((a, c) => a + c.quantity, 0)} items
                  </Col>
                </div>

                <div className="d-flex">
                  <Col md={6} className="titles">
                    Cart total:
                  </Col>
                  <Col md={6} className="outcomes">
                    R{cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}{' '}
                  </Col>
                </div>

                <div className="d-flex">
                  <Col md={6} className="titles">
                    Delivery:
                  </Col>
                  <Col md={6} className="outcomes">
                    R20
                  </Col>
                </div>
              </Row>

              <Row>
                <Col md={6} className="titles">
                  Subtotal:
                </Col>
                <Col md={6} className="outcomes">
                  R
                  {cartItems.reduce((a, c) => a + c.price * c.quantity, 0) + 20}
                </Col>
              </Row>

              <Row>
                <button
                  type="button"
                  disabled={cartItems.length === 0}
                  className="button__primary_icon"
                  onClick={submitHandler}
                >
                  <span>Proceed to Payment</span>
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

export default Payment;
