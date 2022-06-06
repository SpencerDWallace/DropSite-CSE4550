import React from 'react';
import people from '../../assets/people.png';
import logo from '../../assets/logo.png';
import './header.css';

const Header = () => (
  <div className="droppers__header section__padding" id="home">
    <div className="droppers__header-content">
      <h1 className="graident__text"> Welcome to Droppers</h1>
      <p>The global standard of checkout automation.</p>

      <div className="droppers__header-content__input">
        <input type="email" placeholder=" Your Email Address" />
        <button type="button">Get Started</button>
      </div>

      <div className="droppers__header-content__people">
        <img src={people} alt="people" />
        <p>1,000 people requested access a visit in last 24 hours</p>
      </div>
    </div>
    <div className="droppers__header-image">
      <img src={logo} alt="logo" />
    </div>
  </div>
);

export default Header;
