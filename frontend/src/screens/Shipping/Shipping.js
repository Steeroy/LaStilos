import React, { useContext } from 'react';
import Helmet from '../../components/Helmet';
import { Icon } from '@iconify/react';

import '../../App.css';
import './Shipping.css';
import CheckoutSteps from '../../components/CheckoutSteps';
import {
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from 'react-bootstrap';
import { Store } from '../../Store';
import { useNavigate } from 'react-router-dom';

function Shipping() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const checkoutHandler = () => {
    navigate('/payment');
  };

  return (
    <Helmet title="Shipping">
      <div className="shipping">
        <div className="page__banner">
          <div className="page__banner_text">
            <span>Delivery Details</span>
          </div>
        </div>

        <div className="shipping__info">
          <CheckoutSteps step1 step2></CheckoutSteps>

          <Row className="info__row">
            <Col md={8}>
              <Form>
                <FormGroup className="fullname">
                  <FormLabel>Fullname:</FormLabel>
                  <FormControl
                    type="text"
                    required
                    placeholder="E.g John Doe"
                    //   onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>

                <FormGroup className="street">
                  <FormLabel>Street Address:</FormLabel>
                  <FormControl
                    type="text"
                    required
                    placeholder="E.g 123 ABC Road"
                    //   onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>

                <div className="zip__city">
                  <FormGroup>
                    <FormLabel>City:</FormLabel>
                    <FormControl
                      type="text"
                      required
                      placeholder="E.g Rowland"
                      //   onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Zip:</FormLabel>
                    <FormControl
                      type="text"
                      required
                      placeholder="E.g 6211"
                      //   onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                </div>
              </Form>
            </Col>

            <Col md={4} className="order__summary">
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
                  R123
                </Col>
              </Row>
              <Row>
                <button
                  type="button"
                  disabled={cartItems.length === 0}
                  className="button__primary_icon"
                  onClick={checkoutHandler}
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

export default Shipping;
