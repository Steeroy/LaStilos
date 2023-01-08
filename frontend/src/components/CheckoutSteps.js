import React from 'react';
import { Col, Row } from 'react-bootstrap';
import '../App.css';

export default function CheckoutSteps(props) {
  return (
    <Row className="checkout-steps">
      <Col className={props.step1 ? 'active' : ''}>1. Cart</Col>
      <Col className={props.step2 ? 'active' : ''}>2. Delivery Details</Col>
      <Col className={props.step3 ? 'active' : ''}>3. Payment Details</Col>
      <Col className={props.step4 ? 'active' : ''}>4. Place Order Details</Col>
    </Row>
  );
}
