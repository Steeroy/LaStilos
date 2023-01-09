import React, { useEffect, useReducer } from 'react';

import './About.css';
import '../../App.css';
import Helmet from '../../components/Helmet';
import Manager from '../../assets/manager.png';
import { Icon } from '@iconify/react';
import { getError } from '../../utils';
import axios from 'axios';
import LoadingBox from '../../components/LoadingBox';
import MessageBox from '../../components/MessageBox';
import { Row } from 'react-bootstrap';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, teams: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function About() {
  const [{ loading, error, teams }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
    teams: [],
  });

  useEffect(() => {
    const fetchTeam = async () => {
      dispatch({ type: 'FETCH_REQUEST' });

      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get('/api/teams');
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchTeam();
  }, []);

  return (
    <Helmet title="About">
      <div className="about__page">
        <div className="banner__section">
          <div className="banner__content">
            <div className="banner__text">
              <h1>About Us</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                eu turpis molestie, dictum est a, mattis tellus. Sed dignissim,
                metus nec fringilla accumsan, risus sem sollicitudin lacus, ut
                interdum tellus elit sed risus. Maecenas eget condimentum velit,
                sit amet feugiat lectus. Class aptent taciti sociosqu ad litora
                torquent per conubia nostra, per inceptos himenaeos. Praesent
                auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
                Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor
                urna. Curabitur vel bibendum lorem. Morbi convallis convallis
                diam sit amet lacinia. Aliquam in elementum tellus.
              </p>
            </div>
            <div className="banner__img">
              <img src={Manager} alt="Manager" />
            </div>
          </div>
        </div>

        <div className="about__content">
          <div className="about__services">
            <h2 className="title__sec">Our Services</h2>

            <div className="services__offered">
              <div className="service">
                <Icon icon="mdi:clock-fast" />
                <div className="service__content">
                  <h5>Easy Order</h5>
                  <p>Just a few clicks, you’re served.</p>
                </div>
              </div>
              <div className="line_sep"></div>
              <div className="service">
                <Icon icon="carbon:delivery" />
                <div className="service__content">
                  <h5>Fast Delivery</h5>
                  <p>Quick, you won’t even blink</p>
                </div>
              </div>
              <div className="line_sep"></div>
              <div className="service">
                <Icon icon="material-symbols:verified-user-outline-rounded" />
                <div className="service__content">
                  <h5>Best Quality</h5>
                  <p>Cooked with the best ingredients</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about__team">
            <h2 className="title__sec">Our Team</h2>

            <p>
              We believe in the idea of teamwork as it is one of our most
              important values and without it we wouldnt be as productive as we
              are.
            </p>

            <div className="team__imgs">
              {loading ? (
                <LoadingBox />
              ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
              ) : (
                <Row>
                  {teams.map((member) => (
                    <div className="member__card">
                      <div className="member__img">
                        <img src={member.imgUrl} alt={member.name} />
                      </div>

                      <h6>{member.name}</h6>
                      <h4>{member.role}</h4>
                    </div>
                  ))}
                </Row>
              )}
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
}

export default About;
