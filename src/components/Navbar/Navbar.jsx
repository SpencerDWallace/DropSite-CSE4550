//Navbar used for the homepage

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../homepage/assets/google.png';
import './navbar.css';

function Navbar({user, logout}){
  console.log(user);
  return(
  <div className="droppers__navbar bg-dark">
    {/* <div className="droppers__navbar-links"> */}
    <div className="droppers__navbar-links_logo">
      <img src={logo} alt="logo" />
    </div>
    <div className="droppers__navbar-links_container">
      <Link to="/">
        <button type="button">Home</button>
      </Link>
      <Link to="/about">
        <button type="button">What is Droppers?</button>
      </Link>
      <Link to="/store">
        <button type="button">Store</button>
      </Link>
      <Link to="/contact">
        <button type="button">Contact Us</button>
      </Link>
      <Link to="/blog">
        <button type="button">More</button>
      </Link>
    </div>
    {/* </div> */}
    <div className="droppers__navbar-sign">
      {user && !user.isLoggedIn &&
      <>
      <Link to="/login">
        <button type="button">Sign in</button>
      </Link>
      <Link to="/register">
        <button type="button">Sign up</button>
      </Link>
      </>
      }
      {user && user.isLoggedIn && 
        <>
        <button type="button" onClick={logout}>Sign out</button>
        </>
      }
    </div>
  </div>
  );
};

export default Navbar;
