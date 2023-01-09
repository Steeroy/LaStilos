import React, { useState } from 'react';
import Helmet from '../../components/Helmet';
import { Row, Col, Form, FormGroup, FormControl } from 'react-bootstrap';

import './Contact.css';
import '../../App.css';
import { Icon } from '@iconify/react';

function Contact() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <Helmet title="Contact Us">
      <div className="contactus">
        <div className="page__banner">
          <div className="page__banner_text">
            <span>Contact Us</span>
          </div>
        </div>

        <div className="contact__info">
          <h1>Get in touch</h1>
          <Row>
            <Col md={6} className="form__col">
              <Form onSubmit={submitHandler}>
                <FormGroup controlId="fullname">
                  <FormControl
                    type="text"
                    required
                    placeholder="Fullname"
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </FormGroup>

                <FormGroup controlId="email">
                  <FormControl
                    type="email"
                    required
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>

                <FormGroup controlId="textarea">
                  <FormControl
                    as="textarea"
                    required
                    placeholder="Message"
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </FormGroup>

                <button className="button__primary_icon">
                  <span>Send Message</span>
                  <Icon icon="quill:send" />
                </button>
              </Form>
            </Col>
            <Col md={6} className="contacts__col">
              <div className="contacts">
                <h5>Contacts</h5>
                <div className="contact">
                  <Icon icon="material-symbols:phone-iphone-outline" />
                  <span>071 234 5678</span>
                </div>

                <div className="contact">
                  <Icon icon="material-symbols:mail-outline-rounded" />
                  <span>info@lastilos.co.za</span>
                </div>

                <div className="contact">
                  <Icon icon="ic:outline-location-on" />
                  <span>
                    Motherwell, Port Elizabeth <br />
                    Eastern Cape, 6211
                  </span>
                </div>
              </div>

              <div className="line__sep"></div>
              <div className="working__hours">
                <h5>Operating hours</h5>
                <div className="hours">
                  <div className="hour">
                    <span>Monday</span>
                    <span>07:00-21:00</span>
                  </div>
                  <div className="hour">
                    <span>Tuesday</span>
                    <span>07:00-21:00</span>
                  </div>
                  <div className="hour">
                    <span>Wednesday</span>
                    <span>07:00-21:00</span>
                  </div>
                  <div className="hour">
                    <span>Thursday</span>
                    <span>07:00-21:00</span>
                  </div>
                  <div className="hour">
                    <span>Friday</span>
                    <span>07:00-21:00</span>
                  </div>
                  <div className="hour">
                    <span>Saturday</span>
                    <span>07:00-22:00</span>
                  </div>
                  <div className="hour">
                    <span>Holidays</span>
                    <span>07:00-20:00</span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Helmet>
  );
}

export default Contact;
